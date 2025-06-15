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

export default function EventsSearch({ events, initialQuery = "" }: { events: ApiEvent[]; initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');
  const [active, setActive] = useState<ApiEvent | null>(null);

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
    const list = events.filter((e) => {
      const text = `${e.title} ${e.summary} ${e.venue} ${e.tags.join(' ')}`.toLowerCase();
      const matchesQuery = text.includes(q);
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((t) => e.tags.includes(t));
      return matchesQuery && matchesTags;
    });
    return list.sort((a, b) => {
      const da = new Date(a.start || '').getTime();
      const db = new Date(b.start || '').getTime();
      return sort === 'asc' ? da - db : db - da;
    });
  }, [events, query, selectedTags, sort]);

  return (
    <div>
      <SearchBar blok={{ _uid: "search", placeholder: "Search events" }} onSearch={setQuery} />
      <div className="my-4 flex flex-wrap gap-2 items-center">
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
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as 'asc' | 'desc')}
          className="ml-auto border rounded px-2 py-1 text-sm"
        >
          <option value="asc">Date ↑</option>
          <option value="desc">Date ↓</option>
        </select>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {filtered.map((event) => (
          <div key={event.id} onClick={() => setActive(event)}>
            <EventCard
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
          </div>
        ))}
      </div>
      {active && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-2">{active.title}</h2>
            <p className="text-sm mb-2">{active.summary}</p>
            <p className="text-sm text-slate-600 mb-4">{active.venue}</p>
            <div className="flex justify-between mt-4">
              <a
                href={active.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                View Event
              </a>
              {active.venue && (
                <a
                  href={`https://www.google.com/maps/search/${encodeURIComponent(active.venue)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  Map
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
