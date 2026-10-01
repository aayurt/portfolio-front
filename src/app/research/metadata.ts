import { Metadata } from "next";
import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";

export async function generateMetadata(): Promise<Metadata> {
  return Meta.generate({
    title: "Research & Publications – Aayurt Shrestha",
    description: "Working papers, engineering dispatches, preprints, and system specifications on agentic AI, autonomous software engineering, and human-in-the-loop systems.",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Research & Publications – Aayurt Shrestha")}`,
    path: "/research",
  });
}