import React from "react";
import { useForm } from "react-hook-form";
import { useCities } from "../hooks/useCities";

export default function TripForm({ onTripCreate }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  function onSubmit(data) {
    onTripCreate(data);
  }

  const locationValue = watch("location");
  const { isLoading, data: cities, error } = useCities(locationValue);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto"
    >
      {/* Trip Name */}
      <div className="form-group">
        <label
          htmlFor="tripName"
          className="block font-worksans text-sm font-semibold text-gray-700 mb-2"
        >
          Trip Name
        </label>
        {errors.tripName && (
          <p className="text-red-500 text-sm">{errors.tripName.message}</p>
        )}
        <input
          type="text"
          id="tripName"
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-worksans text-gray-800 bg-white focus:border-secondary focus:ring-0 focus:outline-none transition-colors duration-200 placeholder-gray-400"
          placeholder="e.g., Weekend Getaway to Paris"
          {...register("tripName", {
            required: "This field is required",
          })}
        />
      </div>

      {/* Location */}
      <div className="form-group">
        <label
          htmlFor="location"
          className="block font-worksans text-sm font-semibold text-gray-700 mb-2"
        >
          Destination
        </label>
        {errors.location && (
          <p className="text-red-500 text-sm">{errors.location.message}</p>
        )}
        <div className="relative">
          <input
            type="text"
            id="location"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-worksans text-gray-800 bg-white focus:border-secondary focus:ring-0 focus:outline-none transition-colors duration-200 placeholder-gray-400"
            placeholder="e.g., Paris, France"
            {...register("location", {
              required: "This field is required",
            })}
          />

          {/* Loading indicator */}
          {isLoading && locationValue && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-secondary"></div>
            </div>
          )}
        </div>

        {/* Error display */}
        {error && (
          <p className="text-orange-500 text-sm mt-1">
            Unable to fetch cities. Please check your connection or try again.
          </p>
        )}

        {/* Cities suggestions */}
        {cities?.data && cities.data.length > 0 && locationValue && (
          <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {cities.data.slice(0, 5).map((city) => (
              <div
                key={city.id}
                className="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => {
                  setValue("location", `${city.name}, ${city.country}`, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                <div className="font-medium text-gray-900">{city.name}</div>
                <div className="text-sm text-gray-500">{city.country}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Start Date */}
        <div className="form-group">
          <label
            htmlFor="startDate"
            className="block font-worksans text-sm font-semibold text-gray-700 mb-2"
          >
            Start Date
          </label>
          {errors.startDate && (
            <p className="text-red-500 text-sm">{errors.startDate.message}</p>
          )}
          <input
            type="date"
            id="startDate"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-worksans text-gray-800 bg-white focus:border-secondary focus:ring-0 focus:outline-none transition-colors duration-200"
            {...register("startDate", {
              required: "This field is required",
            })}
          />
        </div>

        {/* End Date */}
        <div className="form-group">
          <label
            htmlFor="endDate"
            className="block font-worksans text-sm font-semibold text-gray-700 mb-2"
          >
            End Date
          </label>
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate.message}</p>
          )}
          <input
            type="date"
            id="endDate"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl font-worksans text-gray-800 bg-white focus:border-secondary focus:ring-0 focus:outline-none transition-colors duration-200"
            {...register("endDate", {
              required: "This field is required",
            })}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary to-secondary text-white font-worksans font-bold py-4 px-8 rounded-xl border-none cursor-pointer hover:from-secondary hover:to-primary transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-200"
        >
          Create Trip Plan
        </button>
      </div>
    </form>
  );
}
