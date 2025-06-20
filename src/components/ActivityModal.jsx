import React, { useState } from "react";
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
  const { isLoading, data, error } = useActivities(
    latitude,
    longitude,
    selectedCategory,
    15
  );

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Activities in {destinationName}
            </h2>
            <p className="text-gray-600 mt-1">
              Discover amazing places to visit and things to do
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Category Filter */}
        <div className="p-6 border-b bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Category:
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Finding activities...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="text-red-600 mb-2">
                ⚠️ Error loading activities
              </div>
              <p className="text-gray-600">{error.message}</p>
            </div>
          )}

          {data?.data && data.data.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-2">🔍 No activities found</div>
              <p className="text-gray-600">
                Try selecting a different category or location
              </p>
            </div>
          )}

          {data?.data && data.data.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.data.map((activity) => (
                <div
                  key={activity.fsq_id}
                  className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleActivitySelect(activity)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                      {activity.name}
                    </h3>
                    {activity.rating && (
                      <div className="flex items-center bg-green-100 px-2 py-1 rounded text-sm">
                        <span className="text-green-800 font-medium">
                          ⭐ {activity.rating}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    {activity.categories?.[0]?.name && (
                      <div className="flex items-center text-sm text-blue-600">
                        <span className="bg-blue-100 px-2 py-1 rounded text-xs">
                          {activity.categories[0].name}
                        </span>
                      </div>
                    )}

                    <p className="text-gray-600 text-sm">
                      📍{" "}
                      {activity.location?.formatted_address ||
                        "Address not available"}
                    </p>

                    {activity.distance && (
                      <p className="text-gray-500 text-sm">
                        📏 {Math.round((activity.distance / 1000) * 10) / 10}km
                        away
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center text-sm text-gray-500">
                        {activity.closed_bucket === "VeryLikelyOpen" && (
                          <span className="text-green-600">🟢 Likely Open</span>
                        )}
                        {activity.closed_bucket === "VeryLikelyClosed" && (
                          <span className="text-red-600">🔴 Likely Closed</span>
                        )}
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">
                        Add to Trip
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-6 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {data?.data?.length || 0} activities found
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
