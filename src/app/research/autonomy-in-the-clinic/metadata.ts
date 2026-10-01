import { Metadata } from "next";
import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";

export async function generateMetadata(): Promise<Metadata> {
  return Meta.generate({
    title: "Autonomy in the Clinic: The Research Frontier of Agentic AI – Aayurt Shrestha",
    description: "Explores agentic evaluation frameworks in clinical settings: multi-subagent orchestration, deterministic AST verification gates, and human-in-the-loop oversight for autonomous diagnostic assistance. Proposes a three-layer pipeline architecture linking local inference (Ollama) to structured reasoning (Gemini 1.5 Pro) under deterministic guardrails.",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Autonomy in the Clinic: The Research Frontier of Agentic AI")}`,
    path: "/research/autonomy-in-the-clinic",
  });
}