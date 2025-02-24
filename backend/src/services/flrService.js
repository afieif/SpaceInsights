import axios from "axios";
import { getCache, setCache } from "../utils/cache.js";
import { NASA_API_KEY } from "../utils/key.js";


export const fetchFLR = async (startDate, endDate) => {
  const cacheKey = `flr_${startDate}_${endDate}`;
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const url = `https://api.nasa.gov/DONKI/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;

  try {
    const { data } = await axios.get(url);
    
    // Transform data into required format
    const transformedData = data.map((flr) => ({
      id: flr.flrID || "N/A",
      date: formatDate(flr.beginTime),
      beginTime: formatTime(flr.beginTime),
      peakTime: formatTime(flr.peakTime),
      endTime: formatTime(flr.endTime),
      duration: calculateDuration(flr.beginTime, flr.endTime),
      classType: flr.classType || "Unknown",
      sourceLocation: flr.sourceLocation || "Unknown",
    }));

    setCache(cacheKey, transformedData); // Store in cache
    return transformedData;
  } catch (error) {
    console.error("Error fetching Solar Flare data:", error);
    throw new Error("Failed to fetch Solar Flare data");
  }
};

const calculateDuration = (beginTime, endTime) => {
  const diffInMillis = new Date(endTime).getTime() - new Date(beginTime).getTime();
  return Math.floor(diffInMillis / (1000 * 60)); // Return duration in minutes
};

const formatTime = (isoTime) => {
  const date = new Date(isoTime);
  return date.toISOString().split("T")[1].slice(0, 5) + " UTC"; // Extracts "HH:MM" from ISO string
};

const formatDate = (isoTime) => {
  const date = new Date(isoTime);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};
