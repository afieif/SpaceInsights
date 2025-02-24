import { fetchCME } from "../services/cmeService.js";

export const getCME = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const cmeData = await fetchCME(startDate, endDate);
    res.json(cmeData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
