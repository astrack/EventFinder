// Storyblok initialization (runs once on the server)
import {
  apiPlugin,
  storyblokInit,
  getStoryblokApi,
  StoryblokStory,
} from "@storyblok/react/rsc";

import Navbar from "@/storyblok-components/Navbar";
import EventCard from "@/storyblok-components/EventCard";
import FiltersDrawer from "@/storyblok-components/FiltersDrawer";
import Page from "@/storyblok-components/Page";
import Grid from "@/storyblok-components/Grid";
import Teaser from "@/storyblok-components/Teaser";
import Feature from "@/storyblok-components/Feature";

const accessToken =
  process.env.NEXT_PUBLIC_STORYBLOK_TOKEN ?? process.env.STORYBLOK_TOKEN;
if (!accessToken) {
  throw new Error(
    "NEXT_PUBLIC_STORYBLOK_TOKEN (or STORYBLOK_TOKEN) environment variable is missing",
  );
}

storyblokInit({
  accessToken,
  use: [apiPlugin],
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

export { getStoryblokApi, StoryblokStory };
