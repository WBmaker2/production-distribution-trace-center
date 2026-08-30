import type { Dispatch } from "react";
import {
  currentMission,
  type MissionProgress,
  type SessionAction,
  type SessionState,
} from "../../app/sessionReducer";
import { missions } from "../../content/missions";
import { routeNodeIds } from "../../domain/routeEvaluator";
import { formatToken } from "../route-trace/workbenchSteps";
import { ActionButton } from "../../components/ActionButton";

interface LearningReportProps {
  readonly state: SessionState;
  readonly dispatch: Dispatch<SessionAction>;
}

function decisionLabel(missionId: string, decision: string): string {
  const mission = missions.find((candidate) => candidate.id === missionId);
  const rule = mission?.decisionRules.find((candidate) => candidate.decision === decision);
  return rule?.label ?? decision;
}

function ReportCard({
  missionIndex,
  progress,
}: {
  readonly missionIndex: number;
  readonly progress: MissionProgress;
}) {
  const mission = missions[missionIndex]!;
  const record = progress.finalDecision ?? progress.firstDecision;
  const nodeById = new Map(mission.nodes.map((node) => [node.id, node]));
  const change =
    record?.appliedChangeId === null || record === null
      ? null
      : (mission.conditionChanges.find((candidate) => candidate.id === record.appliedChangeId) ??
        null);

  if (record === null || !progress.completed) {
    return (
      <li className="report-card">
        <h3>
          {missionIndex + 1}. {mission.title}
        </h3>
        <p>아직 진행 중이에요. 미션을 끝내면 기록이 채워져요.</p>
      </li>
    );
  }

  const evidenceLabels = [
    ...record.evidenceKeys.map(
      (key) => mission.evidenceOptions.find((option) => option.key === key)?.label ?? key,
    ),
    ...record.dataKeys.map(
      (key) =>
        `필요한 자료: ${mission.missingDataOptions.find((option) => option.key === key)?.label ?? key}`,
    ),
  ];
  const routeText =
    record.routeId.length === 0
      ? "아직 경로를 만들지 않았어요"
      : routeNodeIds(record.routeId)
          .map((nodeId) => nodeById.get(nodeId)?.label ?? nodeId)
          .join(" → ");

  return (
    <li className="report-card" data-tradeoff-keys={record.tradeoffKeys.join(",")}>
      <h3>
        {missionIndex + 1}. {mission.title}
      </h3>
      <dl className="report-facts">
        <dt>최초 판단</dt>
        <dd>
          {decisionLabel(mission.id, record.decision)} —{" "}
          {progress.firstDecision?.accepted
            ? "처음 판단이 기록에 통과했어요."
            : "처음 판단은 기록에 통과하지 않았어요."}
        </dd>
        <dt>경로</dt>
        <dd>{routeText}</dd>
        <dt>바꾼 조건</dt>
        <dd>{change ? change.label : "조건을 바꾸지 않았어요"}</dd>
        <dt>근거</dt>
        <dd>
          {evidenceLabels.length > 0 ? (
            <ul className="evidence-list">
              {evidenceLabels.map((label) => (
                <li key={label}>{label}</li>
              ))}
            </ul>
          ) : (
            "고른 근거가 없어요"
          )}
        </dd>
        <dt>최종 토큰</dt>
        <dd>
          시간 {formatToken(record.totals.timeTokens)} · 비용{" "}
          {formatToken(record.totals.costTokens)} · 잃음 {formatToken(record.totals.lossTokens)}
        </dd>
        {progress.revisionUsed && (
          <>
            <dt>다시 정한 결과</dt>
            <dd>
              {record.accepted
                ? "다시 정한 판단이 기록에 통과했어요."
                : "다시 정했지만 통과하지 못했어요. 그래도 기록은 소중해요."}
            </dd>
          </>
        )}
      </dl>
      <p className={record.accepted ? "report-result tone-success" : "report-result"}>
        {record.accepted
          ? "근거와 함께 경로가 연결됐어요."
          : "이 판단은 검수 규칙과 맞지 않았어요. 기록은 그대로 남아요."}
      </p>
    </li>
  );
}

export function LearningReport({ state, dispatch }: LearningReportProps) {
  const mission = currentMission(state);
  return (
    <section className="learning-report" aria-label={`${mission.title} 유통 기록`}>
      <header className="report-intro">
        <h2>판단의 흔적</h2>
        <p className="step-hint">
          채점하지 않아요. 최초 판단과 근거, 수정 결과를 함께 보여 주어요.
        </p>
      </header>
      <ol className="report-list">
        {state.progress.map((progress, index) => (
          <ReportCard key={missions[index]!.id} missionIndex={index} progress={progress} />
        ))}
      </ol>
      <div className="step-nav no-print">
        <ActionButton variant="secondary" onClick={() => window.print()}>
          인쇄하기
        </ActionButton>
        <ActionButton
          variant="ghost"
          onClick={() => dispatch({ type: "REQUEST_RESTART" })}
        >
          처음부터 다시 하기
        </ActionButton>
        {!state.finished && (
          <ActionButton variant="primary" onClick={() => dispatch({ type: "NEXT" })}>
            {state.missionIndex + 1 < state.progress.length
              ? "다음 미션 보기"
              : "전체 기록 마치기"}
          </ActionButton>
        )}
      </div>
    </section>
  );
}
