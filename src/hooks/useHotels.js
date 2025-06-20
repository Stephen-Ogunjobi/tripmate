import { useQuery } from "@tanstack/react-query";
import { getHotels, getHotelsRegion } from "../services/apiHotels";

export function useHotelsRegions(cityName) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["hotels-regions", cityName],
    queryFn: () => getHotelsRegion(cityName),
    enabled: !!cityName,
  });

  return { isLoading, data, error };
}

export function useHotels(regionId, checkIn, checkOut, adults) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["hotels", regionId, checkIn, checkOut, adults],
    queryFn: () => getHotels(regionId, checkIn, checkOut, adults),
    enabled: !!regionId && !!checkIn && !!checkOut,
  });

  return { isLoading, data, error };
}
