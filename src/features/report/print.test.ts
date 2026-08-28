import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const CSS = readFileSync(join("src", "features", "report", "print.css"), "utf8");

describe("print.css 인쇄 규칙", () => {
  it("A4 세로 용지와 여백을 지정한다", () => {
    expect(CSS).toContain("@page");
    expect(CSS).toContain("A4 portrait");
  });

  it("인쇄물은 흰 배경과 검정 텍스트를 쓴다", () => {
    expect(CSS).toMatch(/background\s*:\s*#ffffff/);
    expect(CSS).toMatch(/color\s*:\s*#000000/);
  });

  it("제어 버튼과 머리말을 숨긴다", () => {
    expect(CSS).toContain(".no-print");
    expect(CSS).toContain("display: none");
  });

  it("이름 입력란이나 식별자를 넣지 않는다", () => {
    expect(CSS).not.toMatch(/이름|학생.*번호/);
  });
});
