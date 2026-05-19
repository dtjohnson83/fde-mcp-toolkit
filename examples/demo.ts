import customerNotes from "./customer-notes.json" with { type: "json" };
import { extractCustomerContext } from "../src/servers/customer-context.js";
import { scoreImplementationReadiness } from "../src/servers/implementation-readiness.js";
import { AgentAuditTrail } from "../src/servers/agent-audit.js";

const context = extractCustomerContext(customerNotes);
console.log("CUSTOMER CONTEXT");
console.log(JSON.stringify(context, null, 2));

const readiness = scoreImplementationReadiness({
  hasOwner: true,
  hasGoldenCases: true,
  hasRegressionCases: false,
  hasApprovalGate: true,
  hasAuditLog: true,
  hasRollbackPlan: false,
  hasSupportOwner: true,
  unresolvedRisks: context.risks.filter((risk) => risk.level === "high").length
});

console.log("\nREADINESS");
console.log(JSON.stringify(readiness, null, 2));

const audit = new AgentAuditTrail();
audit.recordAgentAction({
  runId: "run_customer_context_001",
  actor: "agent",
  tool: "extract_customer_context",
  action: "structured_customer_notes",
  evidence: context.systems,
  decision: "proposed"
});

audit.recordAgentAction({
  runId: "run_customer_context_001",
  actor: "human",
  tool: "implementation_review",
  action: "approved_context_for_pilot_plan",
  evidence: ["customer-discovery-notes", "solution-architect-review"],
  decision: "approved",
  approvedBy: "solution_architect"
});

console.log("\nAUDIT SUMMARY");
console.log(JSON.stringify(audit.summarizeAuditTrail("run_customer_context_001"), null, 2));
