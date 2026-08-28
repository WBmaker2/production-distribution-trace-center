import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const BASE = "/production-distribution-trace-center/";
const DIST = "dist";
const html = readFileSync(join(DIST, "index.html"), "utf8");

const assetRefs = [...html.matchAll(/(?:src|href)="(\/[^"]+)"/g)].map((match) => match[1]);

describe("배포 자산 검사 (npm run build 이후 실행)", () => {
  it("dist/index.html이 생성되어 있다", () => {
    expect(existsSync(join(DIST, "index.html"))).toBe(true);
  });

  it("모든 절대 참조가 Pages 하위 경로로 시작한다", () => {
    expect(assetRefs.length).toBeGreaterThan(0);
    for (const ref of assetRefs) {
      expect(ref.startsWith(BASE)).toBe(true);
    }
  });

  it("참조된 자산 파일이 실제로 존재한다", () => {
    for (const ref of assetRefs) {
      const relative = ref.slice(BASE.length);
      expect(existsSync(join(DIST, relative))).toBe(true);
    }
  });

  it("favicon이 존재하고 참조된다", () => {
    expect(html).toContain("favicon.svg");
    expect(existsSync(join(DIST, "favicon.svg"))).toBe(true);
  });

  it("생성 webp 자산이 번들에 포함되어 있다", () => {
    const assets = readdirSync(join(DIST, "assets"));
    expect(assets.some((name) => name.endsWith(".webp"))).toBe(true);
  });

  it("외부 http(s) 리소스 참조가 없다", () => {
    expect(html).not.toMatch(/https?:\/\//);
  });
});
