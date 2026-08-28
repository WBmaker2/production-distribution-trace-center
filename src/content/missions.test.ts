import { describe, expect, it } from "vitest";
import type { RouteId, RouteMission, RouteTotals } from "../domain/types";
import { missions } from "./missions";
import { validateContent } from "./validateContent";

const PLANNED_MISSION_IDS = [
  "route-strawberry-01",
  "route-notebook-02",
  "route-delay-03",
  "route-package-04",
  "route-store-05",
  "route-missing-06",
] as const;

function findMission(id: string): RouteMission {
  const mission = missions.find((candidate) => candidate.id === id);
  if (!mission) {
    throw new Error(`미션을 찾을 수 없습니다: ${id}`);
  }
  return mission;
}

function routeTotals(mission: RouteMission, routeId: RouteId): RouteTotals {
  const nodeIds = routeId.split(">");
  const nodeById = new Map(mission.nodes.map((node) => [node.id, node]));
  const edgeByKey = new Map(mission.edges.map((edge) => [`${edge.fromId}>${edge.toId}`, edge]));
  const totals = {
    timeTokens: 0,
    costTokens: 0 as number | null,
    lossTokens: 0 as number | null,
  };
  const add = (time: number, cost: number | null, loss: number | null) => {
    totals.timeTokens += time;
    totals.costTokens = totals.costTokens === null || cost === null ? null : totals.costTokens + cost;
    totals.lossTokens = totals.lossTokens === null || loss === null ? null : totals.lossTokens + loss;
  };
  nodeIds.forEach((nodeId, index) => {
    const node = nodeById.get(nodeId);
    if (!node) {
      throw new Error(`알 수 없는 단계: ${nodeId}`);
    }
    add(node.timeTokens, node.costTokens, node.lossTokens);
    const nextId = nodeIds[index + 1];
    if (nextId !== undefined) {
      const edge = edgeByKey.get(`${nodeId}>${nextId}`);
      if (!edge) {
        throw new Error(`연결선이 없습니다: ${nodeId}>${nextId}`);
      }
      add(edge.timeTokens, edge.costTokens, edge.lossTokens);
    }
  });
  return totals;
}

function expectTotals(actual: RouteTotals, time: number, cost: number | null, loss: number | null) {
  expect(actual).toEqual({ timeTokens: time, costTokens: cost, lossTokens: loss });
}

describe("고정 미션 콘텐츠", () => {
  it("정확히 6개 미션을 계획서 순서대로 제공한다", () => {
    expect(missions.map((mission) => mission.id)).toEqual([...PLANNED_MISSION_IDS]);
  });

  it("모든 미션이 검수 메타데이터와 아이용 문장을 가진다", () => {
    for (const mission of missions) {
      expect(mission.reviewStatus).toBe("approved");
      expect(mission.sourceNote.length).toBeGreaterThan(0);
      expect(mission.misconceptionGuard.length).toBeGreaterThan(0);
      expect(mission.title.length).toBeGreaterThan(0);
      expect(mission.scene.length).toBeGreaterThan(0);
      expect(mission.goal.statement.length).toBeGreaterThan(0);
    }
  });

  it("콘텐츠 전체가 검수기를 통과한다", () => {
    const result = validateContent(missions);
    expect(result.errors).toEqual([]);
    expect(result.valid).toBe(true);
  });

  it("route-strawberry-01의 승인 경로 합계는 (5,4,3)이다", () => {
    const mission = findMission("route-strawberry-01");
    expect(mission.goal.acceptedRouteIds).toEqual(["farm>sort>truck>store"]);
    expectTotals(routeTotals(mission, "farm>sort>truck>store"), 5, 4, 3);
  });

  it("route-notebook-02의 두 창고 경로 합계는 (5,4,1)과 (6,3,2)이고 둘 다 승인이다", () => {
    const mission = findMission("route-notebook-02");
    expect(mission.goal.acceptedRouteIds).toEqual([
      "raw-paper>factory>warehouse-a>stationery",
      "raw-paper>factory>warehouse-b>stationery",
    ]);
    expectTotals(routeTotals(mission, "raw-paper>factory>warehouse-a>stationery"), 5, 4, 1);
    expectTotals(routeTotals(mission, "raw-paper>factory>warehouse-b>stationery"), 6, 3, 2);
  });

  it("route-delay-03의 기준 합계는 (4,null,1)이고 bridge-check 조건은 time +3이다", () => {
    const mission = findMission("route-delay-03");
    expectTotals(routeTotals(mission, "producer>truck>shop"), 4, null, 1);
    const truck = mission.nodes.find((node) => node.id === "truck");
    expect(truck?.costTokens).toBeNull();
    const change = mission.conditionChanges.find((candidate) => candidate.id === "bridge-check");
    expect(change?.kind).toBe("edge");
    expect(change?.targetId).toBe("edge-bridge");
    expect(change?.timeTokensDelta).toBe(3);
    const changed = routeTotals(mission, "producer>truck>shop");
    expectTotals({ ...changed, timeTokens: changed.timeTokens + 3 }, 7, null, 1);
  });

  it("route-package-04의 두 포장 경로 합계는 (5,4,2)와 (7,6,0)이다", () => {
    const mission = findMission("route-package-04");
    expectTotals(routeTotals(mission, "producer>package-large>truck-once>store"), 5, 4, 2);
    expectTotals(routeTotals(mission, "producer>package-small>truck-twice>store"), 7, 6, 0);
    expect(mission.goal.acceptedRouteIds).toContain("producer>package-small>truck-twice>store");
  });

  it("route-store-05의 두 판매 경로 합계는 (4,5,1)과 (6,3,2)이고 둘 다 승인이다", () => {
    const mission = findMission("route-store-05");
    expect(mission.goal.acceptedRouteIds).toEqual([
      "producer>transport-near>store>buyer",
      "producer>transport-far>market>buyer",
    ]);
    expectTotals(routeTotals(mission, "producer>transport-near>store>buyer"), 4, 5, 1);
    expectTotals(routeTotals(mission, "producer>transport-far>market>buyer"), 6, 3, 2);
  });

  it("route-missing-06의 합계는 (6,null,2)이고 필요 자료는 운송비뿐이다", () => {
    const mission = findMission("route-missing-06");
    expectTotals(routeTotals(mission, "producer>transport>store"), 6, null, 2);
    expect(mission.requiredDataKeys).toEqual(["transport-cost"]);
    expect(mission.decisionRules.map((rule) => rule.decision)).toEqual(["insufficient-information"]);
  });

  it("필요 근거와 필요 자료는 실제 선택지에 있어야 한다", () => {
    for (const mission of missions) {
      const evidenceKeys = new Set(mission.evidenceOptions.map((option) => option.key));
      const dataKeys = new Set(mission.missingDataOptions.map((option) => option.key));
      for (const rule of mission.decisionRules) {
        for (const key of rule.requiredEvidenceKeys) {
          expect(evidenceKeys.has(key)).toBe(true);
        }
      }
      for (const key of mission.requiredDataKeys) {
        expect(dataKeys.has(key)).toBe(true);
      }
    }
  });
});
