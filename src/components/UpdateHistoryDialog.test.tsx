import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it, vi } from "vitest";
import { UpdateHistoryDialog } from "./UpdateHistoryDialog";

function Harness({ onClose }: { readonly onClose: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        업데이트 내역 열기
      </button>
      <UpdateHistoryDialog open={open} onClose={() => { setOpen(false); onClose(); }} />
    </>
  );
}

describe("UpdateHistoryDialog", () => {
  it("닫혀 있으면 아무것도 렌더링하지 않는다", () => {
    render(<UpdateHistoryDialog open={false} onClose={() => {}} />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("열면 항목을 최신 날짜가 앞에 오도록 보여 준다", () => {
    render(<UpdateHistoryDialog open={true} onClose={() => {}} />);
    const items = screen.getAllByRole("listitem");
    expect(items.length).toBeGreaterThan(0);
    expect(items[0]?.textContent).toContain("2026-08-31");
    expect(screen.getByText("구현 계획 확정")).toBeInTheDocument();
  });

  it("Escape와 닫기 버튼으로 닫히고 호출 버튼으로 초점을 돌려 준다", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<Harness onClose={onClose} />);
    const opener = screen.getByRole("button", { name: "업데이트 내역 열기" });
    await user.click(opener);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(document.activeElement).toBe(opener);

    await user.click(opener);
    await user.click(screen.getByRole("button", { name: "닫기" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.activeElement).toBe(opener);
  });
});
