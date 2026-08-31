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
import { LearningReport } from "../features/report/LearningReport";
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
    heading.focus({ preventScroll: true });
    if (typeof heading.scrollIntoView === "function") {
      heading.scrollIntoView({ block: "start", behavior: "auto" });
    }
  }, [state.step, state.missionIndex, state.finished]);

  const mission = currentMission(state);
  const headingText =
    state.step === "INTRO"
      ? "생산·유통 경로 추적소"
      : state.finished
        ? "전체 미션 · 학습 마무리"
        : `${mission.title} · ${STEP_LABELS[state.step]}`;

  const flowKeys = [...sessionFlowSteps(mission), "REPORT" as const];
  const currentFlowIndex = flowKeys.indexOf(state.step);
  const flowItems = flowKeys.map((step, index) => ({
    key: step,
    label: STEP_LABELS[step],
    current: step === state.step,
    completed: index < currentFlowIndex,
  }));

  return (
    <ErrorBoundary onReset={() => dispatch({ type: "CONFIRM_RESTART" })}>
      <div className="app-shell">
        <a className="skip-link" href="#main">
          본문으로 건너뛰기
        </a>
        <header className="app-header">
          <div className="app-header-inner">
            <div className="app-brand-lockup">
              <p className="app-brand">생산·유통 경로 추적소</p>
              {state.step !== "INTRO" && (
                <p className="app-context">
                  {mission.title} <span aria-hidden="true">·</span> {STEP_LABELS[state.step]}
                </p>
              )}
            </div>
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
          {state.step === "REPORT" && <LearningReport state={state} dispatch={dispatch} />}
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
