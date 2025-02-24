import { api } from "../api/api";

export type FlareEvent = {
  id: string;
  date: string;
  beginTime: string;
  peakTime: string;
  endTime: string;
  duration: number;
  classType: string;
  sourceLocation: string;
};

export const fetchFLR = async (startDate: string, endDate: string): Promise<FlareEvent[]> => {
  try {
    const { data } = await api.get("/flr", {
      params: { startDate, endDate },
    });
    return data;
  } catch (error) {
    console.error("Error fetching solar flare data:", error);
    throw new Error("Failed to fetch solar flare data.");
  }
};