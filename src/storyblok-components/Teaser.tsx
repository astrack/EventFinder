import { storyblokEditable } from "@storyblok/react/rsc";
import type { TeaserBlok } from "@/lib/storyblok-types";

export default function Teaser({ blok }: { blok: TeaserBlok }) {
  return (
    <h2 {...storyblokEditable(blok)} className="my-4 text-2xl font-semibold">
      {blok.headline}
    </h2>
  );
}
