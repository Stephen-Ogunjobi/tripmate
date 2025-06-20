import React from "react";
import { FaClock, FaMapMarkerAlt, FaUsers, FaArrowRight } from "react-icons/fa";

export default function PopularItinerary() {
  const popularItineraries = [
    {
      id: 1,
      title: "3 Days in Rome",
      location: "Rome, Italy",
      duration: "3 Days",
      travelers: "2-4 People",
      price: "$299",
      image:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=250&fit=crop&crop=entropy&auto=format",
      highlights: [
        "Visit the Colosseum & Roman Forum",
        "Explore Vatican City & Sistine Chapel",
        "Toss a coin in Trevi Fountain",
        "Authentic Italian dining experiences",
      ],
      description:
        "Discover the eternal city's ancient wonders, world-class art, and incredible cuisine in this perfectly planned 3-day adventure.",
      rating: 4.8,
      reviews: 1247,
    },
    {
      id: 2,
      title: "Nigerian Culture and Entertainment",
      location: "Lagos & Abuja, Nigeria",
      duration: "5 Days",
      travelers: "2-6 People",
      price: "$450",
      image: "nigrian.avif",
      highlights: [
        "Experience Afrobeats music scene",
        "Visit National Theatre Lagos",
        "Traditional Yoruba cultural sites",
        "Nollywood film industry tour",
      ],
      description:
        "Immerse yourself in Nigeria's vibrant culture, from traditional ceremonies to modern entertainment hubs and artistic expressions.",
      rating: 4.9,
      reviews: 892,
    },
    {
      id: 3,
      title: "New York Foodie Weekend",
      location: "New York City, USA",
      duration: "3 Days",
      travelers: "2-4 People",
      price: "$380",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop&crop=entropy&auto=format",
      highlights: [
        "Michelin-starred restaurant tours",
        "Brooklyn food market exploration",
        "Pizza & bagel crawl in Manhattan",
        "Rooftop dining with city views",
      ],
      description:
        "Savor the Big Apple's incredible culinary scene from street food to fine dining in this ultimate foodie adventure.",
      rating: 4.7,
      reviews: 2156,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-primary text-3xl sm:text-4xl font-bold text-primary mb-4">
            Get Inspired by Popular Itineraries
          </h2>
          <p className="font-worksans text-lg text-gray-600 max-w-3xl mx-auto">
            Discover carefully crafted travel experiences that have delighted
            thousands of travelers. From cultural immersion to culinary
            adventures, find your perfect journey.
          </p>
        </div>

        {/* Itinerary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularItineraries.map((itinerary) => (
            <div
              key={itinerary.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={itinerary.image}
                  alt={itinerary.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full font-worksans font-semibold text-sm">
                  From {itinerary.price}
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-worksans font-semibold">
                      {itinerary.rating}
                    </span>
                  </div>
                  <span className="font-worksans text-sm opacity-90">
                    ({itinerary.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Title and Location */}
                <div className="mb-4">
                  <h3 className="font-primary text-xl font-bold text-primary mb-2">
                    {itinerary.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mb-3">
                    <FaMapMarkerAlt className="text-secondary mr-2" />
                    <span className="font-worksans text-sm">
                      {itinerary.location}
                    </span>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FaClock className="text-secondary" />
                    <span className="font-worksans">{itinerary.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers className="text-secondary" />
                    <span className="font-worksans">{itinerary.travelers}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-worksans text-gray-600 text-sm leading-relaxed mb-4">
                  {itinerary.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-worksans font-semibold text-primary mb-2 text-sm">
                    Trip Highlights:
                  </h4>
                  <ul className="space-y-1">
                    {itinerary.highlights
                      .slice(0, 3)
                      .map((highlight, index) => (
                        <li
                          key={index}
                          className="font-worksans text-xs text-gray-600 flex items-start gap-2"
                        >
                          <span className="text-secondary mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    {itinerary.highlights.length > 3 && (
                      <li className="font-worksans text-xs text-secondary font-medium">
                        +{itinerary.highlights.length - 3} more activities
                      </li>
                    )}
                  </ul>
                </div>

                {/* CTA Button */}
                <button className="w-full btn-primary font-worksans font-semibold py-3 px-4 rounded-lg border-none cursor-pointer flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-200">
                  View Itinerary
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="font-worksans font-semibold text-secondary hover:text-primary border-2 border-secondary hover:border-primary px-8 py-3 rounded-full transition-colors duration-200 bg-transparent cursor-pointer">
            View All Itineraries
          </button>
        </div>
      </div>
    </section>
  );
}
