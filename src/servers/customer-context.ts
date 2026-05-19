import { z } from "zod";
import type { CustomerContext, RiskLevel } from "../shared/types.js";

export const CustomerContextInput = z.object({
  customer: z.string().min(1),
  notes: z.string().min(1)
});

const riskWords: Record<RiskLevel, string[]> = {
  high: ["production", "billing", "compliance", "regulated", "delete", "customer-facing"],
  medium: ["manual", "approval", "handoff", "spreadsheet", "migration"],
  low: ["internal", "prototype", "draft", "sandbox"]
};

export function extractCustomerContext(input: z.infer<typeof CustomerContextInput>): CustomerContext {
  const parsed = CustomerContextInput.parse(input);
  const notes = parsed.notes.toLowerCase();

  const systems = ["Salesforce", "Snowflake", "BigQuery", "Postgres", "Excel", "Slack"].filter((system) =>
    notes.includes(system.toLowerCase())
  );

  const users = ["implementation analyst", "solution architect", "customer admin", "executive sponsor"].filter((user) =>
    notes.includes(user)
  );

  const constraints = [
    notes.includes("approval") ? "Human approval required before high-impact changes" : null,
    notes.includes("pii") || notes.includes("sensitive") ? "Sensitive data handling required" : null,
    notes.includes("audit") ? "Audit trail required for agent actions" : null
  ].filter(Boolean) as string[];

  const risks = Object.entries(riskWords).flatMap(([level, words]) =>
    words
      .filter((word) => notes.includes(word))
      .map((word) => ({
        level: level as RiskLevel,
        description: "Notes mention " + word + ", which should be handled explicitly in implementation scope."
      }))
  );

  return {
    customer: parsed.customer,
    workflow: inferWorkflow(notes),
    users: users.length ? users : ["operator", "implementation lead"],
    systems,
    constraints,
    risks,
    successMetrics: [
      "Reduce manual implementation effort",
      "Improve diagnostic turnaround time",
      "Preserve approval and auditability for risky actions"
    ]
  };
}

function inferWorkflow(notes: string): string {
  if (notes.includes("text2sql") || notes.includes("natural-language analytics")) return "Natural-language analytics implementation";
  if (notes.includes("inspection") || notes.includes("safety")) return "AI-assisted safety inspection workflow";
  if (notes.includes("support") || notes.includes("ticket")) return "AI-assisted support triage workflow";
  return "Customer AI implementation workflow";
}

