import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { App } from "./App";

afterEach(() => {
  document.documentElement.className = "";
});

describe("App 셸", () => {
  it("처음에는 입구 화면을 보여 준다", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "생산·유통 경로 추적소" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "경로 추적하기" })).toBeInTheDocument();
  });

  it("시작하면 첫 미션 단계 화면으로 가고 큰 제목에 초점을 옮긴다", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "경로 추적하기" }));
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("별빛 딸기 상자");
    expect(heading).toHaveTextContent("단계 관찰");
    expect(document.activeElement).toBe(heading);
  });

  it("머리말에서 업데이트 내역 대화상자를 열고 닫을 수 있다", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "업데이트 내역" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText("구현 계획 확정")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("학습 중 처음부터 다시 하기는 확인 대화상자를 거친다", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "경로 추적하기" }));
    await user.click(screen.getByRole("button", { name: "처음부터 다시 하기" }));
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveTextContent("처음부터");
    await user.click(screen.getByRole("button", { name: "취소" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "처음부터 다시 하기" }));
    await user.click(screen.getByRole("button", { name: "처음부터 할게요" }));
    expect(screen.getByRole("heading", { level: 1, name: "생산·유통 경로 추적소" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "경로 추적하기" })).toBeInTheDocument();
  });

  it("글자 크기 버튼은 문서 루트에 큰 글자 상태를 적용한다", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole("button", { name: "글자 크게" });
    expect(document.documentElement).not.toHaveClass("large-text");
    await user.click(toggle);
    expect(document.documentElement).toHaveClass("large-text");
    expect(screen.getByRole("button", { name: "글자 보통" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "글자 보통" }));
    expect(document.documentElement).not.toHaveClass("large-text");
  });
});
