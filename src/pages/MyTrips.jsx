import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrash,
  FaDownload,
  FaPlane,
  FaHotel,
  FaListUl,
  FaRocket,
} from "react-icons/fa";
import { generateTripPDF } from "../utils/pdfGenerator";
import { toast } from "react-toastify";

export default function MyTrips() {
  const [savedTrips, setSavedTrips] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved trips from localStorage and trigger animations
  useEffect(() => {
    const trips = JSON.parse(localStorage.getItem("savedTrips") || "[]");
    setSavedTrips(trips);
    setIsLoaded(true);
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
      <div
        className={`mt-12 bg-background min-h-screen ${
          isLoaded ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className={`font-primary text-5xl sm:text-6xl font-black text-primary mb-3 tracking-tight ${
                isLoaded ? "animate-slide-up" : "translate-y-8 opacity-0"
              } transition-all duration-1000 delay-300`}
            >
              My Trips
            </h1>
            <p
              className={`font-worksans text-gray-600 text-lg font-medium ${
                isLoaded ? "animate-slide-up" : "translate-y-8 opacity-0"
              } transition-all duration-1000 delay-500`}
            >
              Your saved travel plans and itineraries
            </p>
          </div>

          {/* Empty State */}
          <div
            className={`bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 p-8 text-center max-w-md mx-auto hover:shadow-2xl transition-shadow duration-300 ${
              isLoaded ? "animate-slide-up" : "translate-y-12 opacity-0"
            } transition-all duration-1000 delay-700`}
          >
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaPlane className="text-3xl text-secondary" />
            </div>
            <h2 className="font-primary font-bold text-2xl text-primary mb-3">
              No Saved Trips Yet
            </h2>
            <p className="font-worksans text-gray-600 mb-6 leading-relaxed">
              Start planning your adventures! Create and save your first trip to
              see it here.
            </p>
            <button
              onClick={() => (window.location.href = "/trip-planner")}
              className="group relative bg-primary text-white font-worksans font-bold py-3 px-6 rounded-xl overflow-hidden transition-all duration-300 hover:bg-secondary hover:scale-105 hover:shadow-xl active:scale-95"
            >
              <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                <FaRocket className="text-lg group-hover:animate-bounce" />
                Plan Your First Trip
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`mt-12 bg-background min-h-screen ${
        isLoaded ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className={`font-primary text-4xl sm:text-5xl font-black text-primary mb-3 tracking-tight ${
              isLoaded ? "animate-slide-up" : "translate-y-8 opacity-0"
            } transition-all duration-1000 delay-300`}
          >
            My Trips
          </h1>
          <p
            className={`font-worksans text-gray-600 text-lg font-medium ${
              isLoaded ? "animate-slide-up" : "translate-y-8 opacity-0"
            } transition-all duration-1000 delay-500`}
          >
            You have {savedTrips.length} saved{" "}
            {savedTrips.length === 1 ? "trip" : "trips"}
          </p>
        </div>

        {/* Trips Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 mb-8 ${
            isLoaded ? "animate-slide-up" : "translate-y-12 opacity-0"
          } transition-all duration-1000 delay-700`}
        >
          {savedTrips.map((trip, index) => (
            <div
              key={index}
              className="group bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1"
            >
              {/* Trip Header */}
              <div className="bg-primary p-4 text-white relative overflow-hidden group-hover:bg-secondary transition-colors duration-300">
                <div className="relative">
                  <h3 className="font-primary font-bold text-lg mb-1 truncate">
                    {trip.tripDetails.name.charAt(0).toUpperCase() +
                      trip.tripDetails.name.slice(1)}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-200">
                    <FaMapMarkerAlt className="text-sm" />
                    <span className="font-worksans text-sm font-medium">
                      {trip.tripDetails.destination}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trip Details */}
              <div className="p-4 space-y-3">
                {/* Dates */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaCalendarAlt className="text-secondary text-sm" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-worksans text-sm font-semibold text-gray-700 truncate">
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
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaHotel className="text-orange-600 text-sm" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-worksans text-sm font-semibold text-gray-700 truncate">
                        {trip.accommodation.name}
                      </p>
                      <p className="font-worksans text-xs text-gray-500 truncate">
                        {trip.accommodation.neighborhood || "Hotel booked"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Activities Summary */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaListUl className="text-green-600 text-sm" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-worksans text-sm font-semibold text-gray-700">
                      {getTotalActivities(trip.itinerary)} Activities Planned
                    </p>
                    <p className="font-worksans text-xs text-gray-500">
                      Across {trip.itinerary.length} days
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleDownloadTrip(trip)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 font-worksans font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm hover:shadow-sm border border-gray-200 hover:border-gray-300"
                    title="Download PDF"
                  >
                    <FaDownload className="text-xs" />
                    PDF
                  </button>
                  <button
                    onClick={() => handleDeleteTrip(index)}
                    className="flex-1 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 font-worksans font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm hover:shadow-sm border border-gray-200 hover:border-red-200"
                    title="Delete Trip"
                  >
                    <FaTrash className="text-xs" />
                    Delete
                  </button>
                </div>
              </div>

              {/* Generation Info */}
              <div className="px-4 pb-3">
                <p className="font-worksans text-xs text-gray-400 text-center">
                  Saved on {trip.generatedOn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Animated Action Bar */}
        <div
          className={`text-center ${
            isLoaded ? "animate-slide-up" : "translate-y-12 opacity-0"
          } transition-all duration-1000 delay-900`}
        >
          <button
            onClick={() => (window.location.href = "/trip-planner")}
            className="group relative inline-flex items-center gap-3 bg-primary text-white font-worksans font-bold py-4 px-8 rounded-2xl overflow-hidden transition-all duration-500 hover:bg-secondary hover:scale-110 hover:shadow-2xl active:scale-95 animate-pulse hover:animate-none"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full animate-ping animation-delay-100"></div>
              <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-ping animation-delay-300"></div>
              <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white rounded-full animate-ping animation-delay-500"></div>
            </div>

            {/* Button content */}
            <div className="relative flex items-center gap-3">
              <FaRocket className="text-xl group-hover:animate-bounce transition-transform duration-300 group-hover:rotate-12" />
              <span className="text-lg tracking-wide">Plan Another Trip</span>
              <div className="w-2 h-2 bg-white rounded-full group-hover:animate-ping"></div>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          </button>
        </div>
      </div>
    </div>
  );
}
