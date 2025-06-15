import StoryblokProvider from "@/components/StoryblokProvider";
import Navbar from "@/storyblok-components/Navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoryblokProvider>
      <html lang="en">
        <body className="min-h-screen flex flex-col">
          <Navbar blok={{ _uid: "navbar" }} />
          <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
        </body>
      </html>
    </StoryblokProvider>
  );
}
