/**
 * 생성 자산 파이프라인: 오리지널 SVG 일러스트를 webp로 변환한다.
 * 외부 이미지·핫링크·실제 상표·실제 지도를 사용하지 않고, 이미지 안에 글자를 넣지 않는다.
 * 실행: node scripts/build-assets.mjs
 */
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";

const OUT_ROOT = join("src", "assets", "generated");

const PALETTE = {
  skyTop: "#dbeafe",
  skyBottom: "#eff6ff",
  hill: "#bbf7d0",
  hillDark: "#86efac",
  field: "#fde68a",
  road: "#e2e8f0",
  ink: "#1c2733",
  primary: "#1d4ed8",
  red: "#ef4444",
  redDark: "#b91c1c",
  leaf: "#16a34a",
  wood: "#d9a066",
  woodDark: "#a8703f",
  white: "#ffffff",
  gray: "#94a3b8",
};

function sceneSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${PALETTE.skyTop}"/>
      <stop offset="1" stop-color="${PALETTE.skyBottom}"/>
    </linearGradient>
  </defs>
  <rect width="800" height="450" fill="url(#sky)"/>
  <circle cx="700" cy="70" r="38" fill="#fde68a"/>
  <circle cx="150" cy="80" r="24" fill="#ffffff" opacity="0.9"/>
  <circle cx="200" cy="88" r="18" fill="#ffffff" opacity="0.9"/>
  <path d="M0 260 Q200 210 400 250 T800 240 V450 H0 Z" fill="${PALETTE.hill}"/>
  <path d="M0 320 Q250 280 500 310 T800 300 V450 H0 Z" fill="${PALETTE.hillDark}"/>
  <rect x="0" y="360" width="800" height="90" fill="${PALETTE.field}"/>
  <rect x="60" y="300" width="120" height="70" rx="8" fill="${PALETTE.red}"/>
  <path d="M60 300 h120 l-14 -22 h-92 Z" fill="${PALETTE.redDark}"/>
  <g fill="${PALETTE.leaf}">
    <circle cx="100" cy="290" r="9"/>
    <circle cx="130" cy="286" r="9"/>
    <circle cx="160" cy="290" r="9"/>
  </g>
  <rect x="250" y="240" width="150" height="120" rx="10" fill="${PALETTE.white}" stroke="${PALETTE.gray}" stroke-width="4"/>
  <path d="M244 246 L325 190 L406 246 Z" fill="${PALETTE.primary}"/>
  <rect x="280" y="290" width="34" height="40" rx="4" fill="${PALETTE.skyTop}"/>
  <rect x="330" y="290" width="34" height="40" rx="4" fill="${PALETTE.skyTop}"/>
  <rect x="0" y="382" width="800" height="44" fill="${PALETTE.road}"/>
  <path d="M20 404 H780" stroke="${PALETTE.white}" stroke-width="4" stroke-dasharray="26 18"/>
  <g>
    <rect x="470" y="330" width="120" height="58" rx="10" fill="${PALETTE.primary}"/>
    <rect x="560" y="344" width="52" height="44" rx="8" fill="#93c5fd"/>
    <circle cx="498" cy="394" r="15" fill="${PALETTE.ink}"/>
    <circle cx="570" cy="394" r="15" fill="${PALETTE.ink}"/>
    <circle cx="498" cy="394" r="6" fill="${PALETTE.white}"/>
    <circle cx="570" cy="394" r="6" fill="${PALETTE.white}"/>
    <rect x="452" y="348" width="24" height="34" rx="4" fill="${PALETTE.red}"/>
  </g>
  <g>
    <rect x="640" y="300" width="130" height="90" rx="10" fill="${PALETTE.wood}"/>
    <path d="M632 306 L705 258 L778 306 Z" fill="${PALETTE.woodDark}"/>
    <rect x="672" y="334" width="66" height="56" rx="6" fill="${PALETTE.skyTop}"/>
    <rect x="698" y="352" width="14" height="38" fill="${PALETTE.woodDark}"/>
  </g>
  <g stroke="${PALETTE.primary}" stroke-width="6" stroke-linecap="round" stroke-dasharray="2 16" fill="none" opacity="0.85">
    <path d="M180 340 Q320 300 440 350 T660 300"/>
  </g>
</svg>`;
}

function goodsSvg({ boxColor, boxDark, fruit, leaf }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#eef3fa"/>
  <ellipse cx="200" cy="262" rx="150" ry="16" fill="#dbe4ef"/>
  <path d="M90 150 L200 120 L310 150 L310 240 Q200 262 90 240 Z" fill="${boxColor}"/>
  <path d="M90 150 L200 178 L310 150 L310 240 Q200 262 90 240 Z" fill="${boxDark}" opacity="0.35"/>
  <path d="M90 150 L200 178 L310 150 L200 122 Z" fill="${boxDark}"/>
  <g>
    <circle cx="150" cy="120" r="26" fill="${fruit}"/>
    <circle cx="205" cy="106" r="24" fill="${fruit}"/>
    <circle cx="256" cy="122" r="25" fill="${fruit}"/>
    <g fill="${leaf}">
      <ellipse cx="144" cy="96" rx="12" ry="7"/>
      <ellipse cx="158" cy="98" rx="12" ry="7"/>
      <ellipse cx="200" cy="84" rx="12" ry="7"/>
      <ellipse cx="212" cy="86" rx="12" ry="7"/>
      <ellipse cx="250" cy="100" rx="12" ry="7"/>
      <ellipse cx="263" cy="102" rx="12" ry="7"/>
    </g>
  </g>
</svg>`;
}

function notebookSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#eef3fa"/>
  <ellipse cx="200" cy="262" rx="140" ry="14" fill="#dbe4ef"/>
  <rect x="110" y="60" width="200" height="190" rx="14" fill="#166534"/>
  <rect x="126" y="60" width="14" height="190" fill="#14532d"/>
  <g fill="#dcfce7">
    <path d="M215 108 c34 0 54 20 54 46 c-26 4 -50 -8 -54 -46 Z"/>
    <path d="M215 108 c0 38 -24 50 -50 46 c4 -26 24 -46 50 -46 Z" opacity="0.85"/>
  </g>
  <g stroke="#ffffff" stroke-width="6" stroke-linecap="round">
    <path d="M150 130 h40"/>
    <path d="M150 158 h58"/>
    <path d="M150 186 h46"/>
  </g>
</svg>`;
}

function packageSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <rect width="400" height="300" fill="#eef3fa"/>
  <ellipse cx="200" cy="264" rx="150" ry="14" fill="#dbe4ef"/>
  <g>
    <rect x="96" y="120" width="130" height="110" rx="10" fill="${PALETTE.wood}"/>
    <path d="M96 120 l20 -22 h130 l-20 22 Z" fill="${PALETTE.woodDark}"/>
    <path d="M226 120 l20 -22 v110 l-20 22 Z" fill="#b9834f"/>
    <rect x="141" y="150" width="40" height="10" rx="4" fill="${PALETTE.woodDark}"/>
  </g>
  <g>
    <rect x="240" y="180" width="74" height="62" rx="8" fill="${PALETTE.wood}"/>
    <path d="M240 180 l14 -16 h74 l-14 16 Z" fill="${PALETTE.woodDark}"/>
    <rect x="264" y="204" width="26" height="8" rx="4" fill="${PALETTE.woodDark}"/>
    <rect x="252" y="120" width="46" height="40" rx="6" fill="${PALETTE.wood}"/>
    <path d="M252 120 l10 -12 h46 l-10 12 Z" fill="${PALETTE.woodDark}"/>
  </g>
</svg>`;
}

const TARGETS = [
  { out: join(OUT_ROOT, "fictional-goods-route-map.webp"), svg: sceneSvg(), width: 800 },
  { out: join(OUT_ROOT, "goods", "strawberry-box.webp"), svg: goodsSvg({ boxColor: "#e8b04b", boxDark: "#c58a2e", fruit: "#ef4444", leaf: "#16a34a" }), width: 400 },
  { out: join(OUT_ROOT, "goods", "notebook.webp"), svg: notebookSvg(), width: 400 },
  { out: join(OUT_ROOT, "goods", "package-box.webp"), svg: packageSvg(), width: 400 },
];

for (const target of TARGETS) {
  mkdirSync(dirname(target.out), { recursive: true });
  await sharp(Buffer.from(target.svg), { density: 144 })
    .resize({ width: target.width })
    .webp({ quality: 88 })
    .toFile(target.out);
  console.log(`generated: ${target.out}`);
}
