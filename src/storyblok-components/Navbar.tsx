"use client";
import { storyblokEditable } from "@storyblok/react/rsc";
import type { NavbarBlok } from "@/lib/storyblok-types";

export default function Navbar({ blok }: { blok: NavbarBlok }) {
  return (
    <header
      {...storyblokEditable(blok)}
      className="flex items-center justify-between px-4 h-16 bg-white shadow"
    >
      <span className="text-xl font-semibold">EventFinder</span>
      <input
        placeholder="Search events"
        className="w-56 h-9 rounded-md border px-3 text-sm focus:outline-none"
      />
      <div className="flex gap-4">
        <button aria-label="Saved" className="i-lucide-bookmark w-5 h-5" />
        <button aria-label="Profile" className="i-lucide-user w-5 h-5" />
      </div>
    </header>
  );
}
