import React from "react";
import {
  FaBrain,
  FaCompass,
  FaHeart,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";

export default function FeaturedHighlights() {
  const features = [
    {
      id: 1,
      icon: FaBrain,
      title: "Smart Planner",
      subtitle: "AI-Powered Trip Planning",
      description:
        "Let our intelligent system create personalized itineraries based on your preferences, budget, and travel style. Get optimized routes and timing suggestions.",
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
        "Uncover amazing destinations, local attractions, and off-the-beaten-path experiences. From popular landmarks to secret local spots.",
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

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-primary text-4xl sm:text-5xl font-bold text-primary mb-6">
            Featured Highlights
          </h2>
          <p className="font-worksans text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the powerful features that make TripMate your ultimate
            travel companion. Plan smarter, explore more, and save everything
            you love.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 transform hover:-translate-y-3"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="text-2xl" />
                  </div>

                  {/* Title and Subtitle */}
                  <div className="mb-4">
                    <h3 className="font-primary text-2xl font-bold text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-worksans text-sm font-semibold text-secondary uppercase tracking-wide">
                      {feature.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="font-worksans text-gray-600 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Benefits List */}
                  <ul className="space-y-3 mb-8">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <li
                        key={benefitIndex}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}
                        >
                          <FaCheck className="text-white text-xs" />
                        </div>
                        <span className="font-worksans text-sm text-gray-700">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    className={`w-full bg-gradient-to-r ${feature.gradient} text-white font-worksans font-semibold py-3 px-6 rounded-xl border-none cursor-pointer flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300 hover:shadow-lg`}
                  >
                    Learn More
                    <FaArrowRight className="text-sm" />
                  </button>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div
                    className={`w-full h-full rounded-full bg-gradient-to-br ${feature.gradient} transform translate-x-16 -translate-y-16`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center bg-white rounded-3xl shadow-lg p-12 border border-gray-100">
          <h3 className="font-primary text-3xl font-bold text-primary mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="font-worksans text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust TripMate to plan their perfect
            adventures. Start exploring with our powerful features today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-primary font-worksans font-semibold px-8 py-4 rounded-full border-none cursor-pointer flex items-center gap-2 hover:gap-3 transition-all duration-200">
              Get Started Free
              <FaArrowRight />
            </button>
            <button className="font-worksans font-semibold text-secondary hover:text-primary border-2 border-secondary hover:border-primary px-8 py-4 rounded-full transition-colors duration-200 bg-transparent cursor-pointer">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          {[
            { number: "50K+", label: "Happy Travelers" },
            { number: "200+", label: "Destinations" },
            { number: "1M+", label: "Saved Favorites" },
            { number: "4.9★", label: "User Rating" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-primary text-3xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="font-worksans text-gray-600 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
