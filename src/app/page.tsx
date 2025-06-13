import { StoryblokStory } from "@storyblok/react/rsc";
import { getStoryblokApi } from "@/lib/storyblok";   // ← import YOUR helper

export default async function Home() {
  const sbApi = getStoryblokApi(); // apiPlugin already active
  try {
    const { data } = await sbApi.get("cdn/stories/home", { version: "draft" });
    return <StoryblokStory story={data.story} />;
  } catch (err) {
    console.error(err);
    return <div>Failed to load</div>;
  }
}
