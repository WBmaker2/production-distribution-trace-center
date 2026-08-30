# 교육용 웹앱 전체 리디자인 계획

## 실행 상태

- 작성일: 2026-08-30
- 대상: `production-distribution-trace-center`
- 모드: `full` 리디자인
- 구현 시작 전 계획 기록: 완료
- 리디자인 구현: 완료 (2026-08-30)
- 자동 검증: 정적/unit/a11y/release 및 단일 worker E2E 완료
- 수동 브라우저 확인: 320/375/768/1280px 및 단계 전환 완료
- 교사·교과 콘텐츠 검수: 별도 후속 증거로 남김
- 커밋·푸시·배포·HVC 등록: 이번 작업에서 수행하지 않음
- VoiceOver 구현·검증: 범위에서 제외

## 선행 확인

### 프로젝트 규칙

다음 문서는 저장소와 상위 디렉터리에서 찾지 못했습니다. 따라서 존재하지 않는 규칙을 추측하지 않고 기존 계획·콘텐츠·권리 문서를 기준으로 합니다.

- `AGENTS.md`: 없음
- `EDUCATION_DESIGN.md`: 없음
- `design-system/MASTER.md`: 없음 — 이번 설계 단계에서 새로 기록

기존 기준 문서:

- `2026-08-28-production-distribution-trace-center-implementation-plan.md`
- `docs/content-review.md`
- `docs/image-rights-ledger.md`
- `docs/qa/acceptance-checklist.md`
- `docs/release-evidence.md`

### Stage 0와 지원 Skill

`work/education-webapp-redesign-stage0-report.md`의 고정 버전·SHA-256 검사 결과를 사용합니다.

| 역할 | 상태 | 실제 경로 | 적용 시점 |
|---|---|---|---|
| `$impeccable` | available | `/Users/kimhongnyeon/.codex/skills/impeccable/SKILL.md` | 2026-08-30, 초기 감사·최종 검수 규칙 로드 |
| `$ui-ux-pro-max` | available (Stage 0 파일 검사) / 활성 목록 재검색 확인 필요 | `/Users/kimhongnyeon/.codex/skills/ui-ux-pro-max/SKILL.md` | 2026-08-30, 디자인 시스템 규칙·검색 CLI 로드 |
| `$redesign-existing-projects` | available | `/Users/kimhongnyeon/.codex/skills/redesign-existing-projects/SKILL.md` | 2026-08-30, 기존 코드 보존 규칙 로드 |
| `$imagegen` | provided-by-Codex | `/Users/kimhongnyeon/.codex/skills/imagegen/SKILL.md` | 2026-08-30, 일반 개념 자산 안전 규칙 로드 |

`ui-ux-pro-max`는 Stage 0에서 고정 경로와 필수 파일이 확인되었으나 현재 대화의 활성 Skill 목록에는 표시되지 않았습니다. 구현 전 실제 로드가 계속 불가능하면 코드·이미지 변경을 중지하고 Codex 런타임 갱신을 요청합니다. 현재는 파일 직접 로드와 제공된 검색 CLI의 출력만 설계 근거로 사용하고, 외부 설치·다운로드는 하지 않습니다.

## 목표

학생이 가상 상품의 흐름을 읽고, 경로를 조립하고, 조건 하나의 변화를 비교한 뒤, 근거와 함께 판단을 기록한다는 핵심 학습 행동을 첫 화면부터 이해하도록 전체 시각 세계를 바꿉니다.

리디자인의 시각 방향은 **교실의 유통 관찰 보드**입니다. 밝은 종이 바탕, 짙은 잉크색, 하나의 신호 주황색과 보조 청록색을 사용하고, 상품·단계·토큰을 지도처럼 꾸미기보다 실제 조작 가능한 `경로 레일`과 `관찰 기록`으로 보이게 합니다. 기존 파스텔 지도 이미지는 사실 지도나 기업을 뜻하지 않는 장식 자산으로만 유지·교체 판단합니다.

## 보존할 제품 진실과 기능

- Vite + React 19 + TypeScript 정적 SPA 스택을 유지합니다.
- `src/content/missions.ts`의 검수된 6개 미션, 문구 의미, 복수 정답, 판단 보류 규칙을 임의로 바꾸지 않습니다.
- `src/domain/routeEvaluator.ts`의 단일 판정 경계와 `src/app/sessionReducer.ts`의 전이 잠금을 유지합니다.
- 입구 → 관찰 → 경로 조립 → 기본 토큰 → 조건 하나 변경 → 전후 비교 → 판단 → 유통 기록 흐름을 유지합니다.
- 현재 탭 메모리만 사용하며 로그인, 서버, fetch/API, 쿠키, localStorage/sessionStorage/IndexedDB, 분석, 광고를 추가하지 않습니다.
- 학생 이름·식별자 입력, 실제 가격·기업·지역·환경 등급 주장을 추가하지 않습니다.
- 학생 대상 TTS·내레이션·음성 재생·녹음은 추가하지 않습니다.
- 라이트 모드만 유지하고 `prefers-color-scheme: dark`를 추가하지 않습니다.

## 초기 감사 범위와 근거

감사는 `work/education-webapp-redesign-audit.md`에 기록합니다. 코드와 현재 preview를 기준으로 다음을 확인합니다.

- 입구에서 학습 목표와 필수 시작 행동이 첫 화면에 함께 보이는지
- 단계별로 현재 해야 할 일, 완료 조건, 다음 CTA가 분명한지
- 미션 진행 표시가 실제 상태 전이와 일치하는지
- 경로 조립·조건 변경·판단 선택의 상태 차이가 색상에만 의존하지 않는지
- 좁은 화면에서 긴 문구·표·버튼·필수 행동이 가로 넘침이나 긴 스크롤 뒤에 묻히지 않는지
- 제목 focus 이동 때 고정 헤더가 가려지거나 포커스가 보이지 않는지
- `:focus-visible`, Enter/Space, disabled, 오류 회복, 대화상자 닫기/복귀 초점
- 토큰 표의 정보 우선순위와 `자료 없음`의 의미 전달
- 반복 카드·경계·그림자·색상·버튼 패턴의 시스템 일관성
- 이미지의 표시 역할·비율·해상도·alt와 외부 의존성 여부

## 리디자인 범위

### 포함

1. **앱 셸**: 헤더를 `브랜드 + 현재 미션/진행 맥락 + 보조 도구` 구조로 정리하고, 본문 스킵 링크·상태 배지·업데이트 내역 접근성을 보강합니다.
2. **입구**: 첫 뷰포트에 학습 약속과 `경로 추적하기`를 배치하고, 장면 자산과 6개 미션을 `학습 여정`으로 재구성합니다.
3. **진행 헤더**: pill 나열 대신 단계 레일과 현재 단계 설명을 사용하되, 실제 단계 수와 상태를 계속 텍스트로 제공합니다.
4. **관찰 단계**: 상품 장면, 목표, 단계 카드를 정보 순서에 맞춰 배치하고 토큰 범례를 별도 제공해 숫자의 의미를 먼저 설명합니다.
5. **경로 조립 단계**: `남은 카드`와 `내 경로`를 두 영역으로 명확히 분리하고, 순서·삭제 컨트롤을 손쉽게 찾게 하며 검사 결과가 경로 바로 아래 나타나게 합니다.
6. **토큰/비교 단계**: 표를 읽기 쉬운 요약판과 상세 표로 재구성하고, `자료 없음`·증가·감소·변화 없음의 의미를 라벨과 기호로 함께 보여 줍니다.
7. **판단/피드백**: 근거와 필요한 자료 선택지를 실제 질문처럼 묶고, 첫 오답·수정 가능·최종 기록 상태를 가까운 위치에 표시합니다.
8. **결과 기록**: 미션별 기록을 타임라인형 학습 기록으로 정리하고, 최초 판단·근거·수정 결과·다음 행동을 구분합니다. 점수·순위는 만들지 않습니다.
9. **공용 스타일/모션**: 의미 토큰, 반응형 브레이크포인트, focus ring, hover/pressed/disabled, `gi-pulse`와 reduced-motion 대체를 재정의합니다.
10. **일반 개념 이미지**: 기존 자산을 감사한 후 필요한 경우에만 `imagegen`으로 버전 파일을 생성합니다. 원본은 보존하고 권리 장부에 기록합니다.

### 변경하지 않을 범위

- 도메인 타입, 미션 정답·판정 알고리즘, 세션 reducer의 의미 변경
- 새 라우터, 새 UI 프레임워크, 새 아이콘/폰트/분석 패키지 설치
- 실제 지도·도표·사진·로고·상표·기관 자산 자동 생성 또는 자동 교체
- 서버·영구 저장·외부 네트워크·실시간 데이터
- 커밋·원격 저장소·Pages 배포·HVC 등록

## 상태 전이 설계

기존 reducer 전이를 그대로 사용하며 화면 표현만 바꿉니다.

```text
INTRO
  ↓ 경로 추적하기
OBSERVE → ORDER → BASELINE → [CHANGE_ONE → COMPARE] → DECIDE → REPORT
  ↑ 뒤로 가기 / 수정 1회
REPORT → 다음 미션 / 전체 기록 / 인쇄 / 다시 시작
```

- `ORDER`는 연결 검사를 통과해야 `BASELINE`으로 이동합니다.
- 조건 변화 미션은 `CHANGE_ONE` 확인 후 `COMPARE`를 거칩니다.
- 첫 판단이 실패하면 정답을 직접 공개하지 않고 `BEGIN_REVISION`으로 한 번만 돌아갑니다.
- 단계가 바뀔 때 `mainHeadingRef`로 초점을 이동하되 `scroll-margin-top`과 실제 header 높이를 반영해 헤더가 사라지지 않게 합니다.
- 상태 변경 결과는 `role=status` 또는 `aria-live`를 한 곳에서만 사용하고 포커스를 불필요하게 빼앗지 않습니다.

## 파일 후보와 책임

### 스타일·셸

- `src/styles/tokens.css`: 색상·서체·간격·반경·그림자·z-index·breakpoint 토큰
- `src/styles/app.css`: 앱 셸·입구·헤더·공용 버튼·대화상자·공용 상태
- `src/styles/workbench.css`: 학습 레일·단계 카드·경로 보드·토큰 표·선택지·피드백
- `src/styles/motion.css`: `gi-pulse`, pressed/enter transition, reduced-motion 대체
- `src/features/report/print.css`: 인쇄 결과의 새 구조에 맞춘 규칙
- `src/main.tsx`, `index.html`: 스킵 링크/메타와 스타일 진입 순서가 필요한 경우만 최소 수정

### 컴포넌트·화면

- `src/app/App.tsx`: 셸, 현재 미션 맥락, skip link, 상태/초점 흐름
- `src/components/ActionButton.tsx`: 변형·아이콘 대체·공용 상태 클래스
- `src/components/ProgressSteps.tsx`: 단계 레일의 의미·반응형 표현
- `src/components/UpdateHistoryButton.tsx`, `UpdateHistoryDialog.tsx`, `ModalDialog.tsx`: 보조 도구와 초점 복귀
- `src/features/route-trace/EntranceScreen.tsx`: 입구 새 레이아웃
- `src/features/route-trace/RouteWorkbench.tsx`: 단계 헤더와 CTA 위계
- `src/features/route-trace/workbenchSteps.tsx`: 관찰·조립·토큰·비교·판단의 구조화
- `src/features/route-trace/FeedbackPanel.tsx`: 상태별 아이콘 없이도 이해되는 텍스트·테두리 표현
- `src/features/report/LearningReport.tsx`: 기록 요약과 다음 행동
- 필요 시 `src/components/RouteRail.tsx`, `TokenSummary.tsx`, `StepIntro.tsx`로 분리하되 각 파일 500줄 미만을 유지

## 자산 판정 규칙

먼저 `public`, `src/assets`, CSS `url`, JSX/TSX import, preload/srcset를 전수 검색합니다.

- 현재 `.webp` 4종은 가상의 상품·마을을 보조하는 일반 개념 자산으로 분류할 수 있지만, 이미지 자체가 핵심 학습 정보나 사실 증거가 아님을 확인합니다.
- 장식·개념 자산만 `imagegen` 후보입니다. 새 파일은 `*-v2.webp`처럼 버전을 올리고 원본을 보존합니다.
- 지도처럼 보이는 구도, 읽을 수 있는 글자·수치·로고·상표·실존 인물·실제 장소·정확한 도식이 생성되면 폐기합니다.
- 경로·토큰·정답은 계속 HTML/React로 렌더링하며 이미지에 넣지 않습니다.
- 필요성이 낮거나 생성 도구가 안전하게 산출하지 못하면 기존 자산을 유지하고 `human review required`로 기록합니다.
- 모든 변경은 `work/education-webapp-redesign-assets.md`에서 원본, 새 경로, 역할, alt, 검토 상태, 롤백 경로를 1:1로 기록합니다.

## 디자인 시스템 산출물

`design-system/MASTER.md`를 생성해 다음을 고정합니다.

- 스타일 원칙: classroom route board / warm paper + ink / restrained signal color
- 라이트 컬러 토큰과 최소 대비 목표 4.5:1
- 시스템 글꼴 우선, 외부 폰트 로드 없음, 본문 16px 이상·줄 간격 1.6 이상
- 4/8px 기반 간격, `0/8/12/16/24/32/48` 리듬, 모바일 우선 max-width
- 버튼 위계: 화면당 primary CTA 1개, 보조·취소·위험 액션 분리
- 단계 레일, 카드, 토큰 배지, 피드백 패널, 선택 필드의 공용 규칙
- 320/375/768/1280px 레이아웃 원칙과 200% 글자 확대 대응
- `:focus-visible`, skip link, focus-not-obscured, logical tab order
- `gi-pulse`는 `경로 추적하기`와 `전후 비교 확인`에만 적용하고 reduced motion에서는 고정 outline + `필수` 텍스트로 대체

ui-ux 검색 결과는 그대로 복사하지 않고, 교육용 라이트 모드·오프라인·한국어 가독성·기존 콘텐츠 제약에 맞춰 합성합니다. 외부 Google Fonts URL은 사용하지 않습니다.

## TDD·검증 순서

기존 동작을 보호하는 테스트를 먼저 유지하고, 시각 변경에 필요한 회귀 테스트를 보강합니다.

1. 초기 감사 및 계획 기록: `work/education-webapp-redesign-audit.md`, 이 문서
2. 디자인 시스템 기록: `design-system/MASTER.md`
3. RED: `App.test.tsx`, `EntranceScreen.test.tsx`, `RouteWorkbench.test.tsx`, `LearningReport.test.tsx`에 새 role/name/상태 계약 추가
4. RED: 모바일 구조, skip link, focus scroll margin, reduced motion, CTA pulse 대상, 업데이트 내역 문구의 회귀 테스트 추가
5. 구현: 셸 → 입구 → 단계 레일/관찰 → 조립/피드백 → 토큰/비교/판단 → 결과 → 스타일/모션 순서
6. 일반 자산 감사·생성·참조 갱신: `work/education-webapp-redesign-assets.md`
7. 자동 검증(실제 package script만 사용):

```text
npm run lint
npm run typecheck
npm run test:run
npm run test:a11y
npm run check:lines
npm run build
npm run test:release
npm run test:e2e
git diff --check
```

8. 브라우저 흐름: 입구 → 딸기 미션 → 오답/수정 → 조건 변화 미션 → 정보 부족 미션 → 결과/인쇄
9. 브라우저 크기: 320×568, 375×812, 768×1024, 1280×800 및 landscape
10. 브라우저 확인: 콘솔 오류 없음, 이미지 로드, HTML 경로, 가로 넘침 0, Tab/Shift+Tab/Enter/Space, focus-visible, reduced motion, 라이트 모드
11. 최종 `$impeccable` 검수와 수동 감사 문서 병합

자동화 통과와 교사·교과 검수, 실제 보조공학 승인, 출시·배포 완료는 서로 다른 증거로 보고합니다.

## 수용 기준

- 첫 화면에서 앱의 학습 목적·가상 자료 한계·예상 시간·`경로 추적하기`를 이해하고 CTA에 접근할 수 있습니다.
- 각 단계 화면에서 현재 단계, 학습 목표, 지금 해야 할 일, 다음 행동이 한 덩어리로 보입니다.
- 단계 변경 후 제목 초점이 보이고 header가 포커스를 가리지 않습니다.
- 경로 조립은 카드 추가·위/아래 이동·삭제·검사를 마우스/터치/키보드로 동일하게 수행합니다.
- `자료 없음`은 0으로 바뀌지 않고, 변화 방향은 숫자만이 아니라 텍스트로 전달됩니다.
- 오답 피드백은 정답 배열을 바로 노출하지 않고 한 번의 수정 경로를 제공합니다.
- 결과는 점수·순위 없이 최초 판단·근거·수정 결과·다음 행동을 보여 줍니다.
- 필수 CTA만 `gi-pulse`를 사용하고 `prefers-reduced-motion: reduce`에서 정적인 3px outline으로 바뀝니다.
- 320px 이상에서 가로 스크롤이 없고 200% 글자 확대에서도 핵심 조작이 잘리지 않습니다.
- 의미 있는 이미지에는 과장 없는 alt가 있고, 이미지가 없어도 학습을 완주할 수 있습니다.
- 기존 프라이버시·무네트워크·무저장 테스트가 유지되고, 새로운 외부 의존성이 없습니다.
- 모든 TS/TSX/CSS 파일은 500줄 미만입니다.

## 위험과 대응

| 위험 | 대응 |
|---|---|
| 시각 변경 중 학습 상태/판정이 깨짐 | reducer/domain/content는 보존하고 화면 테스트·E2E를 단계별로 실행 |
| 한국어 문장이 좁은 화면에서 잘림 | 자연스러운 wrapping, 최소 16px, `overflow-wrap`과 320/375px 실측 |
| CTA가 장식에 묻힘 | 입구·단계 화면에 primary 1개, mobile-first 우선순위, pulse 제한 |
| focus 이동이 header를 숨김 | `scroll-margin-top`, heading 위치와 실제 browser snapshot 확인 |
| 생성 이미지가 사실처럼 보임 | asset-safety 분류, 텍스트·지도·로고 금지, 원본 보존·사람 검토 대기 |
| 외부 폰트/아이콘이 오프라인 경계를 깨뜨림 | 기존 시스템 폰트와 CSS/SVG 형태를 우선 사용하고 패키지 설치 금지 |
| 지원 Skill 런타임 등록이 파일 존재와 다름 | 구현·이미지 생성 전 활성 목록 재확인; 불가하면 안전 중지 |

## 롤백

- 이번 변경 전 기준점: `14ee91b72d5ba0e9992b6721ef91c2afcc36851b`와 현재 작업 트리의 기존 파일
- 관련 없는 사용자 변경은 보존합니다.
- 새 이미지 참조는 `*-v2` 파일만 가리키게 하고, 문제 시 import/경로를 원본 파일로 되돌립니다. 원본은 삭제하지 않습니다.
- CSS/컴포넌트 변경은 파일별 diff로 검토하고, 실패한 단계는 마지막 정상 변경 전 diff를 부분 되돌림 대상으로 삼습니다.
- `git reset --hard`, 광범위 삭제, 커밋·푸시·배포는 실행하지 않습니다.
