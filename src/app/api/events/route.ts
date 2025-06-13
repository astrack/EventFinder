import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

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

// Limit the number of OpenAI requests processed concurrently
const MAX_CONCURRENT_OPENAI_REQUESTS = parseInt(
  process.env.OPENAI_CONCURRENT_REQUESTS || '5',
  10,
);

async function generateEventMetadata(event: FetchedEvent, openai: OpenAIApi) {
  const description = event.description?.text || event.description || '';
  const prompt = `Summarize this event in one sentence and provide a list of relevant tags.\nEvent: ${event.name?.text || event.name}\nDescription: ${description}`;
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  const text = response.data.choices[0].message?.content || '';
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
  const configuration = new Configuration({ apiKey: openaiKey });
  const openai = new OpenAIApi(configuration);

  const metadataResults: { summary: string; tags: string[] }[] = [];
  for (let i = 0; i < events.length; i += MAX_CONCURRENT_OPENAI_REQUESTS) {
    const batch = (events as FetchedEvent[]).slice(i, i + MAX_CONCURRENT_OPENAI_REQUESTS);
    const promises = batch.map(event =>
      openaiKey ? generateEventMetadata(event, openai) : Promise.resolve({ summary: '', tags: [] }),
    );
    const results = await Promise.allSettled(promises);
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        metadataResults.push(result.value);
      } else {
        console.error(result.reason);
        metadataResults.push({ summary: '', tags: [] });
      }
    });
  }

  const enriched: EnrichedEvent[] = (events as FetchedEvent[]).map((event, index) => ({
    id: event.id,
    title: event.name?.text || event.name,
    url: event.url,
    start: event.start?.local || event.local_date,
    venue: event.venue?.name || event._embedded?.venues?.[0]?.name || '',
    summary: metadataResults[index]?.summary || '',
    tags: metadataResults[index]?.tags || [],
  }));

  return NextResponse.json({ events: enriched });
}
