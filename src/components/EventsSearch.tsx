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
  summary: string;
  tags: string[];
}

export default function EventsSearch({ events }: { events: ApiEvent[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return events.filter((e) => e.title.toLowerCase().includes(q));
  }, [events, query]);

  return (
    <div>
      <SearchBar blok={{ _uid: "search", placeholder: "Search events" }} onSearch={setQuery} />
      <div className="grid gap-6 md:grid-cols-3">
        {filtered.map((event) => (
          <EventCard
            key={event.id}
            blok={{
              _uid: event.id,
              image: { filename: "/placeholder.svg" },
              title: event.title,
              start: event.start,
              venue: event.venue,
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
