# Chapter 24: Governance, Compliance & Operational Practices

## 1. Introduction

This chapter focuses on the non-functional, but critical, aspects of running large-scale systems: governance, compliance, and operational best practices. These ensure that systems are managed in a controlled, secure, and reliable manner.

## 2. Change Management

**Change management** is the process of controlling changes to IT systems to minimize risk.

**Key Components:**
- **Change Request:** A formal proposal for a change to be made.
- **Approval Process:** A workflow for reviewing and approving changes.
- **Testing:** Ensuring that changes are tested before being deployed.
- **Rollback Plan:** A plan to revert the change if it causes issues.

## 3. Runbooks

A **runbook** is a detailed "how-to" guide for completing a specific task. In IT, runbooks are used to document procedures for system administration, operations, and incident response.

**Example Runbook Entry:**
- **Task:** Restart the web server.
- **Steps:**
    1. SSH into the server: `ssh user@web-server-1`
    2. Run the restart command: `sudo systemctl restart nginx`
    3. Verify the server is back online: `curl http://localhost`

## 4. Incident Response

**Incident response** is the process of responding to and managing the aftermath of a security breach or system failure.

**Phases of Incident Response:**
1.  **Preparation:** Having a plan in place before an incident occurs.
2.  **Identification:** Detecting and identifying an incident.
3.  **Containment:** Limiting the damage and preventing further spread.
4.  **Eradication:** Removing the root cause of the incident.
5.  **Recovery:** Restoring systems to normal operation.
6.  **Lessons Learned:** Conducting a post-mortem to prevent future incidents.

## 5. SLO/SLI Policy

- **Service Level Indicator (SLI):** A quantitative measure of some aspect of the level of service that is provided. Example: request latency.
- **Service Level Objective (SLO):** A target value or range of values for an SLI. Example: 99% of requests should be served in under 200ms.
- **Service Level Agreement (SLA):** A contract with a customer that includes consequences for not meeting the SLOs.

**SLO/SLI policy** defines the SLOs for a service and the process for monitoring and reporting on them.

## 6. Audits and Compliance

- **Audits:** A systematic review of an organization's IT systems to ensure they meet certain standards.
- **Compliance:** Adhering to laws, regulations, and standards.

**Common Regulations:**
- **GDPR (General Data Protection Regulation):** A regulation in EU law on data protection and privacy.
- **HIPAA (Health Insurance Portability and Accountability Act):** A US law that provides data privacy and security provisions for safeguarding medical information.
- **PCI DSS (Payment Card Industry Data Security Standard):** A set of security standards designed to ensure that all companies that accept, process, store or transmit credit card information maintain a secure environment.
