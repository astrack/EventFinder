"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { NavbarBlok } from "@/lib/storyblok-types";

export default function Navbar({ blok }: { blok: NavbarBlok }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") === "dark";
    setDark(stored);
    if (stored) document.documentElement.classList.add("dark");
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/events?q=${encodeURIComponent(query)}`);
  }

  return (
    <header
      {...storyblokEditable(blok)}
      className="flex items-center justify-between px-6 h-16 bg-white dark:bg-gray-900 shadow"
    >
      <span className="text-xl font-semibold">EventFinder</span>
      <form onSubmit={handleSearch} className="flex-1 mx-6 max-w-md">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events"
          className="w-full h-9 rounded-md border px-3 text-sm focus:outline-none bg-white/70 dark:bg-gray-800 dark:border-gray-700"
        />
      </form>
      <div className="flex gap-4 items-center">
        <button
          aria-label="Saved"
          onClick={() => router.push("/saved")}
          className="i-lucide-bookmark w-5 h-5 hover:text-orange-500"
        />
        <button
          aria-label="Toggle theme"
          onClick={toggleDark}
          className="w-5 h-5"
        >
          <span className={dark ? "i-lucide-sun" : "i-lucide-moon"}></span>
        </button>
      </div>
    </header>
  );
}
