import { api } from "../api/api";

export type CMEAnalysis = {
  time: string;
  speed: number;
  halfAngle: number;
  latitude : number;
  longitude : number;
  id : string;
  timestamp : string;
};

export const fetchCME = async (startDate: string, endDate: string): Promise<CMEAnalysis[]> => {
  try {
    const { data } = await api.get("/cme", {
      params: { startDate, endDate },
    });
    return data;
  } catch (error) {
    console.error("Error fetching CME Analysis:", error);
    throw new Error("Failed to fetch CME Analysis data.");
  }
};