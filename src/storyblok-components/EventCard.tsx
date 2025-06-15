"use client";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import { useEffect, useState } from "react";
import type { EventCardBlok } from "@/lib/storyblok-types";

export default function EventCard({ blok }: { blok: EventCardBlok }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedEvents") || "[]");
    setSaved(stored.some((e: EventCardBlok) => e._uid === blok._uid));
  }, [blok._uid]);

  function toggleSaved(e: React.MouseEvent) {
    e.stopPropagation();
    const stored = JSON.parse(localStorage.getItem("savedEvents") || "[]");
    if (saved) {
      const next = stored.filter((e: EventCardBlok) => e._uid !== blok._uid);
      localStorage.setItem("savedEvents", JSON.stringify(next));
      setSaved(false);
    } else {
      stored.push(blok);
      localStorage.setItem("savedEvents", JSON.stringify(stored));
      setSaved(true);
    }
  }

  return (
    <article
      {...storyblokEditable(blok)}
      className="w-80 rounded-xl overflow-hidden shadow transition hover:shadow-lg bg-white dark:bg-gray-800 cursor-pointer"
    >
      <Image
        src={blok.image.filename ?? `/placeholder.svg`}
        alt={blok.title}
        width={320}
        height={160}
        className="object-cover h-40 w-full"
      />
      <div className="p-4 space-y-1 relative">
        <button
          onClick={toggleSaved}
          aria-label="Save event"
          className="absolute top-2 right-2 text-white"
        >
          <span
            className={
              saved
                ? "i-lucide-bookmark w-5 h-5"
                : "i-lucide-bookmark w-5 h-5 opacity-50"
            }
          />
        </button>
        <span className="text-xs text-slate-500">{blok.start}</span>
        <h3 className="text-lg font-medium">{blok.title}</h3>
        <p className="text-sm text-slate-600">{blok.venue}</p>
        {blok.summary && (
          <p className="text-sm text-slate-700 mt-2">{blok.summary}</p>
        )}
        {blok.tags && blok.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {blok.tags.map((tag: string) => (
              <span
                key={tag}
                className="bg-slate-200 text-slate-600 text-xs rounded px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <span className="inline-block mt-2 bg-orange-500 text-white text-xs rounded px-2 py-0.5">
          {blok.price || "Free"}
        </span>
      </div>
    </article>
  );
}
