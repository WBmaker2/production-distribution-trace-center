import { describe, expect, it } from "vitest";
import { missions } from "../content/missions";
import type { RouteDecisionInput, RouteMission } from "./types";
import {
  applyConditionChange,
  computeTotals,
  evaluateRouteDecision,
  routeIdFromNodeIds,
  routeNodeIds,
  validateRoute,
} from "./routeEvaluator";

function missionById(id: string): RouteMission {
  const mission = missions.find((candidate) => candidate.id === id);
  if (!mission) throw new Error(`미션을 찾을 수 없습니다: ${id}`);
  return mission;
}

const STRAWBERRY = missionById("route-strawberry-01");
const NOTEBOOK = missionById("route-notebook-02");
const DELAY = missionById("route-delay-03");
const PACKAGE = missionById("route-package-04");
const STORE = missionById("route-store-05");
const MISSING = missionById("route-missing-06");

const STRAWBERRY_ROUTE = "farm>sort>truck>store";
const NOTEBOOK_A = "raw-paper>factory>warehouse-a>stationery";
const NOTEBOOK_B = "raw-paper>factory>warehouse-b>stationery";
const DELAY_ROUTE = "producer>truck>shop";
const PACKAGE_LARGE = "producer>package-large>truck-once>store";
const PACKAGE_SMALL = "producer>package-small>truck-twice>store";
const STORE_NEAR = "producer>transport-near>store>buyer";
const STORE_FAR = "producer>transport-far>market>buyer";
const MISSING_ROUTE = "producer>transport>store";

function deepFreeze<T>(value: T): T {
  if (value !== null && typeof value === "object") {
    Object.values(value as Record<string, unknown>).forEach(deepFreeze);
    Object.freeze(value);
  }
  return value;
}

describe("validateRoute — 연결 검사", () => {
  const chained = {
    ...STRAWBERRY,
    nodes: STRAWBERRY.nodes,
    edges: STRAWBERRY.edges,
  } as RouteMission;

  it("정상 연결 경로는 통과한다", () => {
    const result = validateRoute(chained, routeNodeIds(STRAWBERRY_ROUTE));
    expect(result.valid).toBe(true);
    expect(result.reasonKeys).toEqual([]);
  });

  it("연결이 끊긴 경로는 거부한다", () => {
    const result = validateRoute(chained, ["farm", "store"]);
    expect(result.valid).toBe(false);
    expect(result.reasonKeys).toContain("route-not-connected");
  });

  it("같은 단계를 두 번 지나면 거부한다", () => {
    const result = validateRoute(chained, ["farm", "sort", "sort", "truck"]);
    expect(result.valid).toBe(false);
    expect(result.reasonKeys).toContain("route-has-repeated-stage");
  });

  it("시작 단계로 시작하지 않으면 거부한다", () => {
    const result = validateRoute(chained, ["sort", "truck", "store"]);
    expect(result.valid).toBe(false);
    expect(result.reasonKeys).toContain("route-must-start-with-first-stage");
  });

  it("모르는 단계가 있으면 거부한다", () => {
    const result = validateRoute(chained, ["farm", "ghost", "store"]);
    expect(result.valid).toBe(false);
    expect(result.reasonKeys).toContain("route-has-unknown-stage");
  });

  it("경로 ID는 노드 ID를 이어 만든다", () => {
    expect(routeIdFromNodeIds(["farm", "sort"])).toBe("farm>sort");
  });
});

describe("computeTotals — 토큰 합계와 null 전파", () => {
  it("여섯 미션의 승인 경로 합계를 재현한다", () => {
    expect(computeTotals(STRAWBERRY, routeNodeIds(STRAWBERRY_ROUTE))).toEqual({
      timeTokens: 5,
      costTokens: 4,
      lossTokens: 3,
    });
    expect(computeTotals(NOTEBOOK, routeNodeIds(NOTEBOOK_A))).toEqual({
      timeTokens: 5,
      costTokens: 4,
      lossTokens: 1,
    });
    expect(computeTotals(DELAY, routeNodeIds(DELAY_ROUTE))).toEqual({
      timeTokens: 4,
      costTokens: null,
      lossTokens: 1,
    });
    expect(computeTotals(PACKAGE, routeNodeIds(PACKAGE_LARGE))).toEqual({
      timeTokens: 5,
      costTokens: 4,
      lossTokens: 2,
    });
    expect(computeTotals(STORE, routeNodeIds(STORE_NEAR))).toEqual({
      timeTokens: 4,
      costTokens: 5,
      lossTokens: 1,
    });
    expect(computeTotals(MISSING, routeNodeIds(MISSING_ROUTE))).toEqual({
      timeTokens: 6,
      costTokens: null,
      lossTokens: 2,
    });
  });

  it("알 수 없는 비용을 0으로 바꾸지 않고 null로 전파한다", () => {
    const totals = computeTotals(DELAY, routeNodeIds(DELAY_ROUTE), "bridge-check");
    expect(totals.costTokens).toBeNull();
    expect(totals.timeTokens).toBe(7);
  });
});

describe("applyConditionChange — 조건 전파 diff", () => {
  it("다리 점검은 시간만 +3으로 바꾸고 비용은 자료 없음으로 유지한다", () => {
    const result = applyConditionChange(DELAY, "bridge-check", DELAY_ROUTE);
    expect(result.beforeTotals).toEqual({ timeTokens: 4, costTokens: null, lossTokens: 1 });
    expect(result.afterTotals).toEqual({ timeTokens: 7, costTokens: null, lossTokens: 1 });
    expect(result.diff).toEqual({ timeTokens: 3, costTokens: null, lossTokens: 0 });
  });

  it("작은 포장으로 바꾸면 (5,4,2) → (7,6,0)이 된다", () => {
    const result = applyConditionChange(PACKAGE, "switch-small-pack", PACKAGE_LARGE);
    expect(result.beforeTotals).toEqual({ timeTokens: 5, costTokens: 4, lossTokens: 2 });
    expect(result.afterTotals).toEqual({ timeTokens: 7, costTokens: 6, lossTokens: 0 });
    expect(result.diff).toEqual({ timeTokens: 2, costTokens: 2, lossTokens: -2 });
  });

  it("큰 포장으로 바꾸면 (7,6,0) → (5,4,2)이 된다", () => {
    const result = applyConditionChange(PACKAGE, "switch-large-pack", PACKAGE_SMALL);
    expect(result.afterTotals).toEqual({ timeTokens: 5, costTokens: 4, lossTokens: 2 });
    expect(result.diff).toEqual({ timeTokens: -2, costTokens: -2, lossTokens: 2 });
  });

  it("먼 시장으로 바꾸면 (4,5,1) → (6,3,2)이 된다", () => {
    const result = applyConditionChange(STORE, "switch-far-market", STORE_NEAR);
    expect(result.afterTotals).toEqual({ timeTokens: 6, costTokens: 3, lossTokens: 2 });
    expect(result.diff).toEqual({ timeTokens: 2, costTokens: -2, lossTokens: 1 });
  });

  it("근처 상점으로 바꾸면 (6,3,2) → (4,5,1)이 된다", () => {
    const result = applyConditionChange(STORE, "switch-near-store", STORE_FAR);
    expect(result.afterTotals).toEqual({ timeTokens: 4, costTokens: 5, lossTokens: 1 });
    expect(result.diff).toEqual({ timeTokens: -2, costTokens: 2, lossTokens: -1 });
  });

  it("모르는 조건 변화 ID는 예외로 중단한다", () => {
    expect(() => applyConditionChange(DELAY, "ghost-change", DELAY_ROUTE)).toThrow();
  });
});

describe("evaluateRouteDecision — 여섯 미션 정상 판정", () => {
  it("딸기 미션: 순서 근거와 함께 경로를 결정하면 통과한다", () => {
    const input: RouteDecisionInput = {
      decision: "choose-route",
      routeId: STRAWBERRY_ROUTE,
      appliedChangeId: null,
      selectedEvidenceKeys: ["stage-order-reason"],
      selectedDataKeys: [],
    };
    const result = evaluateRouteDecision(STRAWBERRY, input);
    expect(result.accepted).toBe(true);
    expect(result.totals).toEqual({ timeTokens: 5, costTokens: 4, lossTokens: 3 });
    expect(result.evidenceKeys).toEqual(["stage-order-reason"]);
    expect(result.tradeoffKeys).toEqual([]);
  });

  it("공책 미션: 창고 A 경로도 절충 근거와 함께 통과한다", () => {
    const input: RouteDecisionInput = {
      decision: "choose-route",
      routeId: NOTEBOOK_A,
      appliedChangeId: null,
      selectedEvidenceKeys: ["warehouse-tradeoff"],
      selectedDataKeys: [],
    };
    const result = evaluateRouteDecision(NOTEBOOK, input);
    expect(result.accepted).toBe(true);
    expect(result.totals).toEqual({ timeTokens: 5, costTokens: 4, lossTokens: 1 });
    expect(result.tradeoffKeys).toContain(`time-less-vs-${NOTEBOOK_B}`);
    expect(result.tradeoffKeys).toContain(`cost-more-vs-${NOTEBOOK_B}`);
    expect(result.tradeoffKeys).toContain(`loss-less-vs-${NOTEBOOK_B}`);
  });

  it("지연 미션: 조건 적용과 두 근거로 유지 판단이 통과한다", () => {
    const input: RouteDecisionInput = {
      decision: "keep-route",
      routeId: DELAY_ROUTE,
      appliedChangeId: "bridge-check",
      selectedEvidenceKeys: ["time-propagates", "cost-still-unknown"],
      selectedDataKeys: [],
    };
    const result = evaluateRouteDecision(DELAY, input);
    expect(result.accepted).toBe(true);
    expect(result.totals).toEqual({ timeTokens: 7, costTokens: null, lossTokens: 1 });
  });

  it("포장 미션: 장단점 둘 다 기록하면 작은 포장 경로가 통과한다", () => {
    const input: RouteDecisionInput = {
      decision: "keep-route",
      routeId: PACKAGE_SMALL,
      appliedChangeId: "switch-small-pack",
      selectedEvidenceKeys: ["loss-goes-down", "time-cost-go-up"],
      selectedDataKeys: [],
    };
    const result = evaluateRouteDecision(PACKAGE, input);
    expect(result.accepted).toBe(true);
    expect(result.totals).toEqual({ timeTokens: 7, costTokens: 6, lossTokens: 0 });
  });

  it("판매지 미션: 절충 근거 둘 다로 먼 시장 경로가 통과한다", () => {
    const input: RouteDecisionInput = {
      decision: "keep-route",
      routeId: STORE_FAR,
      appliedChangeId: "switch-far-market",
      selectedEvidenceKeys: ["near-wins-time-loss", "far-wins-cost"],
      selectedDataKeys: [],
    };
    const result = evaluateRouteDecision(STORE, input);
    expect(result.accepted).toBe(true);
    expect(result.totals).toEqual({ timeTokens: 6, costTokens: 3, lossTokens: 2 });
  });

  it("정보 부족 미션: 판단 보류와 운송비 자료 요청만 통과한다", () => {
    const input: RouteDecisionInput = {
      decision: "insufficient-information",
      routeId: MISSING_ROUTE,
      appliedChangeId: null,
      selectedEvidenceKeys: [],
      selectedDataKeys: ["transport-cost"],
    };
    const result = evaluateRouteDecision(MISSING, input);
    expect(result.accepted).toBe(true);
    expect(result.decision).toBe("insufficient-information");
    expect(result.totals).toEqual({ timeTokens: 6, costTokens: null, lossTokens: 2 });
  });
});

describe("evaluateRouteDecision — 잘못된 입력과 복수 해법", () => {
  it("공책 미션의 두 창고 경로가 모두 통과한다 (복수 해법 1/2)", () => {
    const input: RouteDecisionInput = {
      decision: "choose-route",
      routeId: NOTEBOOK_B,
      appliedChangeId: null,
      selectedEvidenceKeys: ["warehouse-tradeoff"],
      selectedDataKeys: [],
    };
    expect(evaluateRouteDecision(NOTEBOOK, input).accepted).toBe(true);
  });

  it("판매지 미션의 두 경로가 모두 통과한다 (복수 해법 2/2)", () => {
    for (const routeId of [STORE_NEAR, STORE_FAR]) {
      const input: RouteDecisionInput = {
        decision: "keep-route",
        routeId,
        appliedChangeId: null,
        selectedEvidenceKeys: ["near-wins-time-loss", "far-wins-cost"],
        selectedDataKeys: [],
      };
      expect(evaluateRouteDecision(STORE, input).accepted).toBe(true);
    }
  });

  it("포장 미션에서 승인되지 않은 큰 포장 경로는 근거가 있어도 거부된다", () => {
    const input: RouteDecisionInput = {
      decision: "keep-route",
      routeId: PACKAGE_LARGE,
      appliedChangeId: null,
      selectedEvidenceKeys: ["loss-goes-down", "time-cost-go-up"],
      selectedDataKeys: [],
    };
    const result = evaluateRouteDecision(PACKAGE, input);
    expect(result.accepted).toBe(false);
  });

  it("끊긴 경로로 판단하면 거부된다", () => {
    const input: RouteDecisionInput = {
      decision: "choose-route",
      routeId: "farm>store",
      appliedChangeId: null,
      selectedEvidenceKeys: ["stage-order-reason"],
      selectedDataKeys: [],
    };
    expect(evaluateRouteDecision(STRAWBERRY, input).accepted).toBe(false);
  });

  it("지연 미션에서 조건을 적용하지 않은 유지 판단은 거부된다", () => {
    const input: RouteDecisionInput = {
      decision: "keep-route",
      routeId: DELAY_ROUTE,
      appliedChangeId: null,
      selectedEvidenceKeys: ["time-propagates", "cost-still-unknown"],
      selectedDataKeys: [],
    };
    expect(evaluateRouteDecision(DELAY, input).accepted).toBe(false);
  });

  it("필요 근거를 빠뜨리면 거부된다", () => {
    const input: RouteDecisionInput = {
      decision: "keep-route",
      routeId: DELAY_ROUTE,
      appliedChangeId: "bridge-check",
      selectedEvidenceKeys: ["time-propagates"],
      selectedDataKeys: [],
    };
    expect(evaluateRouteDecision(DELAY, input).accepted).toBe(false);
  });

  it("오개념 근거를 고르면 거부된다", () => {
    const input: RouteDecisionInput = {
      decision: "keep-route",
      routeId: DELAY_ROUTE,
      appliedChangeId: "bridge-check",
      selectedEvidenceKeys: ["time-propagates", "cost-still-unknown", "cost-becomes-zero"],
      selectedDataKeys: [],
    };
    expect(evaluateRouteDecision(DELAY, input).accepted).toBe(false);
  });

  it("정보 부족 미션에서 다른 자료를 고르면 거부된다", () => {
    const input: RouteDecisionInput = {
      decision: "insufficient-information",
      routeId: MISSING_ROUTE,
      appliedChangeId: null,
      selectedEvidenceKeys: [],
      selectedDataKeys: ["production-count"],
    };
    expect(evaluateRouteDecision(MISSING, input).accepted).toBe(false);
  });

  it("정보 부족 미션에서 자료를 덜 고르거나 더 골라도 거부된다", () => {
    const fewer: RouteDecisionInput = {
      decision: "insufficient-information",
      routeId: MISSING_ROUTE,
      appliedChangeId: null,
      selectedEvidenceKeys: [],
      selectedDataKeys: [],
    };
    const extra: RouteDecisionInput = {
      decision: "insufficient-information",
      routeId: MISSING_ROUTE,
      appliedChangeId: null,
      selectedEvidenceKeys: [],
      selectedDataKeys: ["transport-cost", "weather-note"],
    };
    expect(evaluateRouteDecision(MISSING, fewer).accepted).toBe(false);
    expect(evaluateRouteDecision(MISSING, extra).accepted).toBe(false);
  });

  it("정보 부족 미션에서 경로를 확정하는 판단은 거부되고 비용은 null로 남는다", () => {
    const input: RouteDecisionInput = {
      decision: "choose-route",
      routeId: MISSING_ROUTE,
      appliedChangeId: null,
      selectedEvidenceKeys: [],
      selectedDataKeys: ["transport-cost"],
    };
    const result = evaluateRouteDecision(MISSING, input);
    expect(result.accepted).toBe(false);
    expect(result.totals.costTokens).toBeNull();
  });

  it("readonly로 고정된 입력을 바꾸지 않고 판정한다", () => {
    const frozenMission = deepFreeze(missions);
    const frozenInput: RouteDecisionInput = deepFreeze({
      decision: "keep-route",
      routeId: PACKAGE_SMALL,
      appliedChangeId: "switch-small-pack",
      selectedEvidenceKeys: ["loss-goes-down", "time-cost-go-up"],
      selectedDataKeys: [],
    });
    const result = evaluateRouteDecision(
      frozenMission.find((mission) => mission.id === "route-package-04") as RouteMission,
      frozenInput,
    );
    expect(result.accepted).toBe(true);
  });
});
