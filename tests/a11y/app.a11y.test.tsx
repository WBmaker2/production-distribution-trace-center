import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import { App } from "../../src/app/App";

async function expectNoSeriousViolations(container: HTMLElement) {
  const results = await axe(container);
  const seriousOrCritical = results.violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical",
  );
  expect(seriousOrCritical).toEqual([]);
}

describe("자동 접근성 검사", () => {
  it("입구 화면에서 serious·critical 위반이 0건이다", async () => {
    const { container } = render(<App />);
    await expectNoSeriousViolations(container);
  });

  it("관찰 단계에서 serious·critical 위반이 0건이다", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    await user.click(screen.getByRole("button", { name: "경로 추적하기" }));
    await expectNoSeriousViolations(container);
  });

  it("조립 단계에서 serious·critical 위반이 0건이다", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    await user.click(screen.getByRole("button", { name: "경로 추적하기" }));
    await user.click(screen.getByRole("button", { name: "단계 배열하기" }));
    await expectNoSeriousViolations(container);
  });

  it("업데이트 내역 대화상자에서 serious·critical 위반이 0건이다", async () => {
    const user = userEvent.setup();
    const { container } = render(<App />);
    await user.click(screen.getByRole("button", { name: "업데이트 내역" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await expectNoSeriousViolations(container);
  });
});
