// Storyblok initialisation (runs ONCE, server side)
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

// 🔗 map your blok components
import Navbar        from "@/storyblok-components/Navbar";
import EventCard     from "@/storyblok-components/EventCard";
import FiltersDrawer from "@/storyblok-components/FiltersDrawer";
import Page          from "@/storyblok-components/Page";

// storyblokInit RETURNS a getStoryblokApi function ➜ we re-export it
export const getStoryblokApi = storyblokInit({
  accessToken: "YSb54AnQcc8czORhorTRVAtt",
  use: [apiPlugin],                 // ← plugin really loaded now
  components: {
    navbar: Navbar,
    event_card: EventCard,
    filters_drawer: FiltersDrawer,
    page: Page,
  },
});

// Server-side renderer for stories
export { StoryblokStory } from "@storyblok/react/rsc";
