# System Design — Table of Contents

GUIDELINES ON CHAPTER CONTENT:
<guideline>
A chapter should ideally include:
- Clear definitions and explanations of key concepts. Explained in simple terms. And in a way that help the reader build intuition, and build a strong foundation/fundamentals.
- Real-world examples to illustrate ideas.
- Mermaid Diagrams where applicable to visualize architectures or processes.
</guideline>

1. Introduction to System Design
   - What system design is, why it matters, common problems it solves, trade-offs, and how to think about requirements and constraints.

2. Fundamental Concepts and Metrics
   - Core terms: latency, throughput, availability, reliability, scalability, consistency, durability, and how to measure and reason about them.

3. High-Level Architecture Patterns
   - Client–server, peer-to-peer, layered, microservices, monoliths, event-driven; when to use each and the pros/cons.

4. Networking & Protocol Basics
   - TCP/IP, UDP, HTTP/HTTPS, TLS, DNS, CDN fundamentals, and how network behavior affects system design.

5. APIs and Interface Design
   - Designing clear, versioned APIs (REST, gRPC, GraphQL), contracts, pagination, rate limiting, idempotency, and error handling.

6. Data Modeling and Storage Choices
   - Relational vs. NoSQL, document/key-value/columnar/graph stores, normalization vs. denormalization, schemas and indexing.

7. Database Internals & Scaling
   - Replication, sharding/partitioning, consistency models, transactions, isolation levels, and strategies for scaling databases.

8. Caching Strategies
   - Cache layers (client, CDN, edge, application), cache invalidation patterns, eviction policies, and cache-aside/write-through strategies.

9. Message Queues & Asynchronous Systems
   - Queues vs. pub/sub, ordering, at-least-once vs. exactly-once, retries, dead-letter queues, and backpressure.

10. Load Balancing & Traffic Management
    - Reverse proxies, L4/L7 load balancers, sticky sessions, health checks, connection draining, and traffic shaping.

11. Observability: Logging, Metrics, Tracing
    - Structured logging, metrics (Prometheus-style), distributed tracing (OpenTelemetry), alerts, and setting SLOs/SLIs.

12. Consistency, Consensus & Distributed Algorithms
    - CAP theorem, consensus algorithms (Paxos/Raft), leader election, vector clocks, and anti-entropy.

13. Reliability & Fault Tolerance
    - Redundancy, failover, graceful degradation, retries/exponential backoff, circuit breakers, and bulkheads.

14. Scalability Techniques & Capacity Planning
    - Vertical vs horizontal scaling, partitioning, autoscaling policies, capacity estimation, and headroom planning.

15. Security & Privacy
    - Authentication, authorization, encryption (in transit and at rest), threat modeling, auditing, and handling PII/consent.

16. Data Pipelines & Stream Processing
    - Batch vs stream, event sourcing, stream processors (Kafka/Beam), windowing, exactly-once processing, and CDC.

17. Search, Indexing & Full-Text Systems
    - Inverted indexes, ranking/scoring, sharding search indices, near-real-time indexing, and query optimization.

18. Real-Time Systems & Notifications
    - WebSockets, Server-Sent Events, real-time delivery guarantees, presence, and scaling pub/sub for real-time features.

19. Media & File Storage at Scale
    - Object storage (S3), chunking, multipart upload, CDN integration, transcoding pipelines, and metadata stores.

20. Batch Processing & Analytics
    - MapReduce, data warehouses, OLAP vs OLTP, materialized views, and design of analytics-friendly schemas.

21. Cost, Performance Trade-offs & Optimization
    - Cost modeling, cost vs latency vs consistency trade-offs, benchmarking, profiling, and optimization strategies.

22. Deployment, CI/CD & Infra Automation
    - Build pipelines, blue/green and canary deployments, infrastructure-as-code, configuration management, and rollbacks.

23. Containers, Orchestration & Serverless
    - Containers vs VMs, Kubernetes fundamentals, service meshes, serverless models, cold-starts, and when to pick each.

24. Governance, Compliance & Operational Practices
    - Change management, runbooks, incident response, SLO/SLI policy, audits, and regulatory considerations.

25. Design Patterns & Anti-patterns
    - Common reusable patterns (CQRS, event sourcing), and anti-patterns to avoid with examples and trade-offs.

26. Testing, Load Testing & Chaos Engineering
    - Unit/integration testing at scale, load testing methodologies, failure injection, and resilience testing.

27. System Design Interview Framework
    - Frameworks to tackle interview questions, how to structure answers, trade-offs to discuss, and practice prompts.

28. Case Studies & Worked Examples
    - End-to-end designs for URL shortener, chat system, news feed, e-commerce checkout, notification service, and payment flow.

29. Capstone Project: End-to-End System Design
    - Guidance for a project that combines requirements, architecture, component selection, trade-offs, and monitoring.
