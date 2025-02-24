import axios from "axios";
import { getCache, setCache } from "../utils/cache.js"; // Import caching utilities

const NASA_API_KEY = process.env.NASA_API_KEY;

export const fetchCME = async (startDate, endDate) => {
  const cacheKey = `cme-${startDate}-${endDate}`; // Unique key per date range
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const url = `https://api.nasa.gov/DONKI/CMEAnalysis?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;

  try {
    const { data } = await axios.get(url);

    const cmeData = data.map((cme) => ({
      time: formatTime(cme.time21_5),
      speed: cme.speed || 0,
      halfAngle: cme.halfAngle || 0,
      latitude: cme.latitude || 0,
      longitude: cme.longitude || 0,
      id: cme.associatedCMEID || "N/A",
      timestamp: cme.time21_5 || 0,
    }));

    setCache(cacheKey, cmeData, 3600); // Cache for 1 hour
    return cmeData;
  } catch (error) {
    console.error("Error fetching CME Analysis data:", error);
    throw new Error("Failed to fetch CME Analysis data");
  }
};

const formatTime = (isoTime) => {
  const date = new Date(isoTime);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
