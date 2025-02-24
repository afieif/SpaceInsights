import { fetchEventCounts } from "../services/eventsCountService.js";

export const getEventCounts = async (req, res) => {
  try {
    const counts = await fetchEventCounts();
    res.json(counts);
  } catch (error) {
    console.error("Error in getEventCounts:", error);
    res.status(500).json({ error: "Failed to fetch event counts" });
  }
};
