# PaperCV: état et TODOs

Créé le 01/10/2026. 6e webtool du portefeuille (waveform, finance-sim, kiturgence, undercap, graphmint, papercv).

## Fait

- Builder complet: 4 templates PDF (Clean, Compact, Executive, Contrast), accents, sans/serif/mixed, densités, A4/Letter
- 100 % client-side: localStorage + export/import JSON, PDF généré sur l'appareil (texte réel sélectionnable)
- Landing + /templates (+4 pages), /ats-friendly-resume, /free-resume-builder-no-sign-up, /privacy
- JSON-LD (WebApplication, FAQPage, HowTo), sitemap, robots, llms.txt, OG image, favicon.ico (public/) + icon.svg
- Tests e2e Puppeteer verts (PDF téléchargé et parsé, 4 templates, mobile, persistance)
- Zéro em-dash (vérifié par grep)

## TODOs (dans l'ordre)

1. **Search Console + Bing Webmaster**: inscrire papercv.vercel.app, soumettre le sitemap
2. **IndexNow**: `npm run indexnow` après chaque déploiement qui change du contenu (clé cc7ab363c4a80c76f663895194866fe8, fichier déjà dans public/)
3. **Domaine custom** (papercv.app ? papercv.io ?) puis mettre à jour `lib/site.ts`, `scripts/indexnow.mjs` (HOST), régénérer et redéployer
4. **Cross-links**: ajouter PaperCV aux footers de undercap/graphmint/waveform
5. **Analytics**: activer Vercel Analytics (regarder les referrers avant toute conclusion, cf. leçon simulateur-epargne)
6. Monétisation plus tard (modèle annoncé sur la landing: extras optionnels, jamais de paywall au download). Pistes: templates premium, cover letters, réécriture IA des bullets
7. Idées produit v2: multi-CV, import PDF/LinkedIn, cover letter builder, pages SEO par métier ("software engineer resume template" etc. avec exemples pré-remplis chargés dans le builder via query param)

## Pièges connus

- Vercel: ne JAMAIS `vercel project add`; laisser `vercel deploy --prod` créer le projet; `vercel.json` a `outputDirectory: "out"`
- pdf.worker.min.mjs est copié dans public/ (depuis node_modules/pdfjs-dist/build) et doit suivre les montées de version de pdfjs-dist
- Node 20 local n'a pas Promise.withResolvers: le polyfill est dans scripts/e2e.mjs (le navigateur, lui, l'a)
- Polices PDF: TTF statiques dans public/fonts, enregistrées dans lib/pdf/fonts.ts; @react-pdf ne gère pas les TTF variables
