import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/lib/storyblok";   // ← import YOUR helper

export default async function Home() {
  const sbApi   = getStoryblokApi();                 // apiPlugin already active
  const { data } = await sbApi.get("cdn/stories/home", { version: "draft" });

  return <StoryblokStory story={data.story} />;
}
