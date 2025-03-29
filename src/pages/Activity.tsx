
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { toast } from "sonner";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

// Using types from RecentActivity component
interface ActivityItem {
  id: string;
  type: "add" | "update" | "transfer";
  title: string;
  description: string;
  user: string;
  time: string;
}

export default function Activity() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  
  const recentActivity: ActivityItem[] = [
    {
      id: "1",
      type: "add" as const,
      title: "Added new device",
      description: "UISP airMAX NanoStation 5AC Loco",
      user: "Abraham Tibebu",
      time: "2 hours ago"
    },
    {
      id: "2",
      type: "update" as const,
      title: "Updated stock count",
      description: "Fiber Patch Cable 100m",
      user: "Kedir Yusuf",
      time: "5 hours ago"
    },
    {
      id: "3",
      type: "transfer" as const,
      title: "Transferred item",
      description: "Ethernet Cable Cat6 3m",
      user: "Dawit Tesfaye",
      time: "Yesterday"
    },
    {
      id: "4",
      type: "add" as const,
      title: "Added new vendor",
      description: "NetCore",
      user: "Abraham Tibebu",
      time: "2 days ago"
    },
    {
      id: "5",
      type: "update" as const,
      title: "Updated product details",
      description: "EdgeRouter X",
      user: "Kedir Yusuf",
      time: "3 days ago"
    },
    {
      id: "6",
      type: "transfer" as const,
      title: "Transferred items in bulk",
      description: "5 devices to Bole Store",
      user: "Dawit Tesfaye",
      time: "4 days ago"
    },
    {
      id: "7",
      type: "add" as const,
      title: "Added new store",
      description: "Megenagna Branch",
      user: "Abraham Tibebu",
      time: "1 week ago"
    },
  ];
  
  const handleFilter = () => {
    toast.info("Filtering activity");
  };

  return (
    <AppLayout title="ACTIVITY" subtitle="Overview">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex gap-2 items-center">
            <span>From Date</span>
            <Input 
              type="date" 
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-40"
            />
          </div>
          
          <div className="flex gap-2 items-center">
            <span>To Date</span>
            <Input 
              type="date" 
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-40"
            />
          </div>
          
          <Button 
            onClick={handleFilter}
            className="bg-safety-yellow hover:bg-safety-yellow/90 text-black"
          >
            <Filter className="mr-2 h-4 w-4" /> FILTER
          </Button>
        </div>
        
        <div className="bg-white rounded-md border p-6">
          <h2 className="text-xl font-bold mb-6">Activity Log</h2>
          <RecentActivity activities={recentActivity} limit={100} viewAll={false} />
        </div>
      </div>
    </AppLayout>
  );
}
