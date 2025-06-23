import React, { useState, useEffect } from "react";
import { useActivities } from "../hooks/useActivities";

export default function ActivityModal({
  isOpen,
  onClose,
  onSelectActivity,
  latitude,
  longitude,
  destinationName,
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const { isLoading, data, error } = useActivities(
    latitude,
    longitude,
    selectedCategory,
    15
  );

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleActivitySelect = (activity) => {
    const activityData = {
      id: activity.fsq_id,
      name: activity.name,
      category: activity.categories?.[0]?.name || "Activity",
      address: activity.location?.formatted_address || "Address not available",
      distance: activity.distance
        ? `${Math.round((activity.distance / 1000) * 10) / 10}km away`
        : "",
      rating: activity.rating || null,
      coordinates: {
        lat: activity.geocodes?.main?.latitude,
        lng: activity.geocodes?.main?.longitude,
      },
    };
    onSelectActivity(activityData);
    onClose();
  };

  const categoryOptions = [
    { value: "", label: "All Activities" },
    { value: "museums", label: "Museums & Culture" },
    { value: "parks", label: "Parks & Nature" },
    { value: "beaches", label: "Beaches" },
    { value: "shopping", label: "Shopping" },
    { value: "restaurants", label: "Restaurants" },
    { value: "entertainment", label: "Entertainment" },
    { value: "attractions", label: "Tourist Attractions" },
  ];

  return (
    <div
      className={`fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 ${
        isAnimating ? "animate-fade-in" : "opacity-0"
      } transition-all duration-300`}
    >
      <div
        className={`bg-white backdrop-blur-lg rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-hidden shadow-2xl border border-gray-200/50 ${
          isAnimating ? "animate-scale-in" : "scale-95 opacity-0"
        } transition-all duration-500`}
      >
        {/* Modern Header */}
        <div className="relative bg-gradient-to-r from-primary to-secondary p-6 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <h2 className="font-primary text-2xl font-bold mb-1">
                Discover {destinationName}
              </h2>
              <p className="font-worksans text-white text-base">
                Find amazing places and experiences
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-12 h-12 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full flex items-center justify-center text-white text-2xl font-bold transition-all duration-200 hover:scale-110"
            >
              ×
            </button>
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
        </div>

        {/* Modern Category Filter */}
        <div className="p-4 bg-gradient-to-br from-gray-50 to-white border-b border-gray-200/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🔍</span>
            </div>
            <label className="font-worksans font-semibold text-gray-800 text-base">
              Filter Activities
            </label>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 font-worksans text-gray-700 shadow-sm hover:shadow-md"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Modern Content */}
        <div className="p-4 overflow-y-auto max-h-[50vh] bg-gradient-to-b from-white to-gray-50/50">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-primary/20 rounded-full animate-spin border-t-primary"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent rounded-full animate-ping border-t-secondary/50"></div>
              </div>
              <span className="mt-3 font-worksans text-gray-700 text-base font-medium">
                Finding activities...
              </span>
              <div className="mt-2 flex gap-1">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="font-primary text-lg font-bold text-red-600 mb-2">
                Something went wrong
              </h3>
              <p className="font-worksans text-gray-700 text-sm max-w-sm mx-auto">
                {error.message}
              </p>
            </div>
          )}

          {data?.data && data.data.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-primary text-lg font-bold text-gray-700 mb-2">
                No activities found
              </h3>
              <p className="font-worksans text-gray-600 text-sm max-w-sm mx-auto">
                Try selecting a different category
              </p>
            </div>
          )}

          {data?.data && data.data.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.data.map((activity, index) => (
                <div
                  key={activity.fsq_id}
                  className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                  onClick={() => handleActivitySelect(activity)}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-primary font-bold text-gray-900 text-lg leading-tight group-hover:text-primary transition-colors duration-300 flex-1 mr-3">
                      {activity.name}
                    </h3>
                    {activity.rating && (
                      <div className="flex items-center bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                        <span className="mr-1">⭐</span>
                        <span>{activity.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Activity Details */}
                  <div className="space-y-2">
                    {activity.categories?.[0]?.name && (
                      <div className="flex items-center">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {activity.categories[0].name}
                        </span>
                      </div>
                    )}

                    <div className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-red-600 text-xs">📍</span>
                      </div>
                      <p className="font-worksans text-gray-700 text-sm leading-relaxed">
                        {activity.location?.formatted_address ||
                          "Address not available"}
                      </p>
                    </div>

                    {activity.distance && (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 text-xs">📏</span>
                        </div>
                        <p className="font-worksans text-gray-600 text-sm">
                          {Math.round((activity.distance / 1000) * 10) / 10}km
                          away
                        </p>
                      </div>
                    )}

                    {/* Status and Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-sm">
                        {activity.closed_bucket === "VeryLikelyOpen" && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-green-600 font-medium">
                              Likely Open
                            </span>
                          </div>
                        )}
                        {activity.closed_bucket === "VeryLikelyClosed" && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-red-600 font-medium">
                              Likely Closed
                            </span>
                          </div>
                        )}
                        {!activity.closed_bucket && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <span className="text-gray-500 font-medium">
                              Status Unknown
                            </span>
                          </div>
                        )}
                      </div>

                      <button className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-secondary hover:to-primary transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden group">
                        <span className="relative z-10">Add to Trip</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modern Footer */}
        <div className="border-t border-gray-200/50 p-4 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {data?.data?.length || 0}
                </span>
              </div>
              <p className="font-worksans font-semibold text-gray-800 text-sm">
                {data?.data?.length === 1 ? "Activity" : "Activities"} found
              </p>
            </div>
            <button
              onClick={onClose}
              className="group relative px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-gray-700 hover:border-primary hover:text-primary transition-all duration-300 font-worksans font-medium shadow-sm hover:shadow-md overflow-hidden text-sm"
            >
              <span className="relative z-10">Close</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
