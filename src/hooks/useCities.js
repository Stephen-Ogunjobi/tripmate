import { useQuery } from "@tanstack/react-query";
import { getCities } from "../services/apiCities";
import { useDebounce } from "../utils/helper";

export function useCities(locationValue) {
  const debouncedLocation = useDebounce(locationValue, 500);

  const { isLoading, data, error } = useQuery({
    queryKey: ["cities", debouncedLocation],
    queryFn: () => getCities(debouncedLocation),
    enabled: !!debouncedLocation,
  });

  return { isLoading, data, error };
}
