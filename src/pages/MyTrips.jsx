import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrash,
  FaDownload,
  FaPlane,
  FaHotel,
  FaListUl,
} from "react-icons/fa";
import { generateTripPDF } from "../utils/pdfGenerator";
import { toast } from "react-toastify";

export default function MyTrips() {
  const [savedTrips, setSavedTrips] = useState([]);

  // Load saved trips from localStorage
  useEffect(() => {
    const trips = JSON.parse(localStorage.getItem("savedTrips") || "[]");
    setSavedTrips(trips);
  }, []);

  // Delete a trip
  const handleDeleteTrip = (tripIndex) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );
    if (confirmDelete) {
      const updatedTrips = savedTrips.filter((_, index) => index !== tripIndex);
      setSavedTrips(updatedTrips);
      localStorage.setItem("savedTrips", JSON.stringify(updatedTrips));
      toast.success("Trip deleted successfully!");
    }
  };

  // Download trip as PDF
  const handleDownloadTrip = (trip) => {
    generateTripPDF(trip, trip.tripDetails.name);
    toast.success("Trip downloaded successfully!");
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate trip duration in days
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  // Get total activities count
  const getTotalActivities = (itinerary) => {
    return itinerary.reduce((total, day) => total + day.activities.length, 0);
  };

  if (savedTrips.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-primary text-4xl font-bold text-primary mb-4">
              My Trips
            </h1>
            <p className="font-worksans text-gray-600 text-lg">
              Your saved travel plans and itineraries
            </p>
          </div>

          {/* Empty State */}
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <FaPlane className="text-6xl text-gray-300 mx-auto mb-6" />
            <h2 className="font-primary text-2xl font-bold text-gray-800 mb-4">
              No Saved Trips Yet
            </h2>
            <p className="font-worksans text-gray-600 mb-8 max-w-md mx-auto">
              Start planning your adventures! Create and save your first trip to
              see it here.
            </p>
            <button
              onClick={() => (window.location.href = "/trip-planner")}
              className="bg-gradient-to-r from-primary to-secondary text-white font-worksans font-bold py-3 px-8 rounded-xl border-none cursor-pointer hover:from-secondary hover:to-primary transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Plan Your First Trip
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-primary text-4xl font-bold text-primary mb-4">
            My Trips
          </h1>
          <p className="font-worksans text-gray-600 text-lg">
            You have {savedTrips.length} saved{" "}
            {savedTrips.length === 1 ? "trip" : "trips"}
          </p>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedTrips.map((trip, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Trip Header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                <h3 className="font-primary text-xl font-bold mb-2 truncate">
                  {trip.tripDetails.name}
                </h3>
                <div className="flex items-center gap-2 text-blue-100">
                  <FaMapMarkerAlt className="text-sm" />
                  <span className="font-worksans text-sm">
                    {trip.tripDetails.destination}
                  </span>
                </div>
              </div>

              {/* Trip Details */}
              <div className="p-6">
                {/* Dates */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FaCalendarAlt className="text-blue-600 text-sm" />
                  </div>
                  <div>
                    <p className="font-worksans text-sm text-gray-600">
                      {formatDate(trip.tripDetails.startDate)} -{" "}
                      {formatDate(trip.tripDetails.endDate)}
                    </p>
                    <p className="font-worksans text-xs text-gray-500">
                      {calculateDuration(
                        trip.tripDetails.startDate,
                        trip.tripDetails.endDate
                      )}{" "}
                      days
                    </p>
                  </div>
                </div>

                {/* Accommodation */}
                {trip.accommodation && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <FaHotel className="text-orange-600 text-sm" />
                    </div>
                    <div>
                      <p className="font-worksans text-sm font-medium text-gray-800 truncate">
                        {trip.accommodation.name}
                      </p>
                      <p className="font-worksans text-xs text-gray-500">
                        {trip.accommodation.neighborhood || "Hotel booked"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Activities Summary */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FaListUl className="text-green-600 text-sm" />
                  </div>
                  <div>
                    <p className="font-worksans text-sm font-medium text-gray-800">
                      {getTotalActivities(trip.itinerary)} Activities Planned
                    </p>
                    <p className="font-worksans text-xs text-gray-500">
                      Across {trip.itinerary.length} days
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownloadTrip(trip)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-worksans font-medium py-2 px-3 rounded-lg border-none cursor-pointer hover:from-emerald-600 hover:to-green-500 transition-all duration-200 flex items-center justify-center gap-2 text-sm transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                    title="Download PDF"
                  >
                    <FaDownload className="text-xs" />
                    PDF
                  </button>
                  <button
                    onClick={() => handleDeleteTrip(index)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white font-worksans font-medium py-2 px-3 rounded-lg border-none cursor-pointer hover:from-pink-600 hover:to-red-500 transition-all duration-200 flex items-center justify-center gap-2 text-sm transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                    title="Delete Trip"
                  >
                    <FaTrash className="text-xs" />
                    Delete
                  </button>
                </div>
              </div>

              {/* Generation Info */}
              <div className="px-6 pb-4">
                <p className="font-worksans text-xs text-gray-400 text-center">
                  Saved on {trip.generatedOn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="mt-12 text-center">
          <button
            onClick={() => (window.location.href = "/trip-planner")}
            className="bg-gradient-to-r from-primary to-secondary text-white font-worksans font-bold py-3 px-8 rounded-xl border-none cursor-pointer hover:from-secondary hover:to-primary transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 mx-auto"
          >
            <FaPlane className="text-lg" />
            Plan Another Trip
          </button>
        </div>
      </div>
    </div>
  );
}
