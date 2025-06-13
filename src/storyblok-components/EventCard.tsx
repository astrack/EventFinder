import Image from "next/image";
import { storyblokEditable } from "@storyblok/react/rsc";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EventCard({ blok }: any) {
  return (
    <article
      {...storyblokEditable(blok)}
      className="w-80 rounded-xl overflow-hidden shadow transition hover:shadow-lg"
    >
      <Image
        src={blok.image.filename ?? `/placeholder.jpg`}
        alt={blok.title}
        width={320}
        height={160}
        className="object-cover h-40 w-full"
      />
      <div className="p-4 space-y-1">
        <span className="text-xs text-slate-500">{blok.start}</span>
        <h3 className="text-lg font-medium">{blok.title}</h3>
        <p className="text-sm text-slate-600">{blok.venue}</p>
        <span className="inline-block mt-2 bg-orange-500 text-white text-xs rounded px-2 py-0.5">
          {blok.price || "Free"}
        </span>
      </div>
    </article>
  );
}
