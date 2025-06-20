import React from "react";
import HeroSection from "../components/HeroSection";
import SearchByDestination from "../components/SearchByDestination";
import PopularItinerary from "../components/PopularItinerary";
import FeaturedHighlights from "../components/FeaturedHighlights";

export default function Homepage() {
  return (
    <div>
      <HeroSection />
      <SearchByDestination />
      <PopularItinerary />
      <FeaturedHighlights />
    </div>
  );
}
