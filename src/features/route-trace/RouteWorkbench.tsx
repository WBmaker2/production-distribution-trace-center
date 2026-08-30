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

const STEP_INSTRUCTIONS: Readonly<Record<string, string>> = {
  OBSERVE: "상품이 어느 단계에서 무엇을 하는지 살펴보고, 토큰의 뜻을 읽어 보세요.",
  ORDER: "단계 카드를 순서대로 놓아 상품이 이동하는 한 줄 경로를 만들어 보세요.",
  BASELINE: "만든 경로의 기본 토큰을 표에서 확인하고, 서로 어떤 차이가 있는지 찾아보세요.",
  CHANGE_ONE: "검수된 조건 중 하나만 바꾼 뒤 경로에 어떤 변화가 생기는지 예상해 보세요.",
  COMPARE: "바꾸기 전과 후를 나란히 비교하고, 늘거나 줄어든 토큰을 말로 설명해 보세요.",
  DECIDE: "목표와 근거를 다시 읽고, 지금 기록할 판단과 필요한 자료를 고르세요.",
};

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
      <div className="step-topline">
        <p className="step-index">
          현재 미션 {state.missionIndex + 1} / {state.progress.length}
        </p>
        <p className="step-current-label">{STEP_LABELS[state.step]}</p>
      </div>
      <header className="step-intro">
        <h2>지금 할 일</h2>
        <p>{STEP_INSTRUCTIONS[state.step]}</p>
        <div className="goal-card">
          <p className="goal-label">목표</p>
          <p>{mission.goal.statement}</p>
        </div>
      </header>

      <div className="activity-board">
        <div className="activity-board-heading">
          <span>활동 보드</span>
          <span className="board-note">지금 이 단계에서 기록해요</span>
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
      </div>

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
