# 교육용 웹앱 전체 리디자인 완료 보고

## 범위

- 대상: `production-distribution-trace-center`
- 실행일: 2026-08-30
- 방향: **교실의 유통 관찰 보드** — 따뜻한 종이 바탕, 짙은 잉크색, 청록 경로, 절제된 주황 행동 신호
- 커밋·푸시·배포: 완료 (2026-08-30); HVC 등록: 수행하지 않음
- VoiceOver 구현·검증: 수행하지 않음

## 먼저 확인한 규칙과 계획

- 저장소의 기존 구현 계획, 콘텐츠 검수, QA, 이미지 권리 장부를 읽고 `work/education-webapp-redesign-plan.md`를 코드보다 먼저 작성했습니다.
- 저장소 안의 `AGENTS.md`, `EDUCATION_DESIGN.md`는 발견되지 않아 존재하지 않는 규칙을 추측하지 않았습니다. 대화로 제공된 작업 규칙과 기존 계획을 적용했습니다.
- Stage 0 고정 자원 검사를 `work/education-webapp-redesign-stage0-report.md`에 남겼습니다. `ui-ux-pro-max`는 파일 검사는 가능했지만 활성 Skill 목록에는 표시되지 않아 외부 설치·다운로드 없이 직접 확인한 문서와 검색 CLI만 사용했습니다.
- `design-system/MASTER.md`에 색상, 글꼴, 간격, 반응형, 포커스, 모션, 자산 원칙을 기록했습니다.

## 구현 결과

- `src/app/App.tsx`: sticky header, 현재 미션 맥락, 본문 skip link, 단계 변경 시 제목 포커스와 헤더 보정
- `src/components/ProgressSteps.tsx`: 완료·현재·남은 단계의 텍스트와 `aria-current`
- `src/features/route-trace/EntranceScreen.tsx`: CTA 우선 입구, 활동 정보, 6개 미션 여정, 새 보조 이미지
- `src/features/route-trace/RouteWorkbench.tsx`: 단계별 `지금 할 일`, 목표, 활동 보드, 명확한 다음 행동
- `src/features/route-trace/workbenchSteps.tsx`: 토큰 범례, 경로/남은 카드 분리, 표·선택지·피드백 위계
- `src/features/report/LearningReport.tsx`, `src/components/ModalDialog.tsx`: 결과 기록 헤더와 대화상자 설명 연결
- `src/styles/tokens.css`, `src/styles/app.css`, `src/styles/workbench.css`, `src/styles/motion.css`: 라이트 전용 교실 보드 스타일, 320px 대응, hover/active/focus/disabled, reduced-motion
- `src/update/updateHistory.ts`: `2026-08-30 교실 유통 관찰 보드 전체 리디자인` 추가
- `src/assets/generated/fictional-goods-route-map-v2.webp`: 이미지 생성 모델로 만든 로컬 개념 이미지. 원본은 유지하고 `docs/image-rights-ledger.md`, `work/education-webapp-redesign-assets.md`에 프롬프트·제작일·사용 위치·롤백을 기록했습니다.
- `playwright.config.ts`: CI preview 서버가 `127.0.0.1`에서 확인되도록 host를 명시했습니다.

학습 reducer, route evaluator, 고정 미션 데이터, 개인정보·무저장·무네트워크 경계는 변경하지 않았습니다. `gi-pulse`는 `경로 추적하기`와 `전후 비교 확인` 두 CTA에만 유지했습니다.

## 검증 결과

| 검사 | 결과 |
|---|---|
| `npm run lint` | 통과 |
| `npm run typecheck` | 통과 |
| `npm run test:run` | 13개 파일 / 115개 테스트 통과 |
| `npm run test:a11y` | 4개 통과; jsdom canvas 미구현 경고는 비차단 |
| `npm run check:lines` | 41개 검사 파일 모두 500줄 미만 |
| `npm run build` | 통과; Pages base 경로 유지 |
| `npm run test:release` | 6개 통과 |
| `npx playwright test --workers=1` | desktop/mobile 포함 16개 통과 |
| GitHub Actions `npm run verify` | [33294973292](https://github.com/WBmaker2/production-distribution-trace-center/actions/runs/33294973292) 성공 |
| GitHub Pages 배포 | [33294973283](https://github.com/WBmaker2/production-distribution-trace-center/actions/runs/33294973283) 성공 |

병렬 `npm run verify` 재실행은 macOS Chromium의 `MachPortRendezvous ... Permission denied (SIGTRAP)`로 브라우저 프로세스가 시작되지 않아 종료되었습니다. 같은 최종 코드로 단일 worker E2E 16/16을 통과했으므로 환경 장애와 코드 assertion 실패를 분리해 기록합니다.

## 브라우저 수동 확인

- 320×800, 375×812, 768×1024, 1280×800에서 `scrollWidth === viewportWidth`를 확인했습니다.
- 네 뷰포트에서 시작 CTA가 첫 화면의 주요 영역에 들어왔습니다.
- 단계 전환 후 h1이 포커스되고 header 아래에 남았습니다. 긴 페이지에서 전환하는 경우도 확인했습니다.
- 큰 글자 설정을 320/375px에서 켠 뒤에도 가로 넘침 없이 CTA가 보였습니다.
- 최종 이미지가 `1000×563`으로 로드되고 브라우저 page error/console error가 없었습니다.
- 전체 학습자 여정, 키보드 조작, 오답 수정, 자료 없음, 조건 변화, 인쇄 진입은 E2E로 확인했습니다.
- 공개 Pages에서도 제목·favicon·해시 JS/CSS·WebP가 모두 200으로 로드되고, 375px에서 가로 넘침 없이 `경로 추적하기`에서 `별빛 딸기 상자 · 단계 관찰`로 전환되는 것을 확인했습니다.

## 남은 사람 검수

- 교사·교과 담당자의 문구/학습 적절성 확인은 자동 검증과 분리된 후속 검수입니다.
- VoiceOver 검증은 요청 범위와 프로젝트 규칙에 따라 제외했습니다.
- 공개 Pages URL의 브라우저 smoke 검증은 완료했지만, Safari·실제 기기·교사/교과 검수는 별도 후속 증거입니다.

## 커밋·푸시·배포 결과 (2026-08-30)

- 저장소: [WBmaker2/production-distribution-trace-center](https://github.com/WBmaker2/production-distribution-trace-center)
- 리디자인 커밋: `632707830c36e165c53a755194551254884d91ac`
- CI 보강 커밋: `ff039da22221e4d03fd87ec3effdb839831a1ea0`
- CI: [GitHub Actions 33294973292](https://github.com/WBmaker2/production-distribution-trace-center/actions/runs/33294973292) 성공
- Pages: [GitHub Actions 33294973283](https://github.com/WBmaker2/production-distribution-trace-center/actions/runs/33294973283) 성공
- 공개 결과: [생산·유통 경로 추적소](https://wbmaker2.github.io/production-distribution-trace-center/)
- 사람 검수·VoiceOver·HVC 등록은 수행하지 않았습니다. VoiceOver는 프로젝트 범위에서 제외했고, 교사·교과 검수와 HVC는 별도 단계입니다.

## 롤백

입구의 `routeMapImage` import만 `fictional-goods-route-map.webp`로 되돌리면 기존 장면을 복구할 수 있습니다. 새 `-v2` 파일은 삭제하지 않고 보존하며, 코드·문서 변경은 기준점 `14ee91b72d5ba0e9992b6721ef91c2afcc36851b`와 파일별 diff로 되돌릴 수 있습니다.
