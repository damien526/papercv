"use client";

import { pdf } from "@react-pdf/renderer";
import { ResumeData } from "../resume/types";
import { registerFonts } from "./fonts";
import { ResumeDocument } from "./document";

export async function renderResumeBlob(data: ResumeData): Promise<Blob> {
  registerFonts();
  return pdf(<ResumeDocument data={data} />).toBlob();
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export function resumeFilename(data: ResumeData): string {
  const name = data.basics.fullName.trim();
  if (!name) return "resume.pdf";
  return (
    name
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .toLowerCase() + "-resume.pdf"
  );
}
