import React from "react";
import { FaMapMarkedAlt, FaCalendarAlt, FaCompass } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  const handleStartPlanning = () => {
    navigate("/trip-planner");
  };

  return (
    <section className="modern-hero relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Animation */}
      <div
        className="hero-bg-animated absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('Dubai-cityspace-night.webp')",
        }}
      />

      {/* Modern Overlay */}
      <div className="absolute inset-0 modern-hero-overlay" />

      {/* Content Container */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Main Heading */}
            <div className="hero-text-container">
              <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl mb-6">
                Plan Your Perfect
                <span className="hero-accent-text block">Adventure</span>
              </h1>

              <p className="hero-subtitle text-lg sm:text-xl lg:text-2xl mb-8 max-w-2xl">
                Discover extraordinary destinations, premium accommodations, and
                unique experiences tailored to your dreams. Create unforgettable
                memories with our intelligent trip planning.
              </p>

              {/* Feature Icons */}
              <div className="hero-features flex items-center gap-8 mb-12">
                <div className="hero-feature-item flex flex-col items-center">
                  <div className="hero-feature-icon">
                    <FaMapMarkedAlt className="text-2xl" />
                  </div>
                  <span className="hero-feature-text mt-2">Destinations</span>
                </div>
                <div className="hero-feature-item flex flex-col items-center">
                  <div className="hero-feature-icon">
                    <FaCalendarAlt className="text-2xl" />
                  </div>
                  <span className="hero-feature-text mt-2">Planning</span>
                </div>
                <div className="hero-feature-item flex flex-col items-center">
                  <div className="hero-feature-icon">
                    <FaCompass className="text-2xl" />
                  </div>
                  <span className="hero-feature-text mt-2">Explore</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="hero-cta">
                <button
                  onClick={handleStartPlanning}
                  className="modern-cta-btn text-lg px-10 py-4 rounded-full border-none cursor-pointer"
                >
                  Start Planning Your Adventure
                  <span className="cta-arrow ml-2">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Scroll Indicator */}
      <div className="modern-scroll-indicator absolute bottom-8 left-8 text-white">
        <div className="scroll-text text-sm mb-2 opacity-80">
          Scroll to explore
        </div>
        <div className="scroll-line">
          <div className="scroll-dot"></div>
        </div>
      </div>
    </section>
  );
}
