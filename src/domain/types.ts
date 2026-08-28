/**
 * 계획 문서 7.1의 핵심 타입 계약.
 * MissionId, StageKind, Decision, RouteNode, RouteEdge, RouteGoal, RouteMission,
 * RouteTotals, RouteEvaluation, SessionStep의 이름과 필드는 계획 문서와 동일하게 유지한다.
 * 학습 화면에 필요한 표시용 필드(title, scene, conditionChanges, decisionRules 등)는
 * 계약 필드에 덧붙인 확장이다.
 */
export type MissionId =
  | "route-strawberry-01"
  | "route-notebook-02"
  | "route-delay-03"
  | "route-package-04"
  | "route-store-05"
  | "route-missing-06";

export type StageKind =
  | "production"
  | "processing"
  | "storage"
  | "transport"
  | "sale"
  | "consumption";

export type Decision =
  | "choose-route"
  | "keep-route"
  | "revise-route"
  | "insufficient-information";

export interface RouteNode {
  readonly id: string;
  readonly kind: StageKind;
  readonly label: string;
  readonly timeTokens: number;
  readonly costTokens: number | null;
  readonly lossTokens: number | null;
}

export interface RouteEdge {
  readonly id: string;
  readonly fromId: string;
  readonly toId: string;
  readonly timeTokens: number;
  readonly costTokens: number | null;
  readonly lossTokens: number | null;
}

export interface RouteGoal {
  readonly id: string;
  readonly priority: "time" | "cost" | "loss" | "balanced";
  /** 학생에게 보이는 목표 카드 문장. */
  readonly statement: string;
  readonly acceptedRouteIds: readonly string[];
}

/** 조건 변화 종류. edge|node는 토큰을 더하고, route는 검수된 다른 경로로 갈아탄다. */
export type ConditionChangeKind = "edge" | "node" | "route";

export interface ConditionChange {
  readonly id: string;
  readonly kind: ConditionChangeKind;
  readonly label: string;
  readonly description: string;
  /** edge|node: 대상 요소 ID. route: 갈아탈 승인 경로 ID. */
  readonly targetId: string;
  /** route 종류에서는 delta를 사용하지 않고 0으로 둔다. */
  readonly timeTokensDelta: number;
  readonly costTokensDelta: number | null;
  readonly lossTokensDelta: number | null;
}

export interface EvidenceOption {
  readonly key: string;
  readonly label: string;
  /** 오개념 문장인 근거. 학생이 고르면 판정이 통과하지 않는다. */
  readonly forbidden: boolean;
}

export interface MissingDataOption {
  readonly key: string;
  readonly label: string;
}

export interface DecisionRule {
  readonly decision: Decision;
  /** 학생 화면에 보이는 판단 선택지 문장. */
  readonly label: string;
  /** 이 판단이 통과하려면 조건 변화가 적용된 상태여야 하는지. */
  readonly requiresChangeApplied: boolean;
  readonly requiredEvidenceKeys: readonly string[];
}

export interface RouteTotals {
  readonly timeTokens: number;
  readonly costTokens: number | null;
  readonly lossTokens: number | null;
}

/**
 * 계획 문서 7.1의 RouteMission 계약(id, nodes, edges, goal, requiredDataKeys,
 * sourceNote, reviewStatus, misconceptionGuard)에 학습 화면에 필요한 표시·판정 필드를
 * 덧붙인 형식이다.
 */
export interface RouteMission {
  readonly id: MissionId;
  readonly title: string;
  /** 학생에게 보이는 장면 소개 문장. */
  readonly scene: string;
  readonly nodes: readonly RouteNode[];
  readonly edges: readonly RouteEdge[];
  readonly goal: RouteGoal;
  readonly conditionChanges: readonly ConditionChange[];
  readonly decisionRules: readonly DecisionRule[];
  readonly evidenceOptions: readonly EvidenceOption[];
  readonly missingDataOptions: readonly MissingDataOption[];
  readonly requiredDataKeys: readonly string[];
  readonly sourceNote: string;
  readonly reviewStatus: "pending" | "approved";
  readonly misconceptionGuard: string;
  /** 관찰 화면의 생성 일러스트. 이미지가 없어도 활동을 완주할 수 있어야 한다 (계획 문서 10). */
  readonly image?: { readonly src: string; readonly alt: string };
}

export interface RouteEvaluation {
  readonly accepted: boolean;
  readonly decision: Decision;
  readonly totals: RouteTotals;
  readonly tradeoffKeys: readonly string[];
  readonly evidenceKeys: readonly string[];
}

/** 경로 ID는 노드 ID를 ">"로 이은 문자열이다. 예: "farm>sort>truck>store" */
export type RouteId = string;

export interface RouteValidation {
  readonly valid: boolean;
  /** 실패 원인을 아이 문장 키로 반환한다. */
  readonly reasonKeys: readonly string[];
}

export interface ConditionDiff {
  readonly timeTokens: number | null;
  readonly costTokens: number | null;
  readonly lossTokens: number | null;
}

export interface ConditionChangeResult {
  readonly changeId: string;
  readonly beforeRouteId: RouteId;
  readonly afterRouteId: RouteId;
  readonly beforeTotals: RouteTotals;
  readonly afterTotals: RouteTotals;
  readonly diff: ConditionDiff;
}

export interface RouteDecisionInput {
  readonly decision: Decision;
  readonly routeId: RouteId;
  readonly appliedChangeId: string | null;
  readonly selectedEvidenceKeys: readonly string[];
  readonly selectedDataKeys: readonly string[];
}

export type SessionStep =
  | "INTRO"
  | "OBSERVE"
  | "ORDER"
  | "BASELINE"
  | "CHANGE_ONE"
  | "COMPARE"
  | "DECIDE"
  | "REPORT";

export const STAGE_KIND_LABELS = {
  production: "생산",
  processing: "가공",
  storage: "보관",
  transport: "운송",
  sale: "판매",
  consumption: "소비",
} as const satisfies Record<StageKind, string>;

export const STAGE_ORDER: readonly StageKind[] = [
  "production",
  "processing",
  "storage",
  "transport",
  "sale",
  "consumption",
];
