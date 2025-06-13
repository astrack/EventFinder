"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import type { FiltersDrawerBlok } from "@/lib/storyblok-types";

export default function FiltersDrawer({ blok }: { blok: FiltersDrawerBlok }) {
  return (
    <aside
      {...storyblokEditable(blok)}
      className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg p-6 space-y-6"
    >
      <h2 className="text-lg font-semibold">Filters</h2>
      {/* Date, category chips, price slider – read from blok fields */}
      <button className="w-full bg-primary-500 text-white py-2 rounded">
        Apply filters
      </button>
    </aside>
  );
}
