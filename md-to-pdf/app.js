import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

const fileInput = document.querySelector('#markdownInput');
const loadButton = document.querySelector('#loadButton');
const renderButton = document.querySelector('#renderButton');
const statusMessage = document.querySelector('#statusMessage');
const previewContainer = document.querySelector('#previewContainer');

let currentMarkdown = '';

// Helper: try multiple possible global names and return the plugin function (or `.default` if present)
const resolvePlugin = (names) => {
  for (const name of names) {
    const plugin = window[name];
    if (plugin !== undefined) return plugin?.default ?? plugin;
  }
  return null;
};

// Common global names used by UMD builds / CDNs
const anchorPlugin = resolvePlugin([
  'markdownitAnchor',
  'markdownItAnchor',
  'markdownit_anchor',
  'markdown_it_anchor',
]);
const footnotePlugin = resolvePlugin([
  'markdownitFootnote',
  'markdownItFootnote',
  'markdownit_footnote',
]);

const markdownParser = window.markdownit({
  html: true,
  linkify: true,
  typographer: true,
});

if (anchorPlugin) markdownParser.use(anchorPlugin);
if (footnotePlugin) markdownParser.use(footnotePlugin);

mermaid.initialize({ startOnLoad: false, theme: 'default', securityLevel: 'loose' });

const setStatus = (message, state = 'info') => {
  const colors = {
    info: 'text-slate-500',
    success: 'text-emerald-600',
    warning: 'text-amber-600',
    error: 'text-rose-600',
  };

  statusMessage.className = `mt-1 text-xs ${colors[state] ?? colors.info}`;
  statusMessage.textContent = message;
};

const renderMarkdown = async (markdownText) => {
  const rawHtml = markdownParser.render(markdownText);
  const sanitizedHtml = window.DOMPurify.sanitize(rawHtml, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder'],
  });

  previewContainer.innerHTML = sanitizedHtml;

  const codeBlocks = Array.from(previewContainer.querySelectorAll('code.language-mermaid'));

  for (const codeBlock of codeBlocks) {
    const parentPre = codeBlock.parentElement;
    const graphDefinition = codeBlock.textContent;
    const mermaidWrapper = document.createElement('div');
    mermaidWrapper.className = 'mermaid my-4';
    mermaidWrapper.textContent = graphDefinition;
    parentPre.replaceWith(mermaidWrapper);
  }

  if (previewContainer.querySelector('.mermaid')) {
    await mermaid.run({ querySelector: '#previewContainer .mermaid' });
  }
};

const readFileContent = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result ?? '');
    reader.onerror = () => reject(new Error('Unable to read file'));
    reader.readAsText(file, 'utf-8');
  });

loadButton.addEventListener('click', async () => {
  const selectedFile = fileInput.files?.[0];

  if (!selectedFile) {
    setStatus('Please select a Markdown file first.', 'warning');
    return;
  }

  loadButton.disabled = true;
  renderButton.disabled = true;
  setStatus(`Loading "${selectedFile.name}"...`);

  try {
    currentMarkdown = await readFileContent(selectedFile);
    await renderMarkdown(currentMarkdown);
    setStatus(`Loaded "${selectedFile.name}". Ready to export.`, 'success');
    renderButton.disabled = false;
  } catch (error) {
    console.error(error);
    setStatus('Failed to load file. Check the console for details.', 'error');
  } finally {
    loadButton.disabled = false;
  }
});

renderButton.addEventListener('click', async () => {
  if (!currentMarkdown) {
    setStatus('Load a Markdown file before exporting.', 'warning');
    return;
  }

  renderButton.disabled = true;
  setStatus('Rendering PDF...');

  try {
    await mermaid.run({ querySelector: '#previewContainer .mermaid' });

    // Ensure mermaid has rendered into SVGs in the preview
    // Clone the preview to avoid mutating the on-screen DOM
    const exportTarget = previewContainer.cloneNode(true);

    // Convert any inline SVGs (from mermaid) to data-URI images so html2canvas captures them reliably
    const svgNodes = Array.from(exportTarget.querySelectorAll('svg'));
    for (const svg of svgNodes) {
      try {
        const serializer = new XMLSerializer();
        let svgString = serializer.serializeToString(svg);
        // Add namespace if missing
        if (!svgString.match(/^<svg[^>]+xmlns="http:\/\/www.w3.org\/2000\/svg"/)) {
          svgString = svgString.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
        }
        // Inline CSS styles computed on the SVG's owner document can be missing; serialization should include style elements
        const encoded = encodeURIComponent(svgString);
        const dataUrl = `data:image/svg+xml;charset=utf-8,${encoded}`;

        const img = document.createElement('img');
        img.src = dataUrl;
        // Preserve width/height attributes when present
        if (svg.hasAttribute('width')) img.width = parseInt(svg.getAttribute('width'), 10) || undefined;
        if (svg.hasAttribute('height')) img.height = parseInt(svg.getAttribute('height'), 10) || undefined;
        img.style.display = 'block';
        img.style.maxWidth = '100%';

        svg.replaceWith(img);
      } catch (err) {
        // ignore conversion errors and leave the svg in place
        console.warn('Failed to convert SVG to image for export', err);
      }
    }

    // Add inline table styles to ensure borders and padding are visible in the exported PDF
    const tables = Array.from(exportTarget.querySelectorAll('table'));
    for (const table of tables) {
      table.style.borderCollapse = 'collapse';
      table.style.width = table.style.width || '100%';
      table.style.marginBottom = table.style.marginBottom || '12px';
      const cells = Array.from(table.querySelectorAll('th, td'));
      for (const cell of cells) {
        cell.style.border = cell.style.border || '1px solid #ddd';
        cell.style.padding = cell.style.padding || '6px 8px';
        cell.style.textAlign = cell.style.textAlign || 'left';
      }
    }

    await window.html2pdf()
      .set({
        margin: [0.5, 0.75],
        filename: 'markdown-export.pdf',
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      })
      .from(exportTarget)
      .save();

    setStatus('PDF generated successfully.', 'success');
  } catch (error) {
    console.error(error);
    setStatus('Failed to render PDF. Check the console for details.', 'error');
  } finally {
    renderButton.disabled = false;
  }
});
