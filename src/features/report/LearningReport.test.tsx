import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useReducer } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  createInitialSessionState,
  sessionReducer,
  type SessionState,
} from "../../app/sessionReducer";
import { LearningReport } from "./LearningReport";

function solveCurrentMission(
  state: SessionState,
  plan: {
    routeId: string;
    changeId?: string | null;
    evidenceKeys?: readonly string[];
    dataKeys?: readonly string[];
  },
): SessionState {
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

function strawberryWithRevision(): SessionState {
  let state = createInitialSessionState();
  state = sessionReducer(state, { type: "START" });
  state = sessionReducer(state, { type: "NEXT" });
  for (const nodeId of ["farm", "sort", "truck", "store"]) {
    state = sessionReducer(state, { type: "APPEND_CARD", nodeId });
  }
  state = sessionReducer(state, { type: "CHECK_CONNECTION" });
  state = sessionReducer(state, { type: "NEXT" });
  state = sessionReducer(state, { type: "NEXT" });
  state = sessionReducer(state, { type: "SUBMIT_DECISION" });
  state = sessionReducer(state, { type: "BEGIN_REVISION" });
  state = sessionReducer(state, { type: "APPEND_CARD", nodeId: "farm" });
  state = sessionReducer(state, { type: "CHECK_CONNECTION" });
  state = sessionReducer(state, { type: "NEXT" });
  state = sessionReducer(state, { type: "NEXT" });
  state = sessionReducer(state, { type: "TOGGLE_EVIDENCE", key: "stage-order-reason" });
  return sessionReducer(state, { type: "SUBMIT_DECISION" });
}

function notebookReportState(): SessionState {
  let state = createInitialSessionState();
  state = solveCurrentMission(state, {
    routeId: "farm>sort>truck>store",
    evidenceKeys: ["stage-order-reason"],
  });
  state = sessionReducer(state, { type: "NEXT" });
  state = solveCurrentMission(state, {
    routeId: "raw-paper>factory>warehouse-b>stationery",
    evidenceKeys: ["warehouse-tradeoff"],
  });
  return state;
}

function finishedReportState(): SessionState {
  let state = createInitialSessionState();
  const plans = [
    { routeId: "farm>sort>truck>store", evidenceKeys: ["stage-order-reason"] },
    { routeId: "raw-paper>factory>warehouse-a>stationery", evidenceKeys: ["warehouse-tradeoff"] },
    {
      routeId: "producer>truck>shop",
      changeId: "bridge-check",
      evidenceKeys: ["time-propagates", "cost-still-unknown"],
    },
    {
      routeId: "producer>package-small>truck-twice>store",
      evidenceKeys: ["loss-goes-down", "time-cost-go-up"],
    },
    {
      routeId: "producer>transport-near>store>buyer",
      evidenceKeys: ["near-wins-time-loss", "far-wins-cost"],
    },
    { routeId: "producer>transport>store", dataKeys: ["transport-cost"] },
  ] as const;

  plans.forEach((plan, index) => {
    state = solveCurrentMission(state, plan);
    if (index < plans.length - 1) state = sessionReducer(state, { type: "NEXT" });
  });
  return sessionReducer(state, { type: "NEXT" });
}

function ReportHarness({ initial }: { initial: SessionState }) {
  const [state, dispatch] = useReducer(sessionReducer, initial);
  return <LearningReport state={state} dispatch={dispatch} />;
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("LearningReport", () => {
  it("최초 판단과 근거, 다시 정한 결과를 함께 보여 준다", () => {
    render(<ReportHarness initial={strawberryWithRevision()} />);
    expect(screen.getByText("최초 판단")).toBeInTheDocument();
    expect(screen.getByText(/근거와 함께 경로를 기록했어요/)).toBeInTheDocument();
    expect(
      screen.getByText("생산한 다음에 골라 담고, 운송하고, 마지막에 팔아요"),
    ).toBeInTheDocument();
    expect(screen.getByText("다시 정한 결과")).toBeInTheDocument();
  });

  it("점수·순위·등급을 만들지 않는다", () => {
    render(<ReportHarness initial={strawberryWithRevision()} />);
    expect(screen.queryByText(/점수/)).not.toBeInTheDocument();
    expect(screen.queryByText(/순위/)).not.toBeInTheDocument();
    expect(screen.queryByText(/등급/)).not.toBeInTheDocument();
  });

  it("아직 진행하지 않은 미션은 진행 중으로 표시한다", () => {
    render(<ReportHarness initial={strawberryWithRevision()} />);
    expect(screen.getAllByText(/아직 진행 중/).length).toBe(5);
  });

  it("승인 경로의 절충 근거 키를 기록에 보존한다", () => {
    const { container } = render(<ReportHarness initial={notebookReportState()} />);
    const cards = container.querySelectorAll("[data-tradeoff-keys]");
    const preserved = [...cards].some((card) =>
      (card.getAttribute("data-tradeoff-keys") ?? "").includes("cost-less-vs-"),
    );
    expect(preserved).toBe(true);
  });

  it("인쇄하기와 처음부터 다시 하기 버튼을 제공한다", async () => {
    const printSpy = vi.fn().mockImplementation(() => {});
    vi.stubGlobal("print", printSpy);
    window.print = printSpy;
    const dispatch = vi.fn();
    const user = userEvent.setup();
    render(<LearningReport state={strawberryWithRevision()} dispatch={dispatch} />);
    await user.click(screen.getByRole("button", { name: "인쇄하기" }));
    expect(printSpy).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole("button", { name: "처음부터 다시 하기" }));
    expect(dispatch).toHaveBeenCalledWith({ type: "REQUEST_RESTART" });
  });

  it("전체 미션을 끝내면 takeaway와 다음 학습 행동을 보여 준다", () => {
    render(<ReportHarness initial={finishedReportState()} />);
    expect(
      screen.getByRole("heading", { level: 2, name: "모든 경로를 살펴봤어요" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/시간·비용·손실을 함께 비교하고/)).toBeInTheDocument();
    expect(screen.getByText(/주변 상품 하나를 골라/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "모든 미션 끝내기" })).not.toBeInTheDocument();
  });
});
