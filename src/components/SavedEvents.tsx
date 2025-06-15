"use client";
import { useEffect, useState } from "react";
import EventCard from "@/storyblok-components/EventCard";
import type { EventCardBlok } from "@/lib/storyblok-types";

export default function SavedEvents() {
  const [events, setEvents] = useState<EventCardBlok[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("savedEvents") || "[]");
    setEvents(stored);
  }, []);

  if (events.length === 0) {
    return <p>You have no saved events.</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {events.map((blok) => (
        <EventCard key={blok._uid} blok={blok} />
      ))}
    </div>
  );
}
