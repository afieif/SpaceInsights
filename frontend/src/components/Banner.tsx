import { useEffect, useState } from "react";
import { fetchApod, ApodResponse } from "../services/apodService";
import { Skeleton } from "@/components/ui/skeleton";

export default function Banner() {
  const [apod, setApod] = useState<ApodResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false); // Track image expansion state
  const [isHovered, setIsHovered] = useState(false);   // Track hover state

  useEffect(() => {
    const getApod = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchApod();
        setApod(data);
      } catch (err) {
        setError("Failed to load the Astronomy Picture of the Day.");
      } finally {
        setLoading(false);
      }
    };

    getApod();
  }, []);

  if (loading)
    return <Skeleton className="h-[300px] w-full rounded-md bg-gray-200" />;

  if (error)
    return <div className="text-red-500 text-center py-4">{error}</div>;

  const handleImageClick = () => {
    if (apod?.media_type === "image") {
      setIsExpanded(!isExpanded); // Toggle image expansion
    }
  };

  return (
    <div
      className="relative w-full h-min"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {apod?.media_type === "image" ? (
        <div>
          <img
            src={apod.url}
            alt={apod.title}
            className={`w-full h-[300px] object-cover rounded-md cursor-pointer ${isExpanded ? 'h-[90vh] object-contain' : ''}`}
            onClick={handleImageClick}
          />
          {isExpanded && (
            <div
              className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50"
              onClick={() => setIsExpanded(false)}
            >
              <img
                src={apod.url}
                alt={apod.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          )}
        </div>
      ) : (
        <iframe
          className="w-full h-[300px] rounded-md"
          src={apod?.url}
          title={apod?.title}
          allowFullScreen
        />
      )}

      <div
        onClick={handleImageClick}
        className={` rounded-md absolute top-0 left-0 w-full text-white p-2 text-center transition-opacity ${isHovered && !isExpanded ? 'bg-black bg-opacity-50 h-full' : 'bg-transparent'}`}
      >
        <h3 className="text-lg font-semibold">Picture of the Day : {apod?.title}</h3>
        {isHovered && !isExpanded && (
          <p className="h-full items-center text-sm text-center p-10 overflow-scroll">{apod?.explanation}</p>
        )}
      </div>
    </div>
  );
}
