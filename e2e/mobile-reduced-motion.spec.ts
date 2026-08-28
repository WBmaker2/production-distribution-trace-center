import { expect, test } from "@playwright/test";

async function horizontalOverflow(page: import("@playwright/test").Page): Promise<number> {
  return page.evaluate(() => {
    return document.documentElement.scrollWidth - document.documentElement.clientWidth;
  });
}

test.describe("모바일 화면과 축소 모션", () => {
  test("320px와 375px에서 가로 넘침이 없다", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 568 });
    await page.goto("./");
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);

    await page.getByRole("button", { name: "경로 추적하기" }).click();
    await page.getByRole("button", { name: "단계 배열하기" }).click();
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);

    for (const label of [
      "별빛 농원에서 딸기를 수확해요",
      "상태가 좋은 딸기를 골라 상자에 담아요",
      "트럭으로 가게까지 실어 나르세요",
      "가게 진열대에 놓고 팔아요",
    ]) {
      await page.getByRole("button", { name: `경로에 넣기: ${label}` }).click();
    }
    await page.getByRole("button", { name: "연결 검사" }).click();
    await page.getByRole("button", { name: "기본 경로 보기" }).click();
    expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
    // 경로표가 카드 행으로 바뀐다 (thead 숨김, data-label 라벨 표시)
    await expect(page.getByRole("rowheader", { name: "합계" })).toBeVisible();
    expect(await page.locator(".token-table thead").isVisible()).toBe(false);
    await expect(page.locator("td[data-label='시간 토큰']").first()).toBeVisible();
  });

  test("축소 모션에서 맥박 애니메이션이 제거되고 3px 고정 외곽선으로 대체된다", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("./");
    const pulse = page.getByRole("button", { name: "경로 추적하기" });
    await expect(pulse).toHaveCSS("animation-name", "none");
    await expect(pulse).toHaveCSS("outline-width", "3px");
  });

  test("모션 설정이 없으면 맥박 애니메이션이 유지된다", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("./");
    const pulse = page.getByRole("button", { name: "경로 추적하기" });
    await expect(pulse).toHaveCSS("animation-name", "gi-pulse-keyframes");
  });
});
