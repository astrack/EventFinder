import {
  StoryblokServerComponent,
  storyblokEditable,
} from "@storyblok/react/rsc";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ blok }: any) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body?.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (nestedBlok: any) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        )
      )}
    </main>
  );
}
