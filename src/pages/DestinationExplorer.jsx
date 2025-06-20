import React, { useState, useMemo } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaPlane,
  FaStar,
  FaCamera,
  FaUmbrellaBeach,
  FaMountain,
  FaCity,
  FaTree,
  FaSun,
} from "react-icons/fa";
import { getSupportedLocations } from "../utils/locationUtils";

export default function DestinationExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Destination data with categories, descriptions, and highlights
  const destinationsData = {
    Dubai: {
      category: "city",
      description:
        "A dazzling metropolis of luxury, innovation, and desert adventures",
      highlights: [
        "Burj Khalifa",
        "Dubai Mall",
        "Palm Jumeirah",
        "Desert Safari",
      ],
      bestTime: "Nov - Mar",
      rating: 4.8,
      image: "🏙️",
    },
    "New York": {
      category: "city",
      description:
        "The city that never sleeps - iconic skyline and endless entertainment",
      highlights: [
        "Times Square",
        "Central Park",
        "Statue of Liberty",
        "Broadway",
      ],
      bestTime: "Apr - Jun, Sep - Nov",
      rating: 4.9,
      image: "🗽",
    },
    London: {
      category: "city",
      description: "Historic charm meets modern culture in this royal capital",
      highlights: [
        "Big Ben",
        "London Eye",
        "Buckingham Palace",
        "Tower Bridge",
      ],
      bestTime: "May - Sep",
      rating: 4.7,
      image: "🎡",
    },
    Paris: {
      category: "city",
      description: "The city of love, art, and culinary excellence",
      highlights: [
        "Eiffel Tower",
        "Louvre Museum",
        "Notre-Dame",
        "Champs-Élysées",
      ],
      bestTime: "Apr - Jun, Sep - Oct",
      rating: 4.8,
      image: "🗼",
    },
    Tokyo: {
      category: "city",
      description:
        "Where ancient traditions blend seamlessly with cutting-edge technology",
      highlights: [
        "Tokyo Tower",
        "Shibuya Crossing",
        "Mount Fuji",
        "Traditional Temples",
      ],
      bestTime: "Mar - May, Sep - Nov",
      rating: 4.9,
      image: "🌸",
    },
    "Los Angeles": {
      category: "beach",
      description:
        "Sunny beaches, Hollywood glamour, and endless entertainment",
      highlights: [
        "Hollywood Sign",
        "Venice Beach",
        "Santa Monica Pier",
        "Beverly Hills",
      ],
      bestTime: "Mar - May, Sep - Nov",
      rating: 4.6,
      image: "🌴",
    },
    Miami: {
      category: "beach",
      description:
        "Vibrant beach culture with Art Deco architecture and nightlife",
      highlights: [
        "South Beach",
        "Art Deco District",
        "Little Havana",
        "Wynwood Walls",
      ],
      bestTime: "Dec - Apr",
      rating: 4.5,
      image: "🏖️",
    },
    Rome: {
      category: "cultural",
      description:
        "Eternal city where ancient history comes alive at every corner",
      highlights: [
        "Colosseum",
        "Vatican City",
        "Trevi Fountain",
        "Roman Forum",
      ],
      bestTime: "Apr - Jun, Sep - Oct",
      rating: 4.8,
      image: "🏛️",
    },
    Sydney: {
      category: "nature",
      description: "Iconic harbor, stunning beaches, and unique wildlife",
      highlights: [
        "Opera House",
        "Harbour Bridge",
        "Bondi Beach",
        "Blue Mountains",
      ],
      bestTime: "Sep - Nov, Mar - May",
      rating: 4.8,
      image: "🦘",
    },
    Bangkok: {
      category: "nature",
      description: "Vibrant street life, ornate temples, and exotic flavors",
      highlights: [
        "Grand Palace",
        "Wat Pho",
        "Floating Markets",
        "Street Food",
      ],
      bestTime: "Nov - Mar",
      rating: 4.6,
      image: "🛺",
    },
  };

  const categories = [
    { id: "all", name: "All Destinations", icon: FaMapMarkerAlt },
    { id: "city", name: "Cities", icon: FaCity },
    { id: "beach", name: "Beaches", icon: FaUmbrellaBeach },
    { id: "mountain", name: "Mountains", icon: FaMountain },
    { id: "cultural", name: "Cultural", icon: FaCamera },
    { id: "nature", name: "Nature", icon: FaTree },
  ];

  // Get supported locations and filter with destination data
  const destinations = useMemo(() => {
    const supportedLocations = getSupportedLocations();
    return supportedLocations
      .filter((location) => destinationsData[location])
      .map((location) => ({
        name: location,
        ...destinationsData[location],
      }));
  }, []);

  // Filter destinations based on search and category
  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      const matchesSearch =
        destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        destination.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || destination.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [destinations, searchTerm, selectedCategory]);

  const handlePlanTrip = (destinationName) => {
    window.location.href = `/trip-planner?destination=${encodeURIComponent(
      destinationName
    )}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-primary text-4xl font-bold text-primary mb-4">
            Destination Explorer
          </h1>
          <p className="font-worksans text-gray-600 text-lg max-w-2xl mx-auto">
            Discover amazing destinations around the world and start planning
            your next adventure
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-worksans"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-worksans font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-primary to-secondary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <IconComponent className="text-sm" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="font-worksans text-gray-600">
            Found {filteredDestinations.length} destination
            {filteredDestinations.length !== 1 ? "s" : ""}
            {selectedCategory !== "all" &&
              ` in ${categories.find((c) => c.id === selectedCategory)?.name}`}
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.name}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Destination Header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-8 text-center">
                <div className="text-6xl mb-4">{destination.image}</div>
                <h3 className="font-primary text-xl font-bold text-white mb-2">
                  {destination.name}
                </h3>
                <div className="flex items-center justify-center gap-1 text-yellow-300">
                  <FaStar className="text-sm" />
                  <span className="font-worksans text-sm">
                    {destination.rating}
                  </span>
                </div>
              </div>

              {/* Destination Details */}
              <div className="p-6">
                {/* Category and Best Time */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-worksans font-medium ${
                      destination.category === "city"
                        ? "bg-blue-100 text-blue-700"
                        : destination.category === "beach"
                        ? "bg-orange-100 text-orange-700"
                        : destination.category === "mountain"
                        ? "bg-green-100 text-green-700"
                        : destination.category === "cultural"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {destination.category.charAt(0).toUpperCase() +
                      destination.category.slice(1)}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500">
                    <FaSun className="text-xs" />
                    <span className="text-xs font-worksans">
                      {destination.bestTime}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-worksans text-gray-600 text-sm mb-4">
                  {destination.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-worksans font-semibold text-gray-800 text-sm mb-2">
                    Top Highlights:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {destination.highlights
                      .slice(0, 3)
                      .map((highlight, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-worksans"
                        >
                          {highlight}
                        </span>
                      ))}
                    {destination.highlights.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs font-worksans">
                        +{destination.highlights.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Plan Trip Button */}
                <button
                  onClick={() => handlePlanTrip(destination.name)}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white font-worksans font-bold py-3 px-4 rounded-xl border-none cursor-pointer hover:from-secondary hover:to-primary transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <FaPlane className="text-sm" />
                  Plan Trip Here
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="font-primary text-2xl font-bold text-gray-800 mb-4">
              No destinations found
            </h3>
            <p className="font-worksans text-gray-600 mb-6">
              Try adjusting your search terms or category filters
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="bg-gradient-to-r from-primary to-secondary text-white font-worksans font-bold py-3 px-6 rounded-xl border-none cursor-pointer hover:from-secondary hover:to-primary transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
