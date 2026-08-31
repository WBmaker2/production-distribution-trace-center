# 초등 학습자 UX 점검·개선 완료 보고

## 범위

- 대상: `production-distribution-trace-center`
- 실행일: 2026-08-31
- 모드: `full`
- 기준: `$elementary-webapp-ux-orchestrator`의 학생 패널·문구 감사·회복·반응형·수용 게이트
- VoiceOver: 프로젝트 규칙에 따라 구현·검증하지 않음
- 커밋·푸시·배포: 완료 (`PR #1`, `main` 병합 및 GitHub Pages 공개)
- HVC: 사람 검수 후 별도 진행

## 먼저 확인한 규칙과 계획

- 저장소의 기존 리디자인 계획·콘텐츠 검수·QA 문서를 읽고 `work/elementary-webapp-ux-plan.md`를 구현 전에 작성했습니다.
- 저장소 안의 추가 `AGENTS.md`·`EDUCATION_DESIGN.md`는 발견되지 않아 사용자 제공 규칙과 기존 문서만 적용했습니다.
- Stage 0 preflight는 `ready`였습니다. 브라우저 증거는 in-app Browser를 사용했고, `impeccable` detector와 기존 디자인 시스템 지침을 적용했습니다.
- 기존 React/Vite 정적 앱, 6개 미션, reducer/evaluator, 무로그인·무저장·무네트워크 경계를 보존했습니다. 새 음성·TTS·녹음·학생 데이터 수집은 추가하지 않았습니다.

## 핵심 개선

| 이슈 | 개선 |
|---|---|
| 320px에서 classic scrollbar를 고려하지 않은 최소 너비 | `body`의 `min-width: 320px` 제거. 320px에서 body/client 폭과 CTA 위치를 회귀 검사 |
| 학생 화면의 `잃음` 표현 | 입구·관찰·표·비교·기록을 `손실`로 통일하고 `상품이 줄어드는 정도` 풀이 추가 |
| 조건 변경 직후 결과가 먼저 노출됨 | 선택 전 예측 안내 → 선택 상태 안내 → 비교 버튼 후에만 전후 수치 노출 |
| 학생에게 내부 평가 표현이 보임 | `기록에 통과`, `검수 규칙`을 `기준에 맞았어요`, `목표와 근거가 맞지 않아요`로 변경 |
| 전체 완료의 다음 행동이 약함 | `전체 미션 · 학습 마무리`, 핵심 takeaway, 주변 상품 경로를 직접 적어 보는 다음 행동 추가 |
| 오답 자료가 재시도에 남는 회복 버그 | `BEGIN_REVISION`에서 근거·자료 선택을 비우고, 정답 자료 하나로 완료되는 reducer/E2E 회귀 검사 추가 |

## 학생 패널 결과

- 초5–6 서윤 관점에서 첫 화면의 목적·첫 CTA·6개 미션을 바로 찾을 수 있습니다.
- 320px에서 긴 제목·완료 takeaway가 client 폭 안에서 줄바꿈되고, 375px·1280px에서도 CTA와 핵심 표가 잘리지 않습니다.
- 조건 변경은 결과를 미리 보여 주지 않고 “무엇이 달라질지 생각한 뒤” 비교하게 되어 예측→관찰 순서가 분명해졌습니다.
- 자료 부족 미션은 잘못된 `날씨 기록 자료` 제출 → 수정 → `운송비 자료` 하나 선택 → accepted 기록으로 자연스럽게 회복됩니다.
- 마지막에는 무엇을 기억할지와 다음에 해 볼 행동이 명시되고 완료 직후 h1에 포커스가 이동합니다.

## 검증 결과

| 검사 | 결과 |
|---|---|
| `npm run lint` | 통과 |
| `npm run typecheck` | 통과 |
| `npm run test:run` | 13개 파일 / 117개 테스트 통과 |
| `npm run test:a11y` | 4개 통과; jsdom의 Canvas `getContext` 미구현 stderr는 비차단 경고 |
| `npm run check:lines` | 41개 파일 모두 500줄 미만 |
| `npm run build` | 통과; Pages base 경로 유지 |
| `npm run test:release` | 1개 파일 / 6개 통과 |
| `npm run test:e2e -- --workers=1 --project=desktop` | 8개 통과 |
| `npm run test:e2e -- --workers=1 --project=mobile` | 8개 통과 |
| `git diff --check` | 통과 |
| 학습자 텍스트 inventory | 47개 파일 / 1,068개 후보; triage 자료로 갱신 |
| in-app Browser console error | `[]` |
| Impeccable detector | 기존 `.entrance-note` 상단 구분선 1건 warning; 둥근 외곽선이 아니고 의도적인 고지 구분선이라 유지 |

첫 E2E 일괄 실행은 Playwright용 4173 preview 프로세스가 종료되어 `ERR_CONNECTION_REFUSED`가 연쇄 발생했습니다. 포트를 별도 preview로 격리한 뒤 desktop/mobile을 각각 재실행하여 16/16을 통과시켰습니다. 이는 코드 assertion 실패가 아닌 로컬 서버 수명 문제로 분리 기록합니다.

## 브라우저 증거

- 320×800: `innerWidth=320`, `clientWidth=305`, `bodyWidth=305`, `document/body scrollWidth=305`; 완료 h1과 takeaway가 표시되고 가로 넘침 없음
- 375×812: `clientWidth=360`, `bodyWidth=360`, `document/body scrollWidth=360`; 완료 h1 포커스 유지
- 1280×900: 전체 완료 화면에서 제목·takeaway·6개 기록·인쇄/재시작 행동 표시
- 조건 비교: 선택 전 비교 CTA disabled 및 pulse 없음, 선택 후 안내, 비교 후 `+3`·`자료 없음`·전후 표 표시
- 자료 회복: 최종 기록의 필요한 자료가 `운송비 자료` 하나이고 `다시 정한 내용이 기준에 맞았어요.` 표시

## 문서·자산

- 감사: `work/elementary-webapp-ux-audit.md`
- 계획: `work/elementary-webapp-ux-plan.md`
- 문구 감사: `work/elementary-webapp-ux-language-audit.md`, `work/elementary-webapp-ux-language-candidates.md`
- 시뮬레이션 결정·검증: `work/elementary-webapp-ux-simulation-decision.md`, `work/elementary-webapp-ux-simulation-test.md`
- 업데이트 내역에 2026-08-31 개선 기록을 추가했습니다.
- 기존 로컬 가상 이미지는 보존했고, 이번 변경에 새 이미지가 필요하지 않아 `imagegen`은 호출하지 않았습니다. 수치·경로·판정은 계속 DOM/TypeScript로 제공합니다.

## 수용 판정과 남은 확인

- P0: 0건
- 미해결 P1: 0건. EDU-UX-005는 수정 및 reducer/E2E/브라우저 회복 흐름으로 확인했습니다.
- 개선 후 점수: **94/100**
- 자동화·in-app 관찰 게이트: 통과
- 전체 게이트: `conditional` — 교사·교과 정확성, Safari·실제 기기 검수, 실제 학생 comprehension probe, HVC는 별도 확인 필요

최신 개선 코드는 공개 Pages에 배포되었습니다. [공개 앱 열기](https://wbmaker2.github.io/production-distribution-trace-center/)

- 병합 PR: [#1](https://github.com/WBmaker2/production-distribution-trace-center/pull/1)
- 병합 커밋: `7ee0135ae940b302e52add28e1c49054ca210948`
- CI: [33358116282](https://github.com/WBmaker2/production-distribution-trace-center/actions/runs/33358116282)
- Pages: [33358116208](https://github.com/WBmaker2/production-distribution-trace-center/actions/runs/33358116208)
- HVC용 로컬 확인 주소: http://127.0.0.1:4176/production-distribution-trace-center/
