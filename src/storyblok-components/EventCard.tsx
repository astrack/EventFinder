import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";
import type { EventCardBlok } from "@/lib/storyblok-types";

export default function EventCard({ blok }: { blok: EventCardBlok }) {
  return (
    <article
      {...storyblokEditable(blok)}
      className="w-80 rounded-xl overflow-hidden shadow transition hover:shadow-lg"
    >
      <Image
        src={blok.image.filename ?? `/placeholder.svg`}
        alt={blok.title}
        width={320}
        height={160}
        className="object-cover h-40 w-full"
      />
      <div className="p-4 space-y-1">
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
