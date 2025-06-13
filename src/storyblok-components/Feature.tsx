import { storyblokEditable } from "@storyblok/react/rsc";
import type { FeatureBlok } from "@/lib/storyblok-types";

export default function Feature({ blok }: { blok: FeatureBlok }) {
  return (
    <div {...storyblokEditable(blok)} className="py-4 text-center">
      <h3 className="text-lg font-semibold">{blok.name}</h3>
    </div>
  );
}
