# 교육용 웹앱 리디자인 자산 기록

## 판정 기준

- 감사일: 2026-08-30
- 기준: `/Users/kimhongnyeon/.codex/skills/education-webapp-redesign/references/asset-safety.md`
- 이미지 안에 경로 정답·토큰 수치·지도·라벨·로고를 넣지 않습니다.
- 원본은 삭제·덮어쓰기하지 않습니다. 새 자산이 필요하면 의미가 드러나는 `-v2` 파일로 추가하고 모든 참조와 롤백 경로를 기록합니다.

## 현재 자산

| 원본 | 화면·역할 | 판정 | 해상도 | 접근성 | 상태 | 롤백 |
|---|---|---|---:|---|---|---|
| `src/assets/generated/fictional-goods-route-map.webp` | 입구 상단의 가상 마을·생산·운송·판매 장면을 보조하는 개념 이미지 | 유지 후보; 실제 지도·기업·지역을 주장하지 않는 저장소 전용 일러스트 | 800×450 | 정보 보조 alt 유지: 가상 마을과 점선 경로를 설명 | 코드 생성 WebP 확인, 리디자인 참조 전 | 입구 import를 원본 경로로 유지 |
| `src/assets/generated/fictional-goods-route-map-v2.webp` | 입구의 생산·작업·운송·판매 흐름을 한눈에 보여 주는 리디자인 보조 장면 | 사용; 실제 지도·기업·지역·학습 정답을 주장하지 않는 생성 개념 이미지 | 1000×563 | 기존의 정보 보조 alt를 유지하고, 경로 정보는 글로 제공 | 2026-08-30 이미지 생성 모델 제작, 로컬 WebP 변환·시각 확인 완료 | 입구 import를 `fictional-goods-route-map.webp`로 되돌리면 원본 장면 복구 |
| `src/assets/generated/goods/strawberry-box.webp` | 딸기 미션 관찰 단계의 가상 상품 보조 이미지 | 유지 후보; 사실·증거가 아닌 가상 상품 | 400×300 | `가상의 별빛 딸기 상자 일러스트` 유지 | 코드 생성 WebP 확인, 교체하지 않음 | `src/content/missions.ts`의 기존 import 유지 |
| `src/assets/generated/goods/notebook.webp` | 공책 미션 관찰 단계의 가상 상품 보조 이미지 | 유지 후보; 사실·증거가 아닌 가상 상품 | 400×300 | `가상의 재생 종이 공책 일러스트` 유지 | 코드 생성 WebP 확인, 교체하지 않음 | `src/content/missions.ts`의 기존 import 유지 |
| `src/assets/generated/goods/package-box.webp` | 포장 미션 관찰 단계의 가상 상품 비교 보조 이미지 | 유지 후보; 실제 포장 규격·수치를 주장하지 않는 개념 이미지 | 400×300 | `가상의 큰 상자와 작은 상자 일러스트` 유지 | 코드 생성 WebP 확인, 교체하지 않음 | `src/content/missions.ts`의 기존 import 유지 |
| `public/favicon.svg` | 브라우저 탭 식별용 저장소 전용 마크 | 자동 교체하지 않음; 브랜드/마크는 사람 승인 없이 생성·교체하지 않음 | SVG | 문서 본문 정보가 아닌 favicon | 기존 참조 유지 | `index.html`의 기존 참조 유지 |

## 리디자인 검토 결과

- 현재 자산은 모두 로컬 파일이며 CSS `url`, `srcset`, preload, 외부 이미지 URL은 없습니다.
- 입구 장면은 학습 데이터 대신 분위기와 개념을 보조하고, 실제 경로·토큰은 HTML/React로 렌더링되어 안전 계약을 지킵니다.
- 상품 이미지는 렌더 폭 160~240px보다 충분히 큰 원본이며 현재 해상도 부족 증거가 없습니다.
- 첫 화면 리디자인은 이미지를 CTA보다 앞세우지 않도록 비율·배치만 조정합니다. 이미지가 로드되지 않아도 제목·지시·선택지·판정·기록으로 완주됩니다.
- 새 이미지 생성은 코드 리디자인 후 필요성을 재평가합니다. 이번에는 입구 장면의 새 비율과 시각 언어를 맞추기 위해 `-v2`를 추가했으며, 원본은 그대로 보존합니다.

## 생성 기록

`src/assets/generated/fictional-goods-route-map-v2.webp`는 2026-08-30 생성 모델로 만들고 시각 확인한 보조 자산입니다. 텍스트·수치·실제 지도·상표·실존 인물·기관을 포함하지 않으며, 학습 흐름의 정답·증거는 HTML/React 텍스트로 제공합니다. 원본 `fictional-goods-route-map.webp`는 롤백을 위해 보존합니다.
