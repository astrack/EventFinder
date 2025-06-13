// Storyblok initialisation (runs ONCE, server side)
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

// 🔗 map your blok components
import Navbar        from "@/storyblok-components/Navbar";
import EventCard     from "@/storyblok-components/EventCard";
import FiltersDrawer from "@/storyblok-components/FiltersDrawer";

console.log(
  "🪄 Storyblok token seen by Node:",
  process.env.NEXT_PUBLIC_STORYBLOK_TOKEN?.slice(0, 6) || "<undefined>"
);
// storyblokInit RETURNS a getStoryblokApi function ➜ we re-export it
export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
  use: [apiPlugin],                 // ← plugin really loaded now
  components: {
    navbar: Navbar,
    event_card: EventCard,
    filters_drawer: FiltersDrawer,
  },
});

// Server-side renderer for stories
export { StoryblokStory } from "@storyblok/react/rsc";
