import React, { useState, useMemo, useEffect } from "react";
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
  FaHeart,
  FaArrowRight,
  FaFilter,
} from "react-icons/fa";
import { getSupportedLocations } from "../utils/locationUtils";

export default function DestinationExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  const destinationsData = {
    Dubai: {
      category: "city",
      description:
        "A dazzling metropolis where luxury meets innovation, featuring architectural marvels and desert adventures",
      highlights: [
        "Burj Khalifa",
        "Dubai Mall",
        "Palm Jumeirah",
        "Desert Safari",
      ],
      bestTime: "Nov - Mar",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1470&auto=format&fit=crop",
      gradient: "from-orange-400 to-red-500",
    },
    "New York": {
      category: "city",
      description:
        "The city that never sleeps - iconic skyline, world-class culture, and endless entertainment",
      highlights: [
        "Times Square",
        "Central Park",
        "Statue of Liberty",
        "Broadway",
      ],
      bestTime: "Apr - Jun, Sep - Nov",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1470&auto=format&fit=crop",
      gradient: "from-blue-500 to-purple-600",
    },
    London: {
      category: "city",
      description:
        "Historic charm meets modern culture in this royal capital filled with timeless elegance",
      highlights: [
        "Big Ben",
        "London Eye",
        "Buckingham Palace",
        "Tower Bridge",
      ],
      bestTime: "May - Sep",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1470&auto=format&fit=crop",
      gradient: "from-gray-600 to-blue-700",
    },
    Paris: {
      category: "city",
      description:
        "The city of love, art, and culinary excellence where every corner tells a story",
      highlights: [
        "Eiffel Tower",
        "Louvre Museum",
        "Notre-Dame",
        "Champs-Élysées",
      ],
      bestTime: "Apr - Jun, Sep - Oct",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1431274172761-fca41d930114?q=80&w=1470&auto=format&fit=crop",
      gradient: "from-pink-400 to-red-500",
    },
    Tokyo: {
      category: "city",
      description:
        "Where ancient traditions blend seamlessly with cutting-edge technology and innovation",
      highlights: [
        "Tokyo Tower",
        "Shibuya Crossing",
        "Mount Fuji",
        "Traditional Temples",
      ],
      bestTime: "Mar - May, Sep - Nov",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1494&auto=format&fit=crop",
      gradient: "from-purple-500 to-pink-500",
    },
    "Los Angeles": {
      category: "beach",
      description:
        "Sunny beaches, Hollywood glamour, and endless entertainment under the California sun",
      highlights: [
        "Hollywood Sign",
        "Venice Beach",
        "Santa Monica Pier",
        "Beverly Hills",
      ],
      bestTime: "Mar - May, Sep - Nov",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1580655653885-65763b2597d0?q=80&w=1470&auto=format&fit=crop",
      gradient: "from-yellow-400 to-orange-500",
    },
    Miami: {
      category: "beach",
      description:
        "Vibrant beach culture with Art Deco architecture, nightlife, and tropical paradise vibes",
      highlights: [
        "South Beach",
        "Art Deco District",
        "Little Havana",
        "Wynwood Walls",
      ],
      bestTime: "Dec - Apr",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1470&auto=format&fit=crop",
      gradient: "from-teal-400 to-blue-500",
    },
    Rome: {
      category: "cultural",
      description:
        "Eternal city where ancient history comes alive at every corner, rich with art and culture",
      highlights: [
        "Colosseum",
        "Vatican City",
        "Trevi Fountain",
        "Roman Forum",
      ],
      bestTime: "Apr - Jun, Sep - Oct",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1396&auto=format&fit=crop",
      gradient: "from-amber-500 to-orange-600",
    },
    Sydney: {
      category: "nature",
      description:
        "Iconic harbor city with stunning beaches, unique wildlife, and natural wonders",
      highlights: [
        "Opera House",
        "Harbour Bridge",
        "Bondi Beach",
        "Blue Mountains",
      ],
      bestTime: "Sep - Nov, Mar - May",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1470&auto=format&fit=crop",
      gradient: "from-blue-400 to-teal-500",
    },
    Bangkok: {
      category: "nature",
      description:
        "Vibrant street life, ornate temples, exotic flavors, and rich cultural heritage",
      highlights: [
        "Grand Palace",
        "Wat Pho",
        "Floating Markets",
        "Street Food",
      ],
      bestTime: "Nov - Mar",
      rating: 4.6,
      image:
        "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1470&auto=format&fit=crop",
      gradient: "from-green-500 to-emerald-600",
    },
  };

  const categories = [
    {
      id: "all",
      name: "All Destinations",
      icon: FaMapMarkerAlt,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    {
      id: "city",
      name: "Cities",
      icon: FaCity,
      color: "bg-gradient-to-r from-blue-500 to-indigo-600",
    },
    {
      id: "beach",
      name: "Beaches",
      icon: FaUmbrellaBeach,
      color: "bg-gradient-to-r from-teal-400 to-blue-500",
    },
    {
      id: "mountain",
      name: "Mountains",
      icon: FaMountain,
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
    },
    {
      id: "cultural",
      name: "Cultural",
      icon: FaCamera,
      color: "bg-gradient-to-r from-orange-500 to-red-500",
    },
    {
      id: "nature",
      name: "Nature",
      icon: FaTree,
      color: "bg-gradient-to-r from-emerald-500 to-teal-600",
    },
  ];

  const destinations = useMemo(() => {
    const supportedLocations = getSupportedLocations();
    return supportedLocations
      .filter((location) => destinationsData[location])
      .map((location) => ({
        name: location,
        ...destinationsData[location],
      }));
  }, []);

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

  useEffect(() => {
    setIsLoaded(true);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-in");
          entry.target.classList.remove("animate-hidden");
        }
      });
    }, observerOptions);

    const cards = document.querySelectorAll(".destination-card");
    cards.forEach((card) => {
      card.classList.add("animate-hidden");
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [filteredDestinations.length]);

  const handlePlanTrip = (destinationName) => {
    window.location.href = `/trip-planner?destination=${encodeURIComponent(
      destinationName
    )}`;
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${
        isLoaded ? "animate-fade-in" : "opacity-0"
      }`}
    >
      {/* Hero Header Section */}
      <div
        className={`relative bg-gradient-to-r from-primary to-secondary pt-20 pb-32 overflow-hidden ${
          isLoaded ? "animate-slide-down" : "translate-y-[-20px] opacity-0"
        } transition-all duration-1000 delay-200`}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className={`font-primary text-5xl md:text-6xl font-bold text-white mb-6 ${
              isLoaded ? "animate-slide-up" : "translate-y-8 opacity-0"
            } transition-all duration-1000 delay-500`}
          >
            Discover Your Next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Adventure
            </span>
          </h1>
          <p
            className={`font-worksans text-xl text-white/90 max-w-3xl mx-auto leading-relaxed ${
              isLoaded ? "animate-slide-up" : "translate-y-8 opacity-0"
            } transition-all duration-1000 delay-700`}
          >
            Explore breathtaking destinations around the world and start
            planning your dream journey
          </p>
        </div>

        {/* Decorative Elements */}
        <div
          className={`absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl ${
            isLoaded ? "animate-float" : "opacity-0"
          } transition-opacity duration-1000 delay-1000`}
        ></div>
        <div
          className={`absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl ${
            isLoaded ? "animate-float-delayed" : "opacity-0"
          } transition-opacity duration-1000 delay-1200`}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Modern Search and Filter Section */}
        <div
          className={`bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 mb-12 ${
            isLoaded ? "animate-slide-up" : "translate-y-8 opacity-0"
          } transition-all duration-1000 delay-900`}
        >
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search destinations, cities, or experiences..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 text-lg bg-white/50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300 font-worksans placeholder-gray-500"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 mb-4">
            <FaFilter className="text-gray-600 mr-2" />
            <span className="font-worksans font-semibold text-gray-700 mr-4">
              Filter by:
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group flex items-center gap-3 px-6 py-3 rounded-2xl font-worksans font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    selectedCategory === category.id
                      ? `${category.color} text-white shadow-xl`
                      : "bg-white/60 backdrop-blur-sm text-gray-700 hover:bg-white/80 border border-gray-200"
                  }`}
                >
                  <IconComponent className="text-lg" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-primary text-2xl font-bold text-gray-800 mb-2">
                {filteredDestinations.length} Amazing Destination
                {filteredDestinations.length !== 1 ? "s" : ""} Found
              </h2>
              <p className="font-worksans text-gray-600">
                {selectedCategory !== "all" &&
                  `Showing ${categories
                    .find((c) => c.id === selectedCategory)
                    ?.name.toLowerCase()} destinations`}
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredDestinations.map((destination, index) => (
            <div
              key={destination.name}
              className="destination-card group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${destination.gradient} opacity-60 group-hover:opacity-40 transition-opacity duration-300`}
                ></div>

                {/* Overlay Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div className="flex items-start justify-between">
                    <div
                      className={`px-4 py-2 rounded-xl backdrop-blur-md ${
                        destination.category === "city"
                          ? "bg-blue-500/20 text-blue-100"
                          : destination.category === "beach"
                          ? "bg-teal-500/20 text-teal-100"
                          : destination.category === "mountain"
                          ? "bg-green-500/20 text-green-100"
                          : destination.category === "cultural"
                          ? "bg-orange-500/20 text-orange-100"
                          : "bg-emerald-500/20 text-emerald-100"
                      }`}
                    >
                      <span className="font-worksans font-semibold text-sm capitalize">
                        {destination.category}
                      </span>
                    </div>
                    <button className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors duration-200">
                      <FaHeart className="text-white text-sm" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-primary text-2xl font-bold text-white mb-2">
                      {destination.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/90">
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className="font-worksans font-semibold">
                          {destination.rating}
                        </span>
                      </div>
                      <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                      <div className="flex items-center gap-1">
                        <FaSun className="text-sm" />
                        <span className="font-worksans text-sm">
                          {destination.bestTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="font-worksans text-gray-600 mb-4 leading-relaxed">
                  {destination.description}
                </p>

                {/* Highlights */}
                <div className="mb-6">
                  <h4 className="font-worksans font-semibold text-gray-800 mb-3">
                    Must-See Attractions:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights
                      .slice(0, 3)
                      .map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-worksans hover:bg-gray-200 transition-colors duration-200"
                        >
                          {highlight}
                        </span>
                      ))}
                    {destination.highlights.length > 3 && (
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-worksans">
                        +{destination.highlights.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Enhanced CTA Button */}
                <button
                  onClick={() => handlePlanTrip(destination.name)}
                  className="relative w-full overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-yellow-50 font-worksans font-bold py-5 px-6 rounded-2xl transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 group border-2 border-purple-300/30 hover:border-yellow-200/50"
                  style={{
                    backgroundSize: "200% 100%",
                    backgroundPosition: "0% 0%",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundPosition = "100% 0%";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundPosition = "0% 0%";
                  }}
                >
                  {/* Animated background shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <FaPlane className="text-lg group-hover:translate-x-2 group-hover:rotate-12 transition-all duration-300 relative z-10 text-yellow-100" />
                  <span className="relative z-10 text-lg tracking-wide text-yellow-50 font-semibold">
                    Plan Your Adventure
                  </span>
                  <FaArrowRight className="text-sm group-hover:translate-x-2 transition-all duration-300 relative z-10 text-yellow-100" />

                  {/* Pulsing glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced No Results Section */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-4xl text-gray-400" />
              </div>
              <h3 className="font-primary text-3xl font-bold text-gray-800 mb-4">
                No destinations found
              </h3>
              <p className="font-worksans text-gray-600 text-lg mb-8 max-w-md mx-auto">
                We couldn't find any destinations matching your search. Try
                adjusting your filters or search terms.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="bg-gradient-to-r from-primary to-secondary text-white font-worksans font-bold py-4 px-8 rounded-2xl hover:from-secondary hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
