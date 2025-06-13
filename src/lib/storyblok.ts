// Storyblok initialisation (runs ONCE, server side)
import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";

// 🔗 map your blok components
import Navbar        from "@/storyblok-components/Navbar";
import EventCard     from "@/storyblok-components/EventCard";
import FiltersDrawer from "@/storyblok-components/FiltersDrawer";
import Page          from "@/storyblok-components/Page";
import Grid          from "@/storyblok-components/Grid";
import Teaser        from "@/storyblok-components/Teaser";
import Feature       from "@/storyblok-components/Feature";

// storyblokInit RETURNS a getStoryblokApi function ➜ we re-export it
export const getStoryblokApi = storyblokInit({
  accessToken: "YSb54AnQcc8czORhorTRVAtt",
  use: [apiPlugin],                 // ← plugin really loaded now
  components: {
    navbar: Navbar,
    event_card: EventCard,
    filters_drawer: FiltersDrawer,
    page: Page,
    grid: Grid,
    teaser: Teaser,
    feature: Feature,
  },
});

// Server-side renderer for stories
export { StoryblokStory } from "@storyblok/react/rsc";
