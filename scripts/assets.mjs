// Generates public/og/home.png and public/favicon.ico from inline SVG.
// Run manually: node scripts/assets.mjs
import sharp from "sharp";
import pngToIco from "png-to-ico";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const iconSvg = readFileSync("app/icon.svg", "utf8");

// A miniature resume sheet, drawn as vector shapes.
function sheet(x, y, w, h, rot) {
  const lines = [];
  const pad = w * 0.11;
  const lw = w - pad * 2;
  lines.push(`<rect x="${pad}" y="${pad}" width="${lw * 0.55}" height="${h * 0.045}" rx="4" fill="#19191b"/>`);
  lines.push(`<rect x="${pad}" y="${pad + h * 0.07}" width="${lw * 0.35}" height="${h * 0.028}" rx="3" fill="#4360f5"/>`);
  lines.push(`<rect x="${pad}" y="${pad + h * 0.125}" width="${lw}" height="2.5" fill="#19191b" opacity="0.75"/>`);
  let yy = pad + h * 0.17;
  const rows = [
    [0.22, "#1e3a5f", 0.035], [1.0, "#aaacb4", 0.022], [0.86, "#aaacb4", 0.022], [0.94, "#aaacb4", 0.022],
    [0.3, "#1e3a5f", 0.035], [1.0, "#aaacb4", 0.022], [0.78, "#aaacb4", 0.022],
    [0.26, "#1e3a5f", 0.035], [0.92, "#aaacb4", 0.022], [0.64, "#aaacb4", 0.022],
  ];
  for (const [frac, color, hh] of rows) {
    const rh = h * hh;
    lines.push(`<rect x="${pad}" y="${yy}" width="${lw * frac}" height="${rh}" rx="${rh / 2}" fill="${color}"/>`);
    yy += rh + h * 0.028;
  }
  return `
  <g transform="translate(${x} ${y}) rotate(${rot})">
    <rect x="6" y="10" width="${w}" height="${h}" rx="6" fill="#000" opacity="0.28"/>
    <rect width="${w}" height="${h}" rx="6" fill="#fbfaf6"/>
    ${lines.join("\n")}
  </g>`;
}

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#101217"/>
  <circle cx="1050" cy="-80" r="420" fill="#4360f5" opacity="0.14"/>
  <circle cx="60" cy="700" r="300" fill="#4360f5" opacity="0.10"/>
  ${sheet(858, 96, 280, 384, 4)}
  <text x="92" y="150" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="46" fill="#fbfaf6">Paper<tspan font-style="normal" font-weight="bold">CV</tspan></text>
  <circle cx="268" cy="138" r="8" fill="#4360f5"/>
  <text x="90" y="284" font-family="Georgia, 'Times New Roman', serif" font-size="58" fill="#fbfaf6">The free resume builder</text>
  <text x="90" y="360" font-family="Georgia, 'Times New Roman', serif" font-size="58" fill="#fbfaf6">that <tspan font-style="italic" fill="#7389ff">stays</tspan> free at the</text>
  <text x="90" y="436" font-family="Georgia, 'Times New Roman', serif" font-size="58" fill="#fbfaf6">download button.</text>
  <text x="92" y="540" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#9b9fae">No account · No watermark · Runs in your browser</text>
</svg>`;

mkdirSync("public/og", { recursive: true });
await sharp(Buffer.from(og)).png().toFile("public/og/home.png");
console.log("og/home.png done");

const png32 = await sharp(Buffer.from(iconSvg)).resize(32, 32).ensureAlpha().png().toBuffer();
const png16 = await sharp(Buffer.from(iconSvg)).resize(16, 16).ensureAlpha().png().toBuffer();
const ico = await pngToIco([png16, png32]);
writeFileSync("public/favicon.ico", ico);
console.log("favicon.ico done");
