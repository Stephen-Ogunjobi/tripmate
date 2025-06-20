import React, { useState } from "react";
import TripForm from "../components/TripForm";
import TripEditDetails from "../components/TripEditDetails";
import { useLocation } from "react-router-dom";

export default function TripPlanner() {
  const location = useLocation();
  const destination = location.state?.destination;

  const [newTrip, setNewTrip] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="font-primary text-4xl sm:text-5xl font-bold text-primary mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Trip Planner
        </h1>
        <p className="font-worksans text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Create your perfect trip with our intelligent planning tools. Let's
          make your travel dreams come true!
        </p>
      </div>

      {/* Form Section */}
      <div>
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
            <h2 className="font-primary text-2xl sm:text-3xl font-bold mb-2">
              Trip Details
            </h2>
            <p className="font-worksans text-blue-100 opacity-90">
              Fill in the details below to start planning your adventure
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {newTrip === null ? (
              <TripForm onTripCreate={setNewTrip} destination={destination} />
            ) : (
              <TripEditDetails
                trip={newTrip}
                onEditTrip={() => setNewTrip(null)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
