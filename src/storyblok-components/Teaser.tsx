import { storyblokEditable } from "@storyblok/react/rsc";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Teaser({ blok }: any) {
  return (
    <h2 {...storyblokEditable(blok)} className="my-4 text-2xl font-semibold">
      {blok.headline}
    </h2>
  );
}
