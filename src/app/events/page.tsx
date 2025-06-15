import EventsSearch from '@/components/EventsSearch';

interface ApiEvent {
  id: string;
  title: string;
  url: string;
  start: string;
  venue: string;
  image?: string;
  summary: string;
  tags: string[];
}

export default async function EventsPage({ searchParams }: { searchParams?: { q?: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/events`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to load events');
  }
  const data = await res.json();
  const events: ApiEvent[] = data.events;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">Upcoming Events</h1>
      <EventsSearch events={events} initialQuery={searchParams?.q || ''} />
    </div>
  );
}
