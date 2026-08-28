# 생산·유통 경로 추적소

초등 5~6학년 사회 학습용 정적 웹 앱입니다. 학생은 가상 상품이 생산 → 가공 → 운송 → 판매 → 소비 단계를 지나는 경로를 조립하고, 한 조건의 변화가 시간·비용·손실 토큰에 미치는 영향을 비교해 근거 있는 경로 설명을 만듭니다.

- **교과:** 사회 (초등 5~6학년)
- **권장 활동 시간:** 20~30분
- **미션:** 검수된 고정 미션 6개 (런타임 무작위 생성 없음)
- **실행 방식:** 무로그인·무서버·무네트워크. 응답은 현재 탭 메모리에만 있고 새로고침하면 사라집니다.

## 구현 계획

- 계획 문서: `2026-08-28-production-distribution-trace-center-implementation-plan.md`
- 원본 대조 SHA-256: `2dfbde25d4e7e926176579035c0810e2da961b59daeba500e2a5dc7e964a473c` (vibecoding-lab 원본과 일치, 2026-08-28 확인)

## 개발 명령

```bash
npm install
npm run dev          # 로컬 개발 서버 (base /)
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run test:run     # 단위·컴포넌트 테스트 (Vitest + RTL)
npm run test:a11y    # 자동 접근성 검사 (axe, serious/critical 0건)
npm run check:lines  # TS·TSX·CSS 500줄 미만 검사
npm run build        # 정적 빌드 (base /production-distribution-trace-center/)
npm run test:release # dist 자산 검사 (build 이후 실행)
npm run test:e2e     # Playwright E2E (preview 서버, 같은 하위 경로)
npm run verify       # 위 전부를 순서대로 실행
```

## 아키텍처

- `src/domain/` — 타입과 순수 판정 함수. 정오·충족·판단 보류는 `routeEvaluator.ts` 하나에서만 계산합니다.
- `src/content/` — 검수된 고정 미션 데이터와 콘텐츠 검수기. 잘못된 콘텐츠는 개발·빌드 시 예외로 중단합니다.
- `src/app/` — `useReducer` 학습 세션 상태와 화면 전이 잠금.
- `src/features/` — 입구, 학습 화면(워크벤치), 결과 기록 화면.
- `src/components/`, `src/accessibility/` — 공용 UI, 업데이트 내역, 접근성 도구.
- `tests/` — 접근성(a11y), 개인정보·네트워크 경계(privacy), 배포 자산(release) 테스트.
- `e2e/` — 학습자 흐름, 키보드, 모바일·축소 모션 E2E.

## 학습·안전 경계

- `window.fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource`, `sendBeacon` 사용 없음 (`tests/privacy`에서 감시).
- `localStorage`, `sessionStorage`, IndexedDB, `document.cookie` 쓰기 없음.
- 실제 기업·가격·지도를 쓰지 않고, 가상 생산자와 가상 토큰(시간·비용·손실)만 사용합니다.
- 학생 이름·사진·생년월일 입력란이 없고 인쇄물에 식별자를 넣지 않습니다.
- 알 수 없는 비용(null)은 0으로 계산하거나 표시하지 않고 "자료 없음"으로 유지합니다.
- 다크 모드 없음(밝은 교실용 고정), VoiceOver 구현·검증은 범위에서 제외.

## 출시 게이트 (아직 수행하지 않음)

1. 교사·교과 검수자의 내용 검수 (`docs/content-review.md`)
2. `npm run verify` 전체 통과 — ✅ 2026-08-28 통과 (`docs/release-evidence.md`, `docs/qa/acceptance-checklist.md`)
3. 사용자의 별도 출시 승인 뒤 원격 저장소 푸시와 GitHub Pages 배포
4. 공개 앱 확인 뒤 HVC 등록

자동 검사 통과는 사람 검수·출시 승인·배포 완료를 의미하지 않습니다.
