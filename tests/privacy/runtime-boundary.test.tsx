import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "../../src/app/App";

const networkCalls: string[] = [];
let cookieWrites = 0;
let storageWrites: string[] = [];
let indexedDbOpens = 0;

describe("런타임 경계 — 네트워크와 저장 금지", () => {
  beforeEach(() => {
    networkCalls.length = 0;
    cookieWrites = 0;
    storageWrites = [];
    indexedDbOpens = 0;

    vi.stubGlobal(
      "fetch",
      vi.fn((input: unknown) => {
        networkCalls.push(`fetch:${String(input)}`);
        return Promise.reject(new Error("network disabled"));
      }),
    );
    class FakeXHR {
      open(_method: string, url: string) {
        networkCalls.push(`xhr:${url}`);
      }
      send() {}
      setRequestHeader() {}
      addEventListener() {}
    }
    vi.stubGlobal("XMLHttpRequest", FakeXHR);
    vi.stubGlobal(
      "WebSocket",
      class {
        constructor(url: string) {
          networkCalls.push(`ws:${url}`);
        }
      },
    );
    vi.stubGlobal(
      "EventSource",
      class {
        constructor(url: string) {
          networkCalls.push(`es:${url}`);
        }
      },
    );
    vi.stubGlobal("navigator", {
      ...window.navigator,
      sendBeacon: (url: string) => {
        networkCalls.push(`beacon:${url}`);
        return true;
      },
    });

    const setItem = Storage.prototype.setItem;
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(
      function (this: Storage, key: string, value: string) {
        storageWrites.push(`${key}=${String(value)}`);
        return setItem.call(this, key, value);
      },
    );
    Object.defineProperty(document, "cookie", {
      configurable: true,
      get: () => "",
      set: () => {
        cookieWrites += 1;
      },
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    Reflect.deleteProperty(document, "cookie");
  });

  it("딸기 미션 전체를 진행하는 동안 외부 네트워크 호출이 0건이다", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "경로 추적하기" }));
    await user.click(screen.getByRole("button", { name: "단계 배열하기" }));
    for (const label of [
      "별빛 농원에서 딸기를 수확해요",
      "상태가 좋은 딸기를 골라 상자에 담아요",
      "트럭으로 가게까지 실어 나르세요",
      "가게 진열대에 놓고 팔아요",
    ]) {
      await user.click(screen.getByRole("button", { name: `경로에 넣기: ${label}` }));
    }
    await user.click(screen.getByRole("button", { name: "연결 검사" }));
    await user.click(screen.getByRole("button", { name: "기본 경로 보기" }));
    await user.click(screen.getByRole("button", { name: "판단하기" }));
    await user.click(
      screen.getByRole("checkbox", { name: /생산한 다음에 골라 담고/ }),
    );
    await user.click(screen.getByRole("button", { name: "판단 기록하기" }));
    expect(screen.getByText(/근거와 함께 경로를 기록했어요/)).toBeInTheDocument();
    expect(networkCalls).toEqual([]);
  });

  it("지연 조건을 바꾸는 동안에도 네트워크와 저장 호출이 0건이다", async () => {
    const user = userEvent.setup();
    render(<App />);
    for (let mission = 0; mission < 3; mission += 1) {
      if (mission > 0) {
        await user.click(screen.getByRole("button", { name: "다음 미션 보기" }));
      }
      if (mission === 0) {
        await user.click(screen.getByRole("button", { name: "경로 추적하기" }));
      }
      await user.click(screen.getByRole("button", { name: "단계 배열하기" }));
      const cards: readonly string[] =
        mission === 0
          ? [
              "별빛 농원에서 딸기를 수확해요",
              "상태가 좋은 딸기를 골라 상자에 담아요",
              "트럭으로 가게까지 실어 나르세요",
              "가게 진열대에 놓고 팔아요",
            ]
          : mission === 1
            ? [
                "재생 종이 원료를 모아요",
                "공장에서 공책을 만들어요",
                "창고 A에 하루 동안 쌓아요",
                "문구점 진열대에 놓아요",
              ]
            : [
                "공장에서 상품을 실어 보내요",
                "트럭이 다리를 지나 가요",
                "가게에 상품을 내려놓아요",
              ];
      for (const label of cards) {
        await user.click(screen.getByRole("button", { name: `경로에 넣기: ${label}` }));
      }
      await user.click(screen.getByRole("button", { name: "연결 검사" }));
      await user.click(screen.getByRole("button", { name: "기본 경로 보기" }));
      if (mission === 2) {
        await user.click(screen.getByRole("button", { name: "조건 바꾸기" }));
        await user.click(screen.getByRole("radio", { name: /다리 점검/ }));
        await user.click(screen.getByRole("button", { name: "전후 비교 확인" }));
        await user.click(screen.getByRole("button", { name: "판단하기" }));
        await user.click(screen.getByRole("checkbox", { name: /총시간 토큰이 3 늘었어요/ }));
        await user.click(screen.getByRole("checkbox", { name: /자료 없음으로 남아요/ }));
      } else if (mission === 0) {
        await user.click(screen.getByRole("button", { name: "판단하기" }));
        await user.click(screen.getByRole("checkbox", { name: /생산한 다음에 골라 담고/ }));
      } else {
        await user.click(screen.getByRole("button", { name: "판단하기" }));
        await user.click(screen.getByRole("checkbox", { name: /창고 A는 시간·손실 토큰이 적고/ }));
      }
      await user.click(screen.getByRole("button", { name: "판단 기록하기" }));
    }
    expect(networkCalls).toEqual([]);
    expect(storageWrites).toEqual([]);
    expect(cookieWrites).toBe(0);
    expect(indexedDbOpens).toBe(0);
    expect(window.indexedDB).toBeUndefined();
  });
});
