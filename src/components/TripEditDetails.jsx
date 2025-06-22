import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEdit,
  FaArrowLeft,
  FaPlus,
  FaCheckCircle,
  FaDownload,
} from "react-icons/fa";
import { useHotels, useHotelsRegions } from "../hooks/useHotels";
import HotelModal from "./HotelModal";
import ActivityModal from "./ActivityModal";
import { generateTripPDF } from "../utils/pdfGenerator";
import { getDestinationCoordinates } from "../utils/locationUtils";
import { toast } from "react-toastify";

export default function TripEditDetails({ trip, onEditTrip }) {
  const { tripName, location, startDate, endDate } = trip;
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Activity modal states
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [selectedDayForActivity, setSelectedDayForActivity] = useState(null);
  const [tripActivities, setTripActivities] = useState({});

  // Generate future dates for hotel search if trip dates are in the past
  const getHotelSearchDates = () => {
    const now = new Date();
    const tripStart = new Date(startDate);
    const tripEnd = new Date(endDate);

    // If trip dates are in the future, use them
    if (tripStart > now) {
      return {
        searchStartDate: startDate,
        searchEndDate: endDate,
      };
    }

    // If trip dates are in the past, use future dates for hotel search
    const futureStart = new Date(now);
    futureStart.setDate(now.getDate() + 30); // 30 days from now

    const tripDuration = Math.abs(tripEnd - tripStart) / (1000 * 60 * 60 * 24);
    const futureEnd = new Date(futureStart);
    futureEnd.setDate(futureStart.getDate() + Math.max(1, tripDuration)); // At least 1 day

    return {
      searchStartDate: futureStart.toISOString().split("T")[0],
      searchEndDate: futureEnd.toISOString().split("T")[0],
    };
  };

  const { searchStartDate, searchEndDate } = getHotelSearchDates();

  const { isLoading: isLoadingRegions, data: regionsData } =
    useHotelsRegions(location);
  const {
    isLoading: isLoadingHotels,
    data: hotels,
    error: hotelsError,
  } = useHotels(selectedRegion?.gaiaId, searchStartDate, searchEndDate, 2);

  function handleSearchHotels() {
    if (regionsData?.data?.length > 0) {
      const cityRegion =
        regionsData.data.find((region) => region.type === "CITY") ||
        regionsData.data[0];
      setSelectedRegion(cityRegion);
      setIsModalOpen(true);
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  function handleSelectHotel(hotel) {
    setSelectedHotel(hotel);
    setIsModalOpen(false);
  }

  // Calculate the number of days and generate date array
  const calculateTripDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end dates

    const days = [];
    for (let i = 0; i < diffDays; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      days.push({
        date: currentDate,
        dayNumber: i + 1,
        activities: tripActivities[i + 1] || [], // Get activities for this day
      });
    }
    return days;
  };

  const tripDays = calculateTripDays();

  const handleAddActivity = (dayNumber) => {
    setSelectedDayForActivity(dayNumber);
    setIsActivityModalOpen(true);
  };

  const handleCloseActivityModal = () => {
    setIsActivityModalOpen(false);
    setSelectedDayForActivity(null);
  };

  const handleSelectActivity = (activity) => {
    if (selectedDayForActivity) {
      setTripActivities((prev) => ({
        ...prev,
        [selectedDayForActivity]: [
          ...(prev[selectedDayForActivity] || []),
          activity,
        ],
      }));
    }
    handleCloseActivityModal();
  };

  const destinationCoords = getDestinationCoordinates(location);

  // Create trip data structure
  const getTripData = () => {
    return {
      tripDetails: {
        name: tripName,
        destination: location,
        startDate: startDate,
        endDate: endDate,
        duration: `${tripDays.length} ${
          tripDays.length === 1 ? "day" : "days"
        }`,
      },
      accommodation: selectedHotel
        ? {
            name: selectedHotel.name,
            neighborhood: selectedHotel.neighborhood?.name,
            rating: selectedHotel.reviews?.score,
            totalReviews: selectedHotel.reviews?.total,
            pricePerNight: selectedHotel.price?.lead?.formatted,
            imageUrl: selectedHotel.propertyImage?.image?.url,
          }
        : null,
      itinerary: tripDays.map((day) => ({
        dayNumber: day.dayNumber,
        date: day.date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        activities: day.activities.map((activity) => ({
          name: activity.name,
          category: activity.category,
          distance: activity.distance,
        })),
      })),
      generatedOn: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  // Download trip function (PDF)
  const handleDownloadTrip = () => {
    const tripData = getTripData();
    generateTripPDF(tripData, tripName);
  };

  // Save trip function (to localStorage)
  const handleSaveTrip = () => {
    const tripData = getTripData();
    const savedTrips = JSON.parse(localStorage.getItem("savedTrips") || "[]");

    // Check if trip already exists (by name and dates)
    const existingTripIndex = savedTrips.findIndex(
      (savedTrip) =>
        savedTrip.tripDetails.name === tripName &&
        savedTrip.tripDetails.startDate === startDate &&
        savedTrip.tripDetails.endDate === endDate
    );

    if (existingTripIndex !== -1) {
      // Update existing trip
      savedTrips[existingTripIndex] = tripData;
      toast.success("Trip updated successfully!");
    } else {
      // Add new trip
      savedTrips.push(tripData);
      toast.success("Trip saved successfully!");
    }

    localStorage.setItem("savedTrips", JSON.stringify(savedTrips));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Trip Header - Compact Modern Design */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Trip Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent truncate">
                    {tripName.charAt(0).toUpperCase() + tripName.slice(1)}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-blue-500" />
                      <span className="font-medium">{location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-emerald-500" />
                      <span>
                        {tripDays.length}{" "}
                        {tripDays.length === 1 ? "day" : "days"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Mobile Responsive */}
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={onEditTrip}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-all duration-200 text-sm font-medium"
                  >
                    <FaArrowLeft className="text-xs" />
                    <span className="hidden sm:inline">Back</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                    <FaEdit className="text-xs" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                </div>
              </div>

              {/* Date Range */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-100 to-slate-200 rounded-full text-sm font-medium text-slate-700">
                <span>
                  {new Date(startDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="text-slate-400">→</span>
                <span>
                  {new Date(endDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Accommodation Section - Compact */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4 sm:p-6">
          {!selectedHotel ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-bold text-slate-800 mb-1">
                  Accommodation
                </h2>
                <p className="text-sm text-slate-600">
                  Find hotels in {location}
                </p>
              </div>
              <button
                onClick={handleSearchHotels}
                disabled={isLoadingRegions}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none text-sm"
              >
                <FaMapMarkerAlt />
                {isLoadingRegions ? "Loading..." : "Search Hotels"}
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-800">
                  Selected Hotel
                </h2>
                <button
                  onClick={() => setSelectedHotel(null)}
                  className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Change
                </button>
              </div>

              <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                <div className="flex gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                    {selectedHotel.propertyImage?.image?.url ? (
                      <img
                        src={selectedHotel.propertyImage.image.url}
                        alt={selectedHotel.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                        <FaMapMarkerAlt className="text-slate-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 truncate mb-1">
                      {selectedHotel.name}
                    </h3>
                    {selectedHotel.neighborhood?.name && (
                      <p className="text-sm text-slate-600 mb-2 flex items-center gap-1">
                        <FaMapMarkerAlt className="text-xs" />
                        {selectedHotel.neighborhood.name}
                      </p>
                    )}

                    <div className="flex items-center justify-between">
                      {selectedHotel.reviews?.score && (
                        <span className="text-sm text-slate-600">
                          {selectedHotel.reviews.score}/10 (
                          {selectedHotel.reviews.total})
                        </span>
                      )}
                      {selectedHotel.price?.lead?.formatted && (
                        <span className="font-bold text-orange-600">
                          {selectedHotel.price.lead.formatted}/night
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Itinerary Section - Ultra Compact Grid */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-100 to-slate-200 px-4 sm:px-6 py-3 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800">Itinerary</h2>
            <p className="text-sm text-slate-600">
              Plan activities for each day
            </p>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
              {tripDays.map((day) => (
                <div
                  key={day.dayNumber}
                  className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-3 border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 group"
                >
                  {/* Day Header */}
                  <div className="text-center mb-3">
                    <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                      <span className="text-white text-xs font-bold">
                        {day.dayNumber}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-700 mb-1">
                      Day {day.dayNumber}
                    </p>
                    <p className="text-xs text-slate-500">
                      {day.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Activities */}
                  <div className="min-h-[50px] mb-3">
                    {day.activities.length === 0 ? (
                      <div className="h-12 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-slate-400">
                          No activities
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1 max-h-24 overflow-y-auto">
                        {day.activities.map((activity, index) => (
                          <div
                            key={index}
                            className="bg-white p-2 rounded-lg border border-slate-200 shadow-sm"
                          >
                            <p className="text-xs font-medium text-slate-800 truncate">
                              {activity.name}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                              {activity.category}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add Button */}
                  <button
                    onClick={() => handleAddActivity(day.dayNumber)}
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-2 px-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <FaPlus className="text-xs" />
                    ADD
                  </button>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6 pt-6 border-t border-slate-200">
              <button
                onClick={handleSaveTrip}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FaCheckCircle />
                Save Trip
              </button>
              <button
                onClick={handleDownloadTrip}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <FaDownload />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <HotelModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        hotels={hotels}
        isLoading={isLoadingHotels}
        error={hotelsError}
        location={location}
        startDate={searchStartDate}
        endDate={searchEndDate}
        onSelectHotel={handleSelectHotel}
      />

      <ActivityModal
        isOpen={isActivityModalOpen}
        onClose={handleCloseActivityModal}
        onSelectActivity={handleSelectActivity}
        latitude={destinationCoords.lat}
        longitude={destinationCoords.lng}
        destinationName={location}
      />
    </div>
  );
}
