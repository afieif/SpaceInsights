import { fetchNotifications } from '../services/notificationService.js';

export const getNotifications = async (req, res) => {
  try {
    const notifications = await fetchNotifications();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching NASA data' });
  }
};
