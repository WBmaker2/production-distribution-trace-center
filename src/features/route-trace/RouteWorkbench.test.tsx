import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useReducer } from "react";
import { describe, expect, it } from "vitest";
import {
  createInitialSessionState,
  sessionReducer,
  type SessionAction,
  type SessionState,
} from "../../app/sessionReducer";
import { RouteWorkbench } from "./RouteWorkbench";

function Harness({ initial }: { initial: SessionState }) {
  const [state, dispatch] = useReducer(sessionReducer, initial);
  return <RouteWorkbench state={state} dispatch={dispatch} />;
}

function solveCurrentMission(state: SessionState, plan: {
  routeId: string;
  changeId?: string | null;
  evidenceKeys?: readonly string[];
  dataKeys?: readonly string[];
}): SessionState {
  let current = state;
  if (current.step === "INTRO") current = sessionReducer(current, { type: "START" });
  if (current.step === "OBSERVE") current = sessionReducer(current, { type: "NEXT" });
  for (const nodeId of plan.routeId.split(">")) {
    current = sessionReducer(current, { type: "APPEND_CARD", nodeId });
  }
  current = sessionReducer(current, { type: "CHECK_CONNECTION" });
  current = sessionReducer(current, { type: "NEXT" });
  if (current.step === "BASELINE") current = sessionReducer(current, { type: "NEXT" });
  if (current.step === "CHANGE_ONE") {
    current = sessionReducer(current, { type: "APPLY_CHANGE", changeId: plan.changeId ?? null });
    current = sessionReducer(current, { type: "NEXT" });
  }
  if (current.step === "COMPARE") current = sessionReducer(current, { type: "NEXT" });
  for (const key of plan.evidenceKeys ?? []) {
    current = sessionReducer(current, { type: "TOGGLE_EVIDENCE", key });
  }
  for (const key of plan.dataKeys ?? []) {
    current = sessionReducer(current, { type: "TOGGLE_DATA", key });
  }
  return sessionReducer(current, { type: "SUBMIT_DECISION" });
}

function delayObserveState(): SessionState {
  let state = createInitialSessionState();
  state = solveCurrentMission(state, {
    routeId: "farm>sort>truck>store",
    evidenceKeys: ["stage-order-reason"],
  });
  state = sessionReducer(state, { type: "NEXT" });
  state = solveCurrentMission(state, {
    routeId: "raw-paper>factory>warehouse-a>stationery",
    evidenceKeys: ["warehouse-tradeoff"],
  });
  return sessionReducer(state, { type: "NEXT" });
}

function applyActions(state: SessionState, actions: readonly SessionAction[]): SessionState {
  return actions.reduce((current, action) => sessionReducer(current, action), state);
}

describe("RouteWorkbench — 관찰 단계", () => {
  it("단계별 토큰을 보여 주고 자료 없음을 0으로 표시하지 않는다", () => {
    render(<Harness initial={delayObserveState()} />);
    expect(screen.getByText("트럭이 다리를 지나 가요")).toBeInTheDocument();
    expect(
      screen.getByText(
        "상품의 이동 순서와 각 단계에서 하는 일을 살펴보고, 시간·비용·손실 토큰의 뜻을 읽어 보세요.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByText("활동 보드")).toBeInTheDocument();
    expect(screen.getByText("자료 없음")).toBeInTheDocument();
    expect(screen.queryByText("비용 0")).not.toBeInTheDocument();
  });
});

describe("RouteWorkbench — 경로 조립 단계", () => {
  function orderState(): SessionState {
    return sessionReducer(sessionReducer(delayObserveState(), { type: "NEXT" }), {
      type: "NEXT",
    });
  }

  it("카드를 차례로 넣고 연결 검사를 통과하면 다음 단계가 열린다", async () => {
    const user = userEvent.setup();
    render(<Harness initial={orderState()} />);
    await user.click(screen.getByRole("button", { name: "경로에 넣기: 공장에서 상품을 실어 보내요" }));
    await user.click(screen.getByRole("button", { name: "경로에 넣기: 트럭이 다리를 지나 가요" }));
    await user.click(screen.getByRole("button", { name: "경로에 넣기: 가게에 상품을 내려놓아요" }));
    expect(screen.getByRole("button", { name: "기본 경로 보기" })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: "연결 검사" }));
    expect(screen.getByText("연결 검사를 통과했어요")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "기본 경로 보기" })).toBeEnabled();
    await user.click(screen.getByRole("button", { name: "기본 경로 보기" }));
    expect(screen.getByText("합계")).toBeInTheDocument();
    expect(screen.getAllByText("자료 없음").length).toBeGreaterThanOrEqual(2);
  });

  it("끊긴 경로는 연결 검사에서 이유를 알려 주고 다음 단계를 막는다", async () => {
    const user = userEvent.setup();
    render(<Harness initial={orderState()} />);
    await user.click(screen.getByRole("button", { name: "경로에 넣기: 공장에서 상품을 실어 보내요" }));
    await user.click(screen.getByRole("button", { name: "경로에 넣기: 가게에 상품을 내려놓아요" }));
    await user.click(screen.getByRole("button", { name: "연결 검사" }));
    expect(screen.getByText(/이어지지 않았어요/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "기본 경로 보기" })).toBeDisabled();
  });

  it("키보드 Enter로 카드를 넣으면 클릭과 같은 결과가 된다", async () => {
    const user = userEvent.setup();
    render(<Harness initial={orderState()} />);
    const card = screen.getByRole("button", { name: "경로에 넣기: 공장에서 상품을 실어 보내요" });
    card.focus();
    await user.keyboard("{Enter}");
    expect(screen.getByText("1. 생산 · 공장에서 상품을 실어 보내요")).toBeInTheDocument();
  });
});

describe("RouteWorkbench — 조건 변경과 전후 비교", () => {
  async function goToCompare(user: ReturnType<typeof userEvent.setup>) {
    let state = delayObserveState();
    state = sessionReducer(state, { type: "NEXT" });
    state = sessionReducer(state, { type: "NEXT" });
    for (const nodeId of ["producer", "truck", "shop"]) {
      state = sessionReducer(state, { type: "APPEND_CARD", nodeId });
    }
    state = sessionReducer(state, { type: "CHECK_CONNECTION" });
    render(<Harness initial={state} />);
    await user.click(screen.getByRole("button", { name: "기본 경로 보기" }));
    await user.click(screen.getByRole("button", { name: "조건 바꾸기" }));
  }

  it("조건을 선택해야 전후 비교로 넘어간다", async () => {
    const user = userEvent.setup();
    await goToCompare(user);
    expect(screen.getByRole("button", { name: "전후 비교 확인" })).toBeDisabled();
    await user.click(screen.getByRole("radio", { name: /다리 점검/ }));
    expect(screen.getByRole("button", { name: "전후 비교 확인" })).toBeEnabled();
    expect(screen.getByText(/무엇이 달라질지 생각한 뒤/)).toBeInTheDocument();
    expect(screen.queryByText(/적용 후 합계/)).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "전후 비교 확인" }));
    expect(screen.getAllByText("+3").length).toBeGreaterThan(0);
    expect(screen.getByText("바꾸기 전")).toBeInTheDocument();
    expect(screen.getByText("바꾼 후")).toBeInTheDocument();
  });

  it("조건을 바꾸지 않기로 명시하게 선택할 수 있다", async () => {
    const user = userEvent.setup();
    await goToCompare(user);
    await user.click(screen.getByRole("radio", { name: "조건을 바꾸지 않고 그대로 유지" }));
    expect(screen.getByRole("button", { name: "전후 비교 확인" })).toBeEnabled();
    await user.click(screen.getByRole("button", { name: "전후 비교 확인" }));
    expect(screen.getByText(/조건을 바꾸지 않았어요/)).toBeInTheDocument();
  });
});

describe("RouteWorkbench — 판단 단계", () => {
  async function goToDecide() {
    let state = delayObserveState();
    state = sessionReducer(state, { type: "NEXT" });
    state = sessionReducer(state, { type: "NEXT" });
    for (const nodeId of ["producer", "truck", "shop"]) {
      state = sessionReducer(state, { type: "APPEND_CARD", nodeId });
    }
    state = sessionReducer(state, { type: "CHECK_CONNECTION" });
    state = applyActions(state, [
      { type: "NEXT" },
      { type: "NEXT" },
      { type: "APPLY_CHANGE", changeId: "bridge-check" },
      { type: "NEXT" },
      { type: "NEXT" },
    ]);
    render(<Harness initial={state} />);
  }

  it("근거 없이 기록하면 통과하지 않고 정답을 공개하지 않으며 한 번 다시 정하기를 제공한다", async () => {
    const user = userEvent.setup();
    await goToDecide();
    await user.click(screen.getByRole("button", { name: "판단 기록하기" }));
    expect(screen.getByText("아직 목표와 근거가 맞지 않아요")).toBeInTheDocument();
    expect(screen.queryByText(/정답은/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "한 번 다시 정하기" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "한 번 다시 정하기" }));
    expect(screen.getByRole("button", { name: "연결 검사" })).toBeInTheDocument();
  });

  it("근거를 고른 뒤 판단하면 결과를 남긴다", async () => {
    const user = userEvent.setup();
    await goToDecide();
    await user.click(screen.getByRole("checkbox", { name: /총시간 토큰이 3 늘었어요|시간 토큰이 3 늘었어요/ }));
    await user.click(screen.getByRole("checkbox", { name: /자료 없음으로 남아요/ }));
    await user.click(screen.getByRole("button", { name: "판단 기록하기" }));
    expect(screen.queryByText("아직 목표와 근거가 맞지 않아요")).not.toBeInTheDocument();
  });
});
