# Forward-Deployed MCP Toolkit

MCP server patterns for forward-deployed AI implementation work.

This repo demonstrates how I would package customer context, implementation readiness checks, and auditability into MCP tools that an AI agent can safely use during a customer deployment.

The point is not to show another chatbot. The point is to show the infrastructure around useful AI work:

- structured customer discovery
- tool-safe implementation checks
- audit logs for agent actions
- readiness scoring before go-live
- repeatable handoffs for solution engineers and customer teams

## Why This Matters

Forward-deployed AI work sits between customer reality and product capability. MCP is useful because it gives agents controlled access to operational tools without turning every workflow into an ungoverned prompt.

This toolkit shows how to expose implementation knowledge as typed tools.

## Included MCP Servers

| Server | Purpose |
| --- | --- |
| customer-context | Turns messy customer notes into structured implementation context |
| implementation-readiness | Scores whether an AI workflow is ready for pilot or go-live |
| agent-audit | Records agent actions, evidence, approval state, and decision trail |

## Example Tools

- extract_customer_context
- score_implementation_readiness
- record_agent_action
- summarize_audit_trail

## Quick Start

    npm install
    npm test
    npm run demo

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

