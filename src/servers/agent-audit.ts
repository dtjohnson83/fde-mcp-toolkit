import { z } from "zod";
import type { AuditEntry } from "../shared/types.js";

export const AuditEntrySchema = z.object({
  runId: z.string().min(1),
  actor: z.enum(["agent", "human", "system"]),
  tool: z.string().min(1),
  action: z.string().min(1),
  evidence: z.array(z.string()),
  decision: z.enum(["proposed", "approved", "rejected", "executed", "escalated"]),
  approvedBy: z.string().optional()
});

export class AgentAuditTrail {
  private entries: AuditEntry[] = [];

  recordAgentAction(input: z.infer<typeof AuditEntrySchema>): AuditEntry {
    const parsed = AuditEntrySchema.parse(input);
    const entry: AuditEntry = {
      ...parsed,
      timestamp: new Date().toISOString()
    };

    this.entries.push(Object.freeze(entry));
    return entry;
  }

  summarizeAuditTrail(runId: string) {
    const entries = this.entries.filter((entry) => entry.runId === runId);
    return {
      runId,
      count: entries.length,
      decisions: entries.map((entry) => entry.decision),
      tools: [...new Set(entries.map((entry) => entry.tool))],
      hasHumanApproval: entries.some((entry) => entry.actor === "human" && entry.decision === "approved"),
      entries
    };
  }
}

