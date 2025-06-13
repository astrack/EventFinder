import EventCard from '@/storyblok-components/EventCard';

interface ApiEvent {
  id: string;
  title: string;
  url: string;
  start: string;
  venue: string;
  summary: string;
  tags: string[];
}

export default async function EventsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/events`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to load events');
  }
  const data = await res.json();
  const events: ApiEvent[] = data.events;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Upcoming Events</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {events.map(event => (
          <EventCard
            key={event.id}
          blok={{
            _uid: event.id,
            image: { filename: '/placeholder.jpg' },
            title: event.title,
            start: event.start,
            venue: event.venue,
            summary: event.summary,
            tags: event.tags,
            price: '',
          }}
          />
        ))}
      </div>
    </div>
  );
}
