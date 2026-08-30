# 생산·유통 경로 추적소 — classroom route board

## 방향

이 앱은 초등 5~6학년 학생이 가상 상품의 생산·가공·운송·판매·소비 흐름을 읽고, 조건 하나의 변화를 비교한 뒤 근거를 기록하는 학습 도구입니다. 화면은 장식적인 물류 지도보다 **교실에서 펼쳐 보는 유통 관찰 보드**처럼 작동해야 합니다.

- 시각 언어: 따뜻한 종이 바탕 + 짙은 잉크 + 제한된 신호색
- 구조 언어: 관찰 기록, 경로 레일, 토큰 요약, 근거 카드
- 첫 시선: 현재 미션 → 지금 할 일 → 필수 CTA
- 제품 약속: 점수나 순위를 만들지 않고 학생의 판단과 근거를 보존
- 안전 약속: 가상 자료라는 한계를 모든 중요한 화면 가까이에 유지
- 콘텐츠 우선: 이미지가 없어도 HTML 텍스트와 컨트롤만으로 완주

## 색상 토큰

모든 컴포넌트는 아래 semantic token을 사용합니다. 외부 다크 모드나 `prefers-color-scheme` 매핑은 만들지 않습니다.

| 토큰 | 값 | 사용 |
|---|---|---|
| `--color-bg` | `#F6F3EB` | 전체 종이 바탕 |
| `--color-surface` | `#FFFDF8` | 주요 보드·카드 |
| `--color-surface-raised` | `#FFFFFF` | 떠 있는 대화상자·선택 카드 |
| `--color-surface-muted` | `#EAF1EE` | 보조 정보·비활성 영역 |
| `--color-ink` | `#172B2B` | 본문·제목 |
| `--color-ink-soft` | `#49605D` | 설명·보조 문구 |
| `--color-primary` | `#1C5A57` | 주 CTA·현재 단계 |
| `--color-primary-strong` | `#124441` | hover·pressed |
| `--color-primary-soft` | `#DDEDE8` | 현재 보드 배경 |
| `--color-accent` | `#D45C36` | 필수 CTA·신호 표식 |
| `--color-accent-strong` | `#9F3F25` | accent hover·텍스트 |
| `--color-accent-soft` | `#F8E4D9` | 신호 배경 |
| `--color-time` | `#1E5AA8` | 시간 토큰 텍스트/선 |
| `--color-cost` | `#8A4B08` | 비용 토큰 텍스트/선 |
| `--color-loss` | `#A43D38` | 잃음 토큰 텍스트/선 |
| `--color-success` | `#206A52` | 통과 상태 |
| `--color-warning` | `#86520A` | 다시 확인 상태 |
| `--color-danger` | `#A43D38` | 재시작 등 위험 상태 |
| `--color-border` | `#C7D7D2` | 경계선 |
| `--color-border-strong` | `#8EB4AA` | 선택·현재 경계 |
| `--color-focus` | `#0B5964` | 3px focus ring |

본문 색상은 `--color-ink`와 밝은 surface 조합을 사용해 4.5:1 이상을 목표로 합니다. 의미 색상은 색만으로 전달하지 않고 라벨·기호·문장과 함께 사용합니다.

## 타이포그래피

외부 폰트 요청을 만들지 않고 한국어 시스템 폰트를 우선합니다.

```css
--font-body: "Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", system-ui, -apple-system, sans-serif;
```

| 역할 | 크기 | 굵기 | 줄 간격 |
|---|---:|---:|---:|
| 화면 제목 | `clamp(1.7rem, 3vw, 2.55rem)` | 800 | 1.15 |
| 섹션 제목 | `1.35rem` | 800 | 1.25 |
| 카드 제목 | `1.05rem` | 750 | 1.35 |
| 본문 | `1rem` | 400 | 1.65 |
| 강조 본문 | `1.1rem` | 650 | 1.55 |
| 레이블 | `0.78rem` 이상 | 750 | 1.3 |
| 숫자 토큰 | 본문 크기 | 800 | `tabular-nums` |

본문은 모바일 35~60자, 데스크톱 60~75자 안에서 자연스럽게 줄바꿈합니다. 헤딩에는 `text-wrap: balance`를 사용하되 단어를 강제로 붙이지 않습니다.

## 공간·형태·깊이

- 간격 리듬: `4 / 8 / 12 / 16 / 24 / 32 / 48px`
- 페이지 최대 폭: `1120px`; 콘텐츠 안쪽 폭은 `min(100%, 960px)`
- 페이지 거터: mobile `16px`, tablet `28px`, desktop `40px`
- 작은 컨트롤: `8px` radius, 카드: `14px`, 큰 보드: `22px`
- 필수 CTA만 시각적 무게를 높이고, 모든 요소를 pill로 만들지 않습니다.
- 그림자: 잉크색을 섞은 낮은 채도의 `0 14px 34px rgba(23, 43, 43, 0.10)`
- 카드에는 border + shadow를 동시에 남발하지 않고, 보드 계층을 구분할 때만 사용합니다.
- 레일과 섹션은 `border-block-start` 또는 색면으로 구조를 보여 주며 장식 요소가 내용을 대신하지 않게 합니다.

## 페이지 구조

### 앱 셸

- sticky header 높이 토큰 `--header-height: 72px`
- 왼쪽: 앱 이름과 현재 맥락
- 오른쪽: 글자 크기, 업데이트 내역, 재시작 같은 보조 도구
- 본문 상단에는 skip link와 미션/단계 eyebrow를 둡니다.
- 단계 전환 초점은 `scroll-padding-top: calc(var(--header-height) + 16px)`와 `scroll-margin-top`으로 header 아래에 보존합니다.

### 입구

첫 화면은 `학습 약속 + 경로 추적하기`를 먼저 읽고, 그 다음 장면과 미션 인덱스를 읽는 비대칭 2열입니다. mobile에서는 텍스트·CTA → 가상 자료 고지 → 장면 → 미션 순서입니다. 장면 이미지는 개념 보조이며 학습 정보는 HTML에 있습니다.

### 학습 화면

1. 미션 eyebrow와 현재 단계
2. 한 문장 `지금 할 일`
3. 목표/제약을 짧게 보여 주는 activity brief
4. 단계별 활동 보드
5. 상태 피드백
6. 하단이 아닌 보드 가까이 있는 단계 이동 CTA

화면당 primary CTA는 하나입니다. `뒤로 가기`, `다시 만들기`, `취소`는 secondary/ghost로 분리합니다.

### 결과 기록

완료된 미션은 시간 순서의 학습 기록으로 보이고, 최초 판단·경로·조건·근거·최종 토큰·수정 결과를 각각 읽을 수 있어야 합니다. 성공 여부를 점수·등급·순위로 변환하지 않습니다.

## 공용 컴포넌트 규칙

### 버튼

- 모든 버튼 최소 높이 `44px`, inline padding `16px` 이상
- primary: 짙은 teal 또는 필수 CTA의 signal orange, 한 화면에 하나
- secondary: 투명/밝은 surface + 강한 border
- ghost: border 없이 정보성 보조 행동
- danger: 위험 행동에만 사용하고 confirm dialog와 함께 사용
- hover/pressed는 background·box-shadow·`transform: translateY(-1px)`만 사용하며 layout을 재배치하지 않습니다.
- `:focus-visible`은 3px solid `--color-focus` + 3px offset
- disabled는 opacity 0.45, cursor not-allowed, 움직임 없음

### 단계 레일

- 단계 번호·레이블·상태 텍스트를 함께 표시
- 완료: 체크 기호와 `완료` 텍스트, 현재: `현재 단계`, 미완료: `다음` 또는 `남음`
- `aria-current="step"`는 현재 항목 하나에만 사용
- 단계 레일은 좁은 화면에서 가로 스크롤을 만들지 않고 두 줄/2열로 reflow

### 토큰

`시간`, `비용`, `잃음` 텍스트를 항상 노출합니다. 숫자·`자료 없음`·변화 방향을 함께 보여 주고 색상만으로 의미를 전달하지 않습니다. 토큰 숫자는 `font-variant-numeric: tabular-nums`를 사용합니다.

### 선택 카드

- label 전체가 터치 영역이며 input은 의미 있는 native control로 유지
- 선택됨은 border·surface·체크/텍스트와 `aria-checked`/native checked를 함께 사용
- fieldset/legend로 질문 단위를 묶고, 설명은 `aria-describedby`로 연결할 수 있게 합니다.

### 피드백

- `success`, `warning`, `info`는 아이콘 없이도 제목·문장으로 구분 가능해야 합니다.
- 상태가 바뀌면 한 개의 polite status 영역만 갱신합니다.
- 오류에는 원인과 회복 행동을 가까이 배치합니다.

## 반응형 계약

| 폭 | 규칙 |
|---:|---|
| 320px | 한 열, CTA full-width, 토큰 표는 카드 행, rail 2열, inline action wrap |
| 375px | 입구 CTA·가상 자료 고지·현재 활동이 첫 화면에 우선, 보조 정보는 아래 |
| 768px | 입구 2열, 조립 보드 1.1fr/0.9fr, 표는 전체 열 유지 |
| 1024px+ | 최대 1120px 보드, header/본문의 수평 리듬 확대 |
| landscape | 세로 스크롤은 유지하되 고정 요소가 focused control을 가리지 않음 |

`html.large-text`의 125%에서도 fixed height, nowrap, overflow hidden으로 정보를 자르지 않습니다. `overflow-wrap: anywhere`는 긴 ID·URL 같은 토큰에만 사용합니다.

## 모션

- `gi-pulse`는 필수 CTA인 `경로 추적하기`, `전후 비교 확인`에만 사용합니다.
- 애니메이션은 transform/opacity/box-shadow만 사용하고 180~260ms 공용 transition을 사용합니다.
- 단계 전환은 짧은 opacity/translate로 원인과 결과를 연결합니다.
- `prefers-reduced-motion: reduce`에서는 모든 반복 애니메이션을 제거하고 CTA에 3px 정적 outline + `필수` 텍스트를 남깁니다.
- 핵심 내용은 motion이 없어도 즉시 표시되며, motion이 입력을 막지 않습니다.

## 자산·접근성·안전

- 일반 장식·가상 개념 이미지에는 학습 역할을 과장하지 않는 alt를 사용합니다.
- 지도, 수치, 정답, 문구, 로고, 실제 장소·인물·기관은 이미지에 넣지 않습니다.
- 이미지가 로드되지 않아도 화면의 학습 흐름은 완주되어야 합니다.
- skip link, semantic landmarks, heading 순서, visible focus, keyboard equivalent, focus-not-obscured를 필수로 합니다.
- 새 네트워크·폰트·아이콘 패키지를 추가하지 않습니다.

## 적용 범위와 변경 기록

- 적용 화면: 입구, 모든 학습 단계, 결과 기록, 업데이트 내역/재시작 대화상자
- 기반 문서: `work/education-webapp-redesign-plan.md`, `work/education-webapp-redesign-audit.md`
- 최초 기록: 2026-08-30 — 교실 유통 관찰 보드 방향과 semantic token 체계 수립
