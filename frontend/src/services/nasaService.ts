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

export type ApodResponse = {
    title: string;
    url: string;
    media_type: "image" | "video";
    explanation: string;
  };
  
  export const fetchApod = async (): Promise<ApodResponse> => {
    try {
      const { data } = await api.get("/apod"); 
      return data;
    } catch (error) {
      console.error("Error fetching APOD:", error);
      throw new Error("Failed to fetch Astronomy Picture of the Day.");
    }
  };

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

