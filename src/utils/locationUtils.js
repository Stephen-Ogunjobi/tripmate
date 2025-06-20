// Default coordinates (Dubai) if location is not found
const DEFAULT_COORDINATES = { lat: 25.2048, lng: 55.2708 };

// Comprehensive coordinates database for major cities and countries
const COORDINATES_DATABASE = {
  // Major cities
  Dubai: { lat: 25.2048, lng: 55.2708 },
  "New York": { lat: 40.7128, lng: -74.006 },
  London: { lat: 51.5074, lng: -0.1278 },
  Paris: { lat: 48.8566, lng: 2.3522 },
  Tokyo: { lat: 35.6762, lng: 139.6503 },

  // US Cities
  "Los Angeles": { lat: 34.0522, lng: -118.2437 },
  Chicago: { lat: 41.8781, lng: -87.6298 },
  Miami: { lat: 25.7617, lng: -80.1918 },
  "San Francisco": { lat: 37.7749, lng: -122.4194 },
  "Las Vegas": { lat: 36.1699, lng: -115.1398 },
  Seattle: { lat: 47.6062, lng: -122.3321 },
  Boston: { lat: 42.3601, lng: -71.0589 },

  // European Cities
  Rome: { lat: 41.9028, lng: 12.4964 },
  Barcelona: { lat: 41.3851, lng: 2.1734 },
  Amsterdam: { lat: 52.3676, lng: 4.9041 },
  Berlin: { lat: 52.52, lng: 13.405 },
  Vienna: { lat: 48.2082, lng: 16.3738 },
  Prague: { lat: 50.0755, lng: 14.4378 },
  Zurich: { lat: 47.3769, lng: 8.5417 },
  Stockholm: { lat: 59.3293, lng: 18.0686 },

  // Asian Cities
  Singapore: { lat: 1.3521, lng: 103.8198 },
  "Hong Kong": { lat: 22.3193, lng: 114.1694 },
  Bangkok: { lat: 13.7563, lng: 100.5018 },
  Seoul: { lat: 37.5665, lng: 126.978 },
  Mumbai: { lat: 19.076, lng: 72.8777 },
  Delhi: { lat: 28.7041, lng: 77.1025 },
  Beijing: { lat: 39.9042, lng: 116.4074 },
  Shanghai: { lat: 31.2304, lng: 121.4737 },

  // Australian Cities
  Sydney: { lat: -33.8688, lng: 151.2093 },
  Melbourne: { lat: -37.8136, lng: 144.9631 },
  Perth: { lat: -31.9505, lng: 115.8605 },

  // Canadian Cities
  Toronto: { lat: 43.6532, lng: -79.3832 },
  Vancouver: { lat: 49.2827, lng: -123.1207 },
  Montreal: { lat: 45.5017, lng: -73.5673 },

  // South American Cities
  "Rio de Janeiro": { lat: -22.9068, lng: -43.1729 },
  "Buenos Aires": { lat: -34.6118, lng: -58.396 },
  Lima: { lat: -12.0464, lng: -77.0428 },

  // African Cities
  Cairo: { lat: 30.0444, lng: 31.2357 },
  "Cape Town": { lat: -33.9249, lng: 18.4241 },
  Lagos: { lat: 6.5244, lng: 3.3792 },

  // Middle Eastern Cities
  Istanbul: { lat: 41.0082, lng: 28.9784 },
  Riyadh: { lat: 24.7136, lng: 46.6753 },
  "Tel Aviv": { lat: 32.0853, lng: 34.7818 },

  // Countries (using capital cities)
  USA: { lat: 38.9072, lng: -77.0369 }, // Washington DC
  UK: { lat: 51.5074, lng: -0.1278 }, // London
  France: { lat: 48.8566, lng: 2.3522 }, // Paris
  Germany: { lat: 52.52, lng: 13.405 }, // Berlin
  Italy: { lat: 41.9028, lng: 12.4964 }, // Rome
  Spain: { lat: 40.4168, lng: -3.7038 }, // Madrid
  Japan: { lat: 35.6762, lng: 139.6503 }, // Tokyo
  China: { lat: 39.9042, lng: 116.4074 }, // Beijing
  India: { lat: 28.7041, lng: 77.1025 }, // Delhi
  Australia: { lat: -35.2809, lng: 149.13 }, // Canberra
  Canada: { lat: 45.4215, lng: -75.6972 }, // Ottawa
  Brazil: { lat: -15.8267, lng: -47.9218 }, // Brasilia
  UAE: { lat: 25.2048, lng: 55.2708 }, // Dubai
  Thailand: { lat: 13.7563, lng: 100.5018 }, // Bangkok
  Malaysia: { lat: 3.139, lng: 101.6869 }, // Kuala Lumpur
  Indonesia: { lat: -6.2088, lng: 106.8456 }, // Jakarta
  Philippines: { lat: 14.5995, lng: 120.9842 }, // Manila
  Vietnam: { lat: 21.0285, lng: 105.8542 }, // Hanoi
  "South Korea": { lat: 37.5665, lng: 126.978 }, // Seoul
  Mexico: { lat: 19.4326, lng: -99.1332 }, // Mexico City
  Argentina: { lat: -34.6118, lng: -58.396 }, // Buenos Aires
  Chile: { lat: -33.4489, lng: -70.6693 }, // Santiago
  Peru: { lat: -12.0464, lng: -77.0428 }, // Lima
  Egypt: { lat: 30.0444, lng: 31.2357 }, // Cairo
  "South Africa": { lat: -25.7479, lng: 28.2293 }, // Pretoria
  Morocco: { lat: 34.0209, lng: -6.8416 }, // Rabat
  Turkey: { lat: 39.9334, lng: 32.8597 }, // Ankara
  Russia: { lat: 55.7558, lng: 37.6176 }, // Moscow
  Greece: { lat: 37.9838, lng: 23.7275 }, // Athens
  Portugal: { lat: 38.7223, lng: -9.1393 }, // Lisbon
  Netherlands: { lat: 52.3676, lng: 4.9041 }, // Amsterdam
  Belgium: { lat: 50.8503, lng: 4.3517 }, // Brussels
  Switzerland: { lat: 46.948, lng: 7.4474 }, // Bern
  Austria: { lat: 48.2082, lng: 16.3738 }, // Vienna
  Sweden: { lat: 59.3293, lng: 18.0686 }, // Stockholm
  Norway: { lat: 59.9139, lng: 10.7522 }, // Oslo
  Denmark: { lat: 55.6761, lng: 12.5683 }, // Copenhagen
  Finland: { lat: 60.1699, lng: 24.9384 }, // Helsinki
  Poland: { lat: 52.2297, lng: 21.0122 }, // Warsaw
  "Czech Republic": { lat: 50.0755, lng: 14.4378 }, // Prague
  Hungary: { lat: 47.4979, lng: 19.0402 }, // Budapest
  Croatia: { lat: 45.815, lng: 15.9819 }, // Zagreb
  Israel: { lat: 31.7683, lng: 35.2137 }, // Jerusalem
  "Saudi Arabia": { lat: 24.7136, lng: 46.6753 }, // Riyadh
  Jordan: { lat: 31.9454, lng: 35.9284 }, // Amman
  Lebanon: { lat: 33.8938, lng: 35.5018 }, // Beirut
  Qatar: { lat: 25.2854, lng: 51.531 }, // Doha
  Kuwait: { lat: 29.3759, lng: 47.9774 }, // Kuwait City
  Oman: { lat: 23.5859, lng: 58.4059 }, // Muscat
  Bahrain: { lat: 26.0667, lng: 50.5577 }, // Manama
  "Sri Lanka": { lat: 6.9271, lng: 79.8612 }, // Colombo
  Bangladesh: { lat: 23.8103, lng: 90.4125 }, // Dhaka
  Pakistan: { lat: 33.6844, lng: 73.0479 }, // Islamabad
  Nepal: { lat: 27.7172, lng: 85.324 }, // Kathmandu
  "New Zealand": { lat: -41.2865, lng: 174.7762 }, // Wellington
};

/**
 * Get coordinates for a destination
 * @param {string} location - The location name to get coordinates for
 * @returns {Object} - Object with lat and lng properties
 */
export const getDestinationCoordinates = (location) => {
  if (!location) {
    return DEFAULT_COORDINATES;
  }

  // Try exact match first
  if (COORDINATES_DATABASE[location]) {
    return COORDINATES_DATABASE[location];
  }

  // Try case-insensitive match
  const locationLower = location.toLowerCase();
  for (const [key, value] of Object.entries(COORDINATES_DATABASE)) {
    if (key.toLowerCase() === locationLower) {
      return value;
    }
  }

  // Try partial match
  for (const [key, value] of Object.entries(COORDINATES_DATABASE)) {
    if (
      key.toLowerCase().includes(locationLower) ||
      locationLower.includes(key.toLowerCase())
    ) {
      return value;
    }
  }

  return DEFAULT_COORDINATES;
};

/**
 * Check if a location exists in the coordinates database
 * @param {string} location - The location name to check
 * @returns {boolean} - True if location exists in database
 */
export const isLocationSupported = (location) => {
  if (!location) return false;

  const coords = getDestinationCoordinates(location);
  return coords !== DEFAULT_COORDINATES;
};

/**
 * Get all supported locations
 * @returns {Array} - Array of all supported location names
 */
export const getSupportedLocations = () => {
  return Object.keys(COORDINATES_DATABASE);
};
