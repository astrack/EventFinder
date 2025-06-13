import {
  storyblokEditable,
  StoryblokServerComponent,
  SbBlokData,
} from "@storyblok/react/rsc";
import type { GridBlok } from "@/lib/storyblok-types";

export default function Grid({ blok }: { blok: GridBlok }) {
  return (
    <div {...storyblokEditable(blok)} className="grid gap-6 md:grid-cols-3">
      {blok.columns?.map((nestedBlok: SbBlokData) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </div>
  );
}
