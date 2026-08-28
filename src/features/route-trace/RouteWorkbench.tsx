import type { Dispatch } from "react";
import { currentMission, type SessionAction, type SessionState } from "../../app/sessionReducer";
import { ActionButton } from "../../components/ActionButton";
import { STEP_LABELS } from "./stepLabels";
import {
  BaselineStep,
  ChangeStep,
  CompareStep,
  DecideStep,
  ObserveStep,
  OrderStep,
} from "./workbenchSteps";

interface RouteWorkbenchProps {
  readonly state: SessionState;
  readonly dispatch: Dispatch<SessionAction>;
}

/** 관찰부터 판단까지의 학습 화면. REPORT 화면은 LearningReport가 담당한다. */
export function RouteWorkbench({ state, dispatch }: RouteWorkbenchProps) {
  const mission = currentMission(state);
  const progress = state.progress[state.missionIndex]!;

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
            : "판단하기";

  const canGoNext =
    state.step === "ORDER"
      ? progress.connectionCheck?.valid === true
      : state.step === "CHANGE_ONE"
        ? progress.changeConfirmed
        : true;

  return (
    <section className="step-body" aria-label={`${mission.title} ${STEP_LABELS[state.step]}`}>
      <div className="goal-card">
        <h2>목표 카드</h2>
        <p>{mission.goal.statement}</p>
      </div>

      {state.step === "OBSERVE" && <ObserveStep mission={mission} />}
      {state.step === "ORDER" && (
        <OrderStep mission={mission} progress={progress} dispatch={dispatch} />
      )}
      {state.step === "BASELINE" && <BaselineStep mission={mission} progress={progress} />}
      {state.step === "CHANGE_ONE" && (
        <ChangeStep mission={mission} progress={progress} dispatch={dispatch} />
      )}
      {state.step === "COMPARE" && <CompareStep mission={mission} progress={progress} />}
      {state.step === "DECIDE" && (
        <DecideStep mission={mission} progress={progress} dispatch={dispatch} />
      )}

      <nav className="step-nav" aria-label="단계 이동">
        <ActionButton variant="secondary" onClick={() => dispatch({ type: "BACK" })}>
          뒤로 가기
        </ActionButton>
        {state.step !== "DECIDE" && (
          <ActionButton
            variant="primary"
            pulse={state.step === "CHANGE_ONE"}
            onClick={() => dispatch({ type: "NEXT" })}
            disabled={!canGoNext}
          >
            {nextLabel}
          </ActionButton>
        )}
      </nav>
    </section>
  );
}
