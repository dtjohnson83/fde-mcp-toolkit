# MCP Implementation Pattern

MCP is strongest when it exposes implementation capabilities as narrow, auditable tools.

## Pattern

1. Convert customer context into structured data.
2. Expose only the tools the agent needs.
3. Validate every tool input with schemas.
4. Require approval for risky actions.
5. Log tool calls, evidence, and decisions.
6. Summarize the run for the implementation owner.

## Tool Design Rules

- Make tools narrow.
- Prefer structured inputs over free text.
- Return evidence and blockers, not just answers.
- Do not let a tool silently mutate production state.
- Include run ids so actions can be replayed.

## Why This Works

Forward-deployed AI systems need reliability inside messy customer environments. MCP tools make that practical by putting a typed boundary between the agent and operational systems.

