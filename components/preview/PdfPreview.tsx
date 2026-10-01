"use client";

import { useEffect, useRef, useState } from "react";
import type { PDFDocumentLoadingTask } from "pdfjs-dist";

let pdfjsPromise: Promise<typeof import("pdfjs-dist")> | null = null;
function getPdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = import("pdfjs-dist").then((m) => {
      m.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
      return m;
    });
  }
  return pdfjsPromise;
}

export default function PdfPreview({ blob, zoom = 1 }: { blob: Blob | null; zoom?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(0);
  const [width, setWidth] = useState(0);
  const generation = useRef(0);
  const taskRef = useRef<PDFDocumentLoadingTask | null>(null);

  // Track available width so pages always fit the desk.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!blob || width === 0) return;
    const gen = ++generation.current;
    let cancelled = false;

    (async () => {
      const pdfjs = await getPdfjs();
      const buf = await blob.arrayBuffer();
      if (cancelled || gen !== generation.current) return;
      const task = pdfjs.getDocument({ data: buf });
      const doc = await task.promise;
      if (cancelled || gen !== generation.current) {
        task.destroy();
        return;
      }
      const previous = taskRef.current;
      taskRef.current = task;
      if (previous && previous !== task) previous.destroy();
      setPageCount(doc.numPages);

      const container = containerRef.current;
      if (!container) return;
      const targetWidth = Math.min(width, 820) * zoom;
      const dpr = Math.min(window.devicePixelRatio || 1, 2.5);

      for (let i = 1; i <= doc.numPages; i++) {
        if (gen !== generation.current) return;
        const page = await doc.getPage(i);
        const vp1 = page.getViewport({ scale: 1 });
        const scale = (targetWidth / vp1.width) * dpr;
        const vp = page.getViewport({ scale });

        const off = document.createElement("canvas");
        off.width = Math.floor(vp.width);
        off.height = Math.floor(vp.height);
        const ctx = off.getContext("2d");
        if (!ctx) continue;
        await page.render({ canvas: off, canvasContext: ctx, viewport: vp }).promise;
        if (gen !== generation.current) return;

        const visible = container.querySelector<HTMLCanvasElement>(`canvas[data-page="${i}"]`);
        if (visible) {
          visible.width = off.width;
          visible.height = off.height;
          visible.style.width = `${Math.floor(vp.width / dpr)}px`;
          visible.style.height = `${Math.floor(vp.height / dpr)}px`;
          const vctx = visible.getContext("2d");
          vctx?.drawImage(off, 0, 0);
        }
      }
    })().catch(() => {
      // render cancelled or failed; the previous frame stays on screen
    });

    return () => {
      cancelled = true;
    };
  }, [blob, width, zoom, pageCount]);

  return (
    <div ref={containerRef} className="flex w-full flex-col items-center gap-6">
      {Array.from({ length: Math.max(pageCount, 1) }, (_, i) => (
        <canvas
          key={i}
          data-page={i + 1}
          className="rounded-[3px] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.5),0_12px_40px_-8px_rgba(0,0,0,0.6)]"
          aria-label={`Resume page ${i + 1}`}
        />
      ))}
    </div>
  );
}
