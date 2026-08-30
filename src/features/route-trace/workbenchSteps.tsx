import type { Dispatch } from "react";
import {
  applyConditionChange,
  computeTotals,
  listDecisionOptions,
  listEvidenceChoices,
  listMissingDataChoices,
  routeIdFromNodeIds,
} from "../../domain/routeEvaluator";
import {
  STAGE_KIND_LABELS,
  type RouteMission,
  type RouteTotals,
} from "../../domain/types";
import type { MissionProgress, SessionAction } from "../../app/sessionReducer";
import { ActionButton } from "../../components/ActionButton";
import { FeedbackPanel } from "./FeedbackPanel";

export type ProgressOfSession = MissionProgress;

export function formatToken(value: number | null): string {
  return value === null ? "자료 없음" : String(value);
}

function formatDiff(value: number | null): string {
  if (value === null) return "자료 없음";
  if (value === 0) return "변화 없음";
  return value > 0 ? `+${value}` : String(value);
}

const CONNECTION_REASON_MESSAGES: Readonly<Record<string, string>> = {
  "route-too-short": "단계를 두 개 이상 골라야 해요.",
  "route-has-unknown-stage": "모르는 단계가 섞여 있어요.",
  "route-has-repeated-stage": "같은 단계를 두 번 쓸 수 없어요.",
  "route-must-start-with-first-stage": "경로는 시작 단계에서 시작해야 해요.",
  "route-must-end-with-last-stage": "경로는 마지막 단계에서 끝나야 해요.",
  "route-not-connected": "단계가 이어지지 않았어요.",
};

interface StepCommonProps {
  readonly mission: RouteMission;
  readonly progress: MissionProgress;
  readonly dispatch: Dispatch<SessionAction>;
}

function TokenText({ token, label }: { token: number | null; label: string }) {
  return (
    <span className={`token token-${label}`}>
      {label} <span className="token-value">{formatToken(token)}</span>
    </span>
  );
}

export function ObserveStep({ mission }: { mission: RouteMission }) {
  return (
    <div className="observe-step">
      <p className="scene-text">{mission.scene}</p>
      {mission.image && (
        <img
          className="goods-image"
          src={mission.image.src}
          alt={mission.image.alt}
          width="240"
          height="180"
          loading="lazy"
        />
      )}
      <ul className="token-legend" aria-label="토큰 범례">
        <li><strong>시간</strong> 단계가 걸리는 정도</li>
        <li><strong>비용</strong> 드는 정도</li>
        <li><strong>잃음</strong> 줄어드는 정도</li>
      </ul>
      <ul className="stage-cards">
        {mission.nodes.map((node) => (
          <li key={node.id} className="stage-card">
            <span className="stage-kind">{STAGE_KIND_LABELS[node.kind]}</span>
            <span className="stage-label">{node.label}</span>
            <span className="stage-tokens">
              <TokenText token={node.timeTokens} label="시간" />
              <TokenText token={node.costTokens} label="비용" />
              <TokenText token={node.lossTokens} label="잃음" />
            </span>
          </li>
        ))}
      </ul>
      <p className="step-hint">
        토큰은 비교 연습용 가상 숫자예요. 자료 없음은 아직 모른다는 뜻이고, 0이 아니에요.
      </p>
    </div>
  );
}

export function OrderStep({ mission, progress, dispatch }: StepCommonProps) {
  const nodeById = new Map(mission.nodes.map((node) => [node.id, node]));
  const assembledSet = new Set(progress.assembledNodeIds);
  const pool = mission.nodes.filter((node) => !assembledSet.has(node.id));

  return (
    <div className="order-step">
      <div className="order-layout">
        <section className="order-panel route-panel" aria-labelledby="assembled-route-title">
          <h3 id="assembled-route-title">만든 경로</h3>
          {progress.assembledNodeIds.length === 0 ? (
            <p>아래 카드를 차례로 눌러 경로를 만들어 보아요.</p>
          ) : (
            <ol className="assembled-route">
              {progress.assembledNodeIds.map((nodeId, index) => {
                const node = nodeById.get(nodeId)!;
                return (
                  <li key={nodeId} className="assembled-item">
                    <span className="assembled-label">
                      {index + 1}. {STAGE_KIND_LABELS[node.kind]} · {node.label}
                    </span>
                    <span className="assembled-actions">
                      <button
                        type="button"
                        className="mini-button"
                        aria-label={`${node.label} 위로 옮기기`}
                        disabled={index === 0}
                        onClick={() => dispatch({ type: "MOVE_CARD", index, direction: "up" })}
                      >
                        위로
                      </button>
                      <button
                        type="button"
                        className="mini-button"
                        aria-label={`${node.label} 아래로 옮기기`}
                        disabled={index === progress.assembledNodeIds.length - 1}
                        onClick={() => dispatch({ type: "MOVE_CARD", index, direction: "down" })}
                      >
                        아래로
                      </button>
                      <button
                        type="button"
                        className="mini-button"
                        aria-label={`${node.label} 경로에서 빼기`}
                        onClick={() => dispatch({ type: "REMOVE_CARD", index })}
                      >
                        빼기
                      </button>
                    </span>
                  </li>
                );
              })}
            </ol>
          )}

        </section>
        <section className="order-panel pool-panel" aria-labelledby="card-pool-title">
          <h3 id="card-pool-title">남은 단계 카드</h3>
          <ul className="card-pool">
            {pool.map((node) => (
              <li key={node.id}>
                <button
                  type="button"
                  className="pool-card"
                  aria-label={`경로에 넣기: ${node.label}`}
                  onClick={() => dispatch({ type: "APPEND_CARD", nodeId: node.id })}
                >
                  <span className="stage-kind">{STAGE_KIND_LABELS[node.kind]}</span>
                  {node.label}
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="check-row">
        <ActionButton variant="secondary" onClick={() => dispatch({ type: "CHECK_CONNECTION" })}>
          연결 검사
        </ActionButton>
        <ActionButton
          variant="ghost"
          onClick={() => dispatch({ type: "RESET_ROUTE" })}
          disabled={progress.assembledNodeIds.length === 0}
        >
          다시 만들기
        </ActionButton>
      </div>

      {progress.connectionCheck !== null &&
        (progress.connectionCheck.valid ? (
          <FeedbackPanel tone="success" title="연결 검사를 통과했어요">
            <p>경로가 끊김 없이 이어졌어요. 다음 단계에서 토큰을 확인해 보아요.</p>
          </FeedbackPanel>
        ) : (
          <FeedbackPanel tone="warning" title="아직 연결되지 않았어요">
            <ul className="reason-list">
              {progress.connectionCheck.reasonKeys.map((key) => (
                <li key={key}>
                  {CONNECTION_REASON_MESSAGES[key] ?? "경로를 다시 확인해 보아요."}
                </li>
              ))}
            </ul>
          </FeedbackPanel>
        ))}
    </div>
  );
}

function TotalsTable({
  mission,
  nodeIds,
  caption,
}: {
  readonly mission: RouteMission;
  readonly nodeIds: readonly string[];
  readonly caption: string;
}) {
  const nodeById = new Map(mission.nodes.map((node) => [node.id, node]));
  const totals: RouteTotals = computeTotals(mission, nodeIds, null);
  return (
    <table className="token-table">
      <caption>{caption}</caption>
      <thead>
        <tr>
          <th scope="col">단계</th>
          <th scope="col">시간 토큰</th>
          <th scope="col">비용 토큰</th>
          <th scope="col">잃음 토큰</th>
        </tr>
      </thead>
      <tbody>
        {nodeIds.map((nodeId) => {
          const node = nodeById.get(nodeId)!;
          return (
            <tr key={nodeId}>
              <th scope="row">
                {STAGE_KIND_LABELS[node.kind]} · {node.label}
              </th>
              <td data-label="시간 토큰">{formatToken(node.timeTokens)}</td>
              <td data-label="비용 토큰">{formatToken(node.costTokens)}</td>
              <td data-label="잃음 토큰">{formatToken(node.lossTokens)}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">합계</th>
          <td data-label="시간 토큰">{formatToken(totals.timeTokens)}</td>
          <td data-label="비용 토큰">{formatToken(totals.costTokens)}</td>
          <td data-label="잃음 토큰">{formatToken(totals.lossTokens)}</td>
        </tr>
      </tfoot>
    </table>
  );
}

export function BaselineStep({
  mission,
  progress,
}: {
  readonly mission: RouteMission;
  readonly progress: MissionProgress;
}) {
  return (
    <div className="baseline-step">
      <p className="step-hint">
        만든 경로의 단계별 토큰이에요. 연결선 토큰은 이 활동에서 0이어서 합계에 변화가
        없어요.
      </p>
      <TotalsTable
        mission={mission}
        nodeIds={progress.assembledNodeIds}
        caption="기본 경로 토큰 표"
      />
    </div>
  );
}

export function ChangeStep({ mission, progress, dispatch }: StepCommonProps) {
  const baselineTotals = computeTotals(mission, progress.assembledNodeIds, null);
  const afterTotals =
    progress.appliedChangeId === null
      ? baselineTotals
      : computeTotals(mission, progress.assembledNodeIds, progress.appliedChangeId);
  return (
    <div className="change-step">
      <fieldset className="choice-fieldset">
        <legend>검수된 조건 중 딱 한 가지만 바꿔 보아요</legend>
        {mission.conditionChanges.map((change) => (
          <label key={change.id} className="choice-label">
            <input
              type="radio"
              name="condition-choice"
              checked={progress.appliedChangeId === change.id}
              onChange={() => dispatch({ type: "APPLY_CHANGE", changeId: change.id })}
            />
            <span>
              <strong>{change.label}</strong>
              <br />
              {change.description}
            </span>
          </label>
        ))}
        <label className="choice-label">
          <input
            type="radio"
            name="condition-choice"
            checked={progress.changeConfirmed && progress.appliedChangeId === null}
            onChange={() => dispatch({ type: "APPLY_CHANGE", changeId: null })}
          />
          <span>조건을 바꾸지 않고 그대로 유지</span>
        </label>
      </fieldset>
      {progress.changeConfirmed && (
        <FeedbackPanel tone="info" title="바꾼 조건을 적용한 모습">
          <p>
            적용 후 합계 — 시간 {formatToken(afterTotals.timeTokens)} · 비용{" "}
            {formatToken(afterTotals.costTokens)} · 잃음 {formatToken(afterTotals.lossTokens)}
            {" ("}기본 합계 — 시간 {formatToken(baselineTotals.timeTokens)} · 비용{" "}
            {formatToken(baselineTotals.costTokens)} · 잃음{" "}
            {formatToken(baselineTotals.lossTokens)}
            {")"}
          </p>
        </FeedbackPanel>
      )}
    </div>
  );
}

export function CompareStep({ mission, progress }: Omit<StepCommonProps, "dispatch">) {
  const before = computeTotals(mission, progress.assembledNodeIds, null);
  const result =
    progress.appliedChangeId === null
      ? null
      : applyConditionChange(
          mission,
          progress.appliedChangeId,
          routeIdFromNodeIds(progress.assembledNodeIds),
        );
  const after = result ? result.afterTotals : before;
  const diff = result ? result.diff : { timeTokens: 0, costTokens: 0, lossTokens: 0 };
  const rows: readonly {
    label: string;
    before: number | null;
    after: number | null;
    diff: number | null;
  }[] = [
    {
      label: "시간 토큰",
      before: before.timeTokens,
      after: after.timeTokens,
      diff: diff.timeTokens,
    },
    {
      label: "비용 토큰",
      before: before.costTokens,
      after: after.costTokens,
      diff: diff.costTokens,
    },
    {
      label: "잃음 토큰",
      before: before.lossTokens,
      after: after.lossTokens,
      diff: diff.lossTokens,
    },
  ];
  return (
    <div className="compare-step">
      {result === null && <p>조건을 바꾸지 않았어요. 전후가 같아요.</p>}
      <table className="token-table">
        <caption>전후 비교 표</caption>
        <thead>
          <tr>
            <th scope="col">항목</th>
            <th scope="col">바꾸기 전</th>
            <th scope="col">바꾼 후</th>
            <th scope="col">변화</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td data-label="바꾸기 전">{formatToken(row.before)}</td>
              <td data-label="바꾼 후">{formatToken(row.after)}</td>
              <td data-label="변화">{formatDiff(row.diff)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="step-hint">
        자료 없음은 그대로 자료 없음으로 남아요. 0으로 바꿔서 계산하지 않아요.
      </p>
    </div>
  );
}

export function DecideStep({ mission, progress, dispatch }: StepCommonProps) {
  const decisions = listDecisionOptions(mission);
  const rejectedFirst =
    progress.firstDecision !== null &&
    !progress.firstDecision.accepted &&
    !progress.revisionUsed &&
    progress.finalDecision === null;
  return (
    <div className="decide-step">
      {mission.requiredDataKeys.length > 0 && (
        <fieldset className="choice-fieldset">
          <legend>부족한 자료를 고르세요 (필요한 것만)</legend>
          {listMissingDataChoices(mission).map((option) => (
            <label key={option.key} className="choice-label">
              <input
                type="checkbox"
                checked={progress.selectedDataKeys.includes(option.key)}
                onChange={() => dispatch({ type: "TOGGLE_DATA", key: option.key })}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </fieldset>
      )}

      {decisions.length > 0 && (
        <p className="decision-note">
          이번 판단: <strong>{decisions[0]?.label}</strong>
        </p>
      )}

      {mission.evidenceOptions.length > 0 && (
        <fieldset className="choice-fieldset">
          <legend>근거를 고르세요 (하나 이상)</legend>
          {listEvidenceChoices(mission).map((option) => (
            <label key={option.key} className="choice-label">
              <input
                type="checkbox"
                checked={progress.selectedEvidenceKeys.includes(option.key)}
                onChange={() => dispatch({ type: "TOGGLE_EVIDENCE", key: option.key })}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </fieldset>
      )}

      <ActionButton
        variant="primary"
        onClick={() => dispatch({ type: "SUBMIT_DECISION" })}
        disabled={progress.finalDecision !== null}
      >
        판단 기록하기
      </ActionButton>

      {rejectedFirst && (
        <FeedbackPanel tone="warning" title="아직 기록을 통과하지 않았어요">
          <p>
            정답을 바로 알려 드리지는 않아요. 목표 카드와 토큰 표를 다시 읽고, 근거를 더
            모아 한 번 다시 정할 수 있어요.
          </p>
          <ActionButton
            variant="secondary"
            onClick={() => dispatch({ type: "BEGIN_REVISION" })}
          >
            한 번 다시 정하기
          </ActionButton>
        </FeedbackPanel>
      )}
    </div>
  );
}
