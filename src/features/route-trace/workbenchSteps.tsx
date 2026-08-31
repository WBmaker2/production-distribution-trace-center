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
        <li><strong>시간</strong> 그 단계에 걸리는 정도</li>
        <li><strong>비용</strong> 그 단계에 드는 정도</li>
        <li><strong>손실</strong> 상품이 줄어드는 정도</li>
      </ul>
      <ul className="stage-cards">
        {mission.nodes.map((node) => (
          <li key={node.id} className="stage-card">
            <span className="stage-kind">{STAGE_KIND_LABELS[node.kind]}</span>
            <span className="stage-label">{node.label}</span>
            <span className="stage-tokens">
              <TokenText token={node.timeTokens} label="시간" />
              <TokenText token={node.costTokens} label="비용" />
              <TokenText token={node.lossTokens} label="손실" />
            </span>
          </li>
        ))}
      </ul>
      <p className="step-hint">
        이 숫자는 비교 연습용 가상 토큰이에요. 자료 없음은 아직 모른다는 뜻이고, 0이 아니에요.
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
            <p>남은 단계 카드에서 차례로 골라 경로를 만들어 보아요.</p>
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
          <th scope="col">손실 토큰</th>
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
              <td data-label="손실 토큰">{formatToken(node.lossTokens)}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">합계</th>
          <td data-label="시간 토큰">{formatToken(totals.timeTokens)}</td>
          <td data-label="비용 토큰">{formatToken(totals.costTokens)}</td>
          <td data-label="손실 토큰">{formatToken(totals.lossTokens)}</td>
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
        만든 경로의 단계별 토큰이에요. 연결선 토큰은 이 활동에서 0이라 합계에 더해지지
        않아요.
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
  const selectedChange = mission.conditionChanges.find(
    (change) => change.id === progress.appliedChangeId,
  );
  return (
    <div className="change-step">
      <fieldset className="choice-fieldset">
        <legend>조건을 하나 골라 보세요</legend>
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
        <FeedbackPanel tone="info" title="선택했어요">
          {selectedChange ? (
            <p>
              선택한 조건: <strong>{selectedChange.label}</strong>
            </p>
          ) : (
            <p>조건을 바꾸지 않고 그대로 보기로 했어요.</p>
          )}
          <p>무엇이 달라질지 생각한 뒤, 아래 버튼을 눌러 전후를 확인해 보세요.</p>
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
      label: "손실 토큰",
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
        자료 없음은 값이 없다는 뜻이에요. 0으로 바꾸어 계산하지 않아요. +는 늘어난 양,
        -는 줄어든 양이에요.
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
          <legend>판단에 필요한 자료를 골라 보세요</legend>
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
          <legend>판단의 근거를 하나 이상 골라 보세요</legend>
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

      <p className="decision-help">
        먼저 근거와 자료를 고른 뒤, 아래 버튼을 눌러 판단을 기록해 보세요.
      </p>

      <ActionButton
        variant="primary"
        onClick={() => dispatch({ type: "SUBMIT_DECISION" })}
        disabled={progress.finalDecision !== null}
      >
        판단 기록하기
      </ActionButton>

      {rejectedFirst && (
        <FeedbackPanel tone="warning" title="아직 목표와 근거가 맞지 않아요">
          <p>
            정답을 바로 알려 드리지는 않아요. 목표 카드와 토큰 표를 다시 읽고, 근거를 더
            모아 한 번 다시 정해 보세요.
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
