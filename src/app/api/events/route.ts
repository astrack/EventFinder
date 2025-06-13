import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Helper function to fetch events from Eventbrite
async function fetchEventbriteEvents() {
  const token = process.env.EVENTBRITE_TOKEN;
  if (!token) return [];
  const res = await fetch('https://www.eventbriteapi.com/v3/events/search/?location.address=online', {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 60 * 15 },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.events || [];
}

// Helper function to fetch events from Meetup
async function fetchMeetupEvents() {
  const key = process.env.MEETUP_KEY;
  if (!key) return [];
  const res = await fetch(`https://api.meetup.com/find/upcoming_events?&sign=true&key=${key}`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.events || [];
}

// Helper function to fetch events from Ticketmaster
async function fetchTicketmasterEvents() {
  const key = process.env.TICKETMASTER_KEY;
  if (!key) return [];
  const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${key}`);
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

async function generateEventMetadata(event: FetchedEvent, openai: OpenAI) {
  const description =
    typeof event.description === 'string'
      ? event.description
      : event.description?.text || '';
  const title = typeof event.name === 'string' ? event.name : event.name?.text;
  const prompt = `Summarize this event in one sentence and provide a list of relevant tags.\nEvent: ${title}\nDescription: ${description}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  const text = response.choices[0].message?.content || '';
  const [summary, tagsLine] = text.split('\n');
  const tags = tagsLine?.replace('Tags:', '').split(',').map(t => t.trim()).filter(Boolean) || [];
  return { summary, tags };
}

export async function GET() {
  const events = [
    ...(await fetchEventbriteEvents()),
    ...(await fetchMeetupEvents()),
    ...(await fetchTicketmasterEvents()),
  ].slice(0, 50); // limit to 50 events

  const openaiKey = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey: openaiKey });

  const enriched: EnrichedEvent[] = [];
  for (const event of events as FetchedEvent[]) {
    try {
      const metadata = openaiKey ? await generateEventMetadata(event, openai) : { summary: '', tags: [] };
      const title = typeof event.name === 'string' ? event.name : event.name?.text || '';
      const start =
        typeof event.start === 'string' ? event.start : event.start?.local;
      enriched.push({
        id: event.id,

        title:
          typeof event.name === 'string' ? event.name : event.name?.text || '',
        url: event.url,
        start:
          typeof event.start === 'string'
            ? event.start
            : event.start?.local || event.local_date,
        venue: event.venue?.name || event._embedded?.venues?.[0]?.name || '',
        summary: metadata.summary,
        tags: metadata.tags,
      });
    } catch (err) {
      console.error(err);
    }
  }

  return NextResponse.json({ events: enriched });
}
