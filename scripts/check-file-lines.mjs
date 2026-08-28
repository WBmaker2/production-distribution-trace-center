import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["src", "tests"];
const LIMIT = 500;

function collectFiles(dir, files) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(path, files);
    } else if (/\.(ts|tsx|css)$/.test(entry.name)) {
      files.push(path);
    }
  }
}

const files = [];
for (const root of ROOTS) {
  try {
    statSync(root);
    collectFiles(root, files);
  } catch {
    // 아직 만들어지지 않은 루트는 건너뛴다.
  }
}

const violations = [];
for (const path of files) {
  const text = readFileSync(path, "utf8");
  const lineCount = text.length === 0 ? 0 : text.split("\n").length - (text.endsWith("\n") ? 1 : 0);
  if (lineCount >= LIMIT) {
    violations.push({ path, lineCount });
  }
}

if (violations.length > 0) {
  console.error(`check:lines 실패 — ${LIMIT}줄 이상인 파일이 ${violations.length}개 있습니다.`);
  for (const { path, lineCount } of violations) {
    console.error(`${relative(".", path)}: ${lineCount}줄 (한도 ${LIMIT}줄)`);
  }
  process.exit(1);
}

console.log(`check:lines 통과 — 검사한 파일 ${files.length}개, 모두 ${LIMIT}줄 미만입니다.`);
