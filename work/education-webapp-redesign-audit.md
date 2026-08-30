# 교육용 웹앱 전체 리디자인 초기 감사

## 감사 범위

- 감사일: 2026-08-30
- 대상: `/Volumes/ External Drive 256G/Dev2/codex/production-distribution-trace-center`
- 감사 역할: `$impeccable` 규칙을 로드하고, 현재 코드·preview 접근성 스냅샷·320/375px 캡처를 대조한 초기 검수
- 확인한 경로: 입구 → 딸기 미션 관찰 → 경로 조립
- 아직 확인하지 않은 최종 구현: 리디자인 후의 전체 흐름과 브라우저 검수
- VoiceOver: 수행하지 않음

## 현재 기준

### 자동 기준선

- `npm run lint`: exit 0
- `npm run typecheck`: exit 0
- `npm run test:run`: 13개 파일 / 115개 테스트 통과
- `npm run build`: exit 0, Pages base `/production-distribution-trace-center/`
- 기존 `tests/a11y`, `tests/privacy`, `e2e`는 현재 UI 계약을 기준으로 통과하도록 작성되어 있음

### 브라우저 관찰

- preview 입구에서 1280px 화면의 main content는 980px 폭으로 중앙 정렬되고, 장면 이미지가 640×361로 먼저 노출됩니다. 소개 문구·가상 자료 고지 뒤에 시작 CTA가 배치되어 첫 행동까지 시선 이동이 깁니다.
- 375px 입구에서는 헤더 도구가 두 번째 줄로 내려가고, 큰 장면·소개 문구·가상 자료 고지 뒤 약 660px 지점에 시작 CTA가 나타납니다.
- 시작 직후 `scrollIntoView()`가 제목을 viewport 최상단으로 붙여 헤더가 위로 사라지는 상태를 관찰했습니다. `src/app/App.tsx:25-33`에 `scroll-margin-top` 보정이 없습니다.
- 조립 화면은 `만든 경로`와 `남은 단계 카드`가 모두 긴 세로 목록이며, 필수 `연결 검사`와 다음 행동이 화면 하단으로 밀립니다.

## Audit Health Score

| 항목 | 점수 | 근거 |
|---|---:|---|
| 접근성 | 3/4 | 의미 있는 HTML, `:focus-visible`, 초점 이동, 키보드 테스트가 있으나 skip link가 없고 제목 scroll이 header를 가림 |
| 성능 | 3/4 | 로컬 WebP·고정 이미지 크기·외부 요청 없음은 좋지만 핵심 이미지 우선순위와 레이아웃 위계는 개선 여지 |
| 반응형 | 2/4 | 320px 표 카드 전환은 있으나 헤더 래핑, 긴 세로 흐름, CTA 지연이 학습 시작을 늦춤 |
| 테마/시스템 | 2/4 | 토큰 파일과 라이트 모드 원칙은 있으나 파란색·둥근 카드·균일 테두리 패턴이 반복되고 상태 위계가 약함 |
| 구현 일관성 | 3/4 | 콘텐츠·판정·프라이버시 경계는 제품 고유성이 있으나 화면은 일반적인 카드/버튼 목록처럼 읽힘 |
| **합계** | **13/20** | **Acceptable — 시각 위계와 학습 흐름 표시를 크게 개선할 필요** |

## 실행 우선순위

### P1 — 수정 전 반드시 해결

#### [P1] 제목 초점 이동이 고정 헤더를 숨김

- 위치: `src/app/App.tsx:25-33`, `src/styles/app.css:53-75`
- 범주: 접근성 / 반응형 / 학습 흐름
- 근거: 시작 후 browser snapshot에서 header가 y=-95에 있고 h1이 y=0에 붙음
- 영향: 키보드·보조기술 사용자가 새 단계의 제목과 상단 도구를 동시에 확인하지 못하고, 화면 맥락을 잃을 수 있음
- 수정: 제목에 `scroll-margin-top`을 주고, layout header의 실제 높이만큼 여백을 보존하며, 필요한 경우 `scrollIntoView({ block: "start" })` 호출을 제거하고 `focus({ preventScroll: true })` 후 안전한 scroll만 수행
- 수용 증거: 320/375/768/1280px에서 제목 focus가 보이고 header가 viewport 밖으로 밀리지 않음

#### [P1] 첫 필수 행동이 장면과 설명 아래로 밀림

- 위치: `src/features/route-trace/EntranceScreen.tsx:11-45`, `src/styles/app.css:109-221`
- 범주: 학습 UX / 반응형
- 근거: desktop에서 CTA가 y≈690, mobile에서 y≈661 이후에 나타남
- 영향: 학생이 앱의 목표를 이해하기 전에 긴 설명을 통과해야 하고, 첫 화면에서 무엇을 눌러야 하는지 즉시 읽기 어려움
- 수정: 입구를 `학습 약속 + CTA`와 `장면/미션 미리보기`의 비대칭 2열(모바일은 CTA 우선 세로 순서)로 재구성하고, 가상 자료 고지는 CTA 가까이에 유지
- 수용 증거: 375×812에서 앱 목적·가상 자료 한계·시작 CTA가 한 화면의 주요 흐름에 함께 보임

#### [P1] 진행 단계가 현재 단계 외의 완료/남은 상태를 설명하지 못함

- 위치: `src/components/ProgressSteps.tsx:1-28`, `src/app/App.tsx:41-47`
- 범주: 학습 흐름 / 인지 부하
- 근거: 모든 비현재 단계가 동일한 중립 pill이고, 조건 변화가 없는 미션과 있는 미션의 차이가 화면 위계에 거의 없음
- 영향: 학생이 얼마나 왔고 무엇이 남았는지 추측해야 하며, 결과 화면으로 이어지는 경로가 약함
- 수정: 텍스트 단계 레일에 완료·현재·잠금 상태를 명시하고, 현재 단계 설명을 별도 표시하되 데이터/판정은 reducer 결과에서만 계산
- 수용 증거: 각 상태에서 `aria-current`, 완료 표시 텍스트, 실제 단계 수가 일치

#### [P1] 필수 버튼의 hover/pressed 상태가 없음

- 위치: `src/styles/app.css:49-108`, `src/styles/workbench.css:90-134`
- 범주: 상호작용 / 시각 피드백
- 근거: primary/secondary/mini/pool 버튼에 `:hover`, `:active` 규칙이 없음
- 영향: 클릭 가능한 요소와 비활성 요소의 반응 차이가 약하고, 터치·마우스 입력의 즉각 피드백이 부족함
- 수정: transform으로 주변 layout을 움직이지 않는 hover/active 상태와 150~220ms transition을 공용 토큰으로 추가; disabled는 움직임 없이 명확히 낮춤
- 수용 증거: 버튼별 hover·active·focus-visible·disabled 상태가 대비와 텍스트로 구분되고 reduced motion에서 transition이 축소됨

### P2 — 이번 리디자인에서 함께 해결

#### [P2] 목표 카드와 화면 제목의 정보가 중복됨

- 위치: `src/app/App.tsx:68-77`, `src/features/route-trace/RouteWorkbench.tsx:45-49`
- 영향: 상단에서 미션 제목과 단계만 보고 싶을 때 목표 카드가 본문 첫 블록을 차지하며, 실제 활동이 아래로 밀림
- 수정: 미션 헤더에 목표를 짧게 결합하고, 긴 목표 문장은 각 활동의 `step-intro`에서 한 번만 사용

#### [P2] 조립 화면이 선택 가능한 카드와 완성 경로를 같은 세로 밀도로 보여 줌

- 위치: `src/features/route-trace/workbenchSteps.tsx:88-187`
- 영향: 학생이 지금 넣을 카드와 이미 넣은 카드의 관계를 시각적으로 해석해야 함
- 수정: `내 경로`를 연결 레일로, `남은 단계`를 선택 보드로 분리하고 각 카드에 순서·역할·추가 동작을 명시

#### [P2] 토큰이 숫자 중심이며 범례와 변화 상태가 약함

- 위치: `src/features/route-trace/workbenchSteps.tsx:46-52`, `src/styles/workbench.css:43-62`, `147-179`
- 영향: 시간·비용·잃음의 차이와 자료 없음의 의미를 색상·pill에 의존하게 됨
- 수정: 텍스트 범례와 semantic token summary를 추가하고 증가/감소/자료 없음에 기호·문장을 함께 제공; 실제 표는 유지

#### [P2] 선택지와 오류 피드백이 길게 이어짐

- 위치: `src/features/route-trace/workbenchSteps.tsx:310-452`, `src/styles/workbench.css:181-243`
- 영향: 판단 단계에서 질문, 근거, 필요한 자료, 제출, 수정 안내의 순서를 한 번에 읽기 어려움
- 수정: 질문별 fieldset, 선택 요약, 제출 CTA, 상태 피드백을 명확한 세로 그룹으로 나누고 오류 근처에 회복 행동을 고정

#### [P2] 공용 버튼이 모두 둥근 pill이라 역할 차이가 약함

- 위치: `src/styles/app.css:49-108`, `src/styles/workbench.css:90-99`
- 영향: primary, secondary, 위험, 작은 순서 조작이 같은 시각 언어로 읽힘
- 수정: primary는 단단한 사각 라운드, secondary는 outline, mini는 작은 직각에 가까운 control로 계층화하되 44px 터치 영역은 유지

### P3 — 마감 품질

- `src/styles/tokens.css`의 색상 토큰을 교육용 잉크/신호색 체계로 재정렬하고 raw color 사용을 줄입니다.
- 입구 미션 목록을 단순 6개 카드가 아닌 `관찰 → 비교 → 판단` 여정의 작은 인덱스로 바꿉니다.
- 대화상자에는 설명 id를 연결해 `aria-describedby`를 보강하고, 닫기·Escape·초점 복귀의 기존 동작은 유지합니다.
- `업데이트 내역`을 헤더에서 계속 접근 가능하게 두되, 주 CTA와 경쟁하지 않는 도구 그룹으로 정리합니다.

## 유지할 긍정 요소

- `src/domain/routeEvaluator.ts`에 판정 경계가 모여 있고 nullable 값이 null로 전파되어 학습 내용이 임의 계산되지 않습니다.
- `src/app/sessionReducer.ts`가 단계 건너뛰기·오답 수정·완료 후 수정 금지를 명시적으로 잠급니다.
- 실제 가격·기업·지도·학생 개인정보·외부 네트워크를 사용하지 않는 경계가 테스트로 보호됩니다.
- `@media (prefers-reduced-motion: reduce)`에서 `gi-pulse`를 정적인 outline으로 대체하는 기반이 이미 있습니다.
- 이미지에 고정 width/height와 의미 있는 alt가 있고 이미지가 없어도 핵심 콘텐츠가 HTML에 남습니다.
- 결과 화면이 점수·순위 대신 최초 판단·근거·수정 결과를 보존하는 교육적 계약을 지킵니다.

## 리디자인 후 감사 (2026-08-30)

- 셸: sticky header, 본문 skip link, 미션·단계 맥락, 완료/현재/남은 상태를 추가했습니다.
- 입구: 목적·가상 자료 고지·시작 CTA를 좌측에 먼저 배치하고, 장면·활동 정보·6개 미션 여정을 뒤에 배치했습니다.
- 단계 화면: `지금 할 일`과 목표를 활동 보드 앞에 고정하고, 관찰 범례·조립 2열·표/선택지/피드백의 읽기 순서를 정리했습니다.
- 포커스: 단계 변경 뒤 h1이 현재 header 아래에 남으며, `scroll-behavior: auto`로 자동화·키보드 입력을 안정화했습니다.
- 반응형: 320/375/768/1280px에서 `scrollWidth === viewportWidth`, 시작 CTA가 첫 화면에 들어오고, 큰 글자 설정에서도 가로 넘침이 없었습니다.
- 이미지: `fictional-goods-route-map-v2.webp`를 입구 보조 장면으로 적용했고, 최종 번들에서 1000×563으로 로드됨을 확인했습니다.
- 모션: `gi-pulse`는 입구와 전후 비교 CTA 두 곳에만 남겼고, reduced-motion에서는 3px 고정 외곽선으로 대체했습니다.
- 자동 검증: `npm run lint`, `typecheck`, `test:run` 115개, `test:a11y` 4개, `check:lines`, `build`, `test:release` 6개, 단일 worker E2E 16개가 통과했습니다. 병렬 `verify` 재실행은 macOS Chromium MachPort 권한 오류로 실패했으며 코드 실패와 분리했습니다.
- Impeccable detector의 초기 좌측 색상 탭 경고 4건은 상단 신호선으로 수정했습니다. detector는 지침에 따라 변경 후 1회만 실행했습니다.
- VoiceOver와 교사·교과 콘텐츠 검수는 프로젝트 범위 밖의 후속 사람 검수입니다.

## 공개 배포 확인 (2026-08-30)

- 저장소: [WBmaker2/production-distribution-trace-center](https://github.com/WBmaker2/production-distribution-trace-center)
- CI: [33294973292](https://github.com/WBmaker2/production-distribution-trace-center/actions/runs/33294973292) 성공
- Pages: [33294973283](https://github.com/WBmaker2/production-distribution-trace-center/actions/runs/33294973283) 성공
- 공개 URL: [생산·유통 경로 추적소](https://wbmaker2.github.io/production-distribution-trace-center/)
- 공개 smoke: HTTP 200, 제목·favicon·JS/CSS/WebP 200, 콘솔 오류 0건, 375px 가로 넘침 없음, 시작 CTA → 첫 단계 전환 확인

## 남은 후속 검수

1. 교사·교과 담당자가 `docs/content-review.md`의 용어·문장·가치 판단 문구를 확인합니다.
2. 실제 Safari·태블릿 환경과 보조공학 검수는 별도 증거로 남깁니다. VoiceOver 구현·검증은 프로젝트 범위에서 제외했습니다.
3. HVC 등록과 갤러리 동기화는 공개 확인 이후 별도 승인 단계입니다.
