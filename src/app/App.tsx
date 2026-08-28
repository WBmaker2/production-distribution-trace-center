import { useEffect, useReducer, useRef, useState } from "react";
import { AccessibilityToolbar } from "../accessibility/AccessibilityToolbar";
import { ActionButton } from "../components/ActionButton";
import { ModalDialog } from "../components/ModalDialog";
import { ProgressSteps } from "../components/ProgressSteps";
import { UpdateHistoryButton } from "../components/UpdateHistoryButton";
import { UpdateHistoryDialog } from "../components/UpdateHistoryDialog";
import { EntranceScreen } from "../features/route-trace/EntranceScreen";
import type { SessionStep } from "../domain/types";
import {
  createInitialSessionState,
  currentMission,
  sessionFlowSteps,
  sessionReducer,
} from "./sessionReducer";
import { ErrorBoundary } from "./ErrorBoundary";

export const STEP_LABELS: Readonly<Record<SessionStep, string>> = {
  INTRO: "입구",
  OBSERVE: "단계 관찰",
  ORDER: "경로 조립",
  BASELINE: "기본 경로",
  CHANGE_ONE: "조건 변경",
  COMPARE: "전후 비교",
  DECIDE: "판단",
  REPORT: "유통 기록",
};

export function App() {
  const [state, dispatch] = useReducer(sessionReducer, undefined, createInitialSessionState);
  const [historyOpen, setHistoryOpen] = useState(false);
  const mainHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (state.step === "INTRO") return;
    const heading = mainHeadingRef.current;
    if (!heading) return;
    heading.focus();
    if (typeof heading.scrollIntoView === "function") {
      heading.scrollIntoView();
    }
  }, [state.step, state.missionIndex]);

  const mission = currentMission(state);
  const progress = state.progress[state.missionIndex]!;
  const headingText =
    state.step === "INTRO"
      ? "생산·유통 경로 추적소"
      : `${mission.title} · ${STEP_LABELS[state.step]}`;

  const flowItems = [
    ...sessionFlowSteps(mission).map((step) => ({
      key: step,
      label: STEP_LABELS[step],
      current: step === state.step,
    })),
    { key: "REPORT", label: STEP_LABELS.REPORT, current: state.step === "REPORT" },
  ];

  const nextLabel =
    state.step === "OBSERVE"
      ? "단계 배열하기"
      : state.step === "ORDER"
        ? "기본 경로 보기"
        : state.step === "BASELINE"
          ? mission.conditionChanges.length > 0
            ? "조건 바꾸기"
            : "판단하기"
          : state.step === "CHANGE_ONE"
            ? "전후 비교 확인"
            : state.step === "COMPARE"
              ? "판단하기"
              : "다음 미션 보기";

  const canGoNext =
    state.step === "ORDER"
      ? progress.connectionCheck?.valid === true
      : state.step === "CHANGE_ONE"
        ? progress.changeConfirmed
        : true;

  const showNextButton = !(state.step === "REPORT" && state.finished);

  return (
    <ErrorBoundary onReset={() => dispatch({ type: "CONFIRM_RESTART" })}>
      <div className="app-shell">
        <header className="app-header">
          <p className="app-brand">생산·유통 경로 추적소</p>
          <div className="app-tools">
            <AccessibilityToolbar />
            <UpdateHistoryButton onClick={() => setHistoryOpen(true)} />
            {state.step !== "INTRO" && (
              <ActionButton
                variant="ghost"
                onClick={() => dispatch({ type: "REQUEST_RESTART" })}
              >
                처음부터 다시 하기
              </ActionButton>
            )}
          </div>
        </header>
        <main className="app-main" id="main">
          <h1 ref={mainHeadingRef} tabIndex={-1} className="main-heading">
            {headingText}
          </h1>
          {state.step === "INTRO" ? (
            <EntranceScreen onStart={() => dispatch({ type: "START" })} />
          ) : (
            <section className="step-body" aria-label={`${mission.title} ${STEP_LABELS[state.step]}`}>
              <ProgressSteps items={flowItems} />
              <div className="goal-card">
                <h2>목표 카드</h2>
                <p>{mission.goal.statement}</p>
              </div>
              <p className="step-hint">
                {state.step === "OBSERVE" &&
                  "상품과 각 단계의 역할을 읽고, 어떤 차례로 일이 일어날지 생각해 보아요."}
                {state.step === "ORDER" && "단계 카드를 차례로 눌러 경로를 만들고 연결 검사를 해 보아요."}
                {state.step === "BASELINE" && "만든 경로의 시간·비용·잃음 토큰을 확인해 보아요."}
                {state.step === "CHANGE_ONE" && "검수된 조건 중 한 가지만 골라 바꿔 보아요."}
                {state.step === "COMPARE" && "바뀌기 전과 후의 토큰을 비교해 무엇이 달라졌는지 말해 보아요."}
                {state.step === "DECIDE" && "근거를 고르고 경로를 판단해 보아요."}
                {state.step === "REPORT" && "지금까지의 유통 기록을 확인해 보아요."}
              </p>
              <div className="step-nav">
                <ActionButton
                  variant="secondary"
                  onClick={() => dispatch({ type: "BACK" })}
                  disabled={state.step === "REPORT"}
                >
                  뒤로 가기
                </ActionButton>
                {showNextButton && (
                  <ActionButton
                    variant="primary"
                    pulse={state.step === "CHANGE_ONE"}
                    onClick={() => dispatch({ type: "NEXT" })}
                    disabled={!canGoNext}
                  >
                    {nextLabel}
                  </ActionButton>
                )}
              </div>
            </section>
          )}
        </main>
      </div>
      <UpdateHistoryDialog open={historyOpen} onClose={() => setHistoryOpen(false)} />
      <ModalDialog
        open={state.restartRequested}
        onClose={() => dispatch({ type: "CANCEL_RESTART" })}
        title="처음부터 다시 할까요?"
      >
        <p>지금까지 기록한 응답은 어디에도 저장되지 않았어요. 새로 시작하면 사라져요.</p>
        <div className="modal-actions">
          <ActionButton variant="secondary" onClick={() => dispatch({ type: "CANCEL_RESTART" })}>
            취소
          </ActionButton>
          <ActionButton
            variant="danger"
            onClick={() => dispatch({ type: "CONFIRM_RESTART" })}
          >
            처음부터 할게요
          </ActionButton>
        </div>
      </ModalDialog>
    </ErrorBoundary>
  );
}
