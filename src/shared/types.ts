export type RiskLevel = "low" | "medium" | "high";

export type CustomerContext = {
  customer: string;
  workflow: string;
  users: string[];
  systems: string[];
  constraints: string[];
  risks: Array<{
    level: RiskLevel;
    description: string;
  }>;
  successMetrics: string[];
};

export type ReadinessInput = {
  hasOwner: boolean;
  hasGoldenCases: boolean;
  hasRegressionCases: boolean;
  hasApprovalGate: boolean;
  hasAuditLog: boolean;
  hasRollbackPlan: boolean;
  hasSupportOwner: boolean;
  unresolvedRisks: number;
};

export type ReadinessResult = {
  score: number;
  status: "not_ready" | "pilot_ready" | "go_live_ready";
  blockers: string[];
  recommendations: string[];
};

export type AuditEntry = {
  runId: string;
  actor: "agent" | "human" | "system";
  tool: string;
  action: string;
  evidence: string[];
  decision: "proposed" | "approved" | "rejected" | "executed" | "escalated";
  approvedBy?: string;
  timestamp: string;
};

