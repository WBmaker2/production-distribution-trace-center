import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { missions } from "../../content/missions";
import { EntranceScreen } from "./EntranceScreen";

describe("EntranceScreen", () => {
  it("학습 목표와 가상 자료 안내를 보여 준다", () => {
    render(<EntranceScreen onStart={() => {}} />);
    expect(screen.getByText(/생산·가공·운송·판매·소비 단계/)).toBeInTheDocument();
    expect(screen.getByText(/가상의 자료/)).toBeInTheDocument();
    expect(screen.getByText(/실제 가격|실제 기업/)).toBeInTheDocument();
  });

  it("여섯 개 미션 제목을 모두 보여 준다", () => {
    render(<EntranceScreen onStart={() => {}} />);
    for (const mission of missions) {
      expect(screen.getByText(mission.title)).toBeInTheDocument();
    }
  });

  it("예상 시간과 저장하지 않는다는 안내를 보여 준다", () => {
    render(<EntranceScreen onStart={() => {}} />);
    expect(screen.getByText(/20\s*~\s*30분/)).toBeInTheDocument();
    expect(screen.getByText(/새로고침하면/)).toBeInTheDocument();
  });

  it("시작 버튼은 클릭과 Enter 키로 시작한다", async () => {
    const onStart = vi.fn();
    const user = userEvent.setup();
    render(<EntranceScreen onStart={onStart} />);
    const startButton = screen.getByRole("button", { name: "경로 추적하기" });
    await user.click(startButton);
    expect(onStart).toHaveBeenCalledTimes(1);
    await user.keyboard("{Enter}");
    expect(onStart).toHaveBeenCalledTimes(2);
  });
});
