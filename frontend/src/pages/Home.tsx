import Banner from "@/components/Banner";
import NotificationFeed from "@/components/NotificationFeed";
import CountRadials from "@/components/CountRadials";

export default function Home() {
  return (
  <div className="h-[90vh] pb-1 flex flex-col sm:flex-col md:space-x-1 md:flex-row">
      <div className="flex flex-col w-full space-y-1">
        <Banner/>
        <CountRadials/>
      </div>
        <NotificationFeed/>
    </div>
  )
}
