import type { SessionStep } from "../../domain/types";

export const STEP_LABELS: Readonly<Record<SessionStep, string>> = {
  INTRO: "입구",
  OBSERVE: "단계 관찰",
  ORDER: "경로 조립",
  BASELINE: "기본 경로",
  CHANGE_ONE: "조건 변경",
  COMPARE: "전후 비교",
  DECIDE: "판단",
  REPORT: "유통 기록",
};
