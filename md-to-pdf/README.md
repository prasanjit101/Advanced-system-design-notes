# md-to-pdf — Markdown to PDF (client-side)

This is a small static HTML app that converts Markdown files (including Mermaid diagrams, tables, code blocks, and footnotes) to a PDF from the browser.

Files:

- `index.html` — UI and loader, uses Tailwind CSS.
- `app.js` — Client-side logic: parses Markdown, renders Mermaid, sanitizes HTML, and exports PDF via html2pdf.
- `sample.md` — A sample document to test functionality.

How to use

1. Open `md-to-pdf/index.html` in your browser (double-click or drag into the browser).
2. Click "Select Markdown file" and choose `sample.md` (or any `.md` file).
3. Click "Load Markdown" to render the preview.
4. Click "Render PDF" to generate and download the PDF.

Notes and troubleshooting

- Mermaid rendering requires an internet connection to load the mermaid ESM module.
- If diagrams don't appear in the PDF, wait for the preview to display them first, then export.
- For large documents or images, html2pdf may take longer and the result can vary depending on browser capabilities.

License: MIT
