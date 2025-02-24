import { api } from "../api/api";

export type EventCounts = {
  cmeCount: number;
  rbeCount: number;
  flrCount: number;
};

export const fetchEventCounts = async (): Promise<EventCounts> => {
  try {
    const { data } = await api.get("/event-counts");
    return data;
  } catch (error) {
    console.error("Error fetching event counts:", error);
    throw new Error("Failed to fetch event counts.");
  }
};