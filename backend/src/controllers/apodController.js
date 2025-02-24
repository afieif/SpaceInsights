import { fetchApod } from '../services/apodService.js';

export const getApod = async (req,res) => {
  try {
    const apod = await fetchApod();
    res.json(apod);
  } catch (error) {
    console.error('Error fetching APOD data:', error);
    res.status(500).json({ error: 'Failed to fetch Astronomy Picture of the Day.' });
  }
};
