import { api } from "../api/api";

export type Notification = {
  messageType: string;
  summary: string;
  time:Date;
  id:string;
};

export const fetchNasaNotifications = async (): Promise<Notification[]> => {
  try {
    const { data } = await api.get("/notifications");
    return data;
  } catch (error) {
    console.error("Error fetching NASA notifications:", error);
    throw new Error("Failed to fetch NASA notifications.");
  }
};