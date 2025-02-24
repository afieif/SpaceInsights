import { api } from "../api/api";


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