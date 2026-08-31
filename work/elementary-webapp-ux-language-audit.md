# 초등 학습자 문구 감사 장부

- 감사일: 2026-08-31
- 대상 학년: 초등 5–6학년(초3–4 가드레일 포함)
- 수집: `work/elementary-webapp-ux-language-candidates.md` 후보 인벤토리 + 실제 320/375/1280px DOM 상태
- 원칙: 문구를 짧게 만드는 것보다 학습 목표·교과 의미·정답 조건·회복 행동을 보존함
- 정확성 상태: 아래 `human-review` 항목은 사회과 교사의 최종 확인이 필요하며 자동 검증 완료로 바꾸지 않음

## 상태별 검토 범위

| 상태 | 실제 기준선 문구/증거 | 검토 |
|---|---|---|
| entry | `생산·가공·운송·판매·소비` + `경로 추적하기` | 목적·첫 행동 확인 |
| instruction | `지금 할 일`, 목표 카드, 단계별 지시 | 조건 변경 문구 개선 대상 |
| input/choice | 카드 버튼, 라디오, 체크박스 | 대상·결과 이름 확인 |
| hint | 토큰 범례, `자료 없음` 설명 | `자료 없음`은 0이 아님을 유지 |
| correct | 연결 검사 성공, 근거와 함께 경로 연결 | 다음 행동 확인 |
| incorrect | 연결 이유, 판단 오답, 다시 정하기 | 회복 행동 존재 확인 |
| empty | 근거/자료 없이 판단 기록 | 결과만 남기지 않고 재시도 제공 |
| loading/error | 정적 SPA, 외부 요청 없음; 런타임 오류 화면은 ErrorBoundary에 있음 | 네트워크 loading 상태는 해당 없음, ErrorBoundary 수동 주입은 not run |
| retry | `다시 만들기`, `한 번 다시 정하기` | 같은 경로에서 실제 회복 확인 |
| completion | 미션별 `유통 기록`; 전체 완료 문구는 개선 대상 | 완료 takeaway 추가 |
| next-learning-action | `다음 미션 보기`, 최종에는 기존 버튼만 | 최종 다음 행동 추가 |

## 문구 장부

| issue-id | screen/state · surface | source/evidence | before → after | target grade / difficulty signals | 의미·정확성 | comprehension probe | verification / status |
|---|---|---|---|---|---|---|---|
| EDU-LANG-001 | entry·observe·baseline·compare·report / heading, legend, table, feedback | `EntranceScreen.tsx:15`, `workbenchSteps.tsx:71,81,221,355`, `LearningReport.tsx:99`; 기준선 DOM | `잃음 토큰` → `손실 토큰`; 범례에 `손실: 상품이 줄어드는 정도` 추가 | 5–6 / technical-or-internal, inconsistent-label, missing-term-explanation | 손실 지표·숫자·판정은 보존. 교과 표현은 `human-review` | 핵심 용어 설명: 손실은 상품이 줄어드는 정도라고 말하기 | 320/375/1280px 입구·관찰·표·비교·기록 DOM과 캡처에서 `손실` 표시 확인 / fixed; 교과 정확성 human-review |
| EDU-LANG-002 | CHANGE_ONE / instruction, legend | `RouteWorkbench.tsx:18`, `workbenchSteps.tsx:282`; 조건 선택 DOM | `검수된 조건 중 딱 한 가지만 바꾼 뒤 ... 예상해 보세요` → `조건을 하나 고르고, 무엇이 달라질지 먼저 생각해 보세요`; `조건을 하나 골라 보세요` | 5–6 / technical-or-internal, multiple-actions, abstract-or-formal | 한 변수 변경과 예측 의도 보존 | 지시 재진술·결과 예측: 무엇을 고르고 무엇이 달라질지 말한 뒤 라디오 선택 | 선택 전/후 DOM과 비교 CTA를 실제 브라우저에서 확인 / fixed |
| EDU-LANG-003 | CHANGE_ONE / feedback | `workbenchSteps.tsx:308-317`; 기준선에서 라디오 선택 직후 상태 | 긴 `적용 후 합계 — ... 기본 합계 — ...` → `선택한 조건을 정했어요. 무엇이 달라질지 생각한 뒤 아래 버튼을 눌러 확인해 보세요.` | 5–6 / long-or-dense, repeated-explanation, abstract-or-formal | 수치·단위는 COMPARE 화면에 그대로 보존 | 결과 예측: 버튼을 누르면 전후 표를 본다고 말하기 | 비교 버튼 전 수치 미표시, 비교 후 `+3`·전후 표 표시를 실제 브라우저에서 확인 / fixed |
| EDU-LANG-004 | DECIDE/REPORT / feedback, completion | `LearningReport.tsx:74-115`; 빈 제출·오답·완료 기준선 | `기록에 통과했어요` → `기준에 맞았어요`; `검수 규칙과 맞지 않았어요` → `목표와 근거가 맞지 않았어요`; `통과하지 못했어요` → `기준과 달랐어요` | 5–6 / technical-or-internal, shaming-tone | evaluator 결과·기록 보존. 점수·순위는 추가하지 않음 | 회복 행동: 다시 정할 수 있는 버튼 찾기 및 실행 | 오답·수정·완료 상태에서 새 문구와 회복 버튼을 실제 브라우저/E2E로 확인 / fixed |
| EDU-LANG-005 | REPORT / heading, completion, next action | `LearningReport.tsx:124-151`; 마지막 `finished` 상태 기준선 | `판단의 흔적` → 진행 중 `미션 기록`; 전체 완료 시 `모든 경로를 살펴봤어요` + `기억할 점` + 다음 활동 문구 | 5–6 / abstract-or-formal, missing-recovery, missing-term-explanation | 모든 6개 기록과 무점수 원칙 보존 | 지시 재진술·전이: 끝났고 다음에 주변 상품 경로를 적는다고 말하기 | 1280/320/375px 완료 상태의 제목·takeaway·다음 행동과 h1 포커스를 실제 브라우저/E2E로 확인 / fixed |

## 변경하지 않는 문구

- `자료 없음`: 알 수 없는 비용을 0으로 바꾸지 않는 핵심 개념이므로 유지하고, `아직 모른다는 뜻` 설명도 유지합니다.
- `가상의 자료`: 실제 가격·기업·환경 등급으로 오해하지 않게 하는 경계 문구이므로 유지합니다.
- `경로 추적하기`, 카드 넣기, `연결 검사`, `다시 만들기`: 실제 행동과 일치하므로 유지합니다.
- 숫자, `+3`, 복수 정답, 판단 보류의 의미는 문장 단순화로 변경하지 않습니다.
