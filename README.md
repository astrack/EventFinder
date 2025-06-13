This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, install the dependencies and run the development server:

```bash
# install dependencies
npm install

# start the dev server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Environment variables

Copy `.env.example` to `.env` and fill in the tokens for the external APIs you want to use:

```
cp .env.example .env
```

- `EVENTBRITE_TOKEN` – API token for Eventbrite
- `MEETUP_KEY` – API key for Meetup
- `TICKETMASTER_KEY` – API key for Ticketmaster
- `OPENAI_API_KEY` – Optional key for generating AI summaries. Leave empty to skip this step.
- `NEXT_PUBLIC_STORYBLOK_TOKEN` – Storyblok API token used for content fetching. Required for the Visual Editor so it must be prefixed with `NEXT_PUBLIC_`
- `NEXT_PUBLIC_BASE_URL` – base URL of your site

## Events API

The application exposes a `GET /api/events` route that aggregates events from the configured providers and enriches them with a short summary and tags using ChatGPT.

Visit `/events` to see the aggregated list rendered in the UI. Each event card displays the AI-generated summary and tags so you can quickly scan for topics of interest.
