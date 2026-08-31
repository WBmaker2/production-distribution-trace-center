# Learner Text Inventory

- Root: `/Volumes/ External Drive 256G/Dev2/codex/production-distribution-trace-center`
- Files scanned: `47`
- Candidates: `1068`
- Status: `triage only`; not a grade-level certification or automatic rewrite.

## Candidate strings

| Source | Surface | Text | Role hints | Review signals |
| --- | --- | --- | --- | --- |
| e2e/keyboard.spec.ts:4:4 | text | 별빛 농원에서 딸기를 수확해요 | learner-text-candidate | repeated-text |
| e2e/keyboard.spec.ts:5:4 | text | 상태가 좋은 딸기를 골라 상자에 담아요 | learner-text-candidate | repeated-text |
| e2e/keyboard.spec.ts:6:4 | text | 트럭으로 가게까지 실어 나르세요 | learner-text-candidate | repeated-text |
| e2e/keyboard.spec.ts:7:4 | text | 가게 진열대에 놓고 팔아요 | learner-text-candidate | repeated-text |
| e2e/keyboard.spec.ts:15:16 | text | 키보드 전용 조작 | learner-text-candidate | — |
| e2e/keyboard.spec.ts:16:9 | text | 키보드만으로 순서를 고치고 경로를 완주한다 | learner-text-candidate | — |
| e2e/keyboard.spec.ts:16:54 | text | { await page.goto("./"); await pressOn(page, page.getByRole("button", { name: "경로 추적하기" })); await pressOn(page, page.getByRole("button", { name: "단계 배열하기" })); // 일부러 거꾸로 넣고 for (const label of [...STRAWBERRY].reverse()) { await pressOn(page, page.getByRole("button", { name: `경로에 넣기: ${label}` })); } // 위로 버튼만으로 올바른 순서를 만든다 const farmUp = page.getByRole("button", { name: "별빛 농원에서 딸기를 수확해요 위로 옮기기", }); const sortUp = page.getByRole("button", { name: "상태가 좋은 딸기를 골라 상자에 담아요 위로 옮기기", }); const truckUp = page.getByRole("button", { name: "트럭으로 가게까지 실어 나르세요 위로 옮기기", }); for (let index = 0; index | button-or-action | long-or-dense, technical-or-internal |
| e2e/keyboard.spec.ts:18:41 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:18:59 | text | 경로 추적하기 | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:19:41 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:19:59 | text | 단계 배열하기 | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:23:43 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:23:61 | text | 경로에 넣기: ${label} | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:26:36 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:27:14 | text | 별빛 농원에서 딸기를 수확해요 위로 옮기기 | learner-text-candidate | — |
| e2e/keyboard.spec.ts:29:36 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:30:14 | text | 상태가 좋은 딸기를 골라 상자에 담아요 위로 옮기기 | learner-text-candidate | — |
| e2e/keyboard.spec.ts:32:37 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:33:14 | text | 트럭으로 가게까지 실어 나르세요 위로 옮기기 | learner-text-candidate | — |
| e2e/keyboard.spec.ts:39:34 | text | 1. 생산 · 별빛 농원에서 딸기를 수확해요 | learner-text-candidate | — |
| e2e/keyboard.spec.ts:40:34 | text | 4. 판매 · 가게 진열대에 놓고 팔아요 | learner-text-candidate | — |
| e2e/keyboard.spec.ts:42:41 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:42:59 | text | 연결 검사 | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:43:34 | text | 연결 검사를 통과했어요 | learner-text-candidate | repeated-text |
| e2e/keyboard.spec.ts:44:41 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:44:59 | text | 기본 경로 보기 | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:45:55 | text | 합계 | learner-text-candidate | repeated-text |
| e2e/keyboard.spec.ts:46:41 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:46:59 | text | 판단하기 | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:51:41 | text | button | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:51:59 | text | 판단 기록하기 | button-or-action | repeated-text |
| e2e/keyboard.spec.ts:53:34 | text | heading | heading | repeated-text |
| e2e/keyboard.spec.ts:53:74 | text | 유통 기록 | heading | repeated-text |
| e2e/keyboard.spec.ts:54:34 | text | heading | heading | repeated-text |
| e2e/learner-flow.spec.ts:4:4 | text | 별빛 농원에서 딸기를 수확해요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:5:4 | text | 상태가 좋은 딸기를 골라 상자에 담아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:6:4 | text | 트럭으로 가게까지 실어 나르세요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:7:4 | text | 가게 진열대에 놓고 팔아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:11:4 | text | 재생 종이 원료를 모아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:12:4 | text | 공장에서 공책을 만들어요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:13:4 | text | 창고 A에 하루 동안 쌓아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:14:4 | text | 문구점 진열대에 놓아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:18:4 | text | 재생 종이 원료를 모아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:19:4 | text | 공장에서 공책을 만들어요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:20:4 | text | 창고 B에 저렴하게 오래 쌓아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:21:4 | text | 문구점 진열대에 놓아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:25:4 | text | 공장에서 상품을 실어 보내요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:26:4 | text | 트럭이 다리를 지나 가요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:27:4 | text | 가게에 상품을 내려놓아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:31:4 | text | 공장에서 달빛 과자를 만들어요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:32:4 | text | 작은 상자 여러 개로 나눠 담아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:33:4 | text | 작은 상자를 두 번 나눠 실어 나르세요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:34:4 | text | 가게에 상자를 내려놓아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:38:4 | text | 마을 농장에서 채소 상자를 만들어요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:39:4 | text | 근처 상점까지 가까운 길로 가요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:40:4 | text | 근처 상점 진열대에 놓아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:41:4 | text | 손님이 상품을 사서 써요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:45:4 | text | 공장에서 완제품을 만들어요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:46:4 | text | 운송 회사가 상품을 실어요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:47:4 | text | 가게에 도착해 팔려요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:52:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:52:43 | text | 경로 추적하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:57:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:57:45 | text | 경로에 넣기: ${label} | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:62:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:62:43 | text | 단계 배열하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:64:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:64:43 | text | 연결 검사 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:65:32 | text | 연결 검사를 통과했어요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:66:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:66:43 | text | 기본 경로 보기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:70:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:70:43 | text | 판단하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:72:27 | text | checkbox | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:74:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:74:43 | text | 판단 기록하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:79:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:79:43 | text | 다음 미션 보기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:80:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:80:43 | text | 단계 배열하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:84:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:84:43 | text | 조건 바꾸기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:85:42 | text | 조건을 바꾸지 않고 그대로 유지 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:86:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:86:43 | text | 전후 비교 확인 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:87:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:87:43 | text | 판단하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:89:27 | text | checkbox | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:91:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:91:43 | text | 판단 기록하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:95:16 | text | 학습자 흐름 | learner-text-candidate | — |
| e2e/learner-flow.spec.ts:96:9 | text | 딸기 안내 미션: 배열 → 기본 경로 → 판단 → 유통 기록 | instruction | — |
| e2e/learner-flow.spec.ts:98:34 | text | heading | heading | repeated-text |
| e2e/learner-flow.spec.ts:98:71 | text | 생산·유통 경로 추적소 | heading | repeated-text |
| e2e/learner-flow.spec.ts:100:34 | text | heading | heading | repeated-text |
| e2e/learner-flow.spec.ts:100:74 | text | 별빛 딸기 상자 | heading | repeated-text |
| e2e/learner-flow.spec.ts:102:55 | text | 합계 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:104:34 | text | heading | heading | repeated-text |
| e2e/learner-flow.spec.ts:104:74 | text | 유통 기록 | heading | repeated-text |
| e2e/learner-flow.spec.ts:105:34 | text | 최초 판단 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:108:9 | text | 공책 미션의 두 유효 창고 경로를 각각 완료한다 | learner-text-candidate | abstract-or-formal |
| e2e/learner-flow.spec.ts:118:36 | text | heading | heading | repeated-text |
| e2e/learner-flow.spec.ts:118:76 | text | 유통 기록 | heading | repeated-text |
| e2e/learner-flow.spec.ts:123:9 | text | 지연 조건을 바꾸고 뒤 단계 총시간 변화를 확인한다 | learner-text-candidate | — |
| e2e/learner-flow.spec.ts:132:34 | text | 자료 없음 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:133:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:133:45 | text | 조건 바꾸기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:135:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:135:45 | text | 전후 비교 확인 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:137:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:137:45 | text | 판단하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:140:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:140:45 | text | 판단 기록하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:144:9 | text | 정보 부족 미션: 잘못된 자료는 거부되고 운송비 자료 요청만 통과한다 | learner-text-candidate | — |
| e2e/learner-flow.spec.ts:153:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:153:45 | text | 조건 바꾸기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:155:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:155:45 | text | 전후 비교 확인 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:156:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:156:45 | text | 판단하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:159:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:159:45 | text | 판단 기록하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:168:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:168:45 | text | 판단하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:169:47 | text | 날씨 기록 자료 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:170:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:170:45 | text | 판단 기록하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:171:34 | text | 아직 목표와 근거가 맞지 않아요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:172:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:172:45 | text | 한 번 다시 정하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:174:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:174:45 | text | 다시 만들기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:176:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:176:45 | text | 연결 검사 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:177:34 | text | 연결 검사를 통과했어요 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:178:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:178:45 | text | 기본 경로 보기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:179:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:179:45 | text | 판단하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:180:47 | text | 운송비 자료 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:181:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:181:45 | text | 판단 기록하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:183:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:183:45 | text | 모든 미션 끝내기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:184:34 | text | heading | heading | repeated-text |
| e2e/learner-flow.spec.ts:184:71 | text | 전체 미션 · 학습 마무리 | heading | repeated-text |
| e2e/learner-flow.spec.ts:185:34 | text | heading | heading | repeated-text |
| e2e/learner-flow.spec.ts:185:63 | text | 모든 경로를 살펴봤어요 | heading | repeated-text |
| e2e/learner-flow.spec.ts:187:34 | text | 다시 정한 결과 | learner-text-candidate | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:9:16 | text | 모바일 화면과 축소 모션 | learner-text-candidate | — |
| e2e/mobile-reduced-motion.spec.ts:10:9 | text | 320px와 375px에서 가로 넘침이 없다 | learner-text-candidate | — |
| e2e/mobile-reduced-motion.spec.ts:20:27 | text | button | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:20:45 | text | 경로 추적하기 | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:21:27 | text | button | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:21:45 | text | 단계 배열하기 | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:25:8 | text | 별빛 농원에서 딸기를 수확해요 | learner-text-candidate | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:26:8 | text | 상태가 좋은 딸기를 골라 상자에 담아요 | learner-text-candidate | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:27:8 | text | 트럭으로 가게까지 실어 나르세요 | learner-text-candidate | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:28:8 | text | 가게 진열대에 놓고 팔아요 | learner-text-candidate | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:30:29 | text | button | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:30:47 | text | 경로에 넣기: ${label} | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:32:27 | text | button | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:32:45 | text | 연결 검사 | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:33:27 | text | button | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:33:45 | text | 기본 경로 보기 | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:36:55 | text | 합계 | learner-text-candidate | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:38:32 | text | td[data-label='시간 토큰'] | learner-text-candidate | — |
| e2e/mobile-reduced-motion.spec.ts:41:9 | text | 축소 모션에서 맥박 애니메이션이 제거되고 3px 고정 외곽선으로 대체된다 | learner-text-candidate | — |
| e2e/mobile-reduced-motion.spec.ts:46:35 | text | button | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:46:53 | text | 경로 추적하기 | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:51:9 | text | 모션 설정이 없으면 맥박 애니메이션이 유지된다 | learner-text-candidate | — |
| e2e/mobile-reduced-motion.spec.ts:54:35 | text | button | button-or-action | repeated-text |
| e2e/mobile-reduced-motion.spec.ts:54:53 | text | 경로 추적하기 | button-or-action | repeated-text |
| eslint.config.js:30:10 | text | error | feedback-or-error | — |
| index.html:6:39 | text | 초등 5~6학년 사회 학습 앱. 상품이 생산·가공·운송·판매·소비 단계를 지나는 경로를 추적하고 조건 변화를 비교해요. | learner-text-candidate | long-or-dense |
| index.html:8:12 | text | 생산·유통 경로 추적소 | learner-text-candidate | repeated-text |
| scripts/check-file-lines.mjs:38:18 | text | check:lines 실패 — ${LIMIT}줄 이상인 파일이 ${violations.length}개 있습니다. | feedback-or-error | long-or-dense, technical-or-internal |
| scripts/check-file-lines.mjs:40:20 | text | ${relative(".", path)}: ${lineCount}줄 (한도 ${LIMIT}줄) | feedback-or-error | long-or-dense, technical-or-internal |
| scripts/check-file-lines.mjs:45:14 | text | check:lines 통과 — 검사한 파일 ${files.length}개, 모두 ${LIMIT}줄 미만입니다. | learner-text-candidate | long-or-dense, technical-or-internal |
| src/accessibility/AccessibilityToolbar.tsx:6:18 | text | { document.documentElement.classList.toggle("large-text", largeText); }, [largeText]); return ( | learner-text-candidate | long-or-dense |
| src/accessibility/AccessibilityToolbar.tsx:11:60 | aria-label | 화면 도구 | aria-label | — |
| src/accessibility/AccessibilityToolbar.tsx:11:67 | text | {largeText ? ( | button-or-action | — |
| src/accessibility/AccessibilityToolbar.tsx:18:10 | text | 글자 보통 | button-or-action | repeated-text |
| src/accessibility/AccessibilityToolbar.tsx:27:10 | text | 글자 크게 | button-or-action | repeated-text |
| src/app/App.test.tsx:10:11 | text | App 셸 | learner-text-candidate | — |
| src/app/App.test.tsx:11:7 | text | 처음에는 입구 화면을 보여 준다 | learner-text-candidate | — |
| src/app/App.test.tsx:13:30 | text | heading | heading | repeated-text |
| src/app/App.test.tsx:13:59 | text | 생산·유통 경로 추적소 | heading | repeated-text |
| src/app/App.test.tsx:14:30 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:14:48 | text | 경로 추적하기 | button-or-action | repeated-text |
| src/app/App.test.tsx:15:46 | text | 본문으로 건너뛰기 | learner-text-candidate | repeated-text |
| src/app/App.test.tsx:21:7 | text | 시작하면 첫 미션 단계 화면으로 가고 큰 제목에 초점을 옮긴다 | learner-text-candidate | — |
| src/app/App.test.tsx:24:40 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:24:58 | text | 경로 추적하기 | button-or-action | repeated-text |
| src/app/App.test.tsx:25:39 | text | heading | heading | repeated-text |
| src/app/App.test.tsx:26:40 | text | 별빛 딸기 상자 | heading | repeated-text |
| src/app/App.test.tsx:27:40 | text | 단계 관찰 | heading | repeated-text |
| src/app/App.test.tsx:29:50 | text | 단계 관찰, 현재 단계 | learner-text-candidate | — |
| src/app/App.test.tsx:33:33 | text | 남은 단계 | learner-text-candidate | repeated-text |
| src/app/App.test.tsx:36:7 | text | 머리말에서 업데이트 내역 대화상자를 열고 닫을 수 있다 | learner-text-candidate | — |
| src/app/App.test.tsx:39:40 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:39:58 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/app/App.test.tsx:42:30 | text | 구현 계획 확정 | learner-text-candidate | repeated-text |
| src/app/App.test.tsx:47:7 | text | 학습 중 처음부터 다시 하기는 확인 대화상자를 거친다 | learner-text-candidate | — |
| src/app/App.test.tsx:50:40 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:50:58 | text | 경로 추적하기 | button-or-action | repeated-text |
| src/app/App.test.tsx:51:40 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:51:58 | text | 처음부터 다시 하기 | button-or-action | repeated-text |
| src/app/App.test.tsx:53:39 | text | 처음부터 | learner-text-candidate | — |
| src/app/App.test.tsx:54:40 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:54:58 | text | 취소 | button-or-action | repeated-text |
| src/app/App.test.tsx:56:40 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:56:58 | text | 처음부터 다시 하기 | button-or-action | repeated-text |
| src/app/App.test.tsx:57:40 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:57:58 | text | 처음부터 할게요 | button-or-action | repeated-text |
| src/app/App.test.tsx:58:30 | text | heading | heading | repeated-text |
| src/app/App.test.tsx:58:59 | text | 생산·유통 경로 추적소 | heading | repeated-text |
| src/app/App.test.tsx:59:30 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:59:48 | text | 경로 추적하기 | button-or-action | repeated-text |
| src/app/App.test.tsx:62:7 | text | 글자 크기 버튼은 문서 루트에 큰 글자 상태를 적용한다 | learner-text-candidate | abstract-or-formal |
| src/app/App.test.tsx:65:38 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:65:56 | text | 글자 크게 | button-or-action | repeated-text |
| src/app/App.test.tsx:69:30 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:69:48 | text | 글자 보통 | button-or-action | repeated-text |
| src/app/App.test.tsx:70:40 | text | button | button-or-action | repeated-text |
| src/app/App.test.tsx:70:58 | text | 글자 보통 | button-or-action | repeated-text |
| src/app/App.tsx:30:44 | text | function | heading | — |
| src/app/App.tsx:31:40 | text | start | heading | — |
| src/app/App.tsx:31:59 | text | auto | heading | — |
| src/app/App.tsx:38:10 | text | 생산·유통 경로 추적소 | learner-text-candidate | repeated-text |
| src/app/App.tsx:40:12 | text | 전체 미션 · 학습 마무리 | learner-text-candidate | repeated-text |
| src/app/App.tsx:41:12 | text | ${mission.title} · ${STEP_LABELS[state.step]} | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/app/App.tsx:45:50 | text | ({ key: step, label: STEP_LABELS[step], current: step === state.step, completed: index | learner-text-candidate | long-or-dense, technical-or-internal |
| src/app/App.tsx:53:53 | text | CONFIRM_RESTART | feedback-or-error | — |
| src/app/App.tsx:55:47 | text | 본문으로 건너뛰기 | learner-text-candidate | repeated-text |
| src/app/App.tsx:61:40 | text | 생산·유통 경로 추적소 | learner-text-candidate | repeated-text |
| src/app/App.tsx:64:54 | text | true | learner-text-candidate | — |
| src/app/App.tsx:64:68 | text | {STEP_LABELS[state.step]} | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/app/App.tsx:70:75 | text | {state.step !== "INTRO" && ( | learner-text-candidate | technical-or-internal |
| src/app/App.tsx:75:18 | text | 처음부터 다시 하기 | learner-text-candidate | repeated-text |
| src/app/App.tsx:98:16 | title | 처음부터 다시 할까요? | title | — |
| src/app/App.tsx:100:12 | text | 지금까지 기록한 응답은 어디에도 저장되지 않았어요. 새로 시작하면 사라져요. | learner-text-candidate | — |
| src/app/App.tsx:102:34 | text | secondary | learner-text-candidate | repeated-text |
| src/app/App.tsx:102:78 | text | CANCEL_RESTART | learner-text-candidate | — |
| src/app/App.tsx:102:98 | text | 취소 | learner-text-candidate | repeated-text |
| src/app/App.tsx:108:12 | text | 처음부터 할게요 | learner-text-candidate | repeated-text |
| src/app/ErrorBoundary.tsx:1:60 | text | react | feedback-or-error | repeated-text |
| src/app/ErrorBoundary.tsx:5:26 | text | void; } interface ErrorBoundaryState { readonly hasError: boolean; } /** 계획 문서 11: 어린이용 안내만 보여 주고 기술 정보를 노출하지 않는다. */ export class ErrorBoundary extends Component | feedback-or-error, instruction | long-or-dense, technical-or-internal |
| src/app/ErrorBoundary.tsx:13:85 | text | { override state: ErrorBoundaryState = { hasError: false }; static getDerivedStateFromError(): ErrorBoundaryState { return { hasError: true }; } override componentDidCatch(_error: unknown, _info: ErrorInfo) { // 학생 화면에 오류 내용을 보여 주지 않는다. } override render(): ReactNode { if (!this.state.hasError) { return this.props.children; } return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/app/ErrorBoundary.tsx:30:13 | text | 활동을 다시 불러오지 못했어요 | heading | shaming-tone |
| src/app/ErrorBoundary.tsx:31:12 | text | 일시적인 문제가 생겼어요. 처음부터 다시 시작할 수 있어요. | learner-text-candidate | — |
| src/app/ErrorBoundary.tsx:39:10 | text | 처음부터 다시 하기 | button-or-action | repeated-text |
| src/app/sessionReducer.test.ts:71:11 | text | 세션 reducer — 전이 잠금 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:72:7 | text | 초기 상태는 입구이며 6개 미션 진행 칸을 가진다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:81:7 | text | 입구에서 NEXT로 건너뛰지 못하고 START로만 진행한다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:86:7 | text | 연결 검사 없이 기본 경로로 건너뛰지 못한다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:95:7 | text | 연결이 끊긴 경로는 연결 검사를 통과하지 못한다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:106:7 | text | 조건 변화가 없는 미션은 기본 경로에서 판단으로 바로 간다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:120:7 | text | 조건 변화가 있는 미션는 CHANGE_ONE과 COMPARE를 반드시 지난다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:141:7 | text | 모르는 조건 변화 ID와 모르는 근거 키는 상태를 바꾸지 않는다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/app/sessionReducer.test.ts:160:7 | text | 알 수 없는 action은 상태를 바꾸지 않는다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:165:7 | text | 범위를 벗어난 카드 조작은 상태를 바꾸지 않는다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:174:11 | text | 세션 reducer — 응답 보존과 수정 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:175:7 | text | 뒤로 가기는 직전 단계로 가면서 응답을 보존한다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:192:7 | text | 경로를 다시 만지면 연결 검사와 조건 선택은 초기화된다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:218:7 | text | 첫 판단이 거부되면 DECIDE에 머무르고 한 번만 수정 기회를 준다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/app/sessionReducer.test.ts:261:7 | text | 수정 시작 시 이전 근거와 자료 선택을 비워 자연스러운 재시도를 보장한다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:301:11 | text | 세션 reducer — 미션 진행과 재시작 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:302:7 | text | 여섯 미션을 모두 완료하면 finished가 된다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:320:7 | text | 재시작 요청은 확인을 거쳐 새 초기 상태를 만든다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:338:7 | text | 흐름 단계 목록은 조건 변화 유무를 반영한다 | learner-text-candidate | — |
| src/app/sessionReducer.test.ts:350:7 | text | 모든 미션의 정답 계획으로 REPORT에 도달한다 | feedback-or-error | — |
| src/app/sessionReducer.ts:38:14 | text | 조건을 바꾸지 않기로 선택 | learner-text-candidate | — |
| src/app/sessionReducer.ts:38:34 | text | 아직 선택 전 | learner-text-candidate | — |
| src/app/sessionReducer.ts:120:54 | text | index === state.missionIndex ? update(progress) : progress, ), }; } /** 경로를 다시 만지면 연결 검사와 조건 선택은 더 이상 유효하지 않다. */ function clearRouteDerivedAnswers(progress: MissionProgress): MissionProgress { return { ...progress, assembledNodeIds: [], connectionCheck: null, appliedChangeId: null, }; } function routeMutated(progress: MissionProgress): MissionProgress { return { ...progress, connectionCheck: null, appliedChangeId: null, changeConfirmed: false, }; } const BACK_TARGETS: Partial | learner-text-candidate | abstract-or-formal, long-or-dense, technical-or-internal |
| src/assets/generatedAssets.test.ts:26:11 | text | 생성 자산과 권리 장부 | learner-text-candidate | — |
| src/assets/generatedAssets.test.ts:27:7 | text | 권리 장부와 생성 자산 파일이 1:1로 대응한다 | learner-text-candidate | — |
| src/assets/generatedAssets.test.ts:34:7 | text | 모든 장부 항목에 프롬프트·제작 방식·생성일·사용 위치가 적혀 있다 | learner-text-candidate | — |
| src/assets/generatedAssets.test.ts:49:7 | text | 자산 파일이 실제로 존재하고 비어 있지 않다 | learner-text-candidate | — |
| src/assets/generatedAssets.test.ts:56:7 | text | 장부에 외부 핫링크나 라이선스 불명 출처가 없다 | learner-text-candidate | — |
| src/assets/generatedAssets.test.ts:58:31 | text | 오리지널 | learner-text-candidate | — |
| src/assets/generatedAssets.test.ts:62:11 | text | 모션 규칙 | learner-text-candidate | — |
| src/assets/generatedAssets.test.ts:65:7 | text | 축소 모션에서 gi-pulse의 animation-name을 none으로 바꾼다 | learner-text-candidate | — |
| src/assets/generatedAssets.test.ts:70:7 | text | gi-pulse는 소스에서 정확히 두 곳(입구·전후 비교)에만 쓰인다 | learner-text-candidate | — |
| src/assets/generatedAssets.test.ts:78:52 | text | src/components/ActionButton.tsx | learner-text-candidate | — |
| src/components/ActionButton.tsx:1:44 | text | react | learner-text-candidate | repeated-text |
| src/components/ActionButton.tsx:3:76 | text | { readonly variant?: "primary" \| "secondary" \| "danger" \| "ghost"; /** 필수 다음 행동 버튼에만 붙인다 (계획 문서 10). */ readonly pulse?: boolean; } export function ActionButton({ variant = "primary", pulse = false, className, type = "button", ...rest }: ActionButtonProps) { const classes = [ "action-button", `variant-${variant}`, pulse ? "gi-pulse" : "", className ?? "", ] .filter(Boolean) .join(" "); return | button-or-action | long-or-dense, technical-or-internal |
| src/components/ActionButton.tsx:17:6 | text | action-button | button-or-action | — |
| src/components/ActionButton.tsx:18:6 | text | variant-${variant} | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/components/ModalDialog.tsx:6:26 | text | void; readonly children: ReactNode; } const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'; export function ModalDialog({ open, title, onClose, children }: ModalDialogProps) { const titleId = useId(); const descriptionId = useId(); const containerRef = useRef | button-or-action, input | long-or-dense, technical-or-internal |
| src/components/ModalDialog.tsx:11:4 | text | button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]) | button-or-action, input | long-or-dense |
| src/components/ModalDialog.tsx:79:75 | text | 닫기 | button-or-action | repeated-text |
| src/components/ProgressSteps.tsx:14:48 | aria-label | 학습 진도 | aria-label | — |
| src/components/ProgressSteps.tsx:29:30 | text | 현재 단계 | learner-text-candidate | repeated-text |
| src/components/ProgressSteps.tsx:29:57 | text | 완료 | learner-text-candidate | repeated-text |
| src/components/ProgressSteps.tsx:29:64 | text | 남은 단계 | learner-text-candidate | repeated-text |
| src/components/ProgressSteps.tsx:33:45 | text | {item.current ? "현재 단계" : item.completed ? "완료" : "남은 단계"} | learner-text-candidate | long-or-dense |
| src/components/ProgressSteps.tsx:34:30 | text | 현재 단계 | learner-text-candidate | repeated-text |
| src/components/ProgressSteps.tsx:34:57 | text | 완료 | learner-text-candidate | repeated-text |
| src/components/ProgressSteps.tsx:34:64 | text | 남은 단계 | learner-text-candidate | repeated-text |
| src/components/UpdateHistoryButton.tsx:2:26 | text | void; } export function UpdateHistoryButton({ onClick }: UpdateHistoryButtonProps) { return ( | button-or-action | long-or-dense, technical-or-internal |
| src/components/UpdateHistoryButton.tsx:12:6 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/components/UpdateHistoryDialog.test.tsx:11:59 | text | 업데이트 내역 열기 | button-or-action | repeated-text |
| src/components/UpdateHistoryDialog.test.tsx:20:7 | text | 닫혀 있으면 아무것도 렌더링하지 않는다 | learner-text-candidate | — |
| src/components/UpdateHistoryDialog.test.tsx:25:7 | text | 열면 항목을 최신 날짜가 앞에 오도록 보여 준다 | learner-text-candidate | — |
| src/components/UpdateHistoryDialog.test.tsx:30:30 | text | 구현 계획 확정 | learner-text-candidate | repeated-text |
| src/components/UpdateHistoryDialog.test.tsx:33:7 | text | Escape와 닫기 버튼으로 닫히고 호출 버튼으로 초점을 돌려 준다 | learner-text-candidate | — |
| src/components/UpdateHistoryDialog.test.tsx:37:38 | text | button | button-or-action | repeated-text |
| src/components/UpdateHistoryDialog.test.tsx:37:56 | text | 업데이트 내역 열기 | button-or-action | repeated-text |
| src/components/UpdateHistoryDialog.test.tsx:46:40 | text | button | button-or-action | repeated-text |
| src/components/UpdateHistoryDialog.test.tsx:46:58 | text | 닫기 | button-or-action | repeated-text |
| src/components/UpdateHistoryDialog.tsx:6:26 | text | void; } export function UpdateHistoryDialog({ open, onClose }: UpdateHistoryDialogProps) { return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/UpdateHistoryDialog.tsx:11:55 | title | 업데이트 내역 | title | repeated-text |
| src/components/UpdateHistoryDialog.tsx:12:10 | text | 이 학습 앱이 바뀐 기록이에요. 최신 날짜가 가장 앞에 있어요. | learner-text-candidate | — |
| src/content/missions.test.ts:18:22 | text | 미션을 찾을 수 없습니다: ${id} | feedback-or-error | repeated-text, technical-or-internal |
| src/content/missions.test.ts:40:24 | text | 알 수 없는 단계: ${nodeId} | feedback-or-error | technical-or-internal |
| src/content/missions.test.ts:47:26 | text | 연결선이 없습니다: ${nodeId}>${nextId} | feedback-or-error | technical-or-internal |
| src/content/missions.test.ts:59:11 | text | 고정 미션 콘텐츠 | learner-text-candidate | — |
| src/content/missions.test.ts:60:7 | text | 정확히 6개 미션을 계획서 순서대로 제공한다 | learner-text-candidate | — |
| src/content/missions.test.ts:64:7 | text | 모든 미션이 검수 메타데이터와 아이용 문장을 가진다 | learner-text-candidate | — |
| src/content/missions.test.ts:75:7 | text | 콘텐츠 전체가 검수기를 통과한다 | learner-text-candidate | — |
| src/content/missions.test.ts:81:7 | text | route-strawberry-01의 승인 경로 합계는 (5,4,3)이다 | learner-text-candidate | — |
| src/content/missions.test.ts:87:7 | text | route-notebook-02의 두 창고 경로 합계는 (5,4,1)과 (6,3,2)이고 둘 다 승인이다 | learner-text-candidate | long-or-dense |
| src/content/missions.test.ts:97:7 | text | route-delay-03의 기준 합계는 (4,null,1)이고 bridge-check 조건은 time +3이다 | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/missions.test.ts:110:7 | text | route-package-04의 두 포장 경로 합계는 (5,4,2)와 (7,6,0)이다 | learner-text-candidate | — |
| src/content/missions.test.ts:117:7 | text | route-store-05의 두 판매 경로 합계는 (4,5,1)과 (6,3,2)이고 둘 다 승인이다 | learner-text-candidate | long-or-dense |
| src/content/missions.test.ts:127:7 | text | route-missing-06의 합계는 (6,null,2)이고 필요 자료는 운송비뿐이다 | learner-text-candidate | technical-or-internal |
| src/content/missions.test.ts:134:7 | text | 필요 근거와 필요 자료는 실제 선택지에 있어야 한다 | learner-text-candidate | — |
| src/content/missions.ts:16:13 | text | 별빛 딸기 상자 | learner-text-candidate | repeated-text |
| src/content/missions.ts:17:13 | text | 가상의 별빛 농원에서 딸기를 수확했어요. 딸기 상자가 가게에 도착하기까지 어떤 일이 차례로 일어나는지 살펴보아요. | learner-text-candidate | long-or-dense |
| src/content/missions.ts:19:14 | text | farm | learner-text-candidate | — |
| src/content/missions.ts:19:28 | text | production | learner-text-candidate | repeated-text |
| src/content/missions.ts:19:49 | text | 별빛 농원에서 딸기를 수확해요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:20:14 | text | sort | learner-text-candidate | — |
| src/content/missions.ts:20:28 | text | processing | learner-text-candidate | repeated-text |
| src/content/missions.ts:20:49 | text | 상태가 좋은 딸기를 골라 상자에 담아요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:21:14 | text | truck | learner-text-candidate | repeated-text |
| src/content/missions.ts:21:29 | text | transport | learner-text-candidate | repeated-text |
| src/content/missions.ts:21:49 | text | 트럭으로 가게까지 실어 나르세요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:22:14 | text | store | learner-text-candidate | repeated-text |
| src/content/missions.ts:22:29 | text | sale | learner-text-candidate | repeated-text |
| src/content/missions.ts:22:44 | text | 가게 진열대에 놓고 팔아요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:32:19 | text | 생산부터 판매까지 일의 차례를 바로 세워 보아요. | learner-text-candidate | — |
| src/content/missions.ts:39:17 | text | 이 순서로 경로를 결정할게요 | learner-text-candidate | — |
| src/content/missions.ts:45:15 | text | stage-order-reason | learner-text-candidate | — |
| src/content/missions.ts:45:44 | text | 생산한 다음에 골라 담고, 운송하고, 마지막에 팔아요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:46:15 | text | shorter-is-always-better | learner-text-candidate | — |
| src/content/missions.ts:46:50 | text | 단계 수가 가장 적은 길이면 무조건 좋아요 | learner-text-candidate | — |
| src/content/missions.ts:50:18 | text | 구현 계획 문서 4.1 고정 경로 fixture (route-strawberry-01), 2026-08-28 | learner-text-candidate | long-or-dense |
| src/content/missions.ts:51:45 | text | 가상의 별빛 딸기 상자 일러스트 | learner-text-candidate | — |
| src/content/missions.ts:53:26 | text | 짧은 경로가 항상 더 좋다는 단정을 하지 않도록 안내한다. | instruction | — |
| src/content/missions.ts:57:13 | text | 재생 종이 공책 | learner-text-candidate | — |
| src/content/missions.ts:58:13 | text | 재생 종이로 만든 공책이 문구점에 도착해요. 두 개의 창고 경로 중 하나를 골라 연결해 보아요. | learner-text-candidate | — |
| src/content/missions.ts:60:14 | text | raw-paper | learner-text-candidate | — |
| src/content/missions.ts:60:33 | text | production | learner-text-candidate | repeated-text |
| src/content/missions.ts:60:54 | text | 재생 종이 원료를 모아요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:61:14 | text | factory | learner-text-candidate | — |
| src/content/missions.ts:61:31 | text | processing | learner-text-candidate | repeated-text |
| src/content/missions.ts:61:52 | text | 공장에서 공책을 만들어요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:62:14 | text | warehouse-a | learner-text-candidate | — |
| src/content/missions.ts:62:35 | text | storage | learner-text-candidate | repeated-text |
| src/content/missions.ts:62:53 | text | 창고 A에 하루 동안 쌓아요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:63:14 | text | warehouse-b | learner-text-candidate | — |
| src/content/missions.ts:63:35 | text | storage | learner-text-candidate | repeated-text |
| src/content/missions.ts:63:53 | text | 창고 B에 저렴하게 오래 쌓아요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:64:14 | text | stationery | learner-text-candidate | — |
| src/content/missions.ts:64:34 | text | sale | learner-text-candidate | repeated-text |
| src/content/missions.ts:64:49 | text | 문구점 진열대에 놓아요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:76:19 | text | 두 창고 경로는 서로 다른 장단점이 있어요. 목표에 맞게 골라 근거를 대 보아요. | learner-text-candidate | — |
| src/content/missions.ts:86:17 | text | 고른 창고 경로로 결정할게요 | learner-text-candidate | — |
| src/content/missions.ts:92:15 | text | warehouse-tradeoff | learner-text-candidate | — |
| src/content/missions.ts:92:44 | text | 창고 A는 시간·손실 토큰이 적고, 창고 B는 비용 토큰이 적어요 | learner-text-candidate | — |
| src/content/missions.ts:93:15 | text | cheapest-is-best | learner-text-candidate | — |
| src/content/missions.ts:93:42 | text | 비용 토큰이 가장 적은 경로가 무조건 좋아요 | learner-text-candidate | — |
| src/content/missions.ts:97:18 | text | 구현 계획 문서 4.1 고정 경로 fixture (route-notebook-02), 2026-08-28 | learner-text-candidate | long-or-dense |
| src/content/missions.ts:98:40 | text | 가상의 재생 종이 공책 일러스트 | learner-text-candidate | — |
| src/content/missions.ts:100:26 | text | 비용 토큰만 보고 경로를 정하는 단정을 피하도록 안내한다. | instruction | — |
| src/content/missions.ts:104:13 | text | 다리 점검으로 늦어진 운송 | learner-text-candidate | — |
| src/content/missions.ts:105:13 | text | 가상의 다리 점검 때문에 트럭이 다리를 지나지 못해요. 지연이 뒤 단계에 어떻게 번지는지 추적해 보아요. | learner-text-candidate | — |
| src/content/missions.ts:107:14 | text | producer | learner-text-candidate | repeated-text |
| src/content/missions.ts:107:32 | text | production | learner-text-candidate | repeated-text |
| src/content/missions.ts:107:53 | text | 공장에서 상품을 실어 보내요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:108:14 | text | truck | learner-text-candidate | repeated-text |
| src/content/missions.ts:108:29 | text | transport | learner-text-candidate | repeated-text |
| src/content/missions.ts:108:49 | text | 트럭이 다리를 지나 가요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:109:14 | text | shop | learner-text-candidate | — |
| src/content/missions.ts:109:28 | text | sale | learner-text-candidate | repeated-text |
| src/content/missions.ts:109:43 | text | 가게에 상품을 내려놓아요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:118:19 | text | 지연이 생겨도 경로는 그대로예요. 바뀐 시간과 비용 자료를 확인해 보아요. | learner-text-candidate | — |
| src/content/missions.ts:125:17 | text | 다리 점검 (+3 시간 토큰) | learner-text-candidate | — |
| src/content/missions.ts:126:23 | text | 다리 점검 때문에 운송 단계의 시간 토큰이 3 늘어나요. | learner-text-candidate | — |
| src/content/missions.ts:136:17 | text | 지연된 경로를 그대로 유지할게요 | learner-text-candidate | — |
| src/content/missions.ts:142:15 | text | time-propagates | learner-text-candidate | — |
| src/content/missions.ts:142:41 | text | 다리 점검 때문에 뒤 단계까지 총시간 토큰이 3 늘었어요 | learner-text-candidate | — |
| src/content/missions.ts:143:15 | text | cost-still-unknown | learner-text-candidate | — |
| src/content/missions.ts:143:44 | text | 운송비 자료가 없어서 비용은 여전히 자료 없음으로 남아요 | learner-text-candidate | — |
| src/content/missions.ts:144:15 | text | cost-becomes-zero | learner-text-candidate | — |
| src/content/missions.ts:144:43 | text | 자료가 없으니 비용을 그냥 0으로 계산해요 | learner-text-candidate | — |
| src/content/missions.ts:148:18 | text | 구현 계획 문서 4.1 고정 경로 fixture (route-delay-03), 2026-08-28 | learner-text-candidate | long-or-dense |
| src/content/missions.ts:150:26 | text | 알 수 없는 비용을 0으로 바꾸거나 임의로 계산하지 않도록 안내한다. | instruction | — |
| src/content/missions.ts:154:13 | text | 포장 크기 고르기 | learner-text-candidate | — |
| src/content/missions.ts:155:13 | text | 달빛 과자를 큰 상자 하나에 담을까요, 작은 상자 여러 개로 나눌까요? 포장 방법을 바꾸고 시간·비용·손실 토큰을 비교해 보아요. | learner-text-candidate | long-or-dense |
| src/content/missions.ts:157:14 | text | producer | learner-text-candidate | repeated-text |
| src/content/missions.ts:157:32 | text | production | learner-text-candidate | repeated-text |
| src/content/missions.ts:157:53 | text | 공장에서 달빛 과자를 만들어요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:158:14 | text | package-large | learner-text-candidate | — |
| src/content/missions.ts:158:37 | text | processing | learner-text-candidate | repeated-text |
| src/content/missions.ts:158:58 | text | 큰 상자 하나에 가득 담아요 | learner-text-candidate | — |
| src/content/missions.ts:159:14 | text | package-small | learner-text-candidate | — |
| src/content/missions.ts:159:37 | text | processing | learner-text-candidate | repeated-text |
| src/content/missions.ts:159:58 | text | 작은 상자 여러 개로 나눠 담아요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:160:14 | text | truck-once | learner-text-candidate | — |
| src/content/missions.ts:160:34 | text | transport | learner-text-candidate | repeated-text |
| src/content/missions.ts:160:54 | text | 큰 상자를 한 번에 실어 나르세요 | learner-text-candidate | — |
| src/content/missions.ts:161:14 | text | truck-twice | learner-text-candidate | — |
| src/content/missions.ts:161:35 | text | transport | learner-text-candidate | repeated-text |
| src/content/missions.ts:161:55 | text | 작은 상자를 두 번 나눠 실어 나르세요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:162:14 | text | store | learner-text-candidate | repeated-text |
| src/content/missions.ts:162:29 | text | sale | learner-text-candidate | repeated-text |
| src/content/missions.ts:162:44 | text | 가게에 상자를 내려놓아요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:175:19 | text | 손실 토큰을 줄이고 싶어요. 포장 방식을 바꿔 비교하고 장단점을 함께 기록해 보아요. | learner-text-candidate | multiple-actions |
| src/content/missions.ts:182:17 | text | 작은 상자로 나눠 싣기 | learner-text-candidate | — |
| src/content/missions.ts:183:23 | text | 포장과 운송 단계가 작은 상자 방식으로 바뀌어요. | learner-text-candidate | — |
| src/content/missions.ts:192:17 | text | 큰 상자로 한 번에 싣기 | learner-text-candidate | — |
| src/content/missions.ts:193:23 | text | 포장과 운송 단계가 큰 상자 방식으로 바뀌어요. | learner-text-candidate | — |
| src/content/missions.ts:203:17 | text | 비교한 경로로 결정할게요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:209:15 | text | loss-goes-down | learner-text-candidate | — |
| src/content/missions.ts:209:40 | text | 작은 상자로 나누면 손실 토큰이 2에서 0으로 줄어요 | learner-text-candidate | — |
| src/content/missions.ts:210:15 | text | time-cost-go-up | learner-text-candidate | — |
| src/content/missions.ts:210:41 | text | 대신 시간 토큰은 5→7, 비용 토큰은 4→6으로 늘어요 | learner-text-candidate | — |
| src/content/missions.ts:211:15 | text | small-pack-is-always-best | learner-text-candidate | — |
| src/content/missions.ts:211:51 | text | 작은 상자 포장은 언제나 최고예요 | learner-text-candidate | — |
| src/content/missions.ts:215:18 | text | 구현 계획 문서 4.1 고정 경로 fixture (route-package-04), 2026-08-28 | learner-text-candidate | long-or-dense |
| src/content/missions.ts:216:42 | text | 가상의 큰 상자와 작은 상자 일러스트 | learner-text-candidate | — |
| src/content/missions.ts:218:26 | text | 한 조건의 개선이 다른 조건의 손해로 이어질 수 있음을 함께 기록하도록 안내한다. | instruction | — |
| src/content/missions.ts:222:13 | text | 판매 장소 두 곳 | learner-text-candidate | — |
| src/content/missions.ts:223:13 | text | 가상 마을 채소 상자를 근처 상점에 팔까요, 먼 시장에 팔까요? 두 경로의 시간·비용·손실 토큰을 비교해 절충을 설명해 보아요. | learner-text-candidate | long-or-dense |
| src/content/missions.ts:225:14 | text | producer | learner-text-candidate | repeated-text |
| src/content/missions.ts:225:32 | text | production | learner-text-candidate | repeated-text |
| src/content/missions.ts:225:53 | text | 마을 농장에서 채소 상자를 만들어요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:226:14 | text | transport-near | learner-text-candidate | — |
| src/content/missions.ts:226:38 | text | transport | learner-text-candidate | repeated-text |
| src/content/missions.ts:226:58 | text | 근처 상점까지 가까운 길로 가요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:227:14 | text | store | learner-text-candidate | repeated-text |
| src/content/missions.ts:227:29 | text | sale | learner-text-candidate | repeated-text |
| src/content/missions.ts:227:44 | text | 근처 상점 진열대에 놓아요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:228:14 | text | transport-far | learner-text-candidate | — |
| src/content/missions.ts:228:37 | text | transport | learner-text-candidate | repeated-text |
| src/content/missions.ts:228:57 | text | 먼 시장까지 먼 길을 가요 | learner-text-candidate | — |
| src/content/missions.ts:229:14 | text | market | learner-text-candidate | — |
| src/content/missions.ts:229:30 | text | sale | learner-text-candidate | repeated-text |
| src/content/missions.ts:229:45 | text | 먼 시장 매대에 놓아요 | learner-text-candidate | — |
| src/content/missions.ts:230:14 | text | buyer | learner-text-candidate | — |
| src/content/missions.ts:230:29 | text | consumption | learner-text-candidate | — |
| src/content/missions.ts:230:51 | text | 손님이 상품을 사서 써요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:243:19 | text | 시간·비용·손실 토큰을 모두 비교해 절충을 설명해 보아요. 목표에 따라 좋은 경로는 달라져요. | learner-text-candidate | — |
| src/content/missions.ts:250:17 | text | 먼 시장으로 판매지를 바꾸기 | learner-text-candidate | — |
| src/content/missions.ts:251:23 | text | 판매 단계가 먼 시장 방식으로 바뀌어요. | learner-text-candidate | — |
| src/content/missions.ts:260:17 | text | 근처 상점으로 판매지를 바꾸기 | learner-text-candidate | — |
| src/content/missions.ts:261:23 | text | 판매 단계가 근처 상점 방식으로 바뀌어요. | learner-text-candidate | — |
| src/content/missions.ts:271:17 | text | 비교한 경로로 결정할게요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:277:15 | text | near-wins-time-loss | learner-text-candidate | — |
| src/content/missions.ts:277:45 | text | 근처 상점은 시간 토큰(4)과 손실 토큰(1)이 적어요 | learner-text-candidate | — |
| src/content/missions.ts:278:15 | text | far-wins-cost | learner-text-candidate | — |
| src/content/missions.ts:278:39 | text | 먼 시장은 비용 토큰(3)이 적지만 손실 토큰이 2로 늘어요 | learner-text-candidate | — |
| src/content/missions.ts:279:15 | text | near-is-always-safe | learner-text-candidate | — |
| src/content/missions.ts:279:45 | text | 가까우니까 근처 상점이 항상 좋아요 | learner-text-candidate | — |
| src/content/missions.ts:283:18 | text | 구현 계획 문서 4.1 고정 경로 fixture (route-store-05), 2026-08-28 | learner-text-candidate | long-or-dense |
| src/content/missions.ts:285:26 | text | 거리가 가까운 경로를 항상 더 좋은 경로로 단정하지 않도록 안내한다. | instruction | — |
| src/content/missions.ts:289:13 | text | 비용 자료가 빠진 최종 경로 | learner-text-candidate | — |
| src/content/missions.ts:290:13 | text | 마지막 경로에는 운송비 자료가 빠져 있어요. 자료가 부족할 때는 좋은 경로를 확정하지 않아요. | learner-text-candidate | — |
| src/content/missions.ts:292:14 | text | producer | learner-text-candidate | repeated-text |
| src/content/missions.ts:292:32 | text | production | learner-text-candidate | repeated-text |
| src/content/missions.ts:292:53 | text | 공장에서 완제품을 만들어요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:293:14 | text | transport | learner-text-candidate | repeated-text |
| src/content/missions.ts:293:33 | text | transport | learner-text-candidate | repeated-text |
| src/content/missions.ts:293:53 | text | 운송 회사가 상품을 실어요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:294:14 | text | store | learner-text-candidate | repeated-text |
| src/content/missions.ts:294:29 | text | sale | learner-text-candidate | repeated-text |
| src/content/missions.ts:294:44 | text | 가게에 도착해 팔려요 | learner-text-candidate | repeated-text |
| src/content/missions.ts:303:19 | text | 자료가 부족할 때는 확정하지 않고 필요한 자료를 요청해 보아요. | learner-text-candidate | — |
| src/content/missions.ts:310:17 | text | 자료가 부족해서 판단을 보류할게요 | learner-text-candidate | — |
| src/content/missions.ts:317:15 | text | transport-cost | learner-text-candidate | — |
| src/content/missions.ts:317:40 | text | 운송비 자료 | learner-text-candidate | repeated-text |
| src/content/missions.ts:318:15 | text | production-count | learner-text-candidate | — |
| src/content/missions.ts:318:42 | text | 생산 수량 자료 | learner-text-candidate | — |
| src/content/missions.ts:319:15 | text | weather-note | learner-text-candidate | — |
| src/content/missions.ts:319:38 | text | 날씨 기록 자료 | learner-text-candidate | repeated-text |
| src/content/missions.ts:322:18 | text | 구현 계획 문서 4.1 고정 경로 fixture (route-missing-06), 2026-08-28 | learner-text-candidate | long-or-dense |
| src/content/missions.ts:324:26 | text | 자료가 부족할 때 좋은 경로를 추측으로 확정하지 않도록 안내한다. | instruction | — |
| src/content/validateContent.test.ts:8:13 | text | 테스트 상품 | learner-text-candidate | — |
| src/content/validateContent.test.ts:9:13 | text | 가상 상품이 단계를 지나는 장면 설명 | learner-text-candidate | — |
| src/content/validateContent.test.ts:11:14 | text | a | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:11:25 | text | production | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:11:46 | text | 만들어요 | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:12:14 | text | b | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:12:25 | text | sale | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:12:40 | text | 팔아요 | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:18:19 | text | 순서를 바로 세워 보아요 | learner-text-candidate | — |
| src/content/validateContent.test.ts:25:17 | text | 이 경로로 결정할게요 | learner-text-candidate | — |
| src/content/validateContent.test.ts:30:31 | text | order-reason | learner-text-candidate | — |
| src/content/validateContent.test.ts:30:54 | text | 일의 차례에 맞아요 | learner-text-candidate | — |
| src/content/validateContent.test.ts:33:18 | text | 계획 문서 fixture | learner-text-candidate | — |
| src/content/validateContent.test.ts:35:26 | text | 짧은 길을 무조건 좋다고 단정하지 않는다 | learner-text-candidate | — |
| src/content/validateContent.test.ts:40:11 | text | validateContent — 목록 수준 규칙 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/content/validateContent.test.ts:41:7 | text | 미션 수가 6개가 아니면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:44:62 | text | 정확히 6개 | feedback-or-error | — |
| src/content/validateContent.test.ts:47:7 | text | 미션 ID가 중복되면 실패한다 | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/content/validateContent.test.ts:51:62 | text | 중복된 미션 ID | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/content/validateContent.test.ts:54:7 | text | 계획서의 미션 ID가 하나라도 빠지면 실패한다 | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/content/validateContent.test.ts:60:62 | text | route-strawberry-01 | feedback-or-error | — |
| src/content/validateContent.test.ts:63:7 | text | 정상 6개 콘텐츠 규격은 통과한다 | learner-text-candidate | — |
| src/content/validateContent.test.ts:78:23 | text | 목표 문장 | learner-text-candidate | — |
| src/content/validateContent.test.ts:87:11 | text | validateMission — 미션 수준 규칙 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/content/validateContent.test.ts:88:7 | text | 검수 상태가 approved가 아니면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:89:65 | text | pending | feedback-or-error | — |
| src/content/validateContent.test.ts:90:55 | text | 검수되지 않은 미션 | feedback-or-error | — |
| src/content/validateContent.test.ts:93:7 | text | sourceNote 또는 misconceptionGuard가 비면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:100:7 | text | 연결선이 존재하지 않는 단계를 가리키면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:105:55 | text | 존재하지 않는 단계 | feedback-or-error | — |
| src/content/validateContent.test.ts:108:7 | text | 사이클이 있으면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:116:55 | text | 사이클 | feedback-or-error | — |
| src/content/validateContent.test.ts:119:7 | text | 시작 단계가 두 개면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:122:16 | text | a | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:122:27 | text | production | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:122:48 | text | 만들어요 | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:123:16 | text | c | learner-text-candidate | — |
| src/content/validateContent.test.ts:123:27 | text | production | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:123:48 | text | 또 만들어요 | learner-text-candidate | — |
| src/content/validateContent.test.ts:124:16 | text | b | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:124:27 | text | sale | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:124:42 | text | 팔아요 | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:132:55 | text | 시작 단계가 한 개가 아닙니다 | feedback-or-error | — |
| src/content/validateContent.test.ts:135:7 | text | 고립된 단계가 있으면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:138:16 | text | a | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:138:27 | text | production | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:138:48 | text | 만들어요 | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:139:16 | text | b | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:139:27 | text | sale | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:139:42 | text | 팔아요 | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:140:16 | text | lonely | learner-text-candidate | — |
| src/content/validateContent.test.ts:140:32 | text | storage | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:140:50 | text | 혼자 남아요 | learner-text-candidate | — |
| src/content/validateContent.test.ts:144:55 | text | 고립된 단계 | feedback-or-error | — |
| src/content/validateContent.test.ts:147:7 | text | 승인 경로가 실제 경로가 아니면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:152:21 | text | 목표 | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:157:55 | text | 실제 경로가 아닙니다 | feedback-or-error | — |
| src/content/validateContent.test.ts:160:7 | text | 필요 자료가 있는데 판단 보류 규칙이 없거나 선택지가 없으면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:170:21 | text | 자료가 부족해요 | learner-text-candidate | — |
| src/content/validateContent.test.ts:177:63 | text | 자료 선택지 | learner-text-candidate | — |
| src/content/validateContent.test.ts:180:7 | text | 필요 근거가 선택지에 없거나 오개념 근거면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:186:21 | text | 결정할게요 | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:193:59 | text | 근거 선택지에 없습니다 | learner-text-candidate | — |
| src/content/validateContent.test.ts:197:35 | text | bad-reason | learner-text-candidate | — |
| src/content/validateContent.test.ts:197:56 | text | 짧으면 무조건 좋아요 | learner-text-candidate | — |
| src/content/validateContent.test.ts:201:21 | text | 결정할게요 | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:208:66 | text | 오개념 근거 | learner-text-candidate | — |
| src/content/validateContent.test.ts:211:7 | text | 토큰이 음수이거나 정수가 아니면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:214:16 | text | a | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:214:27 | text | production | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:214:48 | text | 만들어요 | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:215:16 | text | b | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:215:27 | text | sale | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:215:42 | text | 팔아요 | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:218:74 | text | 시간 토큰 | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:223:76 | text | 비용 토큰 | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:226:7 | text | 조건 변화의 대상이 없으면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:231:19 | text | 이 경로를 유지할게요 | learner-text-candidate | — |
| src/content/validateContent.test.ts:240:19 | text | 없는 연결선 바꾸기 | learner-text-candidate | — |
| src/content/validateContent.test.ts:241:25 | text | 없는 대상 | learner-text-candidate | — |
| src/content/validateContent.test.ts:250:55 | text | 조건 변화 대상 | feedback-or-error | — |
| src/content/validateContent.test.ts:253:7 | text | 조건 변화 없이는 통과할 수 없는 규칙만 있으면 실패한다 | feedback-or-error | — |
| src/content/validateContent.test.ts:258:19 | text | 유지할게요 | learner-text-candidate | — |
| src/content/validateContent.test.ts:266:55 | text | 판단 규칙이 없습니다 | feedback-or-error | — |
| src/content/validateContent.test.ts:269:7 | text | 정상 미션은 오류가 없다 | feedback-or-error | — |
| src/content/validateContent.ts:112:42 | text | ${nodeIds[index + 1]}`)) return false; } return true; } export function validateMission(mission: RouteMission): readonly string[] { const errors: string[] = []; const id = mission.id; if (mission.reviewStatus !== "approved") { errors.push(`검수되지 않은 미션이 있습니다: ${id} (${mission.reviewStatus})`); } if (mission.sourceNote.trim().length === 0) errors.push(`sourceNote가 비어 있습니다: ${id}`); if (mission.misconceptionGuard.trim().length === 0) { errors.push(`misconceptionGuard가 비어 있습니다: ${id}`); } if (mission.title.trim().length === 0) errors.push(`title이 비어 있습니다: ${id}`); if (mission.scene.trim().length === 0) errors.push(`scene이 비어 있습니다: ${id}`); if (mission.goal.statement.trim().length === 0) errors.push(`목표 문장이 비어 있습니다: ${id}`); const nodeIds = new Set | feedback-or-error | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:122:18 | text | 검수되지 않은 미션이 있습니다: ${id} (${mission.reviewStatus}) | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:124:60 | text | sourceNote가 비어 있습니다: ${id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:126:18 | text | misconceptionGuard가 비어 있습니다: ${id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:128:55 | text | title이 비어 있습니다: ${id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:129:55 | text | scene이 비어 있습니다: ${id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:130:64 | text | 목표 문장이 비어 있습니다: ${id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:132:34 | text | (); for (const node of mission.nodes) { if (nodeIds.has(node.id)) errors.push(`중복된 단계 ID가 있습니다: ${id} ${node.id}`); nodeIds.add(node.id); if (!Number.isInteger(node.timeTokens) \|\| node.timeTokens | feedback-or-error | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:134:44 | text | 중복된 단계 ID가 있습니다: ${id} ${node.id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:137:20 | text | 시간 토큰이 0 이상의 정수가 아닙니다: ${id} ${node.id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:140:20 | text | 비용 토큰이 0 이상의 정수 또는 자료 없음이 아닙니다: ${id} ${node.id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:143:20 | text | 손실 토큰이 0 이상의 정수 또는 자료 없음이 아닙니다: ${id} ${node.id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:145:54 | text | 단계 설명이 비어 있습니다: ${id} ${node.id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:147:46 | text | 단계가 2개 이상이어야 합니다: ${id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:149:34 | text | (); for (const edge of mission.edges) { if (edgeIds.has(edge.id)) errors.push(`중복된 연결선 ID가 있습니다: ${id} ${edge.id}`); edgeIds.add(edge.id); if (!nodeIds.has(edge.fromId) \|\| !nodeIds.has(edge.toId)) { errors.push(`연결선이 존재하지 않는 단계를 가리킵니다: ${id} ${edge.id}`); } if (!Number.isInteger(edge.timeTokens) \|\| edge.timeTokens | feedback-or-error | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:151:44 | text | 중복된 연결선 ID가 있습니다: ${id} ${edge.id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:154:20 | text | 연결선이 존재하지 않는 단계를 가리킵니다: ${id} ${edge.id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:157:20 | text | 시간 토큰이 0 이상의 정수가 아닙니다: ${id} ${edge.id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:160:20 | text | 비용 토큰이 0 이상의 정수 또는 자료 없음이 아닙니다: ${id} ${edge.id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:163:20 | text | 손실 토큰이 0 이상의 정수 또는 자료 없음이 아닙니다: ${id} ${edge.id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:168:36 | text | 경로에 사이클이 있습니다: ${id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:170:18 | text | 시작 단계가 한 개가 아닙니다: ${id} (${graph.startIds.length}개) | feedback-or-error | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:173:18 | text | 종료 단계가 한 개가 아닙니다: ${id} (${graph.endIds.length}개) | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:175:58 | text | 고립된 단계가 있습니다: ${id} ${isolated} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:177:18 | text | 시작 단계에서 도달하지 않는 단계가 있습니다: ${id} ${unreachable} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:180:18 | text | 종료 단계에 도달하지 않는 단계가 있습니다: ${id} ${deadEnd} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:184:51 | text | 승인 경로가 1개 이상이어야 합니다: ${id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:187:20 | text | 승인 경로가 실제 경로가 아닙니다: ${id} ${routeId} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:193:20 | text | 조건 변화 설명이 비어 있습니다: ${id} ${change.id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:196:20 | text | 조건 변화 시간 토큰 변화량이 정수가 아닙니다: ${id} ${change.id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:203:20 | text | 조건 변화 대상을 찾을 수 없습니다: ${id} ${change.id} ${change.targetId} | feedback-or-error | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:206:20 | text | 경로 교체 조건 변화는 토큰 변화량을 0으로 두어야 합니다: ${id} ${change.id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:210:39 | text | (); for (const option of mission.evidenceOptions) { if (evidenceKeys.has(option.key)) errors.push(`중복된 근거 키가 있습니다: ${id} ${option.key}`); evidenceKeys.add(option.key); if (option.label.trim().length === 0) errors.push(`근거 문장이 비어 있습니다: ${id} ${option.key}`); } const dataKeys = new Set | feedback-or-error | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:212:52 | text | 중복된 근거 키가 있습니다: ${id} ${option.key} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:214:56 | text | 근거 문장이 비어 있습니다: ${id} ${option.key} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:217:35 | text | (); for (const option of mission.missingDataOptions) { if (dataKeys.has(option.key)) errors.push(`중복된 자료 키가 있습니다: ${id} ${option.key}`); dataKeys.add(option.key); if (option.label.trim().length === 0) errors.push(`자료 문장이 비어 있습니다: ${id} ${option.key}`); } const ruleDecisions = new Set | feedback-or-error | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:219:48 | text | 중복된 자료 키가 있습니다: ${id} ${option.key} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:221:56 | text | 자료 문장이 비어 있습니다: ${id} ${option.key} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:226:56 | text | 중복된 판단 규칙이 있습니다: ${id} ${rule.decision} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:228:54 | text | 판단 선택지 문장이 비어 있습니다: ${id} ${rule.decision} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:231:22 | text | 필요 근거가 근거 선택지에 없습니다: ${id} ${key} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:235:22 | text | 필요 근거에 오개념 근거를 쓸 수 없습니다: ${id} ${key} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:239:20 | text | 조건 변화가 없는 미션에 적용을 요구하는 판단 규칙이 있습니다: ${id} ${rule.decision} | feedback-or-error | abstract-or-formal, long-or-dense, technical-or-internal |
| src/content/validateContent.ts:244:42 | text | 필요 자료가 자료 선택지에 없습니다: ${id} ${key} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:249:20 | text | 필요 자료가 있는데 자료 선택지가 없습니다: ${id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:255:20 | text | 필요 자료가 있는 미션은 insufficient-information 규칙 하나만 가질 수 있습니다: ${id} | feedback-or-error | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:258:18 | text | 필요 자료가 없는데 판단 보류 규칙이 있습니다: ${id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:263:30 | text | 0 && !canAcceptWithoutChange && mission.conditionChanges.length === 0 ) { errors.push(`승인 경로에 도달할 판단 규칙이 없습니다: ${id}`); } return errors; } export function validateContent(missions: readonly RouteMission[]): ContentValidationResult { const errors: string[] = []; if (missions.length !== PLANNED_MISSION_IDS.length) { errors.push(`미션은 정확히 ${PLANNED_MISSION_IDS.length}개여야 합니다 (현재 ${missions.length}개)`); } const seen = new Set | feedback-or-error | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:267:18 | text | 승인 경로에 도달할 판단 규칙이 없습니다: ${id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:276:18 | text | 미션은 정확히 ${PLANNED_MISSION_IDS.length}개여야 합니다 (현재 ${missions.length}개) | feedback-or-error | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:280:44 | text | 중복된 미션 ID가 있습니다: ${mission.id} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:285:20 | text | 계획서의 미션이 없습니다: ${plannedId} | feedback-or-error | technical-or-internal |
| src/content/validateContent.ts:298:22 | text | 미션 콘텐츠 검수 실패: - ${result.errors.join(" - ")} | feedback-or-error | — |
| src/domain/routeEvaluator.test.ts:15:34 | text | 미션을 찾을 수 없습니다: ${id} | feedback-or-error | repeated-text, technical-or-internal |
| src/domain/routeEvaluator.test.ts:44:11 | text | validateRoute — 연결 검사 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/routeEvaluator.test.ts:51:7 | text | 정상 연결 경로는 통과한다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:57:7 | text | 연결이 끊긴 경로는 거부한다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:63:7 | text | 같은 단계를 두 번 지나면 거부한다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:69:7 | text | 시작 단계로 시작하지 않으면 거부한다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:75:7 | text | 모르는 단계가 있으면 거부한다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:81:7 | text | 경로 ID는 노드 ID를 이어 만든다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/routeEvaluator.test.ts:86:11 | text | computeTotals — 토큰 합계와 null 전파 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/routeEvaluator.test.ts:87:7 | text | 여섯 미션의 승인 경로 합계를 재현한다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:120:7 | text | 알 수 없는 비용을 0으로 바꾸지 않고 null로 전파한다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/routeEvaluator.test.ts:127:11 | text | applyConditionChange — 조건 전파 diff | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:128:7 | text | 다리 점검은 시간만 +3으로 바꾸고 비용은 자료 없음으로 유지한다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:135:7 | text | 작은 포장으로 바꾸면 (5,4,2) → (7,6,0)이 된다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:142:7 | text | 큰 포장으로 바꾸면 (7,6,0) → (5,4,2)이 된다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:148:7 | text | 먼 시장으로 바꾸면 (4,5,1) → (6,3,2)이 된다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:154:7 | text | 근처 상점으로 바꾸면 (6,3,2) → (4,5,1)이 된다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:160:7 | text | 모르는 조건 변화 ID는 예외로 중단한다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/routeEvaluator.test.ts:165:11 | text | evaluateRouteDecision — 여섯 미션 정상 판정 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:166:7 | text | 딸기 미션: 순서 근거와 함께 경로를 결정하면 통과한다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:181:7 | text | 공책 미션: 창고 A 경로도 절충 근거와 함께 통과한다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:197:7 | text | 지연 미션: 조건 적용과 두 근거로 유지 판단이 통과한다 | learner-text-candidate | abstract-or-formal |
| src/domain/routeEvaluator.test.ts:210:7 | text | 포장 미션: 장단점 둘 다 기록하면 작은 포장 경로가 통과한다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:223:7 | text | 판매지 미션: 절충 근거 둘 다로 먼 시장 경로가 통과한다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:236:7 | text | 정보 부족 미션: 판단 보류와 운송비 자료 요청만 통과한다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:251:11 | text | evaluateRouteDecision — 잘못된 입력과 복수 해법 | input | abstract-or-formal |
| src/domain/routeEvaluator.test.ts:252:7 | text | 공책 미션의 두 창고 경로가 모두 통과한다 (복수 해법 1/2) | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:263:7 | text | 판매지 미션의 두 경로가 모두 통과한다 (복수 해법 2/2) | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:276:7 | text | 포장 미션에서 승인되지 않은 큰 포장 경로는 근거가 있어도 거부된다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:288:7 | text | 끊긴 경로로 판단하면 거부된다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:299:7 | text | 지연 미션에서 조건을 적용하지 않은 유지 판단은 거부된다 | learner-text-candidate | abstract-or-formal |
| src/domain/routeEvaluator.test.ts:310:7 | text | 필요 근거를 빠뜨리면 거부된다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:321:7 | text | 오개념 근거를 고르면 거부된다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:332:7 | text | 정보 부족 미션에서 다른 자료를 고르면 거부된다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:343:7 | text | 정보 부족 미션에서 자료를 덜 고르거나 더 골라도 거부된다 | learner-text-candidate | — |
| src/domain/routeEvaluator.test.ts:362:7 | text | 정보 부족 미션에서 경로를 확정하는 판단은 거부되고 비용은 null로 남는다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/routeEvaluator.test.ts:375:7 | text | readonly로 고정된 입력을 바꾸지 않고 판정한다 | input | abstract-or-formal |
| src/domain/routeEvaluator.ts:116:22 | text | 알 수 없는 조건 변화: ${appliedChangeId} | feedback-or-error | technical-or-internal |
| src/domain/routeEvaluator.ts:126:22 | text | 조건 변화 대상을 찾을 수 없습니다: ${change.targetId} | feedback-or-error | technical-or-internal |
| src/domain/routeEvaluator.ts:159:54 | text | candidate.id === changeId); } export function applyConditionChange( mission: RouteMission, changeId: string, baselineRouteId: RouteId, ): ConditionChangeResult { const change = findConditionChange(mission, changeId); if (!change) { throw new Error(`알 수 없는 조건 변화: ${changeId}`); } const afterRouteId = change.kind === "route" ? change.targetId : baselineRouteId; const beforeTotals = computeTotals(mission, routeNodeIds(baselineRouteId), null); const afterTotals = computeTotals( mission, routeNodeIds(afterRouteId), change.kind === "route" ? null : changeId, ); return { changeId, beforeRouteId: baselineRouteId, afterRouteId, beforeTotals, afterTotals, diff: diffTotals(beforeTotals, afterTotals), }; } function compareKey( name: string, mine: number \| null, other: number \| null, otherRouteId: RouteId, ): string { if (mine === null \|\| other === null) return `${name}-unknown-vs-${otherRouteId}`; if (mine | feedback-or-error | long-or-dense, technical-or-internal |
| src/domain/routeEvaluator.ts:169:22 | text | 알 수 없는 조건 변화: ${changeId} | feedback-or-error | technical-or-internal |
| src/domain/routeEvaluator.ts:228:45 | text | decision | input | — |
| src/domain/types.ts:132:54 | text | store" */ export type RouteId = string; export interface RouteValidation { readonly valid: boolean; /** 실패 원인을 아이 문장 키로 반환한다. */ readonly reasonKeys: readonly string[]; } export interface ConditionDiff { readonly timeTokens: number \| null; readonly costTokens: number \| null; readonly lossTokens: number \| null; } export interface ConditionChangeResult { readonly changeId: string; readonly beforeRouteId: RouteId; readonly afterRouteId: RouteId; readonly beforeTotals: RouteTotals; readonly afterTotals: RouteTotals; readonly diff: ConditionDiff; } export interface RouteDecisionInput { readonly decision: Decision; readonly routeId: RouteId; readonly appliedChangeId: string \| null; readonly selectedEvidenceKeys: readonly string[]; readonly selectedDataKeys: readonly string[]; } export type SessionStep = \| "INTRO" \| "OBSERVE" \| "ORDER" \| "BASELINE" \| "CHANGE_ONE" \| "COMPARE" \| "DECIDE" \| "REPORT"; export const STAGE_KIND_LABELS = { production: "생산", processing: "가공", storage: "보관", transport: "운송", sale: "판매", consumption: "소비", } as const satisfies Record | feedback-or-error, input | long-or-dense, technical-or-internal |
| src/domain/types.ts:175:16 | text | 생산 | learner-text-candidate | — |
| src/domain/types.ts:176:16 | text | 가공 | learner-text-candidate | — |
| src/domain/types.ts:177:13 | text | 보관 | learner-text-candidate | — |
| src/domain/types.ts:178:15 | text | 운송 | learner-text-candidate | — |
| src/domain/types.ts:179:10 | text | 판매 | learner-text-candidate | — |
| src/domain/types.ts:180:17 | text | 소비 | learner-text-candidate | — |
| src/features/report/LearningReport.test.tsx:116:7 | text | 최초 판단과 근거, 다시 정한 결과를 함께 보여 준다 | learner-text-candidate | — |
| src/features/report/LearningReport.test.tsx:118:30 | text | 최초 판단 | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.test.tsx:121:25 | text | 생산한 다음에 골라 담고, 운송하고, 마지막에 팔아요 | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.test.tsx:123:30 | text | 다시 정한 결과 | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.test.tsx:126:7 | text | 점수·순위·등급을 만들지 않는다 | learner-text-candidate | — |
| src/features/report/LearningReport.test.tsx:133:7 | text | 아직 진행하지 않은 미션은 진행 중으로 표시한다 | learner-text-candidate | — |
| src/features/report/LearningReport.test.tsx:138:7 | text | 승인 경로의 절충 근거 키를 기록에 보존한다 | learner-text-candidate | — |
| src/features/report/LearningReport.test.tsx:147:7 | text | 인쇄하기와 처음부터 다시 하기 버튼을 제공한다 | learner-text-candidate | — |
| src/features/report/LearningReport.test.tsx:154:40 | text | button | button-or-action | repeated-text |
| src/features/report/LearningReport.test.tsx:154:58 | text | 인쇄하기 | button-or-action | repeated-text |
| src/features/report/LearningReport.test.tsx:156:40 | text | button | button-or-action | repeated-text |
| src/features/report/LearningReport.test.tsx:156:58 | text | 처음부터 다시 하기 | button-or-action | repeated-text |
| src/features/report/LearningReport.test.tsx:160:7 | text | 전체 미션을 끝내면 takeaway와 다음 학습 행동을 보여 준다 | learner-text-candidate | — |
| src/features/report/LearningReport.test.tsx:163:25 | text | heading | heading | repeated-text |
| src/features/report/LearningReport.test.tsx:163:54 | text | 모든 경로를 살펴봤어요 | heading | repeated-text |
| src/features/report/LearningReport.test.tsx:167:32 | text | button | button-or-action | repeated-text |
| src/features/report/LearningReport.test.tsx:167:50 | text | 모든 미션 끝내기 | button-or-action | repeated-text |
| src/features/report/LearningReport.tsx:43:13 | text | {missionIndex + 1}. {mission.title} | heading | repeated-text |
| src/features/report/LearningReport.tsx:46:12 | text | 아직 진행 중이에요. 미션을 끝내면 기록이 채워져요. | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:57:10 | text | 필요한 자료: ${mission.missingDataOptions.find((option) => option.key === key)?.label ?? key} | learner-text-candidate | long-or-dense |
| src/features/report/LearningReport.tsx:62:10 | text | 아직 경로를 만들지 않았어요 | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:64:27 | text | nodeById.get(nodeId)?.label ?? nodeId) .join(" → "); return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/report/LearningReport.tsx:69:11 | text | {missionIndex + 1}. {mission.title} | heading | repeated-text |
| src/features/report/LearningReport.tsx:73:13 | text | 최초 판단 | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.tsx:74:13 | text | {decisionLabel(mission.id, record.decision)} —{" "} {progress.firstDecision?.accepted ? "처음 정한 내용이 기준에 맞았어요." : "처음 정한 내용이 기준과 달랐어요."} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/report/LearningReport.tsx:77:16 | text | 처음 정한 내용이 기준에 맞았어요. | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:78:16 | text | 처음 정한 내용이 기준과 달랐어요. | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:80:13 | text | 경로 | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:82:13 | text | 바꾼 조건 | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:83:13 | text | {change ? change.label : "조건을 바꾸지 않았어요"} | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:83:39 | text | 조건을 바꾸지 않았어요 | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:84:13 | text | 근거 | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:91:18 | text | ) : ( "고른 근거가 없어요" )} | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:93:14 | text | 고른 근거가 없어요 | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:96:13 | text | 마지막 비교 값 | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:97:13 | text | 시간 {formatToken(record.totals.timeTokens)} · 비용{" "} {formatToken(record.totals.costTokens)} · 손실 {formatToken(record.totals.lossTokens)} | learner-text-candidate | long-or-dense |
| src/features/report/LearningReport.tsx:103:17 | text | 다시 정한 결과 | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.tsx:104:17 | text | {record.accepted ? "다시 정한 내용이 기준에 맞았어요." : "다시 정한 내용도 기준과 달랐어요. 기록은 남아요."} | learner-text-candidate | long-or-dense |
| src/features/report/LearningReport.tsx:106:20 | text | 다시 정한 내용이 기준에 맞았어요. | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:107:20 | text | 다시 정한 내용도 기준과 달랐어요. 기록은 남아요. | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:112:87 | text | {record.accepted ? "근거와 함께 경로를 기록했어요." : "목표와 근거가 아직 맞지 않아요. 기록은 남아요."} | learner-text-candidate | long-or-dense, multiple-actions |
| src/features/report/LearningReport.tsx:114:14 | text | 근거와 함께 경로를 기록했어요. | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:115:14 | text | 목표와 근거가 아직 맞지 않아요. 기록은 남아요. | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:126:37 | text | 전체 미션 유통 기록 | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:126:53 | text | ${mission.title} 유통 기록 | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:131:46 | text | 학습 마무리 | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:132:17 | text | 모든 경로를 살펴봤어요 | heading | repeated-text |
| src/features/report/LearningReport.tsx:134:23 | text | 기억할 점: | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:134:38 | text | 경로를 고를 때는 시간·비용·손실을 함께 비교하고, 자료가 없으면 먼저 확인해요. | learner-text-candidate | multiple-actions, multiple-conditions |
| src/features/report/LearningReport.tsx:137:44 | text | 다음에는 주변 상품 하나를 골라 생산부터 판매까지의 경로를 직접 적어 보세요. | learner-text-candidate | — |
| src/features/report/LearningReport.tsx:143:17 | text | 미션 기록 | heading | — |
| src/features/report/LearningReport.tsx:144:38 | text | 처음 판단과 근거, 다시 정한 결과를 한곳에 모아 보여 줘요. | hint | — |
| src/features/report/LearningReport.tsx:156:32 | text | secondary | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.tsx:156:74 | text | 인쇄하기 | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.tsx:162:10 | text | 처음부터 다시 하기 | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.tsx:164:24 | text | {!state.finished && ( | learner-text-candidate | technical-or-internal |
| src/features/report/LearningReport.tsx:166:34 | text | primary | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.tsx:166:76 | text | NEXT | learner-text-candidate | technical-or-internal |
| src/features/report/LearningReport.tsx:166:86 | text | {state.missionIndex + 1 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/report/LearningReport.tsx:168:18 | text | 다음 미션 보기 | learner-text-candidate | repeated-text |
| src/features/report/LearningReport.tsx:169:18 | text | 모든 미션 끝내기 | learner-text-candidate | repeated-text |
| src/features/report/print.test.ts:7:11 | text | print.css 인쇄 규칙 | learner-text-candidate | — |
| src/features/report/print.test.ts:8:7 | text | A4 세로 용지와 여백을 지정한다 | learner-text-candidate | — |
| src/features/report/print.test.ts:13:7 | text | 인쇄물은 흰 배경과 검정 텍스트를 쓴다 | learner-text-candidate | — |
| src/features/report/print.test.ts:18:7 | text | 제어 버튼과 머리말을 숨긴다 | learner-text-candidate | — |
| src/features/report/print.test.ts:23:7 | text | 이름 입력란이나 식별자를 넣지 않는다 | input | abstract-or-formal |
| src/features/route-trace/EntranceScreen.test.tsx:8:7 | text | 학습 목표와 가상 자료 안내를 보여 준다 | instruction | — |
| src/features/route-trace/EntranceScreen.test.tsx:15:7 | text | 여섯 개 미션 제목을 모두 보여 준다 | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.test.tsx:22:7 | text | 예상 시간과 저장하지 않는다는 안내를 보여 준다 | instruction | — |
| src/features/route-trace/EntranceScreen.test.tsx:28:7 | text | 시작 버튼은 클릭과 Enter 키로 시작한다 | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.test.tsx:32:43 | text | button | button-or-action | repeated-text |
| src/features/route-trace/EntranceScreen.test.tsx:32:61 | text | 경로 추적하기 | button-or-action | repeated-text |
| src/features/route-trace/EntranceScreen.tsx:6:26 | text | void; } export function EntranceScreen({ onStart }: EntranceScreenProps) { return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/route-trace/EntranceScreen.tsx:11:47 | aria-label | 학습 소개 | aria-label | — |
| src/features/route-trace/EntranceScreen.tsx:13:38 | text | 상품이 우리 손에 오기까지 여러 단계를 지나가요. | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:14:47 | text | 생산·가공·운송·판매·소비 단계 | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:14:73 | text | 를 연결하고, 한 조건이 바뀔 때 시간·비용·손실 토큰이 어떻게 달라지는지 추적해 보아요. | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:18:34 | text | primary | learner-text-candidate | repeated-text |
| src/features/route-trace/EntranceScreen.tsx:18:67 | text | 경로 추적하기 | learner-text-candidate | repeated-text |
| src/features/route-trace/EntranceScreen.tsx:21:44 | text | 필수 | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:23:38 | text | 이 활동에 나오는 상품·생산자·장소는 모두 | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:24:43 | text | 가상의 자료 | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:24:58 | text | 예요. 실제 가격, 실제 기업, 환경 등급을 알려 주지 않아요. | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:32:16 | alt | 가상 마을의 생산·유통 경로 일러스트: 농원과 공장, 트럭, 가게가 점선 경로로 이어져 있어요 | alt | — |
| src/features/route-trace/EntranceScreen.tsx:36:21 | text | 장면은 흐름을 상상하기 위한 보조 자료예요. 경로 정보는 글로 확인해요. | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:39:52 | aria-label | 활동 정보 | aria-label | — |
| src/features/route-trace/EntranceScreen.tsx:40:23 | text | 예상 시간 | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:40:43 | text | 20~30분 | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:41:23 | text | 응답 저장 | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:41:43 | text | 저장하지 않아요. 새로고침하면 지금까지 기록이 사라져요. | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:42:23 | text | 미션 | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:42:40 | text | 미션 6개 | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:45:62 | text | mission-index-title | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:47:70 | text | 이번에 만날 미션 여섯 개 | heading | — |
| src/features/route-trace/EntranceScreen.tsx:52:67 | text | {String(index + 1).padStart(2, "0")} | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:54:63 | text | 관찰과 조립 | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:54:86 | text | 조건 비교 | learner-text-candidate | — |
| src/features/route-trace/EntranceScreen.tsx:54:96 | text | 자료 확인 | learner-text-candidate | — |
| src/features/route-trace/FeedbackPanel.tsx:9:41 | text | info | feedback-or-error | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:65:11 | text | RouteWorkbench — 관찰 단계 | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.test.tsx:66:7 | text | 단계별 토큰을 보여 주고 자료 없음을 0으로 표시하지 않는다 | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.test.tsx:68:30 | text | 트럭이 다리를 지나 가요 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:71:10 | text | 상품의 이동 순서와 각 단계에서 하는 일을 살펴보고, 시간·비용·손실 토큰의 뜻을 읽어 보세요. | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:74:30 | text | 활동 보드 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:75:30 | text | 자료 없음 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:76:32 | text | 비용 0 | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.test.tsx:80:11 | text | RouteWorkbench — 경로 조립 단계 | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.test.tsx:87:7 | text | 카드를 차례로 넣고 연결 검사를 통과하면 다음 단계가 열린다 | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.test.tsx:90:40 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:90:58 | text | 경로에 넣기: 공장에서 상품을 실어 보내요 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:91:40 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:91:58 | text | 경로에 넣기: 트럭이 다리를 지나 가요 | button-or-action | — |
| src/features/route-trace/RouteWorkbench.test.tsx:92:40 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:92:58 | text | 경로에 넣기: 가게에 상품을 내려놓아요 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:93:30 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:93:48 | text | 기본 경로 보기 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:94:40 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:94:58 | text | 연결 검사 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:95:30 | text | 연결 검사를 통과했어요 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:96:30 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:96:48 | text | 기본 경로 보기 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:97:40 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:97:58 | text | 기본 경로 보기 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:98:30 | text | 합계 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:99:33 | text | 자료 없음 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:102:7 | text | 끊긴 경로는 연결 검사에서 이유를 알려 주고 다음 단계를 막는다 | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.test.tsx:105:40 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:105:58 | text | 경로에 넣기: 공장에서 상품을 실어 보내요 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:106:40 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:106:58 | text | 경로에 넣기: 가게에 상품을 내려놓아요 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:107:40 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:107:58 | text | 연결 검사 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:109:30 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:109:48 | text | 기본 경로 보기 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:112:7 | text | 키보드 Enter로 카드를 넣으면 클릭과 같은 결과가 된다 | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.test.tsx:115:36 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:115:54 | text | 경로에 넣기: 공장에서 상품을 실어 보내요 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:118:30 | text | 1. 생산 · 공장에서 상품을 실어 보내요 | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.test.tsx:122:11 | text | RouteWorkbench — 조건 변경과 전후 비교 | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.test.tsx:132:40 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:132:58 | text | 기본 경로 보기 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:133:40 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:133:58 | text | 조건 바꾸기 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:136:7 | text | 조건을 선택해야 전후 비교로 넘어간다 | learner-text-candidate | multiple-actions, multiple-conditions |
| src/features/route-trace/RouteWorkbench.test.tsx:139:30 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:139:48 | text | 전후 비교 확인 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:141:30 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:141:48 | text | 전후 비교 확인 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:144:40 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:144:58 | text | 전후 비교 확인 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:146:30 | text | 바꾸기 전 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:147:30 | text | 바꾼 후 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:150:7 | text | 조건을 바꾸지 않기로 명시하게 선택할 수 있다 | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.test.tsx:153:57 | text | 조건을 바꾸지 않고 그대로 유지 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:154:30 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:154:48 | text | 전후 비교 확인 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:155:40 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:155:58 | text | 전후 비교 확인 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:160:11 | text | RouteWorkbench — 판단 단계 | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.test.tsx:179:7 | text | 근거 없이 기록하면 통과하지 않고 정답을 공개하지 않으며 한 번 다시 정하기를 제공한다 | feedback-or-error | — |
| src/features/route-trace/RouteWorkbench.test.tsx:182:40 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:182:58 | text | 판단 기록하기 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:183:30 | text | 아직 목표와 근거가 맞지 않아요 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:185:30 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:185:48 | text | 한 번 다시 정하기 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:186:40 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:186:58 | text | 한 번 다시 정하기 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:187:30 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:187:48 | text | 연결 검사 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:190:7 | text | 근거를 고른 뒤 판단하면 결과를 남긴다 | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.test.tsx:195:40 | text | button | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:195:58 | text | 판단 기록하기 | button-or-action | repeated-text |
| src/features/route-trace/RouteWorkbench.test.tsx:196:32 | text | 아직 목표와 근거가 맞지 않아요 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.tsx:14:58 | text | = { OBSERVE: "상품의 이동 순서와 각 단계에서 하는 일을 살펴보고, 시간·비용·손실 토큰의 뜻을 읽어 보세요.", ORDER: "단계 카드를 순서대로 놓아 상품이 이동하는 한 줄 경로를 만들어 보세요.", BASELINE: "만든 경로의 시간·비용·손실 토큰을 표에서 확인해 보세요.", CHANGE_ONE: "조건을 하나 고르고, 무엇이 달라질지 먼저 생각해 보세요.", COMPARE: "바꾸기 전과 후를 비교해 시간·비용·손실 토큰 중 무엇이 달라졌는지 말해 보세요.", DECIDE: "목표를 다시 읽고, 판단에 필요한 근거와 자료를 고른 뒤 기록해 보세요.", }; interface RouteWorkbenchProps { readonly state: SessionState; readonly dispatch: Dispatch | instruction | long-or-dense, multiple-actions, technical-or-internal |
| src/features/route-trace/RouteWorkbench.tsx:15:13 | text | 상품의 이동 순서와 각 단계에서 하는 일을 살펴보고, 시간·비용·손실 토큰의 뜻을 읽어 보세요. | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.tsx:16:11 | text | 단계 카드를 순서대로 놓아 상품이 이동하는 한 줄 경로를 만들어 보세요. | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.tsx:17:14 | text | 만든 경로의 시간·비용·손실 토큰을 표에서 확인해 보세요. | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.tsx:18:16 | text | 조건을 하나 고르고, 무엇이 달라질지 먼저 생각해 보세요. | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.tsx:19:13 | text | 바꾸기 전과 후를 비교해 시간·비용·손실 토큰 중 무엇이 달라졌는지 말해 보세요. | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.tsx:20:12 | text | 목표를 다시 읽고, 판단에 필요한 근거와 자료를 고른 뒤 기록해 보세요. | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.tsx:35:10 | text | 단계 배열하기 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.tsx:37:12 | text | 기본 경로 보기 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.tsx:39:46 | text | 0 ? "조건 바꾸기" : "판단하기" : state.step === "CHANGE_ONE" ? "전후 비교 확인" : "판단하기"; const canGoNext = state.step === "ORDER" ? progress.connectionCheck?.valid === true : state.step === "CHANGE_ONE" ? progress.changeConfirmed : true; return ( | learner-text-candidate | long-or-dense, multiple-actions, technical-or-internal |
| src/features/route-trace/RouteWorkbench.tsx:40:16 | text | 조건 바꾸기 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.tsx:41:16 | text | 판단하기 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.tsx:43:16 | text | 전후 비교 확인 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.tsx:44:16 | text | 판단하기 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.tsx:54:49 | text | ${mission.title} ${STEP_LABELS[state.step]} | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/route-trace/RouteWorkbench.tsx:56:35 | text | 현재 미션 {state.missionIndex + 1} / {state.progress.length} | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/features/route-trace/RouteWorkbench.tsx:59:43 | text | {STEP_LABELS[state.step]} | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/features/route-trace/RouteWorkbench.tsx:62:13 | text | 지금 할 일 | heading | — |
| src/features/route-trace/RouteWorkbench.tsx:65:37 | text | 목표 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.tsx:72:17 | text | 활동 보드 | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.tsx:73:40 | text | 지금 이 단계에서 기록해요 | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.tsx:90:45 | aria-label | 단계 이동 | aria-label | — |
| src/features/route-trace/RouteWorkbench.tsx:91:32 | text | secondary | learner-text-candidate | repeated-text |
| src/features/route-trace/RouteWorkbench.tsx:91:76 | text | BACK | learner-text-candidate | technical-or-internal |
| src/features/route-trace/RouteWorkbench.tsx:91:86 | text | 뒤로 가기 | learner-text-candidate | — |
| src/features/route-trace/RouteWorkbench.tsx:93:24 | text | {state.step !== "DECIDE" && ( | learner-text-candidate | technical-or-internal |
| src/features/route-trace/stepLabels.ts:4:11 | text | 입구 | learner-text-candidate | — |
| src/features/route-trace/stepLabels.ts:5:13 | text | 단계 관찰 | learner-text-candidate | repeated-text |
| src/features/route-trace/stepLabels.ts:6:11 | text | 경로 조립 | learner-text-candidate | — |
| src/features/route-trace/stepLabels.ts:7:14 | text | 기본 경로 | learner-text-candidate | — |
| src/features/route-trace/stepLabels.ts:8:16 | text | 조건 변경 | learner-text-candidate | — |
| src/features/route-trace/stepLabels.ts:9:13 | text | 전후 비교 | learner-text-candidate | — |
| src/features/route-trace/stepLabels.ts:10:12 | text | 판단 | learner-text-candidate | — |
| src/features/route-trace/stepLabels.ts:11:12 | text | 유통 기록 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:22:28 | text | 자료 없음 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:26:31 | text | 자료 없음 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:27:28 | text | 변화 없음 | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:31:67 | text | = { "route-too-short": "단계를 두 개 이상 골라야 해요.", "route-has-unknown-stage": "모르는 단계가 섞여 있어요.", "route-has-repeated-stage": "같은 단계를 두 번 쓸 수 없어요.", "route-must-start-with-first-stage": "경로는 시작 단계에서 시작해야 해요.", "route-must-end-with-last-stage": "경로는 마지막 단계에서 끝나야 해요.", "route-not-connected": "단계가 이어지지 않았어요.", }; interface StepCommonProps { readonly mission: RouteMission; readonly progress: MissionProgress; readonly dispatch: Dispatch | learner-text-candidate | long-or-dense |
| src/features/route-trace/workbenchSteps.tsx:32:23 | text | 단계를 두 개 이상 골라야 해요. | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:33:31 | text | 모르는 단계가 섞여 있어요. | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:34:32 | text | 같은 단계를 두 번 쓸 수 없어요. | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:35:41 | text | 경로는 시작 단계에서 시작해야 해요. | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:36:38 | text | 경로는 마지막 단계에서 끝나야 해요. | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:37:27 | text | 단계가 이어지지 않았어요. | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:43:45 | text | ; } function TokenText({ token, label }: { token: number \| null; label: string }) { return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/route-trace/workbenchSteps.tsx:49:45 | text | {formatToken(token)} | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:68:48 | aria-label | 토큰 범례 | aria-label | — |
| src/features/route-trace/workbenchSteps.tsx:69:21 | text | 시간 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:69:32 | text | 그 단계에 걸리는 정도 | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:70:21 | text | 비용 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:70:32 | text | 그 단계에 드는 정도 | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:71:21 | text | 손실 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:71:32 | text | 상품이 줄어드는 정도 | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:76:42 | text | {STAGE_KIND_LABELS[node.kind]} | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:79:57 | text | 시간 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:80:57 | text | 비용 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:81:57 | text | 손실 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:86:32 | text | 이 숫자는 비교 연습용 가상 토큰이에요. 자료 없음은 아직 모른다는 뜻이고, 0이 아니에요. | hint | — |
| src/features/route-trace/workbenchSteps.tsx:101:71 | text | assembled-route-title | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:102:42 | text | 만든 경로 | heading | — |
| src/features/route-trace/workbenchSteps.tsx:102:52 | text | {progress.assembledNodeIds.length === 0 ? ( | heading | technical-or-internal |
| src/features/route-trace/workbenchSteps.tsx:104:16 | text | 남은 단계 카드에서 차례로 골라 경로를 만들어 보아요. | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:111:55 | text | {index + 1}. {STAGE_KIND_LABELS[node.kind]} · {node.label} | learner-text-candidate | long-or-dense |
| src/features/route-trace/workbenchSteps.tsx:118:38 | text | ${node.label} 위로 옮기기 | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:121:24 | text | 위로 | button-or-action | — |
| src/features/route-trace/workbenchSteps.tsx:127:38 | text | ${node.label} 아래로 옮기기 | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:130:24 | text | 아래로 | button-or-action | — |
| src/features/route-trace/workbenchSteps.tsx:136:38 | text | ${node.label} 경로에서 빼기 | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:138:24 | text | 빼기 | button-or-action | — |
| src/features/route-trace/workbenchSteps.tsx:149:70 | text | card-pool-title | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:150:36 | text | 남은 단계 카드 | heading | — |
| src/features/route-trace/workbenchSteps.tsx:157:32 | text | 경로에 넣기: ${node.label} | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:160:48 | text | {STAGE_KIND_LABELS[node.kind]} | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:170:32 | text | secondary | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:170:76 | text | CHECK_CONNECTION | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:170:98 | text | 연결 검사 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:177:10 | text | 다시 만들기 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:180:13 | text | {progress.connectionCheck !== null && (progress.connectionCheck.valid ? ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/route-trace/workbenchSteps.tsx:184:32 | text | success | feedback-or-error | — |
| src/features/route-trace/workbenchSteps.tsx:184:48 | title | 연결 검사를 통과했어요 | title, feedback-or-error | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:185:16 | text | 경로가 끊김 없이 이어졌어요. 다음 단계에서 토큰을 확인해 보아요. | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:188:32 | text | warning | feedback-or-error | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:188:48 | title | 아직 연결되지 않았어요 | title, feedback-or-error | — |
| src/features/route-trace/workbenchSteps.tsx:191:31 | text | {CONNECTION_REASON_MESSAGES[key] ?? "경로를 다시 확인해 보아요."} | learner-text-candidate | long-or-dense |
| src/features/route-trace/workbenchSteps.tsx:192:56 | text | 경로를 다시 확인해 보아요. | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:218:27 | text | 단계 | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:219:27 | text | 시간 토큰 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:220:27 | text | 비용 토큰 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:221:27 | text | 손실 토큰 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:229:31 | text | {STAGE_KIND_LABELS[node.kind]} · {node.label} | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:232:38 | text | {formatToken(node.timeTokens)} | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:233:38 | text | {formatToken(node.costTokens)} | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:234:38 | text | {formatToken(node.lossTokens)} | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:241:27 | text | 합계 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:242:34 | text | {formatToken(totals.timeTokens)} | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:243:34 | text | {formatToken(totals.costTokens)} | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:244:34 | text | {formatToken(totals.lossTokens)} | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:260:32 | text | 만든 경로의 단계별 토큰이에요. 연결선 토큰은 이 활동에서 0이라 합계에 더해지지 않아요. | hint | — |
| src/features/route-trace/workbenchSteps.tsx:267:18 | text | 기본 경로 토큰 표 | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:280:17 | text | 조건을 하나 골라 보세요 | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:303:17 | text | 조건을 바꾸지 않고 그대로 유지 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:305:18 | text | {progress.changeConfirmed && ( | feedback-or-error | — |
| src/features/route-trace/workbenchSteps.tsx:307:30 | text | info | feedback-or-error | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:307:43 | title | 선택했어요 | title, feedback-or-error | — |
| src/features/route-trace/workbenchSteps.tsx:307:50 | text | {selectedChange ? ( | feedback-or-error | — |
| src/features/route-trace/workbenchSteps.tsx:309:16 | text | 선택한 조건: | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:313:16 | text | 조건을 바꾸지 않고 그대로 보기로 했어요. | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:315:14 | text | 무엇이 달라질지 생각한 뒤, 아래 버튼을 눌러 전후를 확인해 보세요. | learner-text-candidate | multiple-actions |
| src/features/route-trace/workbenchSteps.tsx:322:85 | text | ) { const before = computeTotals(mission, progress.assembledNodeIds, null); const result = progress.appliedChangeId === null ? null : applyConditionChange( mission, progress.appliedChangeId, routeIdFromNodeIds(progress.assembledNodeIds), ); const after = result ? result.afterTotals : before; const diff = result ? result.diff : { timeTokens: 0, costTokens: 0, lossTokens: 0 }; const rows: readonly { label: string; before: number \| null; after: number \| null; diff: number \| null; }[] = [ { label: "시간 토큰", before: before.timeTokens, after: after.timeTokens, diff: diff.timeTokens, }, { label: "비용 토큰", before: before.costTokens, after: after.costTokens, diff: diff.costTokens, }, { label: "손실 토큰", before: before.lossTokens, after: after.lossTokens, diff: diff.lossTokens, }, ]; return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/route-trace/workbenchSteps.tsx:341:15 | text | 시간 토큰 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:347:15 | text | 비용 토큰 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:353:15 | text | 손실 토큰 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:361:30 | text | 조건을 바꾸지 않았어요. 전후가 같아요. | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:363:18 | text | 전후 비교 표 | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:366:29 | text | 항목 | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:367:29 | text | 바꾸기 전 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:368:29 | text | 바꾼 후 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:369:29 | text | 변화 | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:375:26 | text | row | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:376:38 | text | {formatToken(row.before)} | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:377:37 | text | {formatToken(row.after)} | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:378:35 | text | {formatDiff(row.diff)} | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:383:32 | text | 자료 없음은 값이 없다는 뜻이에요. 0으로 바꾸어 계산하지 않아요. +는 늘어난 양, -는 줄어든 양이에요. | hint | long-or-dense |
| src/features/route-trace/workbenchSteps.tsx:402:19 | text | 판단에 필요한 자료를 골라 보세요 | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:417:38 | text | 이번 판단: | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:418:26 | text | {decisions[0]?.label} | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:424:19 | text | 판단의 근거를 하나 이상 골라 보세요 | learner-text-candidate | — |
| src/features/route-trace/workbenchSteps.tsx:438:36 | text | 먼저 근거와 자료를 고른 뒤, 아래 버튼을 눌러 판단을 기록해 보세요. | hint | multiple-actions |
| src/features/route-trace/workbenchSteps.tsx:446:8 | text | 판단 기록하기 | learner-text-candidate | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:448:22 | text | {rejectedFirst && ( | feedback-or-error | — |
| src/features/route-trace/workbenchSteps.tsx:451:30 | text | warning | feedback-or-error | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:451:46 | title | 아직 목표와 근거가 맞지 않아요 | title, feedback-or-error | repeated-text |
| src/features/route-trace/workbenchSteps.tsx:452:14 | text | 정답을 바로 알려 드리지는 않아요. 목표 카드와 토큰 표를 다시 읽고, 근거를 더 모아 한 번 다시 정해 보세요. | feedback-or-error | long-or-dense |
| src/features/route-trace/workbenchSteps.tsx:459:12 | text | 한 번 다시 정하기 | learner-text-candidate | repeated-text |
| src/main.tsx:12:20 | text | root 요소를 찾을 수 없습니다 | feedback-or-error | — |
| src/update/updateHistory.ts:8:32 | text | 학생 문구·320px 화면·완료 안내 개선 | instruction | — |
| src/update/updateHistory.ts:9:32 | text | 교실 유통 관찰 보드 전체 리디자인 | learner-text-candidate | — |
| src/update/updateHistory.ts:10:32 | text | 학습 흐름 검증과 배포 자산 검사 통과 | learner-text-candidate | abstract-or-formal |
| src/update/updateHistory.ts:11:32 | text | 입구 화면과 학습 화면 구현 | learner-text-candidate | — |
| src/update/updateHistory.ts:12:32 | text | 콘텐츠·판정·세션 학습 엔진 구현 | learner-text-candidate | — |
| src/update/updateHistory.ts:13:32 | text | 구현 계획 확정 | learner-text-candidate | repeated-text |
| tests/a11y/app.a11y.test.tsx:15:11 | text | 자동 접근성 검사 | learner-text-candidate | — |
| tests/a11y/app.a11y.test.tsx:16:7 | text | 입구 화면에서 serious·critical 위반이 0건이다 | learner-text-candidate | — |
| tests/a11y/app.a11y.test.tsx:21:7 | text | 관찰 단계에서 serious·critical 위반이 0건이다 | learner-text-candidate | — |
| tests/a11y/app.a11y.test.tsx:24:40 | text | button | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:24:58 | text | 경로 추적하기 | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:28:7 | text | 조립 단계에서 serious·critical 위반이 0건이다 | learner-text-candidate | — |
| tests/a11y/app.a11y.test.tsx:31:40 | text | button | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:31:58 | text | 경로 추적하기 | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:32:40 | text | button | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:32:58 | text | 단계 배열하기 | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:36:7 | text | 업데이트 내역 대화상자에서 serious·critical 위반이 0건이다 | learner-text-candidate | — |
| tests/a11y/app.a11y.test.tsx:39:40 | text | button | button-or-action | repeated-text |
| tests/a11y/app.a11y.test.tsx:39:58 | text | 업데이트 내역 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:11:11 | text | 런타임 경계 — 네트워크와 저장 금지 | learner-text-candidate | — |
| tests/privacy/runtime-boundary.test.tsx:22:42 | text | network disabled | feedback-or-error | — |
| tests/privacy/runtime-boundary.test.tsx:80:7 | text | 딸기 미션 전체를 진행하는 동안 외부 네트워크 호출이 0건이다 | learner-text-candidate | — |
| tests/privacy/runtime-boundary.test.tsx:83:40 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:83:58 | text | 경로 추적하기 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:84:40 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:84:58 | text | 단계 배열하기 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:86:8 | text | 별빛 농원에서 딸기를 수확해요 | learner-text-candidate | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:87:8 | text | 상태가 좋은 딸기를 골라 상자에 담아요 | learner-text-candidate | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:88:8 | text | 트럭으로 가게까지 실어 나르세요 | learner-text-candidate | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:89:8 | text | 가게 진열대에 놓고 팔아요 | learner-text-candidate | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:91:42 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:91:60 | text | 경로에 넣기: ${label} | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:93:40 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:93:58 | text | 연결 검사 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:94:40 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:94:58 | text | 기본 경로 보기 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:95:40 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:95:58 | text | 판단하기 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:99:40 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:99:58 | text | 판단 기록하기 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:104:7 | text | 지연 조건을 바꾸는 동안에도 네트워크와 저장 호출이 0건이다 | learner-text-candidate | — |
| tests/privacy/runtime-boundary.test.tsx:109:44 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:109:62 | text | 다음 미션 보기 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:112:44 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:112:62 | text | 경로 추적하기 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:114:42 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:114:60 | text | 단계 배열하기 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:118:16 | text | 별빛 농원에서 딸기를 수확해요 | learner-text-candidate | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:119:16 | text | 상태가 좋은 딸기를 골라 상자에 담아요 | learner-text-candidate | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:120:16 | text | 트럭으로 가게까지 실어 나르세요 | learner-text-candidate | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:121:16 | text | 가게 진열대에 놓고 팔아요 | learner-text-candidate | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:125:18 | text | 재생 종이 원료를 모아요 | learner-text-candidate | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:126:18 | text | 공장에서 공책을 만들어요 | learner-text-candidate | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:127:18 | text | 창고 A에 하루 동안 쌓아요 | learner-text-candidate | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:128:18 | text | 문구점 진열대에 놓아요 | learner-text-candidate | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:131:18 | text | 공장에서 상품을 실어 보내요 | learner-text-candidate | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:132:18 | text | 트럭이 다리를 지나 가요 | learner-text-candidate | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:133:18 | text | 가게에 상품을 내려놓아요 | learner-text-candidate | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:136:44 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:136:62 | text | 경로에 넣기: ${label} | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:138:42 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:138:60 | text | 연결 검사 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:139:42 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:139:60 | text | 기본 경로 보기 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:141:44 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:141:62 | text | 조건 바꾸기 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:143:44 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:143:62 | text | 전후 비교 확인 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:144:44 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:144:62 | text | 판단하기 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:148:44 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:148:62 | text | 판단하기 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:151:44 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:151:62 | text | 판단하기 | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:154:42 | text | button | button-or-action | repeated-text |
| tests/privacy/runtime-boundary.test.tsx:154:60 | text | 판단 기록하기 | button-or-action | repeated-text |
| tests/release/pages-assets.test.ts:11:11 | text | 배포 자산 검사 (npm run build 이후 실행) | learner-text-candidate | — |
| tests/release/pages-assets.test.ts:12:7 | text | dist/index.html이 생성되어 있다 | learner-text-candidate | — |
| tests/release/pages-assets.test.ts:16:7 | text | 모든 절대 참조가 Pages 하위 경로로 시작한다 | learner-text-candidate | — |
| tests/release/pages-assets.test.ts:23:7 | text | 참조된 자산 파일이 실제로 존재한다 | learner-text-candidate | — |
| tests/release/pages-assets.test.ts:30:7 | text | favicon이 존재하고 참조된다 | learner-text-candidate | — |
| tests/release/pages-assets.test.ts:35:7 | text | 생성 webp 자산이 번들에 포함되어 있다 | learner-text-candidate | — |
| tests/release/pages-assets.test.ts:40:7 | text | 외부 http(s) 리소스 참조가 없다 | learner-text-candidate | technical-or-internal |

## Limitations

- Candidates are triage signals, not an automatic grade-level or readability certification.
- Static scanning can miss runtime-composed text, fetched content, canvas/image text, and some template syntax.
- Every candidate requires rendered-state, target-grade, learning-intent, and curriculum-accuracy review.
- This command reads source files and writes only the optional report path; it never rewrites source files.

## Configuration

- Extensions: `.astro, .cjs, .htm, .html, .js, .jsx, .mjs, .svelte, .ts, .tsx, .vue`
- Excluded directories: `.git, .next, .nuxt, .parcel-cache, .turbo, .vite, build, coverage, dist, node_modules, out, target, vendor`
