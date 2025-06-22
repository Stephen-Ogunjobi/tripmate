import React, { useState } from "react";
import TripForm from "../components/TripForm";
import TripEditDetails from "../components/TripEditDetails";
import { useLocation } from "react-router-dom";

export default function TripPlanner() {
  const location = useLocation();
  const destination = location.state?.destination;

  const [newTrip, setNewTrip] = useState(null);

  return (
    <div className="mt-14 bg-background">
      {/* Header */}
      <div className="bg-background backdrop-blur-sm text-center py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1
            className="font-primary text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 tracking-tight leading-tight"
            style={{ textShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}
          >
            Trip Planner
          </h1>
          <p
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
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
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h2 className="font-primary text-xl font-semibold text-white">
                  Trip Details
                </h2>
                <p className="font-worksans text-blue-100 text-sm mt-1">
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
          <div className="space-y-6">
            {/* Trip Details Component */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
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
