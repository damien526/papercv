import type { Metadata } from "next";
import BuilderShell from "@/components/BuilderShell";

export const metadata: Metadata = {
  title: "Resume Builder: Edit and Download Your PDF",
  description:
    "Write your resume, pick a template, and download the PDF. Free, no account, no watermark. Your resume is saved in your browser and never uploaded.",
  alternates: { canonical: "/builder" },
};

export default function BuilderPage() {
  return <BuilderShell />;
}
