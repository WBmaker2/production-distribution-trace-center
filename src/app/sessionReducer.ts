import { missions } from "../content/missions";
import {
  evaluateRouteDecision,
  routeIdFromNodeIds,
  validateRoute,
} from "../domain/routeEvaluator";
import type {
  Decision,
  RouteMission,
  RouteTotals,
  RouteValidation,
  SessionStep,
} from "../domain/types";

/**
 * 계획 문서 9의 SessionState 공통 규칙.
 * - step은 정의된 전이표를 통해서만 바뀐다.
 * - missionIndex 범위는 0부터 5까지다.
 * - 응답·최초 판단·근거·수정 기록은 불변 업데이트한다.
 * - REPORT 이후에는 답을 바꾸지 못하고 다시 보기(다음·재시작 요청)만 허용한다.
 * - 알 수 없는 action, 범위를 벗어난 조작, 이전 revision 응답은 상태를 바꾸지 않는다.
 */

export interface DecisionRecord {
  readonly decision: Decision;
  readonly routeId: string;
  readonly appliedChangeId: string | null;
  readonly evidenceKeys: readonly string[];
  readonly dataKeys: readonly string[];
  readonly totals: RouteTotals;
  readonly tradeoffKeys: readonly string[];
  readonly accepted: boolean;
}

export interface MissionProgress {
  readonly assembledNodeIds: readonly string[];
  readonly connectionCheck: RouteValidation | null;
  /** null은 "조건을 바꾸지 않기로 선택" 또는 "아직 선택 전"이다. changeConfirmed로 구분한다. */
  readonly appliedChangeId: string | null;
  readonly changeConfirmed: boolean;
  readonly selectedEvidenceKeys: readonly string[];
  readonly selectedDataKeys: readonly string[];
  readonly firstDecision: DecisionRecord | null;
  readonly finalDecision: DecisionRecord | null;
  readonly revisionUsed: boolean;
  readonly completed: boolean;
}

export interface SessionState {
  readonly step: SessionStep;
  readonly missionIndex: number;
  readonly progress: readonly MissionProgress[];
  readonly restartRequested: boolean;
  readonly finished: boolean;
}

export type SessionAction =
  | { type: "START" }
  | { type: "NEXT" }
  | { type: "BACK" }
  | { type: "APPEND_CARD"; nodeId: string }
  | { type: "REMOVE_CARD"; index: number }
  | { type: "MOVE_CARD"; index: number; direction: "up" | "down" }
  | { type: "RESET_ROUTE" }
  | { type: "CHECK_CONNECTION" }
  | { type: "APPLY_CHANGE"; changeId: string | null }
  | { type: "TOGGLE_EVIDENCE"; key: string }
  | { type: "TOGGLE_DATA"; key: string }
  | { type: "SUBMIT_DECISION" }
  | { type: "BEGIN_REVISION" }
  | { type: "REQUEST_RESTART" }
  | { type: "CANCEL_RESTART" }
  | { type: "CONFIRM_RESTART" };

function emptyProgress(): MissionProgress {
  return {
    assembledNodeIds: [],
    connectionCheck: null,
    appliedChangeId: null,
    changeConfirmed: false,
    selectedEvidenceKeys: [],
    selectedDataKeys: [],
    firstDecision: null,
    finalDecision: null,
    revisionUsed: false,
    completed: false,
  };
}

export function createInitialSessionState(): SessionState {
  return {
    step: "INTRO",
    missionIndex: 0,
    progress: missions.map(() => emptyProgress()),
    restartRequested: false,
    finished: false,
  };
}

/** 미션의 조건 변화 유무에 따라 화면이 지나야 할 흐름 단계 목록. */
export function sessionFlowSteps(mission: RouteMission): readonly SessionStep[] {
  const steps: SessionStep[] = ["OBSERVE", "ORDER", "BASELINE"];
  if (mission.conditionChanges.length > 0) {
    steps.push("CHANGE_ONE", "COMPARE");
  }
  steps.push("DECIDE");
  return steps;
}

export function currentMission(state: SessionState): RouteMission {
  return missions[state.missionIndex] as RouteMission;
}

function updateCurrentProgress(
  state: SessionState,
  update: (progress: MissionProgress) => MissionProgress,
): SessionState {
  return {
    ...state,
    progress: state.progress.map((progress, index) =>
      index === state.missionIndex ? update(progress) : progress,
    ),
  };
}

/** 경로를 다시 만지면 연결 검사와 조건 선택은 더 이상 유효하지 않다. */
function clearRouteDerivedAnswers(progress: MissionProgress): MissionProgress {
  return {
    ...progress,
    assembledNodeIds: [],
    connectionCheck: null,
    appliedChangeId: null,
  };
}

function routeMutated(progress: MissionProgress): MissionProgress {
  return {
    ...progress,
    connectionCheck: null,
    appliedChangeId: null,
    changeConfirmed: false,
  };
}

const BACK_TARGETS: Partial<Record<SessionStep, SessionStep>> = {
  OBSERVE: "INTRO",
  ORDER: "OBSERVE",
  BASELINE: "ORDER",
  CHANGE_ONE: "BASELINE",
  COMPARE: "CHANGE_ONE",
};

export function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  const mission = currentMission(state);
  const progress = state.progress[state.missionIndex] as MissionProgress;

  switch (action.type) {
    case "START": {
      if (state.step !== "INTRO") return state;
      return { ...state, step: "OBSERVE" };
    }

    case "NEXT": {
      switch (state.step) {
        case "OBSERVE":
          return { ...state, step: "ORDER" };
        case "ORDER":
          if (progress.connectionCheck?.valid !== true) return state;
          return { ...state, step: "BASELINE" };
        case "BASELINE":
          return { ...state, step: mission.conditionChanges.length > 0 ? "CHANGE_ONE" : "DECIDE" };
        case "CHANGE_ONE":
          if (progress.changeConfirmed !== true) return state;
          return { ...state, step: "COMPARE" };
        case "COMPARE":
          return { ...state, step: "DECIDE" };
        case "REPORT": {
          if (state.finished) return state;
          if (state.missionIndex + 1 < missions.length) {
            return { ...state, missionIndex: state.missionIndex + 1, step: "OBSERVE" };
          }
          return { ...state, finished: true };
        }
        default:
          return state;
      }
    }

    case "BACK": {
      if (state.step === "DECIDE") {
        return {
          ...state,
          step: mission.conditionChanges.length > 0 ? "COMPARE" : "BASELINE",
        };
      }
      const target = BACK_TARGETS[state.step];
      if (!target) return state;
      return { ...state, step: target };
    }

    case "APPEND_CARD": {
      if (state.step !== "ORDER") return state;
      if (!mission.nodes.some((node) => node.id === action.nodeId)) return state;
      if (progress.assembledNodeIds.includes(action.nodeId)) return state;
      return updateCurrentProgress(state, (current) =>
        routeMutated({
          ...current,
          assembledNodeIds: [...current.assembledNodeIds, action.nodeId],
        }),
      );
    }

    case "REMOVE_CARD": {
      if (state.step !== "ORDER") return state;
      if (action.index < 0 || action.index >= progress.assembledNodeIds.length) return state;
      return updateCurrentProgress(state, (current) =>
        routeMutated({
          ...current,
          assembledNodeIds: current.assembledNodeIds.filter(
            (_, index) => index !== action.index,
          ),
        }),
      );
    }

    case "MOVE_CARD": {
      if (state.step !== "ORDER") return state;
      const { index, direction } = action;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (index < 0 || index >= progress.assembledNodeIds.length) return state;
      if (targetIndex < 0 || targetIndex >= progress.assembledNodeIds.length) return state;
      return updateCurrentProgress(state, (current) => {
        const moved = [...current.assembledNodeIds];
        const [item] = moved.splice(index, 1);
        moved.splice(targetIndex, 0, item as string);
        return routeMutated({ ...current, assembledNodeIds: moved });
      });
    }

    case "RESET_ROUTE": {
      if (state.step !== "ORDER") return state;
      return updateCurrentProgress(state, clearRouteDerivedAnswers);
    }

    case "CHECK_CONNECTION": {
      if (state.step !== "ORDER") return state;
      const validation = validateRoute(mission, progress.assembledNodeIds);
      return updateCurrentProgress(state, (current) => ({
        ...current,
        connectionCheck: validation,
      }));
    }

    case "APPLY_CHANGE": {
      if (state.step !== "CHANGE_ONE") return state;
      if (action.changeId !== null && !mission.conditionChanges.some((c) => c.id === action.changeId)) {
        return state;
      }
      return updateCurrentProgress(state, (current) => ({
        ...current,
        appliedChangeId: action.changeId,
        changeConfirmed: true,
      }));
    }

    case "TOGGLE_EVIDENCE": {
      if (state.step !== "DECIDE") return state;
      if (!mission.evidenceOptions.some((option) => option.key === action.key)) return state;
      return updateCurrentProgress(state, (current) => ({
        ...current,
        selectedEvidenceKeys: current.selectedEvidenceKeys.includes(action.key)
          ? current.selectedEvidenceKeys.filter((key) => key !== action.key)
          : [...current.selectedEvidenceKeys, action.key],
      }));
    }

    case "TOGGLE_DATA": {
      if (state.step !== "DECIDE") return state;
      if (!mission.missingDataOptions.some((option) => option.key === action.key)) return state;
      return updateCurrentProgress(state, (current) => ({
        ...current,
        selectedDataKeys: current.selectedDataKeys.includes(action.key)
          ? current.selectedDataKeys.filter((key) => key !== action.key)
          : [...current.selectedDataKeys, action.key],
      }));
    }

    case "SUBMIT_DECISION": {
      if (state.step !== "DECIDE") return state;
      if (progress.finalDecision !== null) return state;
      if (progress.firstDecision !== null && !progress.revisionUsed) return state;

      const evaluation = evaluateRouteDecision(mission, {
        decision: mission.decisionRules[0]?.decision ?? "revise-route",
        routeId: routeIdFromNodeIds(progress.assembledNodeIds),
        appliedChangeId: progress.appliedChangeId,
        selectedEvidenceKeys: progress.selectedEvidenceKeys,
        selectedDataKeys: progress.selectedDataKeys,
      });
      const record: DecisionRecord = {
        decision: evaluation.decision,
        routeId: routeIdFromNodeIds(progress.assembledNodeIds),
        appliedChangeId: progress.appliedChangeId,
        evidenceKeys: progress.selectedEvidenceKeys,
        dataKeys: progress.selectedDataKeys,
        totals: evaluation.totals,
        tradeoffKeys: evaluation.tradeoffKeys,
        accepted: evaluation.accepted,
      };

      const isFinalSubmission = evaluation.accepted || progress.revisionUsed;
      if (!isFinalSubmission) {
        return updateCurrentProgress(state, (current) => ({
          ...current,
          firstDecision: record,
        }));
      }
      return {
        ...updateCurrentProgress(state, (current) => ({
          ...current,
          firstDecision: current.firstDecision ?? record,
          finalDecision: record,
          completed: true,
        })),
        step: "REPORT",
      };
    }

    case "BEGIN_REVISION": {
      if (state.step !== "DECIDE") return state;
      if (progress.firstDecision === null || progress.finalDecision !== null) return state;
      if (progress.revisionUsed) return state;
      return updateCurrentProgress({ ...state, step: "ORDER" }, (current) => ({
        ...current,
        revisionUsed: true,
      }));
    }

    case "REQUEST_RESTART":
      if (state.restartRequested) return state;
      return { ...state, restartRequested: true };

    case "CANCEL_RESTART":
      if (!state.restartRequested) return state;
      return { ...state, restartRequested: false };

    case "CONFIRM_RESTART":
      return createInitialSessionState();

    default:
      return state;
  }
}
