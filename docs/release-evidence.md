# 릴리스 증거 기록 — 생산·유통 경로 추적소

> 작성일: 2026-08-28. 이 문서는 로컬 검증 증거를 기록하며 배포·HVC 등록이 완료되었음을 뜻하지 않는다.

## 1. 구현 범위

- 계획 문서 Task 0~9의 로컬 구현·검증 완료 (배포·HVC는 별도 승인 게이트).
- 6개 고정 미션(route-strawberry-01 ~ route-missing-06), 순수 판정기, 전이 잠금 세션, 입구·학습·기록 화면, 인쇄, 업데이트 내역, 오리지널 생성 자산 4종.

## 2. 검증 증거 (2026-08-28, `npm run verify` exit 0)

| 단계 | 결과 |
|---|---|
| lint / typecheck | 0 오류 |
| 단위·컴포넌트 테스트 | 115개 통과 |
| 자동 접근성 (axe serious/critical) | 0건 (입구·관찰·조립·대화상자) |
| 파일 줄 수 검사 | 40개 TS·TSX·CSS 전부 500줄 미만 |
| 정적 빌드 | `dist/` + 해시 자산, base `/production-distribution-trace-center/` |
| 배포 자산 검사 | 6개 통과 (참조 경로·favicon·webp·외부 참조 없음) |
| Playwright E2E | 16개 통과 (데스크톱 1280×800 + 모바일 375×812) |

## 3. 검증 중 발견해 수정한 사항

- `vite preview`는 command가 `serve`로 실행되어 base가 `/`로 풀리는 문제 → `isPreview`에서도 Pages 하위 경로 base를 적용하도록 수정. 이로 인해 하위 경로의 JS 모듈이 HTML 폴백으로 새어 404가 되던 E2E 실패를 해소했다.
- store-05 미션에 종료 단계가 2개가 되는 구조 → 공유 소비 단계(`buyer`)를 추가해 검수기의 단일 종료 규칙과 일치시켰다(합계 불변).
- 320px에서 경로표가 카드 행으로 바뀌도록 `data-label` 기반 반응형 CSS를 추가했다.

## 4. 커밋 목록 (구현 순서)

1. `chore: scaffold production-distribution-trace-center`
2. `feat: define reviewed route-trace missions`
3. `feat: add deterministic route-trace evaluator`
4. `feat: add guarded learning session`
5. `feat: build 생산·유통 경로 추적소 entrance`
6. `feat: implement route-trace learner flow`
7. `feat: add evidence report and update history`
8. `feat: add reviewed classroom visual system`
9. `test: verify learner flow and privacy boundary`
10. `docs: record production-distribution-trace-center release evidence`

원격 저장소 푸시는 이루어지지 않았다 (로컬 `main` 브랜치만 존재).

## 5. 남은 게이트 (배포 전 필수)

1. **사람 검수** — `docs/content-review.md` 확인 목록 (교과 정확성, 문장 난이도, 가치 판단 문구)
2. **사용자 출시 승인** — 승인 후 `WBmaker2/production-distribution-trace-center` 원격 생성, `main` 푸시, Pages `build_type=workflow` 설정
3. **공개 앱 확인** — `https://wbmaker2.github.io/production-distribution-trace-center/`에서 제목·favicon·자산·콘솔 오류 0건·학습 흐름·375px 확인
4. **HVC 등록** — 공개 확인 뒤 별도 단계로 수행하고 [vibehong.shop](https://www.vibehong.shop/) 갤러리와 동기화

## 6. 계획과의 차이 기록

- `tests/privacy/runtime-boundary.test.tsx`: JSX 사용을 위해 계획 문서의 `.ts` 대신 `.tsx` 확장자를 쓴다.
- `vitest.release.config.ts`: 배포 자산 테스트를 빌드 후에만 실행하기 위해 계획 문서에 없는 별도 vitest 설정 파일을 추가했다.
- `src/features/route-trace/workbenchSteps.tsx`, `stepLabels.ts`, `src/styles/workbench.css`: 500줄 이하 제한을 지키기 위해 계획 문서 8의 화면 구성을 분리했다.
- `scripts/build-assets.mjs`: 생성 자산 재현을 위한 SVG→webp 변환 스크립트 (sharp 사용).
- store-05에 소비 단계 노드 추가: 계획 문서 4.1 합계는 그대로 유지하면서 단일 종료 DAG 규칙(계획 문서 5)을 충족했다.
