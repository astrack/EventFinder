"use client";
import { useMemo, useState } from "react";
import EventCard from "@/storyblok-components/EventCard";
import SearchBar from "@/storyblok-components/SearchBar";

interface ApiEvent {
  id: string;
  title: string;
  url?: string;
  start?: string;
  venue?: string;
  image?: string;
  summary: string;
  tags: string[];
}

export default function EventsSearch({ events }: { events: ApiEvent[] }) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    events.forEach((e) => e.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, [events]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return events.filter((e) => {
      const text = `${e.title} ${e.summary} ${e.venue} ${e.tags.join(' ')}`.toLowerCase();
      const matchesQuery = text.includes(q);
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((t) => e.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [events, query, selectedTags]);

  return (
    <div>
      <SearchBar blok={{ _uid: "search", placeholder: "Search events" }} onSearch={setQuery} />
      <div className="my-4 flex flex-wrap gap-2">
        {allTags.map((tag) => (
          <label key={tag} className="glass px-3 py-1 rounded cursor-pointer text-sm">
            <input
              type="checkbox"
              className="mr-1"
              checked={selectedTags.includes(tag)}
              onChange={() => toggleTag(tag)}
            />
            {tag}
          </label>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {filtered.map((event) => (
          <EventCard
            key={event.id}
            blok={{
              _uid: event.id,
              image: { filename: event.image || "/placeholder.svg" },
              title: event.title,
              start: event.start || '',
              venue: event.venue || '',
              summary: event.summary,
              tags: event.tags,
              price: "",
            }}
          />
        ))}
      </div>
    </div>
  );
}
