import React, { useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaFire } from "react-icons/fa";

export default function SearchByDestination() {
  const [searchQuery, setSearchQuery] = useState("");

  const trendingCities = [
    {
      name: "Dubai",
      country: "UAE",
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&h=200&fit=crop",
      description: "Modern metropolis with stunning architecture",
    },
    {
      name: "Paris",
      country: "France",
      image:
        "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=300&h=200&fit=crop&crop=entropy&auto=format",
      description: "City of lights and romance",
    },
    {
      name: "Tokyo",
      country: "Japan",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop",
      description: "Blend of tradition and innovation",
    },
    {
      name: "New York",
      country: "USA",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=200&fit=crop",
      description: "The city that never sleeps",
    },
    {
      name: "Bali",
      country: "Indonesia",
      image:
        "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=300&h=200&fit=crop",
      description: "Tropical paradise with rich culture",
    },
    {
      name: "London",
      country: "UK",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=300&h=200&fit=crop",
      description: "Historic charm meets modern vibrancy",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  const handleCityClick = (city) => {
    setSearchQuery(city.name);
  };

  return (
    <section className="bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Search Section */}
        <div className="text-center mb-12">
          <h2 className="font-primary text-3xl sm:text-4xl font-bold text-primary mb-4">
            Search by Destination
          </h2>
          <p className="font-worksans text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Find your perfect getaway by searching for destinations that match
            your dreams
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative flex items-center bg-white rounded-full shadow-lg border-2 border-gray-100 focus-within:border-secondary transition-colors duration-300">
              <div className="flex items-center pl-6">
                <FaMapMarkerAlt className="text-secondary text-xl" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Where do you want to go?"
                className="flex-1 px-4 py-4 text-lg font-worksans bg-transparent border-none outline-none placeholder-gray-400"
              />
              <button
                type="submit"
                className="btn-primary m-2 px-8 py-3 rounded-full font-worksans font-semibold border-none cursor-pointer flex items-center gap-2"
              >
                <FaSearch />
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Trending Cities Section */}
        <div className="mt-16">
          <div className="flex items-center justify-center gap-2 mb-8">
            <FaFire className="text-orange-500 text-2xl" />
            <h3 className="font-primary text-2xl sm:text-3xl font-bold text-primary">
              Trending Destinations
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingCities.map((city, index) => (
              <div
                key={index}
                onClick={() => handleCityClick(city)}
                className="group cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={city.image}
                    alt={city.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-primary text-xl font-bold">
                      {city.name}
                    </h4>
                    <p className="font-worksans text-sm opacity-90">
                      {city.country}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-worksans text-gray-600 text-sm leading-relaxed">
                    {city.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Searches */}
        <div className="mt-12 text-center">
          <p className="font-worksans text-gray-500 mb-4">Popular searches:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Beach destinations",
              "Mountain retreats",
              "City breaks",
              "Cultural tours",
              "Adventure trips",
            ].map((tag, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(tag)}
                className="px-4 py-2 bg-gray-100 hover:bg-secondary hover:text-white text-gray-600 rounded-full font-worksans text-sm transition-colors duration-200 border-none cursor-pointer"
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
