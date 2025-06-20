import React from "react";
import { FaMapMarkedAlt, FaCalendarAlt, FaCompass } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  const handleStartPlanning = () => {
    navigate("/trip-planner");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('Dubai-cityspace-night.webp')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="font-primary text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
          Plan Your Perfect Trip
        </h1>

        <p className="font-worksans text-lg sm:text-xl lg:text-2xl mb-8 opacity-90 leading-relaxed max-w-3xl mx-auto">
          Discover the best destinations, accommodations, and activities
          tailored to your interests and budget. Create unforgettable memories
          with our intelligent trip planning.
        </p>

        {/* Feature Icons */}
        <div className="flex justify-center items-center gap-8 mb-10">
          <div className="flex flex-col items-center">
            <FaMapMarkedAlt className="text-3xl mb-2 opacity-80" />
            <span className="text-sm font-worksans">Destinations</span>
          </div>
          <div className="flex flex-col items-center">
            <FaCalendarAlt className="text-3xl mb-2 opacity-80" />
            <span className="text-sm font-worksans">Planning</span>
          </div>
          <div className="flex flex-col items-center">
            <FaCompass className="text-3xl mb-2 opacity-80" />
            <span className="text-sm font-worksans">Explore</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleStartPlanning}
          className="btn-primary font-worksans text-lg px-8 py-4 rounded-full font-semibold border-none cursor-pointer"
        >
          Start Planning Your Adventure
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white opacity-60">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
