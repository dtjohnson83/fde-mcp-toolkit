# Forward-Deployed MCP Toolkit

MCP server patterns for forward-deployed AI implementation work.

This repo demonstrates how I would package customer context, implementation readiness checks, and auditability into MCP tools that an AI agent can safely use during a customer deployment.

The point is not to show another chatbot or AI experiment. The point is to show the infrastructure around useful AI work:

- structured customer discovery
- tool-safe implementation checks
- audit logs for agent actions
- readiness scoring before go-live
- repeatable handoffs for solution engineers and customer teams

## Employer Review

This is the repo to review if you want evidence for Forward Deployed Engineer, AI Solutions Engineer, or MCP-heavy customer engineering roles.

What it shows:

- I understand that customer discovery has to become structured implementation data.
- I design AI tools with approvals, evidence, and audit trails instead of loose prompts.
- I can write typed TypeScript modules, tests, examples, docs, and CI around an implementation pattern.
- I think about go-live readiness, not just demo-day output.

Fast path:

```bash
npm install
npm test
npm run demo
```

Review order:

1. [src/customer-context](src/customer-context) - how messy discovery notes become structured implementation context
2. [src/implementation-readiness](src/implementation-readiness) - how readiness is scored before pilot or go-live
3. [src/agent-audit](src/agent-audit) - how tool actions become a traceable decision record
4. [test](test) - verification around the core implementation pattern

## Why This Matters

Forward-deployed AI work sits between customer reality and product capability. MCP is useful because it gives agents controlled access to operational tools without turning every workflow into an ungoverned prompt.

This toolkit shows how to expose implementation knowledge as typed tools.

## Included MCP Servers

| Server | Purpose |
| --- | --- |
| customer-context | Turns messy customer notes into structured implementation context |
| implementation-readiness | Scores whether an AI workflow is ready for pilot or go-live |
| agent-audit | Records agent actions, evidence, approval state, and decision trail |

## What A Customer Team Would Get

This pattern can become a lightweight implementation operating system:

1. Capture discovery notes as structured customer context.
2. Score the workflow against readiness criteria before pilot or go-live.
3. Record agent/tool actions with evidence and approval state.
4. Summarize the decision trail for customer stakeholders, compliance, or support.

## Example Tools

- extract_customer_context
- score_implementation_readiness
- record_agent_action
- summarize_audit_trail

## Quick Start

```bash
npm install
npm test
npm run demo
```

## Why This Helps In FDE / AI Solutions Interviews

This repo gives a hiring manager evidence that I can think beyond calling an LLM:

- I know where customer discovery becomes implementation data.
- I know how to design approval gates and audit trails.
- I know how to package AI capabilities as tools instead of one-off scripts.
- I know how to make an agent useful without making it reckless.

## Related Work

- https://github.com/dtjohnson83/agent-audit-trail
- https://github.com/dtjohnson83/osha-mcp
- https://github.com/dtjohnson83/forward-deployed-ai-portfolio
