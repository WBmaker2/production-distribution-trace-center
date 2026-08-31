import { expect, type Page, test } from "@playwright/test";

const STRAWBERRY = [
  "별빛 농원에서 딸기를 수확해요",
  "상태가 좋은 딸기를 골라 상자에 담아요",
  "트럭으로 가게까지 실어 나르세요",
  "가게 진열대에 놓고 팔아요",
];

const NOTEBOOK_A = [
  "재생 종이 원료를 모아요",
  "공장에서 공책을 만들어요",
  "창고 A에 하루 동안 쌓아요",
  "문구점 진열대에 놓아요",
];

const NOTEBOOK_B = [
  "재생 종이 원료를 모아요",
  "공장에서 공책을 만들어요",
  "창고 B에 저렴하게 오래 쌓아요",
  "문구점 진열대에 놓아요",
];

const DELAY = [
  "공장에서 상품을 실어 보내요",
  "트럭이 다리를 지나 가요",
  "가게에 상품을 내려놓아요",
];

const PACKAGE_SMALL = [
  "공장에서 달빛 과자를 만들어요",
  "작은 상자 여러 개로 나눠 담아요",
  "작은 상자를 두 번 나눠 실어 나르세요",
  "가게에 상자를 내려놓아요",
];

const STORE_NEAR = [
  "마을 농장에서 채소 상자를 만들어요",
  "근처 상점까지 가까운 길로 가요",
  "근처 상점 진열대에 놓아요",
  "손님이 상품을 사서 써요",
];

const MISSING = [
  "공장에서 완제품을 만들어요",
  "운송 회사가 상품을 실어요",
  "가게에 도착해 팔려요",
];

async function startApp(page: Page) {
  await page.goto("./");
  await page.getByRole("button", { name: "경로 추적하기" }).click();
}

async function assembleCards(page: Page, cards: readonly string[]) {
  for (const label of cards) {
    await page.getByRole("button", { name: `경로에 넣기: ${label}` }).click();
  }
}

async function assembleAndCheck(page: Page, cards: readonly string[]) {
  await page.getByRole("button", { name: "단계 배열하기" }).click();
  await assembleCards(page, cards);
  await page.getByRole("button", { name: "연결 검사" }).click();
  await expect(page.getByText("연결 검사를 통과했어요")).toBeVisible();
  await page.getByRole("button", { name: "기본 경로 보기" }).click();
}

async function decideAccepted(page: Page, evidence: readonly RegExp[]) {
  await page.getByRole("button", { name: "판단하기" }).click();
  for (const label of evidence) {
    await page.getByRole("checkbox", { name: label }).check();
  }
  await page.getByRole("button", { name: "판단 기록하기" }).click();
  await expect(page.getByText(/근거와 함께 경로를 기록했어요/).first()).toBeVisible();
}

async function nextMission(page: Page) {
  await page.getByRole("button", { name: "다음 미션 보기" }).click();
  await page.getByRole("button", { name: "단계 배열하기" }).waitFor();
}

async function keepConditionAndDecide(page: Page, evidence: readonly RegExp[]) {
  await page.getByRole("button", { name: "조건 바꾸기" }).click();
  await page.getByRole("radio", { name: "조건을 바꾸지 않고 그대로 유지" }).check();
  await page.getByRole("button", { name: "전후 비교 확인" }).click();
  await page.getByRole("button", { name: "판단하기" }).click();
  for (const label of evidence) {
    await page.getByRole("checkbox", { name: label }).check();
  }
  await page.getByRole("button", { name: "판단 기록하기" }).click();
  await expect(page.getByText(/근거와 함께 경로를 기록했어요/).first()).toBeVisible();
}

test.describe("학습자 흐름", () => {
  test("딸기 안내 미션: 배열 → 기본 경로 → 판단 → 유통 기록", async ({ page }) => {
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("생산·유통 경로 추적소");
    await startApp(page);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("별빛 딸기 상자");
    await assembleAndCheck(page, STRAWBERRY);
    await expect(page.getByRole("rowheader", { name: "합계" })).toBeVisible();
    await decideAccepted(page, [/생산한 다음에 골라 담고/]);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("유통 기록");
    await expect(page.getByText("최초 판단", { exact: true })).toBeVisible();
  });

  test("공책 미션의 두 유효 창고 경로를 각각 완료한다", async ({ browser }) => {
    for (const cards of [NOTEBOOK_A, NOTEBOOK_B]) {
      const context = await browser.newContext();
      const page = await context.newPage();
      await startApp(page);
      await assembleAndCheck(page, STRAWBERRY);
      await decideAccepted(page, [/생산한 다음에 골라 담고/]);
      await nextMission(page);
      await assembleAndCheck(page, cards);
      await decideAccepted(page, [/창고 A는 시간·손실 토큰이 적고/]);
      await expect(page.getByRole("heading", { level: 1 })).toContainText("유통 기록");
      await context.close();
    }
  });

  test("지연 조건을 바꾸고 뒤 단계 총시간 변화를 확인한다", async ({ page }) => {
    await startApp(page);
    await assembleAndCheck(page, STRAWBERRY);
    await decideAccepted(page, [/생산한 다음에 골라 담고/]);
    await nextMission(page);
    await assembleAndCheck(page, NOTEBOOK_A);
      await decideAccepted(page, [/창고 A는 시간·손실 토큰이 적고/]);
    await nextMission(page);
    await assembleAndCheck(page, DELAY);
    await expect(page.getByText("자료 없음").first()).toBeVisible();
    await page.getByRole("button", { name: "조건 바꾸기" }).click();
    await page.getByRole("radio", { name: /다리 점검/ }).check();
    await page.getByRole("button", { name: "전후 비교 확인" }).click();
    await expect(page.getByText("+3")).toBeVisible();
    await page.getByRole("button", { name: "판단하기" }).click();
    await page.getByRole("checkbox", { name: /총시간 토큰이 3 늘었어요/ }).check();
    await page.getByRole("checkbox", { name: /자료 없음으로 남아요/ }).check();
    await page.getByRole("button", { name: "판단 기록하기" }).click();
    await expect(page.getByText(/근거와 함께 경로를 기록했어요/).first()).toBeVisible();
  });

  test("정보 부족 미션: 잘못된 자료는 거부되고 운송비 자료 요청만 통과한다", async ({ page }) => {
    await startApp(page);
    await assembleAndCheck(page, STRAWBERRY);
    await decideAccepted(page, [/생산한 다음에 골라 담고/]);
    await nextMission(page);
    await assembleAndCheck(page, NOTEBOOK_A);
    await decideAccepted(page, [/창고 A는 시간·손실 토큰이 적고/]);
    await nextMission(page);
    await assembleAndCheck(page, DELAY);
    await page.getByRole("button", { name: "조건 바꾸기" }).click();
    await page.getByRole("radio", { name: /다리 점검/ }).check();
    await page.getByRole("button", { name: "전후 비교 확인" }).click();
    await page.getByRole("button", { name: "판단하기" }).click();
    await page.getByRole("checkbox", { name: /총시간 토큰이 3 늘었어요/ }).check();
    await page.getByRole("checkbox", { name: /자료 없음으로 남아요/ }).check();
    await page.getByRole("button", { name: "판단 기록하기" }).click();
    await nextMission(page);
    await assembleAndCheck(page, PACKAGE_SMALL);
    await keepConditionAndDecide(page, [/손실 토큰이 2에서 0으로 줄어요/, /시간 토큰은 5→7/]);
    await nextMission(page);
    await assembleAndCheck(page, STORE_NEAR);
    await keepConditionAndDecide(page, [/근처 상점은 시간 토큰/, /먼 시장은 비용 토큰/]);
    await nextMission(page);
    await assembleAndCheck(page, MISSING);
    await page.getByRole("button", { name: "판단하기" }).click();
    await page.getByRole("checkbox", { name: "날씨 기록 자료" }).check();
    await page.getByRole("button", { name: "판단 기록하기" }).click();
    await expect(page.getByText("아직 목표와 근거가 맞지 않아요")).toBeVisible();
    await page.getByRole("button", { name: "한 번 다시 정하기" }).click();
    // 수정 단계에서는 이미 경로 조립 화면이고 이전 경로가 보존되어 있다.
    await page.getByRole("button", { name: "다시 만들기" }).click();
    await assembleCards(page, MISSING);
    await page.getByRole("button", { name: "연결 검사" }).click();
    await expect(page.getByText("연결 검사를 통과했어요")).toBeVisible();
    await page.getByRole("button", { name: "기본 경로 보기" }).click();
    await page.getByRole("button", { name: "판단하기" }).click();
    await page.getByRole("checkbox", { name: "운송비 자료" }).check();
    await page.getByRole("button", { name: "판단 기록하기" }).click();
    await expect(page.getByText(/근거와 함께 경로를 기록했어요/).first()).toBeVisible();
    await page.getByRole("button", { name: "모든 미션 끝내기" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("전체 미션 · 학습 마무리");
    await expect(page.getByRole("heading", { level: 2, name: "모든 경로를 살펴봤어요" })).toBeVisible();
    await expect(page.getByText(/주변 상품 하나를 골라/)).toBeVisible();
    await expect(page.getByText("다시 정한 결과", { exact: true })).toBeVisible();
  });
});
