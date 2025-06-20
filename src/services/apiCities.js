const API_URL = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";

export async function getCities(query) {
  const res = await fetch(`${API_URL}?namePrefix=${query}`, {
    headers: {
      "x-rapidapi-key": "9e71d81438msha0200083cd3189fp120259jsn16dcca9f9ab4",
      "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
    },
  });

  const data = await res.json();
  return data;
}
