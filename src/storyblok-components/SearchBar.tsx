"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { useState } from "react";
import type { SearchBarBlok } from "@/lib/storyblok-types";

export default function SearchBar({ blok, onSearch }: { blok: SearchBarBlok; onSearch?: (q: string) => void }) {
  const [query, setQuery] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    onSearch?.(q);
  }

  return (
    <div {...storyblokEditable(blok)}>
      <input
        value={query}
        onChange={handleChange}
        placeholder={blok.placeholder || "Search"}
        className="w-full h-9 rounded-md border px-3 text-sm focus:outline-none"
      />
    </div>
  );
}
