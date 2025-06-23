import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCities } from "../hooks/useCities";

export default function TripForm({ onTripCreate, destination }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  useEffect(() => {
    if (destination) {
      setValue("location", destination);
    }
  }, [destination, setValue]);

  function onSubmit(data) {
    onTripCreate(data);
  }

  const locationValue = watch("location");
  const { isLoading, data: cities, error } = useCities(locationValue);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Trip Name */}
      <div className="form-group">
        <label
          htmlFor="tripName"
          className="flex items-center gap-2 font-worksans text-sm font-medium text-primary mb-2"
        >
          <svg
            className="w-4 h-4 text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Trip Name
        </label>
        <input
          type="text"
          id="tripName"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg font-worksans text-primary bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none transition-all duration-200 placeholder-gray-400"
          placeholder="e.g., Weekend Getaway to Paris"
          {...register("tripName", {
            required: "Trip name is required",
          })}
        />
        {errors.tripName && (
          <p className="text-red-500 text-sm mt-1">{errors.tripName.message}</p>
        )}
      </div>

      {/* Location */}
      <div className="form-group">
        <label
          htmlFor="location"
          className="flex items-center gap-2 font-worksans text-sm font-medium text-primary mb-2"
        >
          <svg
            className="w-4 h-4 text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Destination
        </label>
        <div className="relative">
          <input
            type="text"
            id="location"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg font-worksans text-primary bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none transition-all duration-200 placeholder-gray-400"
            placeholder="e.g., Paris, France"
            {...register("location", {
              required: "Destination is required",
            })}
          />

          {/* Loading indicator */}
          {isLoading && locationValue && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-secondary border-t-transparent"></div>
            </div>
          )}
        </div>

        {errors.location && (
          <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
        )}

        {/* Error display */}
        {error && (
          <p className="text-orange-500 text-sm mt-1">
            Unable to fetch cities. Please check your connection or try again.
          </p>
        )}

        {/* Cities suggestions */}
        {cities?.data && cities.data.length > 0 && locationValue && (
          <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10 relative">
            {cities.data.slice(0, 5).map((city) => (
              <div
                key={city.id}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                onClick={() => {
                  setValue("location", `${city.name}, ${city.country}`, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              >
                <div className="font-medium text-primary">{city.name}</div>
                <div className="text-sm text-gray-500">{city.country}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Start Date */}
        <div className="form-group">
          <label
            htmlFor="startDate"
            className="flex items-center gap-2 font-worksans text-sm font-medium text-primary mb-2"
          >
            <svg
              className="w-4 h-4 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0V7a4 4 0 118 0v4z"
              />
            </svg>
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg font-worksans text-primary bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none transition-all duration-200"
            {...register("startDate", {
              required: "Start date is required",
            })}
          />
          {errors.startDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.startDate.message}
            </p>
          )}
        </div>

        {/* End Date */}
        <div className="form-group">
          <label
            htmlFor="endDate"
            className="flex items-center gap-2 font-worksans text-sm font-medium text-primary mb-2"
          >
            <svg
              className="w-4 h-4 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3a4 4 0 118 0v4m-4 8a4 4 0 11-8 0V7a4 4 0 118 0v4z"
              />
            </svg>
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg font-worksans text-primary bg-white focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none transition-all duration-200"
            {...register("endDate", {
              required: "End date is required",
            })}
          />
          {errors.endDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-secondary hover:bg-primary text-white font-worksans font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-secondary/20 shadow-lg hover:shadow-xl relative overflow-hidden group"
          style={{
            background:
              "linear-gradient(135deg, var(--color-secondary), var(--color-primary))",
          }}
        >
          <span className="relative z-10">Create Trip Plan</span>
          <div
            className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
            }}
          />
        </button>
      </div>
    </form>
  );
}
