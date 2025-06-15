export default function Home() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Welcome to EventFinder</h1>
      <p>
        EventFinder aggregates happenings from Eventbrite, Meetup and Ticketmaster and enriches them with AI summaries and tags so you can quickly discover interesting events.
      </p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Browse events from multiple providers in one place</li>
        <li>AI generated summaries and tags help you understand each event at a glance</li>
        <li>Free text search across titles, descriptions and tags</li>
        <li>Filter events by tags using the handy tag selectors</li>
        <li>Sleek interface with glass styled buttons</li>
      </ul>
      <p>
        Get started by visiting the <a className="text-blue-600 underline" href="/events">events page</a>.
      </p>
    </main>
  );
}
