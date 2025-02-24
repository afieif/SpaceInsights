import axios from 'axios';
import { extractSummary } from '../utils/extractSummary.js';
import { getCache, setCache } from '../utils/cache.js'; // Import caching utilities
import { NASA_API_KEY } from "../utils/key.js";


export const fetchNotifications = async () => {
  const cacheKey = `nasa-notifications`;

  const cachedData = getCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  const url = `https://api.nasa.gov/DONKI/notifications?api_key=${NASA_API_KEY}`;

  try {
    const { data } = await axios.get(url);

    const notifications = data
      .filter(notification => notification.messageType !== "Report")
      .map(notification => ({
        messageType: notification.messageType,
        summary: extractSummary(notification.messageBody),
        time: notification.messageIssueTime,
        id: notification.messageID
      }))
      .filter(notification => notification.summary);

    setCache(cacheKey, notifications);
    return notifications;
  } catch (error) {
    console.error('Error fetching NASA data:', error);
    throw new Error('NASA API request failed');
  }
};
