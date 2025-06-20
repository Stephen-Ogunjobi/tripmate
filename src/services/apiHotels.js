import { formatDateForAPI } from "../utils/helper";

const API_URL = "https://hotels-com-provider.p.rapidapi.com/v2";
const API_HEADERS = {
  "x-rapidapi-key": "9e71d81438msha0200083cd3189fp120259jsn16dcca9f9ab4",
  "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
};

export async function getHotelsRegion(cityName) {
  const res = await fetch(
    `${API_URL}/regions?query=${cityName}&domain=US&locale=en_US`,
    {
      method: "GET",
      headers: API_HEADERS,
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch hotels");
  }

  const data = await res.json();
  return data;
}

export async function getHotels(regionId, checkIn, checkOut, adults = 2) {
  const formattedCheckIn = formatDateForAPI(checkIn);
  const formattedCheckOut = formatDateForAPI(checkOut);

  // Use correct parameter names based on API requirements
  const params = new URLSearchParams({
    region_id: regionId.toString(),
    checkin_date: formattedCheckIn,
    checkout_date: formattedCheckOut,
    adults_number: adults.toString(), // API requires 'adults_number' not 'adults'
    rooms: "1",
    limit: "20",
    domain: "US",
    locale: "en_US",
    currency: "USD",
    sort_order: "PRICE_LOW_TO_HIGH", // This is a required field
  });

  const url = `${API_URL}/hotels/search?${params.toString()}`;
  // https://hotels-com-provider.p.rapidapi.com/v2/hotels/search?
  // region_id=2734&checkin_date=2025-06-18&checkout_date=2025-06-21&adults_number=2&rooms=1&
  // limit=20&domain=US&locale=en_US&currency=USD&sort_order=PRICE_LOW_TO_HIGH

  const res = await fetch(url, {
    method: "GET",
    headers: API_HEADERS,
  });

  if (!res.ok) {
    throw new Error(`Failed to search hotels: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  // Transform the data to match what the modal expects
  // The API returns hotels in data.properties, so we'll restructure it
  const transformedData = {
    data: data.properties ? data.properties.slice(0, 12) : [], // Limit to first 12 hotels
  };

  return transformedData;
}
