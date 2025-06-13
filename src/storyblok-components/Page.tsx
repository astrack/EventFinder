import {
  StoryblokServerComponent,
  storyblokEditable,
  SbBlokData,
} from "@storyblok/react/rsc";
import type { PageBlok } from "@/lib/storyblok-types";

export default function Page({ blok }: { blok: PageBlok }) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map((nestedBlok: SbBlokData) => (
        <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
