import { Font } from "@react-pdf/renderer";

let registered = false;

export function registerFonts() {
  if (registered) return;
  registered = true;

  Font.register({
    family: "Inter",
    fonts: [
      { src: "/fonts/inter-v20-latin-regular.ttf", fontWeight: 400 },
      { src: "/fonts/inter-v20-latin-italic.ttf", fontWeight: 400, fontStyle: "italic" },
      { src: "/fonts/inter-v20-latin-500.ttf", fontWeight: 500 },
      { src: "/fonts/inter-v20-latin-600.ttf", fontWeight: 600 },
      { src: "/fonts/inter-v20-latin-700.ttf", fontWeight: 700 },
    ],
  });

  Font.register({
    family: "SourceSerif",
    fonts: [
      { src: "/fonts/source-serif-4-v14-latin-regular.ttf", fontWeight: 400 },
      { src: "/fonts/source-serif-4-v14-latin-italic.ttf", fontWeight: 400, fontStyle: "italic" },
      { src: "/fonts/source-serif-4-v14-latin-600.ttf", fontWeight: 600 },
      { src: "/fonts/source-serif-4-v14-latin-700.ttf", fontWeight: 700 },
    ],
  });

  // Resumes read better without hyphenated line breaks.
  Font.registerHyphenationCallback((word) => [word]);
}
