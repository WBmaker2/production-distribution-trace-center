# 수용 기준 점검표 — 생산·유통 경로 추적소

> 2026-08-28 기준. `npm run verify` 전체 통과 상태에서 작성했다. 자동 검사 통과는 사람 검수·출시 승인·배포 완료를 의미하지 않는다.

## 1. 앱별 완료 기준 (계획 문서 14)

| 기준 | 근거 | 상태 |
|---|---|---|
| 1. nullable 비용·손실 자료를 0으로 바꾸거나 임의 계산하지 않는다 | `computeTotals` null 전파 (`routeEvaluator.test.ts`), 화면 "자료 없음" 표시 (`RouteWorkbench.test.tsx`, e2e 지연 미션) | ✅ 자동 검증 |
| 2. 짧은 경로를 항상 친환경·저렴·좋음으로 표현하지 않는다 | 오개념 근거 금지 판정 (`shorter-is-always-better`, `near-is-always-safe`), `docs/content-review.md` | ✅ 자동 검증 |
| 3. cycle과 고립 단계를 빌드 전에 거부한다 | `validateMission` 사이클·고립 검사 (`validateContent.test.ts`), `missions.ts` 모듈 로드 시 `assertValidContent` | ✅ 자동 검증 |
| 4. 복수의 유효 경로가 목표별로 각각 통과한다 | 공책·판매지 미션 복수 승인 경로 (`routeEvaluator.test.ts`, e2e 공책 두 경로) | ✅ 자동 검증 |
| 5. 실제 기업·상품·지역을 좋고 나쁜 사례로 평가하지 않는다 | 전부 가상 자료, 입구·장면 문구, `docs/content-review.md` 한계 고지 | ✅ 자동 검증 + 사람 검수 대기 |

## 2. 검증 명령 결과 (계획 문서 13)

| 명령 | 기대 | 결과 (2026-08-28) |
|---|---|---|
| `npm run lint` | 오류 0건 | ✅ 0건 |
| `npm run typecheck` | 오류 0건 | ✅ 0건 |
| `npm run test:run` | 실패 0건 | ✅ 115개 통과 (6개 미션 콘텐츠·판정·세션·화면 포함) |
| `npm run test:a11y` | serious/critical 0건 | ✅ 4개 화면 상태 0건 |
| `npm run check:lines` | 500줄 이상 0개 | ✅ 40개 파일 전부 미만 |
| `npm run build` | 해시 자산 + 하위 경로 base | ✅ `/production-distribution-trace-center/` |
| `npm run test:release` | dist 자산·참조 검사 | ✅ 6개 통과 |
| `npm run test:e2e` | 계획 시나리오 전부 | ✅ 16개 통과 (데스크톱+모바일) |
| `git diff --check` | 출력 없음 | ✅ 없음 |

## 3. E2E 시나리오 대응 (계획 문서 Task 8)

- [x] 딸기 안내 미션에서 단계를 배열하고 기본 경로를 추적한다 — `learner-flow.spec.ts`
- [x] 공책 미션의 두 유효 창고 경로를 각각 완료한다 — `learner-flow.spec.ts`
- [x] 지연 조건을 바꾸고 뒤 단계 총시간(+3) 변화를 확인한다 — `learner-flow.spec.ts`
- [x] 정보 부족 미션에서 판단 보류와 필요한 자료(운송비)만 선택한다 — `learner-flow.spec.ts`
- [x] 키보드만으로 단계 순서와 경로를 조작한다 — `keyboard.spec.ts`
- [x] 320px에서 경로표가 카드 행으로 바뀌고 가로 넘침이 없다 — `mobile-reduced-motion.spec.ts`
- [x] 축소 모션에서 맥박(gi-pulse)이 제거되고 3px 외곽선으로 대체된다 — `mobile-reduced-motion.spec.ts`
- [x] 실시간 가격·지도·기업 API와 브라우저 저장 호출이 없다 — `tests/privacy/runtime-boundary.test.tsx`

## 4. 사람 검수 필요 (자동화로 증명 불가)

- [ ] 교과 정확성·용어 (사회과 교사)
- [ ] 어린이용 문장 난이도 (5~6학년)
- [ ] 생성 이미지의 맥락·편향·권리 (`docs/image-rights-ledger.md` 대조)
- [ ] 실제 태블릿 가독성
- [ ] 가치 판단 문구와 가상 토큰의 한계 안내 승인

## 5. 명시적 제외 확인

- [x] VoiceOver 구현·검증은 수행하지 않았고 완료로 보고하지 않는다.
- [x] 다크 모드 없음 (밝은 교실용 고정).
- [x] 학생 이름·식별자 입력란 없음, 인쇄물에 메타데이터 없음 (`print.css` 검사).
- [x] localStorage·sessionStorage·IndexedDB·쿠키 쓰기 없음.

## 6. 출시 게이트

| 게이트 | 상태 |
|---|---|
| 자동 검증 (`npm run verify`) | ✅ [GitHub Actions 33294973292](https://github.com/WBmaker2/production-distribution-trace-center/actions/runs/33294973292) 통과 |
| 사람 검수 (교사·교과 검수자) | ⬜ 대기 |
| 사용자 출시 승인 (원격 저장소 푸시·Pages 배포) | ✅ 사용자 요청으로 완료 |
| 공개 URL 확인 | ✅ [Pages 앱](https://wbmaker2.github.io/production-distribution-trace-center/) smoke 확인 |
| 공개 URL 확인 후 HVC 등록 | ⬜ 대기 |
