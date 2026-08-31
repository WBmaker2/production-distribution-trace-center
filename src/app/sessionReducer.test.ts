import { describe, expect, it } from "vitest";
import { missions } from "../content/missions";
import {
  createInitialSessionState,
  sessionFlowSteps,
  sessionReducer,
  type SessionState,
} from "./sessionReducer";

interface SolveOptions {
  routeId: string;
  changeId?: string | null;
  evidenceKeys?: readonly string[];
  dataKeys?: readonly string[];
}

function solveCurrentMission(state: SessionState, options: SolveOptions): SessionState {
  let current = state;
  if (current.step === "INTRO") {
    current = sessionReducer(current, { type: "START" });
  }
  if (current.step === "OBSERVE") {
    current = sessionReducer(current, { type: "NEXT" });
  }
  for (const nodeId of options.routeId.split(">")) {
    current = sessionReducer(current, { type: "APPEND_CARD", nodeId });
  }
  current = sessionReducer(current, { type: "CHECK_CONNECTION" });
  current = sessionReducer(current, { type: "NEXT" });
  if (current.step === "BASELINE") {
    current = sessionReducer(current, { type: "NEXT" });
  }
  if (current.step === "CHANGE_ONE") {
    current = sessionReducer(current, { type: "APPLY_CHANGE", changeId: options.changeId ?? null });
    current = sessionReducer(current, { type: "NEXT" });
  }
  if (current.step === "COMPARE") {
    current = sessionReducer(current, { type: "NEXT" });
  }
  expect(current.step).toBe("DECIDE");
  for (const key of options.evidenceKeys ?? []) {
    current = sessionReducer(current, { type: "TOGGLE_EVIDENCE", key });
  }
  for (const key of options.dataKeys ?? []) {
    current = sessionReducer(current, { type: "TOGGLE_DATA", key });
  }
  return sessionReducer(current, { type: "SUBMIT_DECISION" });
}

const SOLVE_PLANS: readonly SolveOptions[] = [
  { routeId: "farm>sort>truck>store", evidenceKeys: ["stage-order-reason"] },
  { routeId: "raw-paper>factory>warehouse-a>stationery", evidenceKeys: ["warehouse-tradeoff"] },
  {
    routeId: "producer>truck>shop",
    changeId: "bridge-check",
    evidenceKeys: ["time-propagates", "cost-still-unknown"],
  },
  {
    routeId: "producer>package-small>truck-twice>store",
    changeId: null,
    evidenceKeys: ["loss-goes-down", "time-cost-go-up"],
  },
  {
    routeId: "producer>transport-near>store>buyer",
    changeId: null,
    evidenceKeys: ["near-wins-time-loss", "far-wins-cost"],
  },
  { routeId: "producer>transport>store", dataKeys: ["transport-cost"] },
];

describe("세션 reducer — 전이 잠금", () => {
  it("초기 상태는 입구이며 6개 미션 진행 칸을 가진다", () => {
    const state = createInitialSessionState();
    expect(state.step).toBe("INTRO");
    expect(state.missionIndex).toBe(0);
    expect(state.progress).toHaveLength(6);
    expect(state.finished).toBe(false);
    expect(state.restartRequested).toBe(false);
  });

  it("입구에서 NEXT로 건너뛰지 못하고 START로만 진행한다", () => {
    const state = createInitialSessionState();
    expect(sessionReducer(state, { type: "NEXT" })).toBe(state);
  });

  it("연결 검사 없이 기본 경로로 건너뛰지 못한다", () => {
    let state = sessionReducer(createInitialSessionState(), { type: "START" });
    state = sessionReducer(state, { type: "NEXT" });
    state = sessionReducer(state, { type: "APPEND_CARD", nodeId: "farm" });
    const skipped = sessionReducer(state, { type: "NEXT" });
    expect(skipped.step).toBe("ORDER");
    expect(skipped).toBe(state);
  });

  it("연결이 끊긴 경로는 연결 검사를 통과하지 못한다", () => {
    let state = sessionReducer(createInitialSessionState(), { type: "START" });
    state = sessionReducer(state, { type: "NEXT" });
    for (const nodeId of ["farm", "store"]) {
      state = sessionReducer(state, { type: "APPEND_CARD", nodeId });
    }
    state = sessionReducer(state, { type: "CHECK_CONNECTION" });
    expect(state.progress[0].connectionCheck?.valid).toBe(false);
    expect(sessionReducer(state, { type: "NEXT" }).step).toBe("ORDER");
  });

  it("조건 변화가 없는 미션은 기본 경로에서 판단으로 바로 간다", () => {
    let state = sessionReducer(createInitialSessionState(), { type: "START" });
    state = sessionReducer(state, { type: "NEXT" });
    state = sessionReducer(state, { type: "APPEND_CARD", nodeId: "farm" });
    state = sessionReducer(state, { type: "APPEND_CARD", nodeId: "sort" });
    state = sessionReducer(state, { type: "APPEND_CARD", nodeId: "truck" });
    state = sessionReducer(state, { type: "APPEND_CARD", nodeId: "store" });
    state = sessionReducer(state, { type: "CHECK_CONNECTION" });
    state = sessionReducer(state, { type: "NEXT" });
    expect(state.step).toBe("BASELINE");
    state = sessionReducer(state, { type: "NEXT" });
    expect(state.step).toBe("DECIDE");
  });

  it("조건 변화가 있는 미션는 CHANGE_ONE과 COMPARE를 반드시 지난다", () => {
    let state = sessionReducer(createInitialSessionState(), { type: "START" });
    state = solveCurrentMission(state, { ...SOLVE_PLANS[0]! });
    state = sessionReducer(state, { type: "NEXT" });
    state = solveCurrentMission(state, { ...SOLVE_PLANS[1]! });
    state = sessionReducer(state, { type: "NEXT" });
    expect(state.missionIndex).toBe(2);
    expect(state.step).toBe("OBSERVE");
    state = sessionReducer(state, { type: "NEXT" });
    for (const nodeId of SOLVE_PLANS[2]!.routeId.split(">")) {
      state = sessionReducer(state, { type: "APPEND_CARD", nodeId });
    }
    state = sessionReducer(state, { type: "CHECK_CONNECTION" });
    state = sessionReducer(state, { type: "NEXT" });
    expect(state.step).toBe("BASELINE");
    state = sessionReducer(state, { type: "NEXT" });
    expect(state.step).toBe("CHANGE_ONE");
    const withoutChange = sessionReducer(state, { type: "NEXT" });
    expect(withoutChange.step).toBe("CHANGE_ONE");
  });

  it("모르는 조건 변화 ID와 모르는 근거 키는 상태를 바꾸지 않는다", () => {
    let state = sessionReducer(createInitialSessionState(), { type: "START" });
    state = solveCurrentMission(state, { ...SOLVE_PLANS[0]! });
    state = sessionReducer(state, { type: "NEXT" });
    state = solveCurrentMission(state, { ...SOLVE_PLANS[1]! });
    state = sessionReducer(state, { type: "NEXT" });
    state = sessionReducer(state, { type: "NEXT" });
    for (const nodeId of SOLVE_PLANS[2]!.routeId.split(">")) {
      state = sessionReducer(state, { type: "APPEND_CARD", nodeId });
    }
    state = sessionReducer(state, { type: "CHECK_CONNECTION" });
    state = sessionReducer(state, { type: "NEXT" });
    state = sessionReducer(state, { type: "NEXT" });
    const ghost = sessionReducer(state, { type: "APPLY_CHANGE", changeId: "ghost" });
    expect(ghost).toBe(state);
    const applied = sessionReducer(state, { type: "APPLY_CHANGE", changeId: "bridge-check" });
    expect(applied.progress[2].appliedChangeId).toBe("bridge-check");
  });

  it("알 수 없는 action은 상태를 바꾸지 않는다", () => {
    const state = createInitialSessionState();
    expect(sessionReducer(state, { type: "GHOST" } as never)).toBe(state);
  });

  it("범위를 벗어난 카드 조작은 상태를 바꾸지 않는다", () => {
    let state = sessionReducer(createInitialSessionState(), { type: "START" });
    state = sessionReducer(state, { type: "APPEND_CARD", nodeId: "farm" });
    expect(sessionReducer(state, { type: "REMOVE_CARD", index: 5 })).toBe(state);
    expect(sessionReducer(state, { type: "MOVE_CARD", index: 0, direction: "up" })).toBe(state);
    expect(sessionReducer(state, { type: "APPEND_CARD", nodeId: "ghost" })).toBe(state);
  });
});

describe("세션 reducer — 응답 보존과 수정", () => {
  it("뒤로 가기는 직전 단계로 가면서 응답을 보존한다", () => {
    let state = sessionReducer(createInitialSessionState(), { type: "START" });
    state = sessionReducer(state, { type: "NEXT" });
    state = sessionReducer(state, { type: "APPEND_CARD", nodeId: "farm" });
    state = sessionReducer(state, { type: "APPEND_CARD", nodeId: "sort" });
    state = sessionReducer(state, { type: "APPEND_CARD", nodeId: "truck" });
    state = sessionReducer(state, { type: "APPEND_CARD", nodeId: "store" });
    state = sessionReducer(state, { type: "CHECK_CONNECTION" });
    state = sessionReducer(state, { type: "NEXT" });
    const backToOrder = sessionReducer(state, { type: "BACK" });
    expect(backToOrder.step).toBe("ORDER");
    expect(backToOrder.progress[0].assembledNodeIds).toHaveLength(4);
    const backToObserve = sessionReducer(backToOrder, { type: "BACK" });
    expect(backToObserve.step).toBe("OBSERVE");
    expect(backToObserve.progress[0].assembledNodeIds).toHaveLength(4);
  });

  it("경로를 다시 만지면 연결 검사와 조건 선택은 초기화된다", () => {
    let state = sessionReducer(createInitialSessionState(), { type: "START" });
    state = solveCurrentMission(state, { ...SOLVE_PLANS[0]! });
    state = sessionReducer(state, { type: "NEXT" });
    state = solveCurrentMission(state, { ...SOLVE_PLANS[1]! });
    state = sessionReducer(state, { type: "NEXT" });
    state = sessionReducer(state, { type: "NEXT" });
    for (const nodeId of SOLVE_PLANS[2]!.routeId.split(">")) {
      state = sessionReducer(state, { type: "APPEND_CARD", nodeId });
    }
    state = sessionReducer(state, { type: "CHECK_CONNECTION" });
    state = sessionReducer(state, { type: "NEXT" });
    state = sessionReducer(state, { type: "NEXT" });
    state = sessionReducer(state, { type: "APPLY_CHANGE", changeId: "bridge-check" });
    expect(state.progress[2].appliedChangeId).toBe("bridge-check");
    state = sessionReducer(state, { type: "BACK" });
    expect(state.step).toBe("BASELINE");
    state = sessionReducer(state, { type: "BACK" });
    expect(state.step).toBe("ORDER");
    state = sessionReducer(state, { type: "REMOVE_CARD", index: 2 });
    expect(state.progress[2].assembledNodeIds).toEqual(["producer", "truck"]);
    expect(state.progress[2].connectionCheck).toBeNull();
    expect(state.progress[2].appliedChangeId).toBeNull();
    expect(state.progress[2].changeConfirmed).toBe(false);
  });

  it("첫 판단이 거부되면 DECIDE에 머무르고 한 번만 수정 기회를 준다", () => {
    let state = sessionReducer(createInitialSessionState(), { type: "START" });
    state = sessionReducer(state, { type: "NEXT" });
    state = sessionReducer(state, { type: "APPEND_CARD", nodeId: "farm" });
    state = sessionReducer(state, { type: "APPEND_CARD", nodeId: "sort" });
    state = sessionReducer(state, { type: "APPEND_CARD", nodeId: "truck" });
    state = sessionReducer(state, { type: "APPEND_CARD", nodeId: "store" });
    state = sessionReducer(state, { type: "CHECK_CONNECTION" });
    state = sessionReducer(state, { type: "NEXT" });
    state = sessionReducer(state, { type: "NEXT" });
    // 근거 없이 제출하면 거부된다.
    const rejected = sessionReducer(state, { type: "SUBMIT_DECISION" });
    expect(rejected.step).toBe("DECIDE");
    expect(rejected.progress[0].firstDecision?.accepted).toBe(false);
    expect(rejected.progress[0].finalDecision).toBeNull();
    // 오래된(중복) 응답은 상태를 바꾸지 않는다.
    const duplicate = sessionReducer(rejected, { type: "SUBMIT_DECISION" });
    expect(duplicate).toBe(rejected);
    // 수정 시작 → 경로 다시 조립 → 두 번째 제출은 최종 기록이 된다.
    const revision = sessionReducer(rejected, { type: "BEGIN_REVISION" });
    expect(revision.step).toBe("ORDER");
    expect(revision.progress[0].revisionUsed).toBe(true);
    let revised = revision;
    for (const nodeId of ["farm", "sort", "truck", "store"]) {
      revised = sessionReducer(revised, { type: "APPEND_CARD", nodeId });
    }
    revised = sessionReducer(revised, { type: "CHECK_CONNECTION" });
    revised = sessionReducer(revised, { type: "NEXT" });
    revised = sessionReducer(revised, { type: "NEXT" });
    revised = sessionReducer(revised, { type: "TOGGLE_EVIDENCE", key: "stage-order-reason" });
    revised = sessionReducer(revised, { type: "SUBMIT_DECISION" });
    expect(revised.step).toBe("REPORT");
    expect(revised.progress[0].finalDecision?.accepted).toBe(true);
    expect(revised.progress[0].completed).toBe(true);
    // 완료 뒤에는 응답을 바꿀 수 없다.
    expect(sessionReducer(revised, { type: "SUBMIT_DECISION" })).toBe(revised);
    expect(
      sessionReducer(revised, { type: "TOGGLE_EVIDENCE", key: "stage-order-reason" }),
    ).toBe(revised);
    expect(sessionReducer(revised, { type: "APPEND_CARD", nodeId: "farm" })).toBe(revised);
    expect(sessionReducer(revised, { type: "BACK" })).toBe(revised);
  });

  it("수정 시작 시 이전 근거와 자료 선택을 비워 자연스러운 재시도를 보장한다", () => {
    let state = createInitialSessionState();
    for (let index = 0; index < 5; index += 1) {
      state = solveCurrentMission(state, SOLVE_PLANS[index]!);
      state = sessionReducer(state, { type: "NEXT" });
    }

    state = sessionReducer(state, { type: "NEXT" });
    for (const nodeId of ["producer", "transport", "store"]) {
      state = sessionReducer(state, { type: "APPEND_CARD", nodeId });
    }
    state = sessionReducer(state, { type: "CHECK_CONNECTION" });
    state = sessionReducer(state, { type: "NEXT" });
    state = sessionReducer(state, { type: "NEXT" });
    state = sessionReducer(state, { type: "TOGGLE_DATA", key: "weather-note" });

    const rejected = sessionReducer(state, { type: "SUBMIT_DECISION" });
    expect(rejected.progress[5]?.selectedDataKeys).toEqual(["weather-note"]);

    const revision = sessionReducer(rejected, { type: "BEGIN_REVISION" });
    expect(revision.step).toBe("ORDER");
    expect(revision.progress[5]?.selectedEvidenceKeys).toEqual([]);
    expect(revision.progress[5]?.selectedDataKeys).toEqual([]);

    let retried = sessionReducer(revision, { type: "RESET_ROUTE" });
    for (const nodeId of ["producer", "transport", "store"]) {
      retried = sessionReducer(retried, { type: "APPEND_CARD", nodeId });
    }
    retried = sessionReducer(retried, { type: "CHECK_CONNECTION" });
    retried = sessionReducer(retried, { type: "NEXT" });
    retried = sessionReducer(retried, { type: "NEXT" });
    retried = sessionReducer(retried, { type: "TOGGLE_DATA", key: "transport-cost" });

    const completed = sessionReducer(retried, { type: "SUBMIT_DECISION" });
    expect(completed.step).toBe("REPORT");
    expect(completed.progress[5]?.selectedDataKeys).toEqual(["transport-cost"]);
    expect(completed.progress[5]?.finalDecision?.accepted).toBe(true);
  });
});

describe("세션 reducer — 미션 진행과 재시작", () => {
  it("여섯 미션을 모두 완료하면 finished가 된다", () => {
    let state = createInitialSessionState();
    for (let index = 0; index < SOLVE_PLANS.length; index += 1) {
      state = solveCurrentMission(state, SOLVE_PLANS[index]!);
      expect(state.step).toBe("REPORT");
      expect(state.progress[index]?.completed).toBe(true);
      if (index < SOLVE_PLANS.length - 1) {
        state = sessionReducer(state, { type: "NEXT" });
        expect(state.step).toBe("OBSERVE");
      }
    }
    const finalNext = sessionReducer(state, { type: "NEXT" });
    expect(finalNext.finished).toBe(true);
    expect(finalNext.missionIndex).toBe(5);
    expect(finalNext.step).toBe("REPORT");
    expect(sessionReducer(finalNext, { type: "NEXT" })).toBe(finalNext);
  });

  it("재시작 요청은 확인을 거쳐 새 초기 상태를 만든다", () => {
    let state = sessionReducer(createInitialSessionState(), { type: "START" });
    state = sessionReducer(state, { type: "REQUEST_RESTART" });
    expect(state.restartRequested).toBe(true);
    const cancelled = sessionReducer(state, { type: "CANCEL_RESTART" });
    expect(cancelled.restartRequested).toBe(false);
    const requested = sessionReducer(cancelled, { type: "REQUEST_RESTART" });
    const restarted = sessionReducer(requested, { type: "CONFIRM_RESTART" });
    expect(restarted.step).toBe("INTRO");
    expect(restarted.missionIndex).toBe(0);
    expect(restarted.restartRequested).toBe(false);
    expect(restarted).not.toBe(requested);
    expect(restarted.progress).not.toBe(requested.progress);
    expect(restarted.progress.every((progress) => progress.assembledNodeIds.length === 0)).toBe(
      true,
    );
  });

  it("흐름 단계 목록은 조건 변화 유무를 반영한다", () => {
    expect(sessionFlowSteps(missions[0])).toEqual(["OBSERVE", "ORDER", "BASELINE", "DECIDE"]);
    expect(sessionFlowSteps(missions[2])).toEqual([
      "OBSERVE",
      "ORDER",
      "BASELINE",
      "CHANGE_ONE",
      "COMPARE",
      "DECIDE",
    ]);
  });

  it("모든 미션의 정답 계획으로 REPORT에 도달한다", () => {
    for (let index = 0; index < missions.length; index += 1) {
      let state = createInitialSessionState();
      for (let before = 0; before < index; before += 1) {
        state = solveCurrentMission(state, SOLVE_PLANS[before]!);
        state = sessionReducer(state, { type: "NEXT" });
      }
      state = solveCurrentMission(state, SOLVE_PLANS[index]!);
      expect(state.progress[index]?.finalDecision?.accepted).toBe(true);
    }
  });
});
