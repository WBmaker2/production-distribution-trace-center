import { describe, expect, it } from "vitest";
import type { RouteMission } from "../domain/types";
import { validateContent, validateMission } from "./validateContent";

function baseMission(overrides: Partial<RouteMission> = {}): RouteMission {
  return {
    id: "route-strawberry-01",
    title: "테스트 상품",
    scene: "가상 상품이 단계를 지나는 장면 설명",
    nodes: [
      { id: "a", kind: "production", label: "만들어요", timeTokens: 1, costTokens: 1, lossTokens: 0 },
      { id: "b", kind: "sale", label: "팔아요", timeTokens: 1, costTokens: 1, lossTokens: 1 },
    ],
    edges: [{ id: "edge-a-b", fromId: "a", toId: "b", timeTokens: 0, costTokens: 0, lossTokens: 0 }],
    goal: {
      id: "goal-test",
      priority: "balanced",
      statement: "순서를 바로 세워 보아요",
      acceptedRouteIds: ["a>b"],
    },
    conditionChanges: [],
    decisionRules: [
      {
        decision: "choose-route",
        label: "이 경로로 결정할게요",
        requiresChangeApplied: false,
        requiredEvidenceKeys: ["order-reason"],
      },
    ],
    evidenceOptions: [{ key: "order-reason", label: "일의 차례에 맞아요", forbidden: false }],
    missingDataOptions: [],
    requiredDataKeys: [],
    sourceNote: "계획 문서 fixture",
    reviewStatus: "approved",
    misconceptionGuard: "짧은 길을 무조건 좋다고 단정하지 않는다",
    ...overrides,
  };
}

describe("validateContent — 목록 수준 규칙", () => {
  it("미션 수가 6개가 아니면 실패한다", () => {
    const result = validateContent([baseMission()]);
    expect(result.valid).toBe(false);
    expect(result.errors.some((message) => message.includes("정확히 6개"))).toBe(true);
  });

  it("미션 ID가 중복되면 실패한다", () => {
    const duplicated = Array.from({ length: 6 }, () => baseMission({ id: "route-strawberry-01" }));
    const result = validateContent(duplicated);
    expect(result.valid).toBe(false);
    expect(result.errors.some((message) => message.includes("중복된 미션 ID"))).toBe(true);
  });

  it("계획서의 미션 ID가 하나라도 빠지면 실패한다", () => {
    const six = Array.from({ length: 6 }, (_, index) =>
      baseMission({ id: `route-others-${String(index + 1).padStart(2, "0")}` as RouteMission["id"] }),
    );
    const result = validateContent(six);
    expect(result.valid).toBe(false);
    expect(result.errors.some((message) => message.includes("route-strawberry-01"))).toBe(true);
  });

  it("정상 6개 콘텐츠 규격은 통과한다", () => {
    const plannedIds = [
      "route-strawberry-01",
      "route-notebook-02",
      "route-delay-03",
      "route-package-04",
      "route-store-05",
      "route-missing-06",
    ] as const;
    const six = plannedIds.map((id, index) =>
      baseMission({
        id,
        goal: {
          id: `goal-${index}`,
          priority: "balanced",
          statement: "목표 문장",
          acceptedRouteIds: ["a>b"],
        },
      }),
    );
    expect(validateContent(six).errors).toEqual([]);
  });
});

describe("validateMission — 미션 수준 규칙", () => {
  it("검수 상태가 approved가 아니면 실패한다", () => {
    const errors = validateMission(baseMission({ reviewStatus: "pending" }));
    expect(errors.some((message) => message.includes("검수되지 않은 미션"))).toBe(true);
  });

  it("sourceNote 또는 misconceptionGuard가 비면 실패한다", () => {
    expect(validateMission(baseMission({ sourceNote: "" })).some((m) => m.includes("sourceNote"))).toBe(true);
    expect(
      validateMission(baseMission({ misconceptionGuard: "" })).some((m) => m.includes("misconceptionGuard")),
    ).toBe(true);
  });

  it("연결선이 존재하지 않는 단계를 가리키면 실패한다", () => {
    const mission = baseMission({
      edges: [{ id: "edge-a-b", fromId: "a", toId: "x", timeTokens: 0, costTokens: 0, lossTokens: 0 }],
    });
    const errors = validateMission(mission);
    expect(errors.some((message) => message.includes("존재하지 않는 단계"))).toBe(true);
  });

  it("사이클이 있으면 실패한다", () => {
    const mission = baseMission({
      edges: [
        { id: "edge-a-b", fromId: "a", toId: "b", timeTokens: 0, costTokens: 0, lossTokens: 0 },
        { id: "edge-b-a", fromId: "b", toId: "a", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      ],
    });
    const errors = validateMission(mission);
    expect(errors.some((message) => message.includes("사이클"))).toBe(true);
  });

  it("시작 단계가 두 개면 실패한다", () => {
    const mission = baseMission({
      nodes: [
        { id: "a", kind: "production", label: "만들어요", timeTokens: 1, costTokens: 1, lossTokens: 0 },
        { id: "c", kind: "production", label: "또 만들어요", timeTokens: 1, costTokens: 1, lossTokens: 0 },
        { id: "b", kind: "sale", label: "팔아요", timeTokens: 1, costTokens: 1, lossTokens: 1 },
      ],
      edges: [
        { id: "edge-a-b", fromId: "a", toId: "b", timeTokens: 0, costTokens: 0, lossTokens: 0 },
        { id: "edge-c-b", fromId: "c", toId: "b", timeTokens: 0, costTokens: 0, lossTokens: 0 },
      ],
    });
    const errors = validateMission(mission);
    expect(errors.some((message) => message.includes("시작 단계가 한 개가 아닙니다"))).toBe(true);
  });

  it("고립된 단계가 있으면 실패한다", () => {
    const mission = baseMission({
      nodes: [
        { id: "a", kind: "production", label: "만들어요", timeTokens: 1, costTokens: 1, lossTokens: 0 },
        { id: "b", kind: "sale", label: "팔아요", timeTokens: 1, costTokens: 1, lossTokens: 1 },
        { id: "lonely", kind: "storage", label: "혼자 남아요", timeTokens: 1, costTokens: 1, lossTokens: 0 },
      ],
    });
    const errors = validateMission(mission);
    expect(errors.some((message) => message.includes("고립된 단계"))).toBe(true);
  });

  it("승인 경로가 실제 경로가 아니면 실패한다", () => {
    const mission = baseMission({
      goal: {
        id: "goal-test",
        priority: "balanced",
        statement: "목표",
        acceptedRouteIds: ["a>ghost"],
      },
    });
    const errors = validateMission(mission);
    expect(errors.some((message) => message.includes("실제 경로가 아닙니다"))).toBe(true);
  });

  it("필요 자료가 있는데 판단 보류 규칙이 없거나 선택지가 없으면 실패한다", () => {
    const withoutRule = validateMission(baseMission({ requiredDataKeys: ["transport-cost"] }));
    expect(withoutRule.some((message) => message.includes("insufficient-information"))).toBe(true);

    const withoutOptions = validateMission(
      baseMission({
        requiredDataKeys: ["transport-cost"],
        decisionRules: [
          {
            decision: "insufficient-information",
            label: "자료가 부족해요",
            requiresChangeApplied: false,
            requiredEvidenceKeys: [],
          },
        ],
      }),
    );
    expect(withoutOptions.some((message) => message.includes("자료 선택지"))).toBe(true);
  });

  it("필요 근거가 선택지에 없거나 오개념 근거면 실패한다", () => {
    const missingKey = validateMission(
      baseMission({
        decisionRules: [
          {
            decision: "choose-route",
            label: "결정할게요",
            requiresChangeApplied: false,
            requiredEvidenceKeys: ["ghost-key"],
          },
        ],
      }),
    );
    expect(missingKey.some((message) => message.includes("근거 선택지에 없습니다"))).toBe(true);

    const forbiddenRequired = validateMission(
      baseMission({
        evidenceOptions: [{ key: "bad-reason", label: "짧으면 무조건 좋아요", forbidden: true }],
        decisionRules: [
          {
            decision: "choose-route",
            label: "결정할게요",
            requiresChangeApplied: false,
            requiredEvidenceKeys: ["bad-reason"],
          },
        ],
      }),
    );
    expect(forbiddenRequired.some((message) => message.includes("오개념 근거"))).toBe(true);
  });

  it("토큰이 음수이거나 정수가 아니면 실패한다", () => {
    const negative = baseMission({
      nodes: [
        { id: "a", kind: "production", label: "만들어요", timeTokens: -1, costTokens: 1, lossTokens: 0 },
        { id: "b", kind: "sale", label: "팔아요", timeTokens: 1, costTokens: 1, lossTokens: 1 },
      ],
    });
    expect(validateMission(negative).some((message) => message.includes("시간 토큰"))).toBe(true);

    const fractional = baseMission({
      edges: [{ id: "edge-a-b", fromId: "a", toId: "b", timeTokens: 0, costTokens: 0.5, lossTokens: 0 }],
    });
    expect(validateMission(fractional).some((message) => message.includes("비용 토큰"))).toBe(true);
  });

  it("조건 변화의 대상이 없으면 실패한다", () => {
    const mission = baseMission({
      decisionRules: [
        {
          decision: "keep-route",
          label: "이 경로를 유지할게요",
          requiresChangeApplied: true,
          requiredEvidenceKeys: [],
        },
      ],
      conditionChanges: [
        {
          id: "ghost-change",
          kind: "edge",
          label: "없는 연결선 바꾸기",
          description: "없는 대상",
          targetId: "edge-ghost",
          timeTokensDelta: 1,
          costTokensDelta: 0,
          lossTokensDelta: 0,
        },
      ],
    });
    const errors = validateMission(mission);
    expect(errors.some((message) => message.includes("조건 변화 대상"))).toBe(true);
  });

  it("조건 변화 없이는 통과할 수 없는 규칙만 있으면 실패한다", () => {
    const mission = baseMission({
      decisionRules: [
        {
          decision: "keep-route",
          label: "유지할게요",
          requiresChangeApplied: true,
          requiredEvidenceKeys: [],
        },
      ],
      conditionChanges: [],
    });
    const errors = validateMission(mission);
    expect(errors.some((message) => message.includes("판단 규칙이 없습니다"))).toBe(true);
  });

  it("정상 미션은 오류가 없다", () => {
    expect(validateMission(baseMission())).toEqual([]);
  });
});
