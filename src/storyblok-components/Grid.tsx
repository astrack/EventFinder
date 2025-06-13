import { storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Grid({ blok }: any) {
  return (
    <div {...storyblokEditable(blok)} className="grid gap-6 md:grid-cols-3">
      {blok.columns?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (nestedBlok: any) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        )
      )}
    </div>
  );
}
