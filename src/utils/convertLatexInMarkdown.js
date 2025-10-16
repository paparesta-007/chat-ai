// utils/convertLatexInMarkdown.js
import katex from "katex";
import "katex/dist/katex.min.css";

export default function convertLatexInMarkdown(text) {
  if (!text) return "";

  let processed = text;

  processed = processed.replace(
    /\$\$([^$]+)\$\$/g,
    (match, formula) => {
      try {
        return katex.renderToString(formula, {
          throwOnError: false,
          displayMode: true,
        });
      } catch (err) {
        console.error("Errore KaTeX:", err);
        return match; // fallback originale
      }
    }
  );

  // 2️⃣ Inline $...$
  processed = processed.replace(
    /\$([^$]+)\$/g,
    (match, formula) => {
      try {
        return katex.renderToString(formula, {
          throwOnError: false,
          displayMode: false,
        });
      } catch (err) {
        console.error("Errore KaTeX inline:", err);
        return match;
      }
    }
  );

  return processed;
}
