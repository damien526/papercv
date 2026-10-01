# PaperCV

Free resume builder that runs entirely in the browser. No account, no watermark, no paywall at the download button; the resume never leaves the device.

Live: https://papercv.vercel.app

## How it works

- Next.js 16 (App Router, `output: "export"`: pure static site, no backend)
- Resume data lives in `localStorage`, with JSON export/import for backups
- PDF generated client-side with `@react-pdf/renderer` (4 templates, real text layer, embedded Inter + Source Serif 4)
- Live preview: the generated PDF blob is rasterized with `pdfjs-dist` onto canvases (true WYSIWYG, works on mobile)
- Tailwind CSS 4, Instrument Sans + Instrument Serif for the UI

## Develop

```bash
npm install
npm run dev        # dev server
npm run build      # static export to out/
node scripts/e2e.mjs    # end-to-end test (needs Chrome at the usual macOS path)
node scripts/assets.mjs # regenerate OG image + favicon
npm run indexnow   # ping IndexNow (run manually after content deploys)
```

## Structure

- `lib/resume/` data model, defaults, sample, localStorage
- `lib/pdf/` fonts, theme, the four PDF templates, blob rendering
- `components/Builder.tsx` the editor app (client-only)
- `components/preview/PdfPreview.tsx` pdf.js canvas preview
- `app/` landing + SEO pages (templates, ATS guide, no-sign-up, privacy)
