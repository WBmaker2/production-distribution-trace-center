import { expect, type Page, test } from "@playwright/test";

const STRAWBERRY = [
  "별빛 농원에서 딸기를 수확해요",
  "상태가 좋은 딸기를 골라 상자에 담아요",
  "트럭으로 가게까지 실어 나르세요",
  "가게 진열대에 놓고 팔아요",
];

async function pressOn(page: Page, locator: ReturnType<Page["getByRole"]>) {
  await locator.focus();
  await page.keyboard.press("Enter");
}

test.describe("키보드 전용 조작", () => {
  test("키보드만으로 순서를 고치고 경로를 완주한다", async ({ page }) => {
    await page.goto("./");
    await pressOn(page, page.getByRole("button", { name: "경로 추적하기" }));
    await pressOn(page, page.getByRole("button", { name: "단계 배열하기" }));

    // 일부러 거꾸로 넣고
    for (const label of [...STRAWBERRY].reverse()) {
      await pressOn(page, page.getByRole("button", { name: `경로에 넣기: ${label}` }));
    }
    // 위로 버튼만으로 올바른 순서를 만든다
    const farmUp = page.getByRole("button", {
      name: "별빛 농원에서 딸기를 수확해요 위로 옮기기",
    });
    const sortUp = page.getByRole("button", {
      name: "상태가 좋은 딸기를 골라 상자에 담아요 위로 옮기기",
    });
    const truckUp = page.getByRole("button", {
      name: "트럭으로 가게까지 실어 나르세요 위로 옮기기",
    });
    for (let index = 0; index < 3; index += 1) await pressOn(page, farmUp);
    for (let index = 0; index < 2; index += 1) await pressOn(page, sortUp);
    await pressOn(page, truckUp);

    await expect(page.getByText("1. 생산 · 별빛 농원에서 딸기를 수확해요")).toBeVisible();
    await expect(page.getByText("4. 판매 · 가게 진열대에 놓고 팔아요")).toBeVisible();

    await pressOn(page, page.getByRole("button", { name: "연결 검사" }));
    await expect(page.getByText("연결 검사를 통과했어요")).toBeVisible();
    await pressOn(page, page.getByRole("button", { name: "기본 경로 보기" }));
    await expect(page.getByRole("rowheader", { name: "합계" })).toBeVisible();
    await pressOn(page, page.getByRole("button", { name: "판단하기" }));
    const evidence = page.getByRole("checkbox", { name: /생산한 다음에 골라 담고/ });
    await evidence.focus();
    await page.keyboard.press("Space");
    await expect(evidence).toBeChecked();
    await pressOn(page, page.getByRole("button", { name: "판단 기록하기" }));

    await expect(page.getByRole("heading", { level: 1 })).toContainText("유통 기록");
    await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  });
});
