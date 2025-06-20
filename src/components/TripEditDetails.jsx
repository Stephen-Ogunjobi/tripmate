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
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Compact Success Banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white">
        <div className="flex items-center gap-4">
          <FaCheckCircle className="text-2xl flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-primary text-lg font-bold mb-1">
              Trip Created Successfully!
            </h3>
            <p className="font-worksans text-green-100 text-sm opacity-90">
              Ready to plan your itinerary
            </p>
          </div>
        </div>
      </div>

      {/* Trip Details Header - Full Width */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Trip Name */}
          <div className="lg:col-span-4">
            <h2 className="font-primary text-2xl font-bold text-primary mb-1">
              {tripName}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
          </div>

          {/* Trip Details */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <FaMapMarkerAlt className="text-white text-sm" />
              </div>
              <div>
                <span className="font-worksans text-gray-500 text-xs font-medium">
                  Destination
                </span>
                <p className="font-worksans text-base font-bold text-gray-800">
                  {location}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                <FaCalendarAlt className="text-white text-sm" />
              </div>
              <div>
                <span className="font-worksans text-gray-500 text-xs font-medium">
                  Duration
                </span>
                <p className="font-worksans text-base font-bold text-gray-800">
                  {tripDays.length} {tripDays.length === 1 ? "day" : "days"}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="lg:col-span-2 flex gap-2">
            <button
              onClick={onEditTrip}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-worksans font-medium py-2 px-4 rounded-lg border-none cursor-pointer transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
            >
              <FaArrowLeft className="text-xs" />
              Back
            </button>
            <button className="flex-1 bg-gradient-to-r from-secondary to-primary text-white font-worksans font-medium py-2 px-4 rounded-lg border-none cursor-pointer hover:from-primary hover:to-secondary transition-all duration-200 flex items-center justify-center gap-2 text-sm">
              <FaEdit className="text-xs" />
              Edit
            </button>
          </div>
        </div>

        {/* Date Range - Compact */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="font-worksans text-gray-600 text-center text-sm">
            <span className="font-semibold">
              {new Date(startDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {" → "}
            <span className="font-semibold">
              {new Date(endDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </p>
        </div>
      </div>

      {/* Accommodation Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        {!selectedHotel ? (
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-primary text-lg font-bold text-primary mb-1">
                Find Accommodation
              </h3>
              <p className="font-worksans text-gray-600 text-sm">
                Search for nearby hotels and accommodations in {location}
              </p>
            </div>
            <button
              onClick={handleSearchHotels}
              disabled={isLoadingRegions}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-worksans font-bold py-3 px-6 rounded-xl border-none cursor-pointer hover:from-red-600 hover:to-orange-500 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <FaMapMarkerAlt className="text-sm" />
              {isLoadingRegions ? "Loading..." : "Search Hotels"}
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-primary text-lg font-bold text-primary">
                Selected Accommodation
              </h3>
              <button
                onClick={() => setSelectedHotel(null)}
                className="text-gray-500 hover:text-gray-700 font-worksans text-sm"
              >
                Change Hotel
              </button>
            </div>

            {/* Selected Hotel Display */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="flex">
                {/* Hotel Image */}
                <div className="w-32 h-32 flex-shrink-0">
                  {selectedHotel.propertyImage?.image?.url ? (
                    <img
                      src={selectedHotel.propertyImage.image.url}
                      alt={selectedHotel.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                      <FaMapMarkerAlt className="text-gray-400 text-2xl" />
                    </div>
                  )}
                </div>

                {/* Hotel Details */}
                <div className="flex-1 p-4">
                  <h4 className="font-primary text-lg font-bold text-gray-900 mb-1">
                    {selectedHotel.name}
                  </h4>

                  {selectedHotel.neighborhood?.name && (
                    <p className="font-worksans text-sm text-gray-600 mb-2 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-xs" />
                      {selectedHotel.neighborhood.name}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    {selectedHotel.reviews?.score && (
                      <div className="flex items-center gap-1">
                        <span className="font-worksans text-sm text-gray-600">
                          {selectedHotel.reviews.score}/10 (
                          {selectedHotel.reviews.total} reviews)
                        </span>
                      </div>
                    )}

                    {selectedHotel.price?.lead?.formatted && (
                      <div className="text-right">
                        <span className="font-primary text-xl font-bold text-orange-600">
                          {selectedHotel.price.lead.formatted}
                        </span>
                        <span className="font-worksans text-sm text-gray-500 ml-1">
                          /night
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Itinerary Planning Section - Full Width */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <h3 className="font-primary text-lg font-bold text-primary">
            Plan Your Itinerary
          </h3>
          <p className="font-worksans text-gray-600 text-sm">
            Add activities for each day of your trip
          </p>
        </div>

        {/* Days Grid - Full Width, More Columns */}
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {tripDays.map((day) => (
              <div
                key={day.dayNumber}
                className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:border-secondary transition-colors duration-200"
              >
                {/* Day Header - Compact */}
                <div className="text-center mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="font-worksans font-bold text-white text-sm">
                      {day.dayNumber}
                    </span>
                  </div>
                  <h4 className="font-primary text-sm font-bold text-primary mb-1">
                    Day {day.dayNumber}
                  </h4>
                  <p className="font-worksans text-xs text-gray-600">
                    {day.date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {/* Activities Display - Compact */}
                <div className="min-h-[60px] mb-3">
                  {day.activities.length === 0 ? (
                    <div className="flex items-center justify-center h-16 border-2 border-dashed border-gray-300 rounded-lg">
                      <p className="font-worksans text-gray-400 text-xs">
                        No activities
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {day.activities.map((activity, index) => (
                        <div
                          key={index}
                          className="bg-white p-2 rounded border border-gray-200 shadow-sm"
                        >
                          <p className="font-worksans text-xs font-medium text-gray-800 truncate">
                            {activity.name}
                          </p>
                          <p className="font-worksans text-xs text-gray-500 truncate">
                            {activity.category}
                          </p>
                          {activity.distance && (
                            <p className="font-worksans text-xs text-gray-400">
                              {activity.distance}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add Activity Button - Compact */}
                <button
                  onClick={() => handleAddActivity(day.dayNumber)}
                  className="w-full bg-gradient-to-r from-secondary to-primary text-white font-worksans font-medium py-2 px-3 rounded-lg border-none cursor-pointer hover:from-primary hover:to-secondary transition-all duration-200 flex items-center justify-center gap-2 text-xs transform hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                >
                  <FaPlus className="text-xs" />
                  ADD ACTIVITY
                </button>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex justify-center gap-4">
            <button
              onClick={handleSaveTrip}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-worksans font-bold py-3 px-8 rounded-xl border-none cursor-pointer hover:from-indigo-600 hover:to-blue-500 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200 flex items-center gap-3"
            >
              <FaCheckCircle className="text-lg" />
              Save Trip
            </button>
            <button
              onClick={handleDownloadTrip}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-worksans font-bold py-3 px-8 rounded-xl border-none cursor-pointer hover:from-emerald-600 hover:to-green-500 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-200 flex items-center gap-3"
            >
              <FaDownload className="text-lg" />
              Download Trip
            </button>
          </div>
        </div>
      </div>

      {/* Hotel Search Modal */}
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

      {/* Activity Search Modal */}
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
