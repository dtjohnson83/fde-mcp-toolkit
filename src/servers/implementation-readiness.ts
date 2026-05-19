import { z } from "zod";
import type { ReadinessInput, ReadinessResult } from "../shared/types.js";

export const ReadinessInputSchema = z.object({
  hasOwner: z.boolean(),
  hasGoldenCases: z.boolean(),
  hasRegressionCases: z.boolean(),
  hasApprovalGate: z.boolean(),
  hasAuditLog: z.boolean(),
  hasRollbackPlan: z.boolean(),
  hasSupportOwner: z.boolean(),
  unresolvedRisks: z.number().int().min(0)
});

export function scoreImplementationReadiness(input: ReadinessInput): ReadinessResult {
  const parsed = ReadinessInputSchema.parse(input);
  const blockers: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  const checks: Array<[keyof ReadinessInput, number, string, string]> = [
    ["hasOwner", 15, "No accountable implementation owner", "Assign one implementation owner before pilot"],
    ["hasGoldenCases", 15, "No golden eval cases", "Add representative success cases"],
    ["hasRegressionCases", 10, "No regression cases", "Capture known failures as tests"],
    ["hasApprovalGate", 15, "No human approval gate", "Require approval for high-impact actions"],
    ["hasAuditLog", 15, "No audit log", "Record inputs, tool calls, evidence, and decisions"],
    ["hasRollbackPlan", 15, "No rollback plan", "Document rollback and recovery path"],
    ["hasSupportOwner", 10, "No support owner", "Assign post-launch support ownership"]
  ];

  for (const [key, penalty, blocker, recommendation] of checks) {
    if (!parsed[key]) {
      score -= penalty;
      blockers.push(blocker);
      recommendations.push(recommendation);
    }
  }

  if (parsed.unresolvedRisks > 0) {
    score -= Math.min(20, parsed.unresolvedRisks * 5);
    blockers.push(parsed.unresolvedRisks + " unresolved risk(s)");
    recommendations.push("Close or explicitly accept unresolved risks before go-live");
  }

  score = Math.max(0, score);

  return {
    score,
    status: score >= 85 ? "go_live_ready" : score >= 65 ? "pilot_ready" : "not_ready",
    blockers,
    recommendations
  };
}

