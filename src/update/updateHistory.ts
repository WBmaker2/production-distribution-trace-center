export interface UpdateHistoryEntry {
  readonly date: string;
  readonly note: string;
}

/** 최신 항목이 앞에 온다. 실제 수정 때마다 최신 날짜를 앞에 추가한다. */
export const updateHistoryEntries: readonly UpdateHistoryEntry[] = [
  { date: "2026-08-31", note: "학생 문구·320px 화면·완료 안내 개선" },
  { date: "2026-08-30", note: "교실 유통 관찰 보드 전체 리디자인" },
  { date: "2026-08-28", note: "학습 흐름 검증과 배포 자산 검사 통과" },
  { date: "2026-08-28", note: "입구 화면과 학습 화면 구현" },
  { date: "2026-08-28", note: "콘텐츠·판정·세션 학습 엔진 구현" },
  { date: "2026-08-28", note: "구현 계획 확정" },
];
