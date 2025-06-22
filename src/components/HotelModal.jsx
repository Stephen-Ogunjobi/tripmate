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
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100 animate-slideUp">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 relative">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-primary text-3xl font-bold mb-2 text-white">
                Hotels in {location}
              </h2>
              <div className="flex items-center gap-2 text-orange-100">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {formatDate(startDate)} → {formatDate(endDate)}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  2 Adults
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2.5 transition-all duration-200 text-white hover:rotate-90 transform"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] custom-scrollbar">
          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500/20 border-t-orange-500 mx-auto mb-6"></div>
              <h3 className="font-primary text-xl font-semibold text-gray-700 mb-2">
                Searching Hotels...
              </h3>
              <p className="font-worksans text-gray-500">
                Finding the best accommodations for your trip
              </p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <div className="bg-red-100 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <FaTimes className="text-red-500 text-2xl" />
              </div>
              <h3 className="font-primary text-xl font-semibold text-gray-700 mb-3">
                Unable to Load Hotels
              </h3>
              <p className="font-worksans text-gray-500 mb-6">
                There was an error fetching hotel data. Please try again.
              </p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-red-600 hover:to-orange-500 text-white font-worksans font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
              >
                Close
              </button>
            </div>
          )}

          {/* Hotels Grid */}
          {!isLoading && !error && hotels?.data && (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="font-worksans text-gray-600 bg-orange-50 px-4 py-2 rounded-full">
                  {hotels.data.length} hotels available
                </p>
                <div className="flex gap-2">
                  {/* Add filter buttons here if needed */}
                </div>
              </div>

              {hotels.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {hotels.data.map((hotel, index) => (
                    <div
                      key={hotel.id || index}
                      className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      {/* Hotel Image */}
                      {hotel.propertyImage?.image?.url ? (
                        <div className="h-56 overflow-hidden relative group">
                          <img
                            src={hotel.propertyImage.image.url}
                            alt={hotel.propertyImage.alt || hotel.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              e.target.parentElement.innerHTML =
                                '<div class="bg-gradient-to-r from-gray-200 to-gray-300 h-56 flex items-center justify-center"><svg class="text-gray-400 text-4xl w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L5.05 4.05zM4.343 4.343L15.657 15.657a7 7 0 01-11.314-11.314z" clip-rule="evenodd"></path></svg></div>';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-56 flex items-center justify-center">
                          <FaMapMarkerAlt className="text-gray-400 text-4xl" />
                        </div>
                      )}

                      {/* Hotel Details */}
                      <div className="p-6">
                        <h3 className="font-primary text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {hotel.name || hotel.propertyName || "Hotel Name"}
                        </h3>

                        {hotel.neighborhood?.name && (
                          <p className="font-worksans text-sm text-gray-600 mb-3 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-orange-500" />
                            {hotel.neighborhood.name}
                          </p>
                        )}

                        {/* Rating */}
                        {hotel.reviews?.score && (
                          <div className="flex items-center gap-1 mb-4 bg-orange-50 p-2 rounded-lg">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`text-sm ${
                                  i < Math.floor(hotel.reviews.score / 2)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="font-worksans text-sm text-gray-700 ml-2 font-medium">
                              {hotel.reviews.score}/10
                            </span>
                            <span className="text-gray-500 text-sm ml-1">
                              ({hotel.reviews.total} reviews)
                            </span>
                          </div>
                        )}

                        {/* Amenities */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-600">
                            <FaWifi className="text-blue-500" title="WiFi" />
                            <span className="text-sm">WiFi</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <FaParking
                              className="text-green-500"
                              title="Parking"
                            />
                            <span className="text-sm">Parking</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <FaSwimmingPool
                              className="text-cyan-500"
                              title="Pool"
                            />
                            <span className="text-sm">Pool</span>
                          </div>
                        </div>

                        {/* Price and Action */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          {hotel.price?.lead?.formatted ? (
                            <div>
                              <span className="font-primary text-3xl font-bold text-orange-600">
                                {hotel.price.lead.formatted}
                              </span>
                              {hotel.price.strikeOut?.formatted && (
                                <span className="font-worksans text-sm text-gray-500 line-through ml-2">
                                  {hotel.price.strikeOut.formatted}
                                </span>
                              )}
                              <span className="font-worksans text-sm text-gray-500 block">
                                per night
                              </span>
                            </div>
                          ) : (
                            <span className="font-worksans text-gray-500">
                              Price not available
                            </span>
                          )}

                          <button
                            onClick={() => onSelectHotel(hotel)}
                            className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-worksans font-medium py-2.5 px-6 rounded-lg hover:from-red-600 hover:to-orange-500 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                          >
                            Select
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-orange-50 rounded-full p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <FaMapMarkerAlt className="text-orange-500 text-2xl" />
                  </div>
                  <h3 className="font-primary text-xl font-semibold text-gray-700 mb-3">
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
        {!isLoading && !error && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-worksans font-medium py-2.5 px-6 rounded-lg transition-colors duration-200"
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
