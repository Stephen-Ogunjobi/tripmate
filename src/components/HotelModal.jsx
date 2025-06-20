import React from "react";
import {
  FaTimes,
  FaMapMarkerAlt,
  FaStar,
  FaWifi,
  FaParking,
  FaSwimmingPool,
} from "react-icons/fa";
import { formatDate } from "../utils/helper";

export default function HotelModal({
  isOpen,
  onClose,
  hotels,
  isLoading,
  error,
  location,
  startDate,
  endDate,
  onSelectHotel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-primary text-2xl font-bold mb-1">
                Hotels in {location}
              </h2>
              <p className="font-worksans text-orange-100 text-sm">
                {formatDate(startDate)} → {formatDate(endDate)} • 2 Adults
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all duration-200"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <h3 className="font-primary text-lg font-semibold text-gray-700 mb-2">
                Searching Hotels...
              </h3>
              <p className="font-worksans text-gray-500">
                Finding the best accommodations for your trip
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FaTimes className="text-red-500 text-xl" />
              </div>
              <h3 className="font-primary text-lg font-semibold text-gray-700 mb-2">
                Unable to Load Hotels
              </h3>
              <p className="font-worksans text-gray-500 mb-4">
                There was an error fetching hotel data. Please try again.
              </p>
              <button
                onClick={onClose}
                className="bg-orange-500 hover:bg-orange-600 text-white font-worksans font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          )}

          {/* Hotels Grid */}
          {!isLoading && !error && hotels?.data && (
            <>
              <div className="mb-4">
                <p className="font-worksans text-gray-600">
                  Found {hotels.data.length} hotels
                </p>
              </div>

              {hotels.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hotels.data.map((hotel, index) => (
                    <div
                      key={hotel.id || index}
                      className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
                    >
                      {/* Hotel Image */}
                      {hotel.propertyImage?.image?.url ? (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={hotel.propertyImage.image.url}
                            alt={hotel.propertyImage.alt || hotel.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.parentElement.innerHTML =
                                '<div class="bg-gradient-to-r from-gray-200 to-gray-300 h-48 flex items-center justify-center"><svg class="text-gray-400 text-3xl w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L5.05 4.05zM4.343 4.343L15.657 15.657a7 7 0 01-11.314-11.314z" clip-rule="evenodd"></path></svg></div>';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-48 flex items-center justify-center">
                          <FaMapMarkerAlt className="text-gray-400 text-3xl" />
                        </div>
                      )}

                      {/* Hotel Details */}
                      <div className="p-4">
                        <h3 className="font-primary text-lg font-bold text-gray-900 mb-2">
                          {hotel.name || hotel.propertyName || "Hotel Name"}
                        </h3>

                        {hotel.neighborhood?.name && (
                          <p className="font-worksans text-sm text-gray-600 mb-2 flex items-center gap-1">
                            <FaMapMarkerAlt className="text-xs" />
                            {hotel.neighborhood.name}
                          </p>
                        )}

                        {/* Rating */}
                        {hotel.reviews?.score && (
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`text-sm ${
                                  i < Math.floor(hotel.reviews.score / 2) // Convert 10-point scale to 5-star
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="font-worksans text-sm text-gray-600 ml-1">
                              {hotel.reviews.score}/10 ({hotel.reviews.total}{" "}
                              reviews)
                            </span>
                          </div>
                        )}

                        {/* Amenities */}
                        <div className="flex items-center gap-3 mb-3">
                          <FaWifi
                            className="text-blue-500 text-sm"
                            title="WiFi"
                          />
                          <FaParking
                            className="text-green-500 text-sm"
                            title="Parking"
                          />
                          <FaSwimmingPool
                            className="text-cyan-500 text-sm"
                            title="Pool"
                          />
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          {hotel.price?.lead?.formatted ? (
                            <div>
                              <span className="font-primary text-2xl font-bold text-orange-600">
                                {hotel.price.lead.formatted}
                              </span>
                              {hotel.price.strikeOut?.formatted && (
                                <span className="font-worksans text-sm text-gray-500 line-through ml-2">
                                  {hotel.price.strikeOut.formatted}
                                </span>
                              )}
                              <span className="font-worksans text-sm text-gray-500 ml-1 block">
                                /night
                              </span>
                            </div>
                          ) : (
                            <span className="font-worksans text-gray-500">
                              Price not available
                            </span>
                          )}

                          <button
                            onClick={() => onSelectHotel(hotel)}
                            className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-worksans font-medium py-2 px-4 rounded-lg hover:from-red-600 hover:to-orange-500 transition-all duration-200 text-sm"
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-gray-400 text-xl" />
                  </div>
                  <h3 className="font-primary text-lg font-semibold text-gray-700 mb-2">
                    No Hotels Found
                  </h3>
                  <p className="font-worksans text-gray-500">
                    We couldn't find any hotels for your search criteria.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* Modal Footer */}
        {!isLoading && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-gray-500 hover:bg-gray-600 text-white font-worksans font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
