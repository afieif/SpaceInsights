import axios from "axios";
import { getCache, setCache } from "../utils/cache.js"; // Import caching utilities
import { NASA_API_KEY } from "../utils/key.js";

const fetchEventCount = async (endpoint) => {
  const url = `https://api.nasa.gov/DONKI/${endpoint}?api_key=${NASA_API_KEY}`;
  try {
    const { data } = await axios.get(url);
    return Array.isArray(data) ? data.length : 0;
  } catch (error) {
    console.error(`Error fetching ${endpoint} data:`, error);
    return 0; // Return 0 on failure instead of breaking the response
  }
};

export const fetchEventCounts = async () => {
  const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
  const cacheKey = `eventCounts-${today}`;

  const cachedData = getCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  const [cmeCount, rbeCount, flrCount] = await Promise.all([
    fetchEventCount("CME"),
    fetchEventCount("RBE"),
    fetchEventCount("FLR"),
  ]);

  const eventCounts = { cmeCount, rbeCount, flrCount };

  setCache(cacheKey, eventCounts);
  return eventCounts;
};
