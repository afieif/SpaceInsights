import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useMemo } from "react";
import { fetchNasaNotifications, Notification } from "../services/notificationService";

export default function NotificationFeed() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNasaNotifications();
        setNotifications(data);
      } catch (err) {
        setError("Failed to fetch NASA notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // **Filtering logic (Search)**
  const filteredNotifications = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return notifications.filter(
      (notification) =>
        notification.messageType.toLowerCase().includes(query) ||
        notification.summary.toLowerCase().includes(query) ||
        notification.id.toLowerCase().includes(query)
    );
  }, [notifications, searchQuery]);

  const notificationList = useMemo(() => {
    return filteredNotifications
      .slice()
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .map((notification, index) => (
        <div key={index} className="border p-4 rounded-md shadow-sm bg-white mb-1 w-full">
          <div className="flex justify-between pb-1">
            <h3 className="font-bold text-md">{notification.messageType}</h3>
            <h3 className="text-sm text-gray-500 pt-1">{notification.id}</h3>
          </div>
          <p className="text-sm text-gray-700 text-justify break-words">{notification.summary}</p>
        </div>
      ));
  }, [filteredNotifications]);

  // **Improved Loading Skeleton**
  if (loading)
    return (
      <Card className="w-full h-[100%] mt-2 md:w-2/5 md:mt-0">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Loading latest space weather updates...</CardDescription>
        </CardHeader>
        <div className="p-2 h-[75%] overflow-y-scroll rounded-md space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border p-4 rounded-md shadow-sm bg-white">
              <Skeleton className="h-5 w-1/3 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          ))}
        </div>
      </Card>
    );

  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <Card className="w-full h-[100%] mt-2 md:w-2/5 md:mt-0">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Updates on the latest space weather observations</CardDescription>
      </CardHeader>
      <div className="p-2 h-[75%] overflow-y-scroll rounded-md">
        <Input
          placeholder="Search notifications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="my-1 w-full"
        />
        {notificationList.length > 0 ? (
          notificationList
        ) : (
          <div className="border p-4 rounded-md shadow-sm bg-white mb-1 text-gray-500 text-center w-full">
            No notifications found.
          </div>
        )}
      </div>
    </Card>
  );
}
