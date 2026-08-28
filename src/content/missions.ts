import type { RouteMission } from "../domain/types";
import { assertValidContent } from "./validateContent";

/**
 * 계획 문서 4·4.1의 검수된 고정 미션 6개.
 * 미션 ID·노드 토큰·승인 경로는 계획 문서 fixture와 동일하며, 런타임 무작위 생성은 없다.
 * 토큰 (timeTokens, costTokens, lossTokens)은 비교 학습용 가상 단위이며
 * 실제 가격·시간·환경 영향을 나타내지 않는다.
 */
export const missions: readonly RouteMission[] = [
  {
    id: "route-strawberry-01",
    title: "별빛 딸기 상자",
    scene: "가상의 별빛 농원에서 딸기를 수확했어요. 딸기 상자가 가게에 도착하기까지 어떤 일이 차례로 일어나는지 살펴보아요.",
    nodes: [
      { id: "farm", kind: "production", label: "별빛 농원에서 딸기를 수확해요", timeTokens: 1, costTokens: 1, lossTokens: 1 },
      { id: "sort", kind: "processing", label: "상태가 좋은 딸기를 골라 상자에 담아요", timeTokens: 1, costTokens: 1, lossTokens: 0 },
      { id: "truck", kind: "transport", label: "트럭으로 가게까지 실어 나르세요", timeTokens: 2, costTokens: 2, lossTokens: 1 },
      { id: "store", kind: "sale", label: "가게 진열대에 놓고 팔아요", timeTokens: 1, costTokens: 0, lossTokens: 1 },
    ],
    edges: [
      { id: "edge-farm-sort", fromId: "farm", toId: "sort", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-sort-truck", fromId: "sort", toId: "truck", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-truck-store", fromId: "truck", toId: "store", timeTokens: 0, costTokens: 0, lossTokens: 0 },
    ],
    goal: {
      id: "goal-strawberry-01",
      priority: "balanced",
      statement: "생산부터 판매까지 일의 차례를 바로 세워 보아요.",
      acceptedRouteIds: ["farm>sort>truck>store"],
    },
    conditionChanges: [],
    decisionRules: [
      {
        decision: "choose-route",
        label: "이 순서로 경로를 결정할게요",
        requiresChangeApplied: false,
        requiredEvidenceKeys: ["stage-order-reason"],
      },
    ],
    evidenceOptions: [
      { key: "stage-order-reason", label: "생산한 다음에 골라 담고, 운송하고, 마지막에 팔아요", forbidden: false },
      { key: "shorter-is-always-better", label: "단계 수가 가장 적은 길이면 무조건 좋아요", forbidden: true },
    ],
    missingDataOptions: [],
    requiredDataKeys: [],
    sourceNote: "구현 계획 문서 4.1 고정 경로 fixture (route-strawberry-01), 2026-08-28",
    reviewStatus: "approved",
    misconceptionGuard: "짧은 경로가 항상 더 좋다는 단정을 하지 않도록 안내한다.",
  },
  {
    id: "route-notebook-02",
    title: "재생 종이 공책",
    scene: "재생 종이로 만든 공책이 문구점에 도착해요. 두 개의 창고 경로 중 하나를 골라 연결해 보아요.",
    nodes: [
      { id: "raw-paper", kind: "production", label: "재생 종이 원료를 모아요", timeTokens: 1, costTokens: 0, lossTokens: 0 },
      { id: "factory", kind: "processing", label: "공장에서 공책을 만들어요", timeTokens: 2, costTokens: 2, lossTokens: 1 },
      { id: "warehouse-a", kind: "storage", label: "창고 A에 하루 동안 쌓아요", timeTokens: 1, costTokens: 1, lossTokens: 0 },
      { id: "warehouse-b", kind: "storage", label: "창고 B에 저렴하게 오래 쌓아요", timeTokens: 2, costTokens: 0, lossTokens: 1 },
      { id: "stationery", kind: "sale", label: "문구점 진열대에 놓아요", timeTokens: 1, costTokens: 1, lossTokens: 0 },
    ],
    edges: [
      { id: "edge-raw-factory", fromId: "raw-paper", toId: "factory", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-factory-warehouse-a", fromId: "factory", toId: "warehouse-a", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-factory-warehouse-b", fromId: "factory", toId: "warehouse-b", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-warehouse-a-stationery", fromId: "warehouse-a", toId: "stationery", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-warehouse-b-stationery", fromId: "warehouse-b", toId: "stationery", timeTokens: 0, costTokens: 0, lossTokens: 0 },
    ],
    goal: {
      id: "goal-notebook-02",
      priority: "balanced",
      statement: "두 창고 경로는 서로 다른 장단점이 있어요. 목표에 맞게 골라 근거를 대 보아요.",
      acceptedRouteIds: [
        "raw-paper>factory>warehouse-a>stationery",
        "raw-paper>factory>warehouse-b>stationery",
      ],
    },
    conditionChanges: [],
    decisionRules: [
      {
        decision: "choose-route",
        label: "고른 창고 경로로 결정할게요",
        requiresChangeApplied: false,
        requiredEvidenceKeys: ["warehouse-tradeoff"],
      },
    ],
    evidenceOptions: [
      { key: "warehouse-tradeoff", label: "창고 A는 시간·잃음 토큰이 적고, 창고 B는 비용 토큰이 적어요", forbidden: false },
      { key: "cheapest-is-best", label: "비용 토큰이 가장 적은 경로가 무조건 좋아요", forbidden: true },
    ],
    missingDataOptions: [],
    requiredDataKeys: [],
    sourceNote: "구현 계획 문서 4.1 고정 경로 fixture (route-notebook-02), 2026-08-28",
    reviewStatus: "approved",
    misconceptionGuard: "비용 토큰만 보고 경로를 정하는 단정을 피하도록 안내한다.",
  },
  {
    id: "route-delay-03",
    title: "다리 점검으로 늦어진 운송",
    scene: "가상의 다리 점검 때문에 트럭이 다리를 지나지 못해요. 지연이 뒤 단계에 어떻게 번지는지 추적해 보아요.",
    nodes: [
      { id: "producer", kind: "production", label: "공장에서 상품을 실어 보내요", timeTokens: 1, costTokens: 1, lossTokens: 0 },
      { id: "truck", kind: "transport", label: "트럭이 다리를 지나 가요", timeTokens: 2, costTokens: null, lossTokens: 1 },
      { id: "shop", kind: "sale", label: "가게에 상품을 내려놓아요", timeTokens: 1, costTokens: 0, lossTokens: 0 },
    ],
    edges: [
      { id: "edge-bridge", fromId: "producer", toId: "truck", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-truck-shop", fromId: "truck", toId: "shop", timeTokens: 0, costTokens: 0, lossTokens: 0 },
    ],
    goal: {
      id: "goal-delay-03",
      priority: "time",
      statement: "지연이 생겨도 경로는 그대로예요. 바뀐 시간과 비용 자료를 확인해 보아요.",
      acceptedRouteIds: ["producer>truck>shop"],
    },
    conditionChanges: [
      {
        id: "bridge-check",
        kind: "edge",
        label: "다리 점검 (+3 시간 토큰)",
        description: "다리 점검 때문에 다리를 건너는 운송 구간이 3만큼 더 늦어져요.",
        targetId: "edge-bridge",
        timeTokensDelta: 3,
        costTokensDelta: 0,
        lossTokensDelta: 0,
      },
    ],
    decisionRules: [
      {
        decision: "keep-route",
        label: "지연된 경로를 그대로 유지할게요",
        requiresChangeApplied: true,
        requiredEvidenceKeys: ["time-propagates", "cost-still-unknown"],
      },
    ],
    evidenceOptions: [
      { key: "time-propagates", label: "다리 점검 때문에 뒤 단계까지 총시간 토큰이 3 늘었어요", forbidden: false },
      { key: "cost-still-unknown", label: "운송비 자료가 없어서 비용은 여전히 자료 없음으로 남아요", forbidden: false },
      { key: "cost-becomes-zero", label: "자료가 없으니 비용을 그냥 0으로 계산해요", forbidden: true },
    ],
    missingDataOptions: [],
    requiredDataKeys: [],
    sourceNote: "구현 계획 문서 4.1 고정 경로 fixture (route-delay-03), 2026-08-28",
    reviewStatus: "approved",
    misconceptionGuard: "알 수 없는 비용을 0으로 바꾸거나 임의로 계산하지 않도록 안내한다.",
  },
  {
    id: "route-package-04",
    title: "포장 크기 고르기",
    scene: "달빛 과자를 큰 상자 하나에 담을까요, 작은 상자 여러 개로 나눌까요? 포장 방법을 바꾸고 시간·비용·잃음 토큰을 비교해 보아요.",
    nodes: [
      { id: "producer", kind: "production", label: "공장에서 달빛 과자를 만들어요", timeTokens: 1, costTokens: 1, lossTokens: 0 },
      { id: "package-large", kind: "processing", label: "큰 상자 하나에 가득 담아요", timeTokens: 1, costTokens: 1, lossTokens: 2 },
      { id: "package-small", kind: "processing", label: "작은 상자 여러 개로 나눠 담아요", timeTokens: 2, costTokens: 2, lossTokens: 0 },
      { id: "truck-once", kind: "transport", label: "큰 상자를 한 번에 실어 나르세요", timeTokens: 2, costTokens: 2, lossTokens: 0 },
      { id: "truck-twice", kind: "transport", label: "작은 상자를 두 번 나눠 실어 나르세요", timeTokens: 3, costTokens: 3, lossTokens: 0 },
      { id: "store", kind: "sale", label: "가게에 상자를 내려놓아요", timeTokens: 1, costTokens: 0, lossTokens: 0 },
    ],
    edges: [
      { id: "edge-producer-large", fromId: "producer", toId: "package-large", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-large-truck-once", fromId: "package-large", toId: "truck-once", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-truck-once-store", fromId: "truck-once", toId: "store", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-producer-small", fromId: "producer", toId: "package-small", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-small-truck-twice", fromId: "package-small", toId: "truck-twice", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-truck-twice-store", fromId: "truck-twice", toId: "store", timeTokens: 0, costTokens: 0, lossTokens: 0 },
    ],
    goal: {
      id: "goal-package-04",
      priority: "loss",
      statement: "잃음 토큰을 줄이고 싶어요. 포장 방식을 바꿔 비교하고 장단점을 함께 기록해 보아요.",
      acceptedRouteIds: ["producer>package-small>truck-twice>store"],
    },
    conditionChanges: [
      {
        id: "switch-small-pack",
        kind: "route",
        label: "작은 상자로 나눠 싣기",
        description: "포장과 운송 단계가 작은 상자 방식으로 바뀌어요.",
        targetId: "producer>package-small>truck-twice>store",
        timeTokensDelta: 0,
        costTokensDelta: 0,
        lossTokensDelta: 0,
      },
      {
        id: "switch-large-pack",
        kind: "route",
        label: "큰 상자로 한 번에 싣기",
        description: "포장과 운송 단계가 큰 상자 방식으로 바뀌어요.",
        targetId: "producer>package-large>truck-once>store",
        timeTokensDelta: 0,
        costTokensDelta: 0,
        lossTokensDelta: 0,
      },
    ],
    decisionRules: [
      {
        decision: "keep-route",
        label: "비교한 경로로 결정할게요",
        requiresChangeApplied: false,
        requiredEvidenceKeys: ["loss-goes-down", "time-cost-go-up"],
      },
    ],
    evidenceOptions: [
      { key: "loss-goes-down", label: "작은 상자로 나누면 잃음 토큰이 2에서 0으로 줄어요", forbidden: false },
      { key: "time-cost-go-up", label: "대신 시간 토큰은 5→7, 비용 토큰은 4→6으로 늘어요", forbidden: false },
      { key: "small-pack-is-always-best", label: "작은 상자 포장은 언제나 최고예요", forbidden: true },
    ],
    missingDataOptions: [],
    requiredDataKeys: [],
    sourceNote: "구현 계획 문서 4.1 고정 경로 fixture (route-package-04), 2026-08-28",
    reviewStatus: "approved",
    misconceptionGuard: "한 조건의 개선이 다른 조건의 손해로 이어질 수 있음을 함께 기록하도록 안내한다.",
  },
  {
    id: "route-store-05",
    title: "판매 장소 두 곳",
    scene: "가상 마을 채소 상자를 근처 상점에 팔까요, 먼 시장에 팔까요? 두 경로의 시간·비용·잃음 토큰을 비교해 절충을 설명해 보아요.",
    nodes: [
      { id: "producer", kind: "production", label: "마을 농장에서 채소 상자를 만들어요", timeTokens: 1, costTokens: 1, lossTokens: 0 },
      { id: "transport-near", kind: "transport", label: "근처 상점까지 가까운 길로 가요", timeTokens: 2, costTokens: 3, lossTokens: 0 },
      { id: "store", kind: "sale", label: "근처 상점 진열대에 놓아요", timeTokens: 1, costTokens: 1, lossTokens: 1 },
      { id: "transport-far", kind: "transport", label: "먼 시장까지 먼 길을 가요", timeTokens: 4, costTokens: 1, lossTokens: 1 },
      { id: "market", kind: "sale", label: "먼 시장 매대에 놓아요", timeTokens: 1, costTokens: 1, lossTokens: 1 },
      { id: "buyer", kind: "consumption", label: "손님이 상품을 사서 써요", timeTokens: 0, costTokens: 0, lossTokens: 0 },
    ],
    edges: [
      { id: "edge-producer-near", fromId: "producer", toId: "transport-near", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-near-store", fromId: "transport-near", toId: "store", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-producer-far", fromId: "producer", toId: "transport-far", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-far-market", fromId: "transport-far", toId: "market", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-store-buyer", fromId: "store", toId: "buyer", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-market-buyer", fromId: "market", toId: "buyer", timeTokens: 0, costTokens: 0, lossTokens: 0 },
    ],
    goal: {
      id: "goal-store-05",
      priority: "balanced",
      statement: "시간·비용·잃음을 모두 비교해 절충을 설명해 보아요. 목표에 따라 좋은 경로는 달라져요.",
      acceptedRouteIds: ["producer>transport-near>store>buyer", "producer>transport-far>market>buyer"],
    },
    conditionChanges: [
      {
        id: "switch-far-market",
        kind: "route",
        label: "먼 시장으로 판매지를 바꾸기",
        description: "판매 단계가 먼 시장 방식으로 바뀌어요.",
        targetId: "producer>transport-far>market>buyer",
        timeTokensDelta: 0,
        costTokensDelta: 0,
        lossTokensDelta: 0,
      },
      {
        id: "switch-near-store",
        kind: "route",
        label: "근처 상점으로 판매지를 바꾸기",
        description: "판매 단계가 근처 상점 방식으로 바뀌어요.",
        targetId: "producer>transport-near>store>buyer",
        timeTokensDelta: 0,
        costTokensDelta: 0,
        lossTokensDelta: 0,
      },
    ],
    decisionRules: [
      {
        decision: "keep-route",
        label: "비교한 경로로 결정할게요",
        requiresChangeApplied: false,
        requiredEvidenceKeys: ["near-wins-time-loss", "far-wins-cost"],
      },
    ],
    evidenceOptions: [
      { key: "near-wins-time-loss", label: "근처 상점은 시간 토큰(4)과 잃음 토큰(1)이 적어요", forbidden: false },
      { key: "far-wins-cost", label: "먼 시장은 비용 토큰(3)이 적지만 잃음 토큰이 2로 늘어요", forbidden: false },
      { key: "near-is-always-safe", label: "가까우니까 근처 상점이 항상 좋아요", forbidden: true },
    ],
    missingDataOptions: [],
    requiredDataKeys: [],
    sourceNote: "구현 계획 문서 4.1 고정 경로 fixture (route-store-05), 2026-08-28",
    reviewStatus: "approved",
    misconceptionGuard: "거리가 가까운 경로를 항상 더 좋은 경로로 단정하지 않도록 안내한다.",
  },
  {
    id: "route-missing-06",
    title: "비용 자료가 빠진 최종 경로",
    scene: "마지막 경로에는 운송비 자료가 빠져 있어요. 자료가 부족할 때는 좋은 경로를 확정하지 않아요.",
    nodes: [
      { id: "producer", kind: "production", label: "공장에서 완제품을 만들어요", timeTokens: 1, costTokens: 1, lossTokens: 0 },
      { id: "transport", kind: "transport", label: "운송 회사가 상품을 실어요", timeTokens: 3, costTokens: null, lossTokens: 1 },
      { id: "store", kind: "sale", label: "가게에 도착해 팔려요", timeTokens: 2, costTokens: 1, lossTokens: 1 },
    ],
    edges: [
      { id: "edge-producer-transport", fromId: "producer", toId: "transport", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      { id: "edge-transport-store", fromId: "transport", toId: "store", timeTokens: 0, costTokens: 0, lossTokens: 0 },
    ],
    goal: {
      id: "goal-missing-06",
      priority: "balanced",
      statement: "자료가 부족할 때는 확정하지 않고 필요한 자료를 요청해 보아요.",
      acceptedRouteIds: ["producer>transport>store"],
    },
    conditionChanges: [],
    decisionRules: [
      {
        decision: "insufficient-information",
        label: "자료가 부족해서 판단을 보류할게요",
        requiresChangeApplied: false,
        requiredEvidenceKeys: [],
      },
    ],
    evidenceOptions: [],
    missingDataOptions: [
      { key: "transport-cost", label: "운송비 자료" },
      { key: "production-count", label: "생산 수량 자료" },
      { key: "weather-note", label: "날씨 기록 자료" },
    ],
    requiredDataKeys: ["transport-cost"],
    sourceNote: "구현 계획 문서 4.1 고정 경로 fixture (route-missing-06), 2026-08-28",
    reviewStatus: "approved",
    misconceptionGuard: "자료가 부족할 때 좋은 경로를 추측으로 확정하지 않도록 안내한다.",
  },
];

assertValidContent(missions);
