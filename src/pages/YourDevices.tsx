
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { YourDevicesTable } from "@/components/dashboard/YourDevicesTable";

export default function YourDevices() {
  const yourDevices = [
    {
      id: "1",
      vendor: "TP-LINK",
      product: "3G/4G WIRELESS N ROUTER",
      status: "Store" as const,
      location: "BloomTech"
    },
    {
      id: "2",
      vendor: "TP-LINK",
      product: "3G/4G WIRELESS N ROUTER",
      status: "Store" as const,
      location: "BloomTech"
    },
    {
      id: "3",
      vendor: "TP-LINK",
      product: "3G/4G WIRELESS N ROUTER",
      status: "Check" as const,
      location: "BloomTech"
    }
  ];
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <AppLayout title="YOUR DEVICES" subtitle="Overview">
      <div className="p-6 space-y-6">
        <div className="relative w-full max-w-md">
          <Input
            placeholder="Search your devices..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-4 pr-10"
          />
        </div>
        
        <div className="rounded-md border">
          <YourDevicesTable devices={yourDevices} />
        </div>
      </div>
    </AppLayout>
  );
}
