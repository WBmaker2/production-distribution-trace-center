import type { RouteMission } from "../domain/types";

export interface ContentValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
}

const PLANNED_MISSION_IDS: readonly string[] = [
  "route-strawberry-01",
  "route-notebook-02",
  "route-delay-03",
  "route-package-04",
  "route-store-05",
  "route-missing-06",
];

interface GraphSummary {
  readonly startIds: readonly string[];
  readonly endIds: readonly string[];
  readonly isolatedIds: readonly string[];
  readonly unreachableFromStart: readonly string[];
  readonly notReachingEnd: readonly string[];
  readonly hasCycle: boolean;
}

function isNonNegativeIntegerOrEmpty(value: number | null): boolean {
  return value === null || (Number.isInteger(value) && value >= 0);
}

function analyzeGraph(mission: RouteMission): GraphSummary {
  const nodeIds = mission.nodes.map((node) => node.id);
  const incoming = new Map<string, string[]>();
  const outgoing = new Map<string, string[]>();
  for (const id of nodeIds) {
    incoming.set(id, []);
    outgoing.set(id, []);
  }
  for (const edge of mission.edges) {
    outgoing.get(edge.fromId)?.push(edge.toId);
    incoming.get(edge.toId)?.push(edge.fromId);
  }

  const startIds = nodeIds.filter((id) => (incoming.get(id) ?? []).length === 0);
  const endIds = nodeIds.filter((id) => (outgoing.get(id) ?? []).length === 0);
  const isolatedIds = nodeIds.filter(
    (id) => (incoming.get(id) ?? []).length === 0 && (outgoing.get(id) ?? []).length === 0,
  );

  const reachableFromStart = new Set<string>();
  const startQueue = [...startIds];
  while (startQueue.length > 0) {
    const id = startQueue.pop() as string;
    if (reachableFromStart.has(id)) continue;
    reachableFromStart.add(id);
    for (const next of outgoing.get(id) ?? []) startQueue.push(next);
  }

  const reachableToEnd = new Set<string>();
  const endQueue = [...endIds];
  while (endQueue.length > 0) {
    const id = endQueue.pop() as string;
    if (reachableToEnd.has(id)) continue;
    reachableToEnd.add(id);
    for (const prev of incoming.get(id) ?? []) endQueue.push(prev);
  }

  const UNVISITED = 0;
  const IN_PROGRESS = 1;
  const DONE = 2;
  const state = new Map<string, number>(nodeIds.map((id) => [id, UNVISITED]));
  let hasCycle = false;
  const visit = (id: string): void => {
    if (hasCycle) return;
    state.set(id, IN_PROGRESS);
    for (const next of outgoing.get(id) ?? []) {
      const nextState = state.get(next) ?? UNVISITED;
      if (nextState === IN_PROGRESS) {
        hasCycle = true;
        return;
      }
      if (nextState === UNVISITED) visit(next);
    }
    state.set(id, DONE);
  };
  for (const id of startIds) {
    if ((state.get(id) ?? UNVISITED) === UNVISITED) visit(id);
  }
  for (const id of nodeIds) {
    if ((state.get(id) ?? UNVISITED) === UNVISITED) visit(id);
  }

  return {
    startIds,
    endIds,
    isolatedIds,
    unreachableFromStart: nodeIds.filter((id) => !reachableFromStart.has(id)),
    notReachingEnd: nodeIds.filter((id) => !reachableToEnd.has(id)),
    hasCycle,
  };
}

function isActualPath(mission: RouteMission, graph: GraphSummary, routeId: string): boolean {
  const nodeIds = routeId.split(">");
  if (nodeIds.length < 2) return false;
  const known = new Set(mission.nodes.map((node) => node.id));
  if (nodeIds.some((id) => !known.has(id))) return false;
  if (new Set(nodeIds).size !== nodeIds.length) return false;
  if (graph.startIds.length === 1 && nodeIds[0] !== graph.startIds[0]) return false;
  if (graph.endIds.length === 1 && nodeIds[nodeIds.length - 1] !== graph.endIds[0]) return false;
  const edgeKeys = new Set(mission.edges.map((edge) => `${edge.fromId}>${edge.toId}`));
  for (let index = 0; index < nodeIds.length - 1; index += 1) {
    if (!edgeKeys.has(`${nodeIds[index]}>${nodeIds[index + 1]}`)) return false;
  }
  return true;
}

export function validateMission(mission: RouteMission): readonly string[] {
  const errors: string[] = [];
  const id = mission.id;

  if (mission.reviewStatus !== "approved") {
    errors.push(`검수되지 않은 미션이 있습니다: ${id} (${mission.reviewStatus})`);
  }
  if (mission.sourceNote.trim().length === 0) errors.push(`sourceNote가 비어 있습니다: ${id}`);
  if (mission.misconceptionGuard.trim().length === 0) {
    errors.push(`misconceptionGuard가 비어 있습니다: ${id}`);
  }
  if (mission.title.trim().length === 0) errors.push(`title이 비어 있습니다: ${id}`);
  if (mission.scene.trim().length === 0) errors.push(`scene이 비어 있습니다: ${id}`);
  if (mission.goal.statement.trim().length === 0) errors.push(`목표 문장이 비어 있습니다: ${id}`);

  const nodeIds = new Set<string>();
  for (const node of mission.nodes) {
    if (nodeIds.has(node.id)) errors.push(`중복된 단계 ID가 있습니다: ${id} ${node.id}`);
    nodeIds.add(node.id);
    if (!Number.isInteger(node.timeTokens) || node.timeTokens < 0) {
      errors.push(`시간 토큰이 0 이상의 정수가 아닙니다: ${id} ${node.id}`);
    }
    if (!isNonNegativeIntegerOrEmpty(node.costTokens)) {
      errors.push(`비용 토큰이 0 이상의 정수 또는 자료 없음이 아닙니다: ${id} ${node.id}`);
    }
    if (!isNonNegativeIntegerOrEmpty(node.lossTokens)) {
      errors.push(`손실 토큰이 0 이상의 정수 또는 자료 없음이 아닙니다: ${id} ${node.id}`);
    }
    if (node.label.trim().length === 0) errors.push(`단계 설명이 비어 있습니다: ${id} ${node.id}`);
  }
  if (mission.nodes.length < 2) errors.push(`단계가 2개 이상이어야 합니다: ${id}`);

  const edgeIds = new Set<string>();
  for (const edge of mission.edges) {
    if (edgeIds.has(edge.id)) errors.push(`중복된 연결선 ID가 있습니다: ${id} ${edge.id}`);
    edgeIds.add(edge.id);
    if (!nodeIds.has(edge.fromId) || !nodeIds.has(edge.toId)) {
      errors.push(`연결선이 존재하지 않는 단계를 가리킵니다: ${id} ${edge.id}`);
    }
    if (!Number.isInteger(edge.timeTokens) || edge.timeTokens < 0) {
      errors.push(`시간 토큰이 0 이상의 정수가 아닙니다: ${id} ${edge.id}`);
    }
    if (!isNonNegativeIntegerOrEmpty(edge.costTokens)) {
      errors.push(`비용 토큰이 0 이상의 정수 또는 자료 없음이 아닙니다: ${id} ${edge.id}`);
    }
    if (!isNonNegativeIntegerOrEmpty(edge.lossTokens)) {
      errors.push(`손실 토큰이 0 이상의 정수 또는 자료 없음이 아닙니다: ${id} ${edge.id}`);
    }
  }

  const graph = analyzeGraph(mission);
  if (graph.hasCycle) errors.push(`경로에 사이클이 있습니다: ${id}`);
  if (graph.startIds.length !== 1) {
    errors.push(`시작 단계가 한 개가 아닙니다: ${id} (${graph.startIds.length}개)`);
  }
  if (graph.endIds.length !== 1) {
    errors.push(`종료 단계가 한 개가 아닙니다: ${id} (${graph.endIds.length}개)`);
  }
  for (const isolated of graph.isolatedIds) errors.push(`고립된 단계가 있습니다: ${id} ${isolated}`);
  for (const unreachable of graph.unreachableFromStart) {
    errors.push(`시작 단계에서 도달하지 않는 단계가 있습니다: ${id} ${unreachable}`);
  }
  for (const deadEnd of graph.notReachingEnd) {
    errors.push(`종료 단계에 도달하지 않는 단계가 있습니다: ${id} ${deadEnd}`);
  }

  const acceptedRouteIds = mission.goal.acceptedRouteIds;
  if (acceptedRouteIds.length === 0) errors.push(`승인 경로가 1개 이상이어야 합니다: ${id}`);
  for (const routeId of acceptedRouteIds) {
    if (!isActualPath(mission, graph, routeId)) {
      errors.push(`승인 경로가 실제 경로가 아닙니다: ${id} ${routeId}`);
    }
  }

  for (const change of mission.conditionChanges) {
    if (change.label.trim().length === 0 || change.description.trim().length === 0) {
      errors.push(`조건 변화 설명이 비어 있습니다: ${id} ${change.id}`);
    }
    if (!Number.isInteger(change.timeTokensDelta)) {
      errors.push(`조건 변화 시간 토큰 변화량이 정수가 아닙니다: ${id} ${change.id}`);
    }
    if (
      (change.kind === "edge" && !edgeIds.has(change.targetId)) ||
      (change.kind === "node" && !nodeIds.has(change.targetId)) ||
      (change.kind === "route" && !isActualPath(mission, graph, change.targetId))
    ) {
      errors.push(`조건 변화 대상을 찾을 수 없습니다: ${id} ${change.id} ${change.targetId}`);
    }
    if (change.kind === "route" && (change.timeTokensDelta !== 0 || change.costTokensDelta !== 0 || change.lossTokensDelta !== 0)) {
      errors.push(`경로 교체 조건 변화는 토큰 변화량을 0으로 두어야 합니다: ${id} ${change.id}`);
    }
  }

  const evidenceKeys = new Set<string>();
  for (const option of mission.evidenceOptions) {
    if (evidenceKeys.has(option.key)) errors.push(`중복된 근거 키가 있습니다: ${id} ${option.key}`);
    evidenceKeys.add(option.key);
    if (option.label.trim().length === 0) errors.push(`근거 문장이 비어 있습니다: ${id} ${option.key}`);
  }

  const dataKeys = new Set<string>();
  for (const option of mission.missingDataOptions) {
    if (dataKeys.has(option.key)) errors.push(`중복된 자료 키가 있습니다: ${id} ${option.key}`);
    dataKeys.add(option.key);
    if (option.label.trim().length === 0) errors.push(`자료 문장이 비어 있습니다: ${id} ${option.key}`);
  }

  const ruleDecisions = new Set<string>();
  for (const rule of mission.decisionRules) {
    if (ruleDecisions.has(rule.decision)) errors.push(`중복된 판단 규칙이 있습니다: ${id} ${rule.decision}`);
    ruleDecisions.add(rule.decision);
    if (rule.label.trim().length === 0) errors.push(`판단 선택지 문장이 비어 있습니다: ${id} ${rule.decision}`);
    for (const key of rule.requiredEvidenceKeys) {
      if (!evidenceKeys.has(key)) {
        errors.push(`필요 근거가 근거 선택지에 없습니다: ${id} ${key}`);
      }
      const option = mission.evidenceOptions.find((candidate) => candidate.key === key);
      if (option?.forbidden) {
        errors.push(`필요 근거에 오개념 근거를 쓸 수 없습니다: ${id} ${key}`);
      }
    }
    if (rule.requiresChangeApplied && mission.conditionChanges.length === 0) {
      errors.push(`조건 변화가 없는 미션에 적용을 요구하는 판단 규칙이 있습니다: ${id} ${rule.decision}`);
    }
  }

  for (const key of mission.requiredDataKeys) {
    if (!dataKeys.has(key)) errors.push(`필요 자료가 자료 선택지에 없습니다: ${id} ${key}`);
  }

  if (mission.requiredDataKeys.length > 0) {
    if (mission.missingDataOptions.length === 0) {
      errors.push(`필요 자료가 있는데 자료 선택지가 없습니다: ${id}`);
    }
    const insufficientRules = mission.decisionRules.filter(
      (rule) => rule.decision === "insufficient-information",
    );
    if (mission.decisionRules.length !== 1 || insufficientRules.length !== 1) {
      errors.push(`필요 자료가 있는 미션은 insufficient-information 규칙 하나만 가질 수 있습니다: ${id}`);
    }
  } else if (mission.decisionRules.some((rule) => rule.decision === "insufficient-information")) {
    errors.push(`필요 자료가 없는데 판단 보류 규칙이 있습니다: ${id}`);
  }

  const canAcceptWithoutChange = mission.decisionRules.some((rule) => !rule.requiresChangeApplied);
  if (
    acceptedRouteIds.length > 0 &&
    !canAcceptWithoutChange &&
    mission.conditionChanges.length === 0
  ) {
    errors.push(`승인 경로에 도달할 판단 규칙이 없습니다: ${id}`);
  }

  return errors;
}

export function validateContent(missions: readonly RouteMission[]): ContentValidationResult {
  const errors: string[] = [];
  if (missions.length !== PLANNED_MISSION_IDS.length) {
    errors.push(`미션은 정확히 ${PLANNED_MISSION_IDS.length}개여야 합니다 (현재 ${missions.length}개)`);
  }
  const seen = new Set<string>();
  for (const mission of missions) {
    if (seen.has(mission.id)) errors.push(`중복된 미션 ID가 있습니다: ${mission.id}`);
    seen.add(mission.id);
  }
  for (const plannedId of PLANNED_MISSION_IDS) {
    if (!missions.some((mission) => mission.id === plannedId)) {
      errors.push(`계획서의 미션이 없습니다: ${plannedId}`);
    }
  }
  for (const mission of missions) {
    errors.push(...validateMission(mission));
  }
  return { valid: errors.length === 0, errors };
}

/** 콘텐츠는 개발·빌드 시 검수기를 통과하지 못하면 즉시 예외로 중단한다. */
export function assertValidContent(missions: readonly RouteMission[]): void {
  const result = validateContent(missions);
  if (!result.valid) {
    throw new Error(`미션 콘텐츠 검수 실패:\n- ${result.errors.join("\n- ")}`);
  }
}
