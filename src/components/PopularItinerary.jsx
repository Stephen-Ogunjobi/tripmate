import React, { useEffect, useRef } from "react";
import {
  FaClock,
  FaMapMarkerAlt,
  FaUsers,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function PopularItinerary() {
  const navigate = useNavigate();
  const gridRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target;
            const cardIndex = Array.from(card.parentNode.children).indexOf(
              card
            );
            const isMobile = window.innerWidth <= 640;

            // On mobile: all cards come from left, one after another
            // On desktop: alternate left/right based on position
            const shouldAnimateFromRight = isMobile
              ? false
              : cardIndex % 2 === 1;

            // Stagger animation timing
            const delay = cardIndex * 150;

            setTimeout(() => {
              card.classList.remove("scroll-animate");
              card.classList.add(
                shouldAnimateFromRight ? "animate-right" : "animate-left"
              );
            }, delay);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".itinerary-card");
      cards.forEach((card) => {
        card.classList.add("scroll-animate");
        observer.observe(card);
      });
    }

    return () => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".itinerary-card");
        cards.forEach((card) => observer.unobserve(card));
      }
    };
  }, []);
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
      category: "Cultural",
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
      category: "Cultural",
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
      category: "Culinary",
    },
  ];

  return (
    <section className="modern-itinerary-section">
      <div className="max-w-7xl mx-auto">
        {/* Modern Header */}
        <div className="itinerary-header text-center">
          <h2 className="itinerary-main-title">
            Get Inspired by Popular
            <span className="itinerary-accent-text block">Itineraries</span>
          </h2>
          <p className="itinerary-subtitle max-w-3xl mx-auto">
            Discover carefully crafted travel experiences that have delighted
            thousands of travelers worldwide
          </p>
        </div>

        {/* Modern Itinerary Cards */}
        <div className="itinerary-grid" ref={gridRef}>
          {popularItineraries.map((itinerary) => (
            <div key={itinerary.id} className="itinerary-card group">
              {/* Enhanced Image Section */}
              <div className="itinerary-image-container">
                <img
                  src={itinerary.image}
                  alt={itinerary.title}
                  className="itinerary-image"
                />
                <div className="itinerary-image-overlay" />

                {/* Category Badge */}
                <div className="category-badge">{itinerary.category}</div>

                {/* Price Badge */}
                <div className="price-badge">From {itinerary.price}</div>

                {/* Rating */}
                <div className="rating-container">
                  <div className="rating-stars">
                    <FaStar className="star-icon" />
                    <span className="rating-value">{itinerary.rating}</span>
                  </div>
                  <span className="rating-reviews">({itinerary.reviews})</span>
                </div>
              </div>

              {/* Enhanced Content Section */}
              <div className="itinerary-content">
                {/* Title and Location */}
                <div className="itinerary-header-info">
                  <h3 className="itinerary-title">{itinerary.title}</h3>
                  <div className="itinerary-location">
                    <FaMapMarkerAlt className="location-icon" />
                    <span>{itinerary.location}</span>
                  </div>
                </div>

                {/* Trip Details */}
                <div className="trip-details">
                  <div className="trip-detail-item">
                    <FaClock className="detail-icon" />
                    <span>{itinerary.duration}</span>
                  </div>
                  <div className="trip-detail-item">
                    <FaUsers className="detail-icon" />
                    <span>{itinerary.travelers}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="itinerary-description">{itinerary.description}</p>

                {/* Highlights */}
                <div className="highlights-section">
                  <h4 className="highlights-title">Trip Highlights:</h4>
                  <ul className="highlights-list">
                    {itinerary.highlights
                      .slice(0, 3)
                      .map((highlight, index) => (
                        <li key={index} className="highlight-item">
                          <span className="highlight-bullet">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    {itinerary.highlights.length > 3 && (
                      <li className="highlight-more">
                        +{itinerary.highlights.length - 3} more activities
                      </li>
                    )}
                  </ul>
                </div>

                {/* Enhanced CTA Button */}
                <button
                  onClick={() => navigate("/trip-planner")}
                  className="itinerary-cta-btn"
                >
                  <span>View Itinerary</span>
                  <FaArrowRight className="cta-arrow" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
