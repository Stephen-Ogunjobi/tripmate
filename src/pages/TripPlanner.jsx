import React, { useState, useEffect } from "react";
import TripForm from "../components/TripForm";
import TripEditDetails from "../components/TripEditDetails";
import { useLocation } from "react-router-dom";

export default function TripPlanner() {
  const location = useLocation();
  const destination = location.state?.destination;

  const [newTrip, setNewTrip] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation on component mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`mt-14 bg-background ${
        isLoaded ? "animate-fade-in" : "opacity-0"
      }`}
    >
      {/* Header */}
      <div className="bg-background backdrop-blur-sm text-center py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className={`font-primary text-2xl sm:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent mb-4 tracking-tight leading-tight ${
              isLoaded ? "animate-slide-up" : "translate-y-8 opacity-0"
            } transition-all duration-1000 delay-300`}
            style={{
              textShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              background:
                "linear-gradient(135deg, var(--color-secondary), var(--color-primary))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            Trip Planner
          </h1>
          <p
            className={`text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed ${
              isLoaded ? "animate-slide-up" : "translate-y-8 opacity-0"
            } transition-all duration-1000 delay-500`}
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: "400",
              letterSpacing: "0.025em",
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
            }}
          >
            Create your perfect travel experience with our intelligent planning
            tools and discover amazing destinations around the world
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {newTrip === null ? (
          /* Trip Form Section */
          <div
            className={`max-w-4xl mx-auto ${
              isLoaded ? "animate-slide-up" : "translate-y-12 opacity-0"
            } transition-all duration-1000 delay-700`}
          >
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Form Header */}
              <div
                className="px-6 py-4 relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-secondary), var(--color-primary))",
                }}
              >
                <h2 className="font-primary text-xl font-semibold text-white relative z-10">
                  Trip Details
                </h2>
                <p className="font-worksans text-white/80 text-sm mt-1 relative z-10">
                  Fill in your travel preferences to get started
                </p>
              </div>

              {/* Form Content */}
              <div className="p-6">
                <TripForm onTripCreate={setNewTrip} destination={destination} />
              </div>
            </div>
          </div>
        ) : (
          /* Trip Details Section */
          <div
            className={`space-y-6 ${
              isLoaded ? "animate-slide-up" : "translate-y-12 opacity-0"
            } transition-all duration-1000 delay-700`}
          >
            {/* Trip Details Component */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <TripEditDetails
                  trip={newTrip}
                  onEditTrip={() => setNewTrip(null)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
