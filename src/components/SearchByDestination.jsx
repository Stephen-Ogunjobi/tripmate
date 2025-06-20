import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaFire, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SearchByDestination() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      toast.error("Please enter a destination");
      return;
    }
    navigate("/trip-planner", { state: { destination: searchQuery } });
  };

  const trendingCities = [
    {
      name: "Dubai",
      country: "UAE",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&h=200&fit=crop",
      description: "Modern metropolis with stunning architecture",
      highlight: "Luxury & Innovation",
    },
    {
      name: "Paris",
      country: "France",
      image:
        "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=300&h=200&fit=crop&crop=entropy&auto=format",
      description: "City of lights and romance",
      highlight: "Art & Culture",
    },
    {
      name: "Tokyo",
      country: "Japan",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop",
      description: "Blend of tradition and innovation",
      highlight: "Tech & Tradition",
    },
    {
      name: "New York",
      country: "USA",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=200&fit=crop",
      description: "The city that never sleeps",
      highlight: "Urban Energy",
    },
    {
      name: "Bali",
      country: "Indonesia",
      image:
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=300&h=200&fit=crop",
      description: "Tropical paradise with rich culture",
      highlight: "Nature & Wellness",
    },
    {
      name: "London",
      country: "UK",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&h=200&fit=crop",
      description: "Historic charm meets modern vibrancy",
      highlight: "History & Style",
    },
  ];

  const handleCityClick = (city) => {
    setSearchQuery(city.name);
    navigate("/trip-planner", { state: { destination: city.name } });
  };

  return (
    <section className="modern-search-section bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Search Section */}
        <div className="text-center">
          <div className="search-header-container">
            <h2 className="search-main-title font-bold">
              Discover Your Next
              <span className="search-accent-text block">Adventure</span>
            </h2>
            <p className="search-subtitle max-w-3xl mx-auto">
              Explore extraordinary destinations and create unforgettable
              memories
            </p>
          </div>

          {/* Enhanced Search Form */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="modern-search-container relative">
              <div className="search-icon-container">
                <FaMapMarkerAlt className="search-icon" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Where do you want to go next?"
                className="modern-search-input"
              />
              <button type="submit" className="modern-search-btn">
                <FaSearch className="mr-2" />
                <span>Explore</span>
                <FaArrowRight className="search-arrow ml-2" />
              </button>
            </div>
          </form>
        </div>

        {/* Trending Cities Section */}
        <div className="trending-section">
          <div className="trending-header flex items-center justify-center gap-3">
            <div className="trending-fire-icon">
              <FaFire />
            </div>
            <h3 className="trending-title font-bold">Trending Destinations</h3>
          </div>

          <div className="destinations-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingCities.map((city, index) => (
              <div
                key={index}
                onClick={() => handleCityClick(city)}
                className="destination-card group cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="card-image-container">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="card-image"
                  />
                  <div className="card-overlay" />
                  <div className="card-highlight-badge">{city.highlight}</div>
                  <div className="card-location-info">
                    <h4 className="card-city-name">{city.name}</h4>
                    <p className="card-country-name">{city.country}</p>
                  </div>
                </div>
                <div className="card-content">
                  <p className="card-description">{city.description}</p>
                  <div className="card-explore-link">
                    <span>Explore destination</span>
                    <FaArrowRight className="card-arrow" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Popular Searches */}
        <div className="popular-searches-section text-center">
          <h4 className="popular-searches-title font-semibold">
            Popular Travel Themes
          </h4>
          <div className="popular-tags-container flex flex-wrap justify-center gap-4">
            {[
              "Beach destinations",
              "Mountain retreats",
              "City breaks",
              "Cultural tours",
              "Adventure trips",
              "Romantic getaways",
            ].map((tag, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(tag)}
                className="popular-tag"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
