const API_URL = "https://api.foursquare.com/v3/places/search";
const API_HEADERS = {
  accept: "application/json",
  Authorization: "fsq3UqWiFNo0Itjab+2gKRdIkOucuQNRmvlLSFmhxbLISUA=",
};

export async function getActivities(
  latitude,
  longitude,
  category = "",
  limit = 20
) {
  // Build query parameters
  const params = new URLSearchParams({
    ll: `${latitude},${longitude}`,
    limit: limit.toString(),
    radius: "10000", // 10km radius
    sort: "DISTANCE",
  });

  // Add category filter if specified
  if (category) {
    // Map category names to Foursquare category IDs or names
    const categoryMap = {
      museums: "10027",
      parks: "16032",
      beaches: "16028",
      shopping: "17000",
      restaurants: "13000",
      entertainment: "10000",
      attractions: "16000",
    };

    if (categoryMap[category]) {
      params.append("categories", categoryMap[category]);
    }
  }

  const url = `${API_URL}?${params.toString()}`;

  const res = await fetch(url, {
    method: "GET",
    headers: API_HEADERS,
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch activities: ${res.status} ${res.statusText}`
    );
  }

  const data = await res.json();

  // Transform the response to match expected format
  return {
    data: data.results || [],
  };
}
