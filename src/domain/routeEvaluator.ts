import type {
  ConditionChange,
  ConditionChangeResult,
  ConditionDiff,
  RouteDecisionInput,
  RouteEvaluation,
  RouteId,
  RouteMission,
  RouteTotals,
  RouteValidation,
} from "./types";

/**
 * 계획 문서 7.2의 단일 판정 경계.
 * 정오·충족·판단 보류 계산은 이 파일에서만 일어난다.
 * 컴포넌트는 정답 배열을 직접 조회하지 않고 이 모듈의 결과만 렌더링한다.
 * 모든 함수는 readonly 입력을 바꾸지 않는 순수 함수다.
 */

export function routeIdFromNodeIds(nodeIds: readonly string[]): RouteId {
  return nodeIds.join(">");
}

export function routeNodeIds(routeId: RouteId): readonly string[] {
  return routeId.length === 0 ? [] : routeId.split(">");
}

function findStartId(mission: RouteMission): string | null {
  const hasIncoming = new Set(mission.edges.map((edge) => edge.toId));
  const starts = mission.nodes.filter((node) => !hasIncoming.has(node.id));
  return starts.length === 1 ? starts[0].id : null;
}

function findEndId(mission: RouteMission): string | null {
  const hasOutgoing = new Set(mission.edges.map((edge) => edge.fromId));
  const ends = mission.nodes.filter((node) => !hasOutgoing.has(node.id));
  return ends.length === 1 ? ends[0].id : null;
}

function findEdge(mission: RouteMission, fromId: string, toId: string) {
  return mission.edges.find((edge) => edge.fromId === fromId && edge.toId === toId);
}

export function validateRoute(
  mission: RouteMission,
  nodeIds: readonly string[],
): RouteValidation {
  const reasons = new Set<string>();
  if (nodeIds.length < 2) {
    reasons.add("route-too-short");
  }
  const known = new Set(mission.nodes.map((node) => node.id));
  for (const id of nodeIds) {
    if (!known.has(id)) reasons.add("route-has-unknown-stage");
  }
  if (new Set(nodeIds).size !== nodeIds.length) {
    reasons.add("route-has-repeated-stage");
  }
  const startId = findStartId(mission);
  const endId = findEndId(mission);
  if (startId !== null && nodeIds[0] !== undefined && nodeIds[0] !== startId) {
    reasons.add("route-must-start-with-first-stage");
  }
  const lastId = nodeIds[nodeIds.length - 1];
  if (endId !== null && nodeIds.length >= 2 && lastId !== endId) {
    reasons.add("route-must-end-with-last-stage");
  }
  for (let index = 0; index + 1 < nodeIds.length; index += 1) {
    if (!findEdge(mission, nodeIds[index], nodeIds[index + 1])) {
      reasons.add("route-not-connected");
      break;
    }
  }
  const reasonKeys = [...reasons];
  return { valid: reasonKeys.length === 0, reasonKeys };
}

function addToken(sum: number | null, value: number | null): number | null {
  if (sum === null || value === null) return null;
  return sum + value;
}

function sumPath(mission: RouteMission, nodeIds: readonly string[]): RouteTotals {
  const nodeById = new Map(mission.nodes.map((node) => [node.id, node]));
  let time = 0;
  let cost: number | null = 0;
  let loss: number | null = 0;
  nodeIds.forEach((nodeId, index) => {
    const node = nodeById.get(nodeId);
    if (!node) return; // 모르는 단계는 validateRoute가 보고한다. 합계가 임의 값을 만들지 않는다.
    time += node.timeTokens;
    cost = addToken(cost, node.costTokens);
    loss = addToken(loss, node.lossTokens);
    const nextId = nodeIds[index + 1];
    if (nextId !== undefined) {
      const edge = findEdge(mission, nodeId, nextId);
      if (edge) {
        time += edge.timeTokens;
        cost = addToken(cost, edge.costTokens);
        loss = addToken(loss, edge.lossTokens);
      }
    }
  });
  return { timeTokens: time, costTokens: cost, lossTokens: loss };
}

export function computeTotals(
  mission: RouteMission,
  nodeIds: readonly string[],
  appliedChangeId: string | null = null,
): RouteTotals {
  const base = sumPath(mission, nodeIds);
  if (appliedChangeId === null) return base;
  const change = mission.conditionChanges.find((candidate) => candidate.id === appliedChangeId);
  if (!change) {
    throw new Error(`알 수 없는 조건 변화: ${appliedChangeId}`);
  }
  if (change.kind === "route") {
    return sumPath(mission, routeNodeIds(change.targetId));
  }
  const target =
    change.kind === "edge"
      ? mission.edges.find((edge) => edge.id === change.targetId)
      : mission.nodes.find((node) => node.id === change.targetId);
  if (!target) {
    throw new Error(`조건 변화 대상을 찾을 수 없습니다: ${change.targetId}`);
  }
  return {
    timeTokens: base.timeTokens + change.timeTokensDelta,
    costTokens:
      base.costTokens === null
        ? null
        : change.costTokensDelta === null
          ? null
          : base.costTokens + change.costTokensDelta,
    lossTokens:
      base.lossTokens === null
        ? null
        : change.lossTokensDelta === null
          ? null
          : base.lossTokens + change.lossTokensDelta,
  };
}

function diffTotals(before: RouteTotals, after: RouteTotals): ConditionDiff {
  const diffNumber = (a: number | null, b: number | null) =>
    a === null || b === null ? null : b - a;
  return {
    timeTokens: diffNumber(before.timeTokens, after.timeTokens),
    costTokens: diffNumber(before.costTokens, after.costTokens),
    lossTokens: diffNumber(before.lossTokens, after.lossTokens),
  };
}

export function findConditionChange(
  mission: RouteMission,
  changeId: string,
): ConditionChange | undefined {
  return mission.conditionChanges.find((candidate) => candidate.id === changeId);
}

export function applyConditionChange(
  mission: RouteMission,
  changeId: string,
  baselineRouteId: RouteId,
): ConditionChangeResult {
  const change = findConditionChange(mission, changeId);
  if (!change) {
    throw new Error(`알 수 없는 조건 변화: ${changeId}`);
  }
  const afterRouteId = change.kind === "route" ? change.targetId : baselineRouteId;
  const beforeTotals = computeTotals(mission, routeNodeIds(baselineRouteId), null);
  const afterTotals = computeTotals(
    mission,
    routeNodeIds(afterRouteId),
    change.kind === "route" ? null : changeId,
  );
  return {
    changeId,
    beforeRouteId: baselineRouteId,
    afterRouteId,
    beforeTotals,
    afterTotals,
    diff: diffTotals(beforeTotals, afterTotals),
  };
}

function compareKey(
  name: string,
  mine: number | null,
  other: number | null,
  otherRouteId: RouteId,
): string {
  if (mine === null || other === null) return `${name}-unknown-vs-${otherRouteId}`;
  if (mine < other) return `${name}-less-vs-${otherRouteId}`;
  if (mine > other) return `${name}-more-vs-${otherRouteId}`;
  return `${name}-same-vs-${otherRouteId}`;
}

export function computeTradeoffKeys(mission: RouteMission, routeId: RouteId): readonly string[] {
  const keys: string[] = [];
  for (const otherRouteId of mission.goal.acceptedRouteIds) {
    if (otherRouteId === routeId) continue;
    const mine = computeTotals(mission, routeNodeIds(routeId));
    const other = computeTotals(mission, routeNodeIds(otherRouteId));
    keys.push(compareKey("time", mine.timeTokens, other.timeTokens, otherRouteId));
    keys.push(compareKey("cost", mine.costTokens, other.costTokens, otherRouteId));
    keys.push(compareKey("loss", mine.lossTokens, other.lossTokens, otherRouteId));
  }
  return keys;
}

/**
 * UI용 선택지 조회 도우미. 정답 규칙(requiredEvidenceKeys, forbidden)을 노출하지 않는다.
 */
export function listEvidenceChoices(mission: RouteMission): readonly { key: string; label: string }[] {
  return mission.evidenceOptions.map((option) => ({ key: option.key, label: option.label }));
}

export function listMissingDataChoices(
  mission: RouteMission,
): readonly { key: string; label: string }[] {
  return mission.missingDataOptions.map((option) => ({ key: option.key, label: option.label }));
}

export function listDecisionOptions(
  mission: RouteMission,
): readonly { decision: RouteDecisionInput["decision"]; label: string }[] {
  return mission.decisionRules.map((rule) => ({ decision: rule.decision, label: rule.label }));
}

export function evaluateRouteDecision(
  mission: RouteMission,
  input: RouteDecisionInput,
): RouteEvaluation {
  const selectedEvidenceKeys = [...input.selectedEvidenceKeys];
  const change =
    input.appliedChangeId === null ? null : (findConditionChange(mission, input.appliedChangeId) ?? null);
  const unknownChange = input.appliedChangeId !== null && change === null;
  const finalRouteId = change !== null && change.kind === "route" ? change.targetId : input.routeId;
  const validation = validateRoute(mission, routeNodeIds(finalRouteId));
  const totals = computeTotals(
    mission,
    routeNodeIds(finalRouteId),
    change !== null && change.kind !== "route" ? change.id : null,
  );

  let accepted = validation.valid && !unknownChange;
  if (!mission.goal.acceptedRouteIds.includes(finalRouteId)) {
    accepted = false;
  }

  if (mission.requiredDataKeys.length > 0) {
    const sortedSelected = [...input.selectedDataKeys].sort();
    const sortedRequired = [...mission.requiredDataKeys].sort();
    if (
      input.decision !== "insufficient-information" ||
      sortedSelected.join("|") !== sortedRequired.join("|")
    ) {
      accepted = false;
    }
  }

  const rule = mission.decisionRules.find((candidate) => candidate.decision === input.decision);
  if (!rule) {
    accepted = false;
  } else {
    if (rule.requiresChangeApplied && change === null) accepted = false;
    for (const key of rule.requiredEvidenceKeys) {
      if (!selectedEvidenceKeys.includes(key)) accepted = false;
    }
  }

  for (const key of selectedEvidenceKeys) {
    const option = mission.evidenceOptions.find((candidate) => candidate.key === key);
    if (option?.forbidden) accepted = false;
  }

  return {
    accepted,
    decision: input.decision,
    totals,
    tradeoffKeys: computeTradeoffKeys(mission, finalRouteId),
    evidenceKeys: selectedEvidenceKeys,
  };
}
