# 초등 학습자 UX 후속 개선 계획

## 실행 상태

- 작성일: 2026-08-31
- 대상: `production-distribution-trace-center`
- 모드: `full`
- 선행 문서: `work/education-webapp-redesign-plan.md`, `work/education-webapp-redesign-report.md`
- Stage 0: `work/elementary-webapp-ux-bootstrap.md` — `ready`
- 기준선: `work/elementary-webapp-ux-audit.md`, `work/elementary-webapp-ux-language-audit.md`
- 시뮬레이션 결정: `work/elementary-webapp-ux-simulation-decision.md` — `not-needed`
- 구현 시작 전 계획 기록: 완료
- 구현: 완료
- 재검증: 완료 — `work/elementary-webapp-ux-report.md`에 결과 기록
- 커밋·푸시·배포·HVC: 이번 요청 범위에 포함하지 않음
- VoiceOver: 구현·검증 범위에서 제외

## 프로젝트 규칙과 보존 경계

- 저장소 안에는 추가 `AGENTS.md`·`EDUCATION_DESIGN.md`가 없었습니다. 사용자 제공 규칙과 기존 계획/콘텐츠/QA 문서를 적용합니다.
- Vite + React 19 + TypeScript, 현재 탭 메모리, 무로그인·무서버·무네트워크·무영구 저장 경계를 유지합니다.
- `missions.ts`의 6개 미션, 숫자·복수 정답·판단 보류, `routeEvaluator.ts` 판정, `sessionReducer.ts` 전이를 바꾸지 않습니다.
- 학생 이름/식별자, 실제 기업·가격·지역·환경 등급, 음성·TTS·내레이션·녹음은 추가하지 않습니다.
- 기존 로컬 가상 이미지와 alt는 보존합니다. 새 이미지 생성은 필요하지 않습니다.
- 모든 변경 파일은 500줄 미만이며, 핵심 단계 CTA의 `gi-pulse`와 reduced-motion 고정 외곽선을 유지합니다.

## 디자인·콘텐츠·상호작용 방향

- Visual thesis: 따뜻한 종이 바탕과 짙은 잉크색의 관찰 보드 위에서, 학생이 `고르기 → 확인하기 → 설명하기`를 한눈에 읽습니다.
- Content plan: 입구에서 학습 목적을 직접 말하고, `손실`을 첫 등장에 `상품이 줄어드는 정도`로 풀이하며, 조건 변경은 한 문장 한 행동으로 안내합니다. 완료 화면은 점수 대신 takeaway와 다음 활동을 남깁니다.
- Interaction thesis: 선택 상태와 비교 결과를 분리해 `예측 → 버튼으로 비교 → 표로 관찰 → 근거 선택 → 기록` 흐름을 유지합니다. 새 엔진 없이 기존 결정적 DOM 상태만 정리합니다.
- Student panel: 주 페르소나 초5–6 서윤, 가드레일 초3–4 준호. 실제 학생 승인이나 사용자 연구 결과로 표현하지 않습니다.

## 우선순위와 구현 항목

### P1 — 회복 차단

1. EDU-UX-005, `src/app/sessionReducer.ts`
   - `BEGIN_REVISION`에서 이전 `selectedEvidenceKeys`·`selectedDataKeys`를 비워 새 판단을 시작하게 합니다.
   - 자료 부족 미션에서 잘못된 자료를 고른 뒤 수정하고 정답 자료 하나만 선택하는 reducer/E2E 회귀 검사를 추가합니다.
   - 첫 판단 기록·경로·수정 기회 1회 제한은 보존합니다.

### P2 — 필수 개선

1. EDU-UX-001, `src/styles/app.css`
   - `body`의 `min-width: 320px`를 제거해 classic scrollbar가 있는 320px에서도 콘텐츠가 client 영역 안에 놓이게 합니다.
   - `e2e/mobile-reduced-motion.spec.ts`에 body/client 폭 회귀 측정을 추가합니다.
2. EDU-UX-002, `src/features/route-trace/EntranceScreen.tsx`, `src/features/route-trace/RouteWorkbench.tsx`, `src/features/route-trace/workbenchSteps.tsx`, `src/features/report/LearningReport.tsx`, `src/content/missions.ts`
   - 학생 노출 `잃음`을 문서·교과 표현과 맞는 `손실`로 통일하고, 범례에 쉬운 풀이를 둡니다.
   - 내부 `lossTokens` 키와 숫자/판정 데이터는 변경하지 않습니다.
3. EDU-UX-003, `src/features/route-trace/RouteWorkbench.tsx`, `src/features/route-trace/workbenchSteps.tsx`
   - 조건 변경 지시를 직접적인 예측 문장으로 바꿉니다.
   - 라디오 선택 직후 수치 합계는 숨기고, 고른 조건과 다음 행동을 안내합니다.
   - `COMPARE` 화면에서만 전후 표·diff를 보여 줍니다.
   - 비교 CTA는 선택 전 disabled 상태에서 pulse하지 않고, 활성화된 필수 행동일 때만 pulse합니다.
4. EDU-UX-004, `src/features/report/LearningReport.tsx`, `src/styles/workbench.css`
   - 진행 중 report를 `미션 기록`으로 직접 표현합니다.
   - `finished` 상태에는 완료 제목, 학습 takeaway, 주변 상품 경로를 적어 보는 전이 문구를 추가합니다.
   - 오답/수정 문구에서 `기록에 통과`, `검수 규칙` 같은 내부 표현을 학생용 문장으로 바꿉니다.

### P3 — 이번 사이클에서 함께 정리

- 변경된 문구에 맞춰 단위/컴포넌트/E2E의 accessible name을 갱신합니다.
- 업데이트 내역에 2026-08-31 개선 항목을 최신 순서로 추가합니다.
- `work/elementary-webapp-ux-language-audit.md`, `...-simulation-test.md`, 최종 report에 수정·검증 상태를 갱신합니다.

## 수용 기준

- P0와 미해결 P1이 0개이고, 새 P2가 추가되지 않습니다. 특히 EDU-UX-005 회복 흐름이 정답 자료 하나로 끝나야 합니다.
- 320×800 classic scrollbar 환경에서 `bodyRect.width <= clientWidth`, document/body 가로 넘침 0, CTA 오른쪽 끝이 client 폭 안에 있습니다.
- 375×812·1280×900에서도 입구 CTA, 조건 비교, 완료 takeaway가 잘리지 않습니다.
- `손실`이 입구·관찰·표·비교·판단 기록에 일관되게 표시되고 `잃음 토큰`이 학생 화면에 남지 않습니다.
- 조건 변경 선택 전에는 비교 CTA가 disabled이고 pulse하지 않으며, 선택 후 안내가 보이고 비교 버튼을 누른 뒤에만 `+3`/전후 표가 보입니다.
- 정상·오답·빈 판단·재시도·완료·다음 미션 상태의 변경 문구를 같은 시작 상태와 viewport에서 확인합니다.
- 마우스 없이 CTA/카드/라디오/체크박스/재시도/완료를 조작할 수 있고 focus-visible이 유지됩니다.
- `자료 없음`은 계속 0이 아니며, 기존 숫자·정답·복수 정답·판단 보류·무네트워크 경계를 보존합니다.
- 마지막 `전체 기록 마치기` 후 완료 제목·takeaway·다시 시작/인쇄 행동이 보입니다.
- 최종 수용 점수는 85점 이상을 목표로 하되, 근거 없는 영역은 `not run`으로 기록합니다.

## 실행 순서와 검증 명령

1. 위 계획과 기준선 장부 저장 — 완료
2. 최소 코드/문구 변경과 회귀 테스트 작성
3. 정적·unit·a11y·file-size·build·release 검사
4. 실제 preview 브라우저에서 320/375/1280 및 큰 글자/reduced-motion 확인
5. 딸기 오답 회복 → 지연 조건 비교 → 자료 부족 오답 자료 수정 → 마지막 완료의 동일 흐름 재실행
6. `$impeccable` 변경 대상 detector를 한 번 실행하고 audit/report에 반영
7. 사용자에게 수정 파일·검증·남은 사람 검수(교사/교과/Safari/실제 기기)를 보고

예정 명령:

```text
npm run lint
npm run typecheck
npm run test:run
npm run test:a11y
npm run check:lines
npm run build
npm run test:release
npm run test:e2e -- --workers=1
git diff --check
```

## 이미지 결정

`imagegen`은 이번 개선에서 호출하지 않습니다. 기존 가상 상품/마을 이미지는 분위기와 흐름 상상만 돕고, 새로 필요한 기능적 그림·수치·정답·지도는 없습니다. 경로·토큰·판정은 계속 검증된 DOM/TypeScript로 제공합니다.
