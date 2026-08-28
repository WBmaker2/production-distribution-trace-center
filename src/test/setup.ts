import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

type MinimalMediaQueryList = Pick<MediaQueryList, "matches" | "media">;

if (typeof window !== "undefined" && typeof window.matchMedia !== "function") {
  window.matchMedia = (query: string): MediaQueryList => {
    const result: MinimalMediaQueryList = { matches: false, media: query };
    return result as MediaQueryList;
  };
}
