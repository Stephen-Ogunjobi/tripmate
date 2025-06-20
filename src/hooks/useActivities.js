import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../services/apiActivities";

export function useActivities(latitude, longitude, category = "", limit = 20) {
  const { isLoading, data, error } = useQuery({
    queryKey: ["activities", latitude, longitude, category, limit],
    queryFn: () => getActivities(latitude, longitude, category, limit),
    enabled: !!latitude && !!longitude,
  });

  return { isLoading, data, error };
}
