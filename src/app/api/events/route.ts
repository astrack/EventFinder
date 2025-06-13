import { NextResponse } from 'next/server';
import OpenAI from 'openai';

async function fetchEventbriteEvents() {
  const token = process.env.EVENTBRITE_TOKEN;
  if (!token) return [];

  const res = await fetch(
    'https://www.eventbriteapi.com/v3/events/search/?location.address=online',
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 * 15 },
    },
  );
  if (!res.ok) return [];

  const data = await res.json();
  return data.events || [];
}

async function fetchMeetupEvents() {
  const key = process.env.MEETUP_KEY;
  if (!key) return [];

  const res = await fetch(
    `https://api.meetup.com/find/upcoming_events?&sign=true&key=${key}`,
  );
  if (!res.ok) return [];

  const data = await res.json();
  return data.events || [];
}

async function fetchTicketmasterEvents() {
  const key = process.env.TICKETMASTER_KEY;
  if (!key) return [];

  const res = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}`,
  );
  if (!res.ok) return [];

  const data = await res.json();
  return data._embedded?.events || [];
}

interface FetchedEvent {
  id: string;
  name?: { text?: string } | string;
  url?: string;
  description?: { text?: string } | string;
  start?: { local?: string } | string;
  local_date?: string;
  venue?: { name?: string };
  _embedded?: { venues?: { name?: string }[] };
}

interface EnrichedEvent {
  id: string;
  title: string;
  url?: string;
  start?: string;
  venue?: string;
  summary: string;
  tags: string[];
}

const MAX_CONCURRENT_OPENAI_REQUESTS = parseInt(
  process.env.OPENAI_CONCURRENT_REQUESTS || '5',
  10,
);

async function generateEventMetadata(event: FetchedEvent, openai: OpenAI) {
  const description = event.description?.text || (event.description as string) || '';
  const prompt = `Summarize this event in one sentence and provide a list of relevant tags.\nEvent: ${
    typeof event.name === 'string' ? event.name : event.name?.text
  }\nDescription: ${description}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.choices[0].message?.content || '';
  const [summaryLine = '', tagsLine = ''] = text.split('\n');
  const tags =
    tagsLine
      .replace(/tags?:/i, '')
      .split(',')
      .map(t => t.trim())
      .filter(Boolean) || [];

  return { summary: summaryLine.trim(), tags };
}

export async function GET() {
  /* 4-a. Aggregate raw events */
  const rawEvents: FetchedEvent[] = [
    ...(await fetchEventbriteEvents()),
    ...(await fetchMeetupEvents()),
    ...(await fetchTicketmasterEvents()),
  ].slice(0, 50);

  /* 4-b. Prepare OpenAI helper (if key provided) */
  const openaiKey = process.env.OPENAI_API_KEY;
  const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;

  /* 4-c. Batch-process metadata with concurrency limit */
  const metadataResults: { summary: string; tags: string[] }[] = [];

  for (let i = 0; i < rawEvents.length; i += MAX_CONCURRENT_OPENAI_REQUESTS) {
    const batch = rawEvents.slice(i, i + MAX_CONCURRENT_OPENAI_REQUESTS);

    const promises = batch.map(ev =>
      openai
        ? generateEventMetadata(ev, openai)
        : Promise.resolve({ summary: '', tags: [] }),
    );

    const results = await Promise.allSettled(promises);

    results.forEach(result => {
      if (result.status === 'fulfilled') {
        metadataResults.push(result.value);
      } else {
        console.error('OpenAI error:', result.reason);
        metadataResults.push({ summary: '', tags: [] });
      }
    });
  }

  const enriched: EnrichedEvent[] = rawEvents.map((event, idx) => ({
    id: event.id,
    title: typeof event.name === 'string' ? event.name : event.name?.text || '',
    url: event.url,
    start:
      typeof event.start === 'string'
        ? event.start
        : event.start?.local || event.local_date,
    venue: event.venue?.name || event._embedded?.venues?.[0]?.name || '',
    summary: metadataResults[idx]?.summary || '',
    tags: metadataResults[idx]?.tags || [],
  }));

  return NextResponse.json({ events: enriched });
}
