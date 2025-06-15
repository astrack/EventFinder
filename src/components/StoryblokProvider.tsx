"use client";
import { getStoryblokApi } from "@/lib/storyblok";

/**  Enables the Visual Editor bridge on the client */
export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  if (process.env.NEXT_PUBLIC_STORYBLOK_TOKEN || process.env.STORYBLOK_TOKEN) {
    getStoryblokApi(); // loads bridge once on the client
  }
  return children;
}
