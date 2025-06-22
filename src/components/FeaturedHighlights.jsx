import React, { useState, useEffect, useRef } from "react";
import {
  FaBrain,
  FaCompass,
  FaHeart,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";

export default function FeaturedHighlights() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  const features = [
    {
      id: 1,
      icon: FaBrain,
      title: "Smart Planner",
      subtitle: "AI-Powered Trip Planning",
      description:
        "Let our intelligent system create personalized itineraries based on your preferences, budget, and travel style.",
      benefits: [
        "Personalized recommendations",
        "Budget optimization",
        "Time-efficient routing",
        "Weather-aware planning",
      ],
      color: "bg-blue-500",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      icon: FaCompass,
      title: "Discover Places",
      subtitle: "Explore Hidden Gems",
      description:
        "Uncover amazing destinations, local attractions, and off-the-beaten-path experiences from popular landmarks to secret spots.",
      benefits: [
        "Curated local experiences",
        "Hidden gem recommendations",
        "Real-time availability",
        "Local insider tips",
      ],
      color: "bg-green-500",
      gradient: "from-green-500 to-teal-600",
    },
    {
      id: 3,
      icon: FaHeart,
      title: "Save Favorites",
      subtitle: "Build Your Dream List",
      description:
        "Create personalized collections of your favorite destinations, activities, and accommodations. Access them anytime, anywhere.",
      benefits: [
        "Unlimited favorites",
        "Organized collections",
        "Share with friends",
        "Sync across devices",
      ],
      color: "bg-red-500",
      gradient: "from-red-500 to-pink-600",
    },
  ];

  const stats = [
    { number: 50000, suffix: "+", label: "Happy Travelers" },
    { number: 200, suffix: "+", label: "Destinations" },
    {
      number: 1000000,
      suffix: "M+",
      label: "Saved Favorites",
      divider: 1000000,
    },
    { number: 4.9, suffix: "★", label: "User Rating", decimal: true },
  ];

  // StatCounter component for individual stat items
  const StatCounter = ({ stat, isVisible }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (!isVisible || hasAnimated) return;

      setHasAnimated(true);
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / 2000, 1);

        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOutCubic(progress);

        const current = stat.number * easedProgress;

        if (stat.decimal) {
          setCount(parseFloat(current.toFixed(1)));
        } else if (stat.divider) {
          setCount(parseFloat((current / stat.divider).toFixed(1)));
        } else {
          setCount(Math.floor(current));
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, hasAnimated, stat]);

    return (
      <div className="text-center group">
        <div className="font-[var(--font-hero-display)] text-2xl sm:text-3xl  text-primary mb-1 group-hover:scale-105 transition-transform duration-300">
          {stat.decimal
            ? count.toFixed(1)
            : stat.divider
            ? count.toFixed(1)
            : Math.floor(count).toLocaleString()}
          {stat.suffix}
        </div>
        <div className="font-[var(--font-modern)] text-gray-600 text-xs sm:text-sm">
          {stat.label}
        </div>
      </div>
    );
  };

  // Intersection Observer for stats animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-[var(--font-hero-display)] text-3xl sm:text-4xl lg:text-5xl  text-primary mb-4">
            Featured Highlights
          </h2>
          <p className="font-[var(--font-modern)] text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover the powerful features that make TripMate your ultimate
            travel companion. Plan smarter, explore more, and save everything
            you love.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-400 overflow-hidden border border-gray-100 transform hover:-translate-y-2"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-400`}
                />

                {/* Content */}
                <div className="relative p-6">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="text-lg" />
                  </div>

                  {/* Title and Subtitle */}
                  <div className="mb-3">
                    <h3 className="font-[var(--font-hero-display)] text-xl  text-primary mb-1">
                      {feature.title}
                    </h3>
                    <p className="font-[var(--font-modern)] text-xs  text-secondary uppercase tracking-wide">
                      {feature.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="font-[var(--font-modern)] text-gray-600 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Benefits List */}
                  <ul className="space-y-2 mb-6">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-center gap-2"
                      >
                        <div
                          className={`flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}
                        >
                          <FaCheck className="text-white text-xs" />
                        </div>
                        <span className="font-[var(--font-modern)] text-xs text-gray-700">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    className={`w-full bg-gradient-to-r ${feature.gradient} text-white font-[var(--font-modern)] py-2.5 px-4 rounded-xl border-none cursor-pointer flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300 hover:shadow-lg text-sm`}
                  >
                    Learn More
                    <FaArrowRight className="text-xs" />
                  </button>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                  <div
                    className={`w-full h-full rounded-full bg-gradient-to-br ${feature.gradient} transform translate-x-12 -translate-y-12`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section with Count Up Animation */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-gray-200"
        >
          <StatCounter stat={stats[0]} isVisible={isVisible} />
          <StatCounter stat={stats[1]} isVisible={isVisible} />
          <StatCounter stat={stats[2]} isVisible={isVisible} />
          <StatCounter stat={stats[3]} isVisible={isVisible} />
        </div>
      </div>
    </section>
  );
}
