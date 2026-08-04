import type { Metadata } from "next";
import LandingPage from "./landing-page";

export const metadata: Metadata = {
  title: "AudiLink Studio · Direct every voice",
  description:
    "A calm, creator-led audio studio for audiobooks, expressive speech, voices, sound effects, and transcription.",
};

export default function Home() {
  return <LandingPage />;
}
