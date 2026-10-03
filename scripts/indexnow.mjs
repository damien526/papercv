// Pings IndexNow with every public URL. Run MANUALLY after a deploy that
// changes content: npm run indexnow
const HOST = "papercv.app";
const KEY = "cc7ab363c4a80c76f663895194866fe8";

const urls = [
  "",
  "/builder",
  "/templates",
  "/templates/clean",
  "/templates/compact",
  "/templates/executive",
  "/templates/contrast",
  "/free-resume-builder-no-sign-up",
  "/ats-friendly-resume",
  "/privacy",
  "/terms",
].map((p) => `https://${HOST}${p}`);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log("IndexNow:", res.status, res.statusText);
if (!res.ok) console.log(await res.text());
