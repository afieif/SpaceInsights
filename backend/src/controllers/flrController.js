import { fetchFLR } from "../services/flrService.js";

export const getFLR = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const flares = await fetchFLR(startDate, endDate);
    res.json(flares);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving Solar Flare data" });
  }
};
