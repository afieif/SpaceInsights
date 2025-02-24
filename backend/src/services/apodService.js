import axios from "axios";
import { getCache, setCache } from "../utils/cache.js";
import { NASA_API_KEY } from "../utils/key.js";

export const fetchApod = async () => {
  const currentDate = new Date();
  const cacheKey = `apod-${currentDate}`; // Unique cache key per day
  const cachedData = getCache(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  const api_url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

  try {
    const response = await axios.get(api_url);
    const { title, url, media_type, explanation } = response.data;

    const apodData = { title, url, media_type, explanation };

    setCache(cacheKey, apodData, 86400); // Cache for 1 day (24h)
    return apodData;
  } catch (error) {
    console.error("Error fetching APOD data:", error);
    throw new Error("Failed to fetch Astronomy Picture of the Day.");
  }
};
