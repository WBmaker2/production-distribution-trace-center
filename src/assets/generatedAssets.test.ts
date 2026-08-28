import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const GENERATED_DIR = join("src", "assets", "generated");
const LEDGER_PATH = join("docs", "image-rights-ledger.md");

function listGeneratedFiles(): string[] {
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const path = join(dir, entry);
      if (statSync(path).isDirectory()) {
        walk(path);
      } else {
        files.push(path.replaceAll("\\", "/"));
      }
    }
  };
  walk(GENERATED_DIR);
  return files.sort();
}

const ledger = readFileSync(LEDGER_PATH, "utf8");

describe("생성 자산과 권리 장부", () => {
  it("권리 장부와 생성 자산 파일이 1:1로 대응한다", () => {
    const ledgerPaths = [
      ...ledger.matchAll(/`src\/assets\/generated\/[^`]+`/g),
    ].map((match) => match[0].replaceAll("`", ""));
    expect(new Set(ledgerPaths)).toEqual(new Set(listGeneratedFiles()));
  });

  it("모든 장부 항목에 프롬프트·제작 방식·생성일·사용 위치가 적혀 있다", () => {
    const rows = ledger
      .split("\n")
      .filter((line) => line.trim().startsWith("| `src/assets/generated/"));
    expect(rows.length).toBeGreaterThan(0);
    for (const row of rows) {
      const cells = row.split("|").map((cell) => cell.trim());
      expect(cells.length).toBeGreaterThanOrEqual(7);
      expect(cells[1] ?? "").toMatch(/^`src\/assets\/generated\//);
      expect((cells[2] ?? "").length).toBeGreaterThan(10);
      expect(cells[4] ?? "").toContain("2026-08-28");
      expect((cells[5] ?? "").length).toBeGreaterThan(3);
    }
  });

  it("자산 파일이 실제로 존재하고 비어 있지 않다", () => {
    for (const path of listGeneratedFiles()) {
      const size = statSync(path).size;
      expect(size).toBeGreaterThan(100);
    }
  });

  it("장부에 외부 핫링크나 라이선스 불명 출처가 없다", () => {
    expect(ledger).not.toMatch(/https?:\/\//);
    expect(ledger).toContain("오리지널");
  });
});

describe("모션 규칙", () => {
  const motion = readFileSync(join("src", "styles", "motion.css"), "utf8");

  it("축소 모션에서 gi-pulse의 animation-name을 none으로 바꾼다", () => {
    expect(motion).toContain("prefers-reduced-motion: reduce");
    expect(motion).toContain("animation-name: none");
  });

  it("gi-pulse는 소스에서 정확히 두 곳(입구·전후 비교)에만 쓰인다", () => {
    const filesWithPulse: string[] = [];
    const walk = (dir: string) => {
      for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) {
          walk(path);
        } else if (/\.tsx$/.test(entry)) {
          if (path.replaceAll("\\", "/").endsWith("src/components/ActionButton.tsx")) continue;
          if (readFileSync(path, "utf8").includes("pulse")) {
            filesWithPulse.push(path.replaceAll("\\", "/"));
          }
        }
      }
    };
    walk("src");
    expect(filesWithPulse.sort()).toEqual([
      "src/features/route-trace/EntranceScreen.tsx",
      "src/features/route-trace/RouteWorkbench.tsx",
    ]);
  });
});
