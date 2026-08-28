import { useEffect, useReducer, useRef, useState } from "react";
import { AccessibilityToolbar } from "../accessibility/AccessibilityToolbar";
import { ActionButton } from "../components/ActionButton";
import { ModalDialog } from "../components/ModalDialog";
import { ProgressSteps } from "../components/ProgressSteps";
import { UpdateHistoryButton } from "../components/UpdateHistoryButton";
import { UpdateHistoryDialog } from "../components/UpdateHistoryDialog";
import { EntranceScreen } from "../features/route-trace/EntranceScreen";
import { RouteWorkbench } from "../features/route-trace/RouteWorkbench";
import { STEP_LABELS } from "../features/route-trace/stepLabels";
import { sessionFlowSteps } from "./sessionReducer";
import {
  createInitialSessionState,
  currentMission,
  sessionReducer,
} from "./sessionReducer";
import { ErrorBoundary } from "./ErrorBoundary";

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
          {state.step === "INTRO" && <EntranceScreen onStart={() => dispatch({ type: "START" })} />}
          {state.step !== "INTRO" && <ProgressSteps items={flowItems} />}
          {state.step !== "INTRO" && state.step !== "REPORT" && (
            <RouteWorkbench state={state} dispatch={dispatch} />
          )}
          {state.step === "REPORT" && (
            <section className="step-body" aria-label={`${mission.title} 유통 기록`}>
              <div className="goal-card">
                <h2>이 미션 기록</h2>
                <p>
                  {progress.finalDecision?.accepted
                    ? "근거와 함께 경로가 연결됐어요."
                    : "다시 정한 결과가 기록에 남았어요."}
                </p>
              </div>
              <p className="step-hint">
                {state.missionIndex + 1}번째 미션을 끝냈어요. 결과 기록 화면은 다음 단계에서
                더 자세히 만나요.
              </p>
              <div className="step-nav">
                {!state.finished && (
                  <ActionButton variant="primary" onClick={() => dispatch({ type: "NEXT" })}>
                    {state.missionIndex + 1 < state.progress.length
                      ? "다음 미션 보기"
                      : "전체 기록 마치기"}
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
