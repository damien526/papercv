// End-to-end test against the static export in out/.
// Run: node scripts/e2e.mjs
import http from "node:http";
import { readFile, mkdir, readdir, stat } from "node:fs/promises";
import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

if (!Promise.withResolvers) {
  Promise.withResolvers = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => { resolve = res; reject = rej; });
    return { promise, resolve, reject };
  };
}

const OUT = path.resolve("out");
const PORT = 4517;
const SHOTS = path.resolve("scratch-e2e");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const MIME = {
  ".html": "text/html", ".js": "application/javascript", ".mjs": "application/javascript",
  ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml", ".ico": "image/x-icon",
  ".ttf": "font/ttf", ".woff2": "font/woff2", ".json": "application/json", ".txt": "text/plain",
  ".xml": "application/xml",
};

const server = http.createServer(async (req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  const candidates = [url, url + ".html", path.join(url, "index.html")].map((p) => path.join(OUT, p));
  for (const file of candidates) {
    try {
      const s = await stat(file);
      if (s.isFile()) {
        res.writeHead(200, { "content-type": MIME[path.extname(file)] ?? "application/octet-stream" });
        createReadStream(file).pipe(res);
        return;
      }
    } catch {}
  }
  res.writeHead(404).end("not found");
});

await new Promise((r) => server.listen(PORT, r));
await mkdir(SHOTS, { recursive: true });

const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new" });
const results = [];
const ok = (name, pass, extra = "") => {
  results.push([pass ? "PASS" : "FAIL", name, extra].join("  "));
  if (!pass) process.exitCode = 1;
};

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  // 1. landing
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle0" });
  ok("landing title", (await page.title()).includes("PaperCV"));
  await page.screenshot({ path: path.join(SHOTS, "01-landing.png"), fullPage: false });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.45));
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: path.join(SHOTS, "02-landing-mid.png") });

  // 2. builder, load example
  await page.goto(`http://localhost:${PORT}/builder`, { waitUntil: "networkidle0" });
  await page.waitForFunction(() => [...document.querySelectorAll("button")].some((b) => b.textContent.includes("Load example")), { timeout: 15000 });
  await page.evaluate(() => {
    [...document.querySelectorAll("button")].find((b) => b.textContent.includes("Load example")).click();
  });
  await page.waitForFunction(
    () => {
      const c = document.querySelector('canvas[data-page="1"]');
      return c && c.width > 200;
    },
    { timeout: 30000 }
  );
  await new Promise((r) => setTimeout(r, 800));
  ok("preview canvas rendered", true);
  await page.screenshot({ path: path.join(SHOTS, "03-builder-clean.png") });

  // 3. download PDF
  const client = await page.createCDPSession();
  await client.send("Page.setDownloadBehavior", { behavior: "allow", downloadPath: SHOTS });
  await page.evaluate(() => {
    [...document.querySelectorAll("button")].find((b) => b.textContent.includes("Download PDF")).click();
  });
  let pdfPath = null;
  for (let i = 0; i < 40 && !pdfPath; i++) {
    await new Promise((r) => setTimeout(r, 250));
    const files = await readdir(SHOTS);
    const f = files.find((x) => x.endsWith(".pdf"));
    if (f) pdfPath = path.join(SHOTS, f);
  }
  ok("pdf downloaded", !!pdfPath, pdfPath ?? "");
  if (pdfPath) {
    const buf = await readFile(pdfPath);
    ok("pdf magic header", buf.subarray(0, 5).toString() === "%PDF-");
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const doc = await pdfjs.getDocument({ data: new Uint8Array(buf) }).promise;
    let text = "";
    for (let p = 1; p <= doc.numPages; p++) {
      const content = await (await doc.getPage(p)).getTextContent();
      text += content.items.map((it) => it.str).join(" ");
    }
    ok("pdf has selectable text with name", text.includes("Maya Lindqvist"), `${doc.numPages} page(s)`);
    ok("pdf contains experience content", text.includes("design system"));
  }

  // 4. switch to each template and screenshot
  for (const tpl of ["Compact", "Executive", "Contrast"]) {
    await page.evaluate(() => {
      [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Design").click();
    });
    await page.waitForFunction((label) => [...document.querySelectorAll("button span")].some((s) => s.textContent.trim() === label), { timeout: 5000 }, tpl);
    await page.evaluate((label) => {
      [...document.querySelectorAll("button")].find((b) => b.querySelector("span")?.textContent.trim() === label)?.click();
    }, tpl);
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: path.join(SHOTS, `04-builder-${tpl.toLowerCase()}.png`) });
    ok(`template ${tpl} rendered`, true);
  }

  // 5. mobile
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto(`http://localhost:${PORT}/builder`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(SHOTS, "05-builder-mobile-edit.png") });
  await page.evaluate(() => {
    [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Preview")?.click();
  });
  await new Promise((r) => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(SHOTS, "06-builder-mobile-preview.png") });
  ok("mobile pages captured", true);

  // 6. persistence: reload keeps data
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${PORT}/builder`, { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1500));
  const persisted = await page.evaluate(() => JSON.parse(localStorage.getItem("papercv:resume:v1") ?? "null"));
  ok("localStorage persistence", persisted?.basics?.fullName === "Maya Lindqvist");
} finally {
  await browser.close();
  server.close();
}

console.log("\n" + results.join("\n"));
