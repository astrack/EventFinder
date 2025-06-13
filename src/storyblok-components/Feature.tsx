import { storyblokEditable } from "@storyblok/react/rsc";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Feature({ blok }: any) {
  return (
    <div {...storyblokEditable(blok)} className="py-4 text-center">
      <h3 className="text-lg font-semibold">{blok.name}</h3>
    </div>
  );
}
