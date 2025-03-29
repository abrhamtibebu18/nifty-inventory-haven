
import { AppLayout } from "@/components/AppLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentStockTable } from "@/components/dashboard/RecentStockTable";
import { InventorySummary } from "@/components/dashboard/InventorySummary";
import { YourDevicesTable } from "@/components/dashboard/YourDevicesTable";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Package, TrendingUp, Truck, AlertTriangle } from "lucide-react";

// Sample data
const recentStock = [
  {
    batchNo: "3599",
    product: "DIGITAL SM LC UPC 9/125, 1.5M",
    productImage: "/placeholder.svg",
    batchCode: "Digital SM LC UPC 9/125, 1.5m"
  },
  {
    batchNo: "3604",
    product: "CABLE TRUNKING 3M",
    productImage: "/placeholder.svg",
    batchCode: "Cable Trunking 3M"
  },
  {
    batchNo: "3607",
    product: "WS GPON TERMINAL",
    productImage: "/placeholder.svg",
    batchCode: "Wssssss"
  },
  {
    batchNo: "3617",
    product: "WS FIBER PATCH CABLE 100M SC/UPC-SC/UPC",
    productImage: "/placeholder.svg",
    batchCode: "100mmm"
  },
  {
    batchNo: "3620",
    product: "PLANTRONICS HEADSET",
    productImage: "/placeholder.svg",
    batchCode: "Headset"
  }
];

const inventoryCategories = [
  { name: "Network Devices", count: 425, color: "bg-safety-yellow", percentage: 100 },
  { name: "Accessories", count: 312, color: "bg-blue-500", percentage: 73 },
  { name: "Cables", count: 215, color: "bg-green-500", percentage: 50 },
  { name: "Other Hardware", count: 112, color: "bg-purple-500", percentage: 26 }
];

const yourDevices = [
  {
    id: "1",
    vendor: "TP-LINK",
    product: "3G/4G WIRELESS N ROUTER",
    status: "Store",
    location: "BloomTech"
  },
  {
    id: "2",
    vendor: "TP-LINK",
    product: "3G/4G WIRELESS N ROUTER",
    status: "Store",
    location: "BloomTech"
  },
  {
    id: "3",
    vendor: "TP-LINK",
    product: "3G/4G WIRELESS N ROUTER",
    status: "Check",
    location: "BloomTech"
  }
];

const recentActivity = [
  {
    id: "1",
    type: "add",
    title: "Added new device",
    description: "UISP airMAX NanoStation 5AC Loco",
    user: "Abraham Tibebu",
    time: "2 hours ago"
  },
  {
    id: "2",
    type: "update",
    title: "Updated stock count",
    description: "Fiber Patch Cable 100m",
    user: "Kedir Yusuf",
    time: "5 hours ago"
  },
  {
    id: "3",
    type: "transfer",
    title: "Transferred item",
    description: "Ethernet Cable Cat6 3m",
    user: "Dawit Tesfaye",
    time: "1 day ago"
  }
];

export default function Dashboard() {
  return (
    <AppLayout title="DASHBOARD" subtitle="Overview">
      <div className="container py-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Total Devices" 
            value="1,064" 
            change="+10% vs. last month" 
            trend="up" 
            icon={Package} 
          />
          <StatsCard 
            title="Pending Requests" 
            value="8" 
            change="-5% vs. last month" 
            trend="down" 
            icon={TrendingUp} 
            iconColor="bg-blue-500"
          />
          <StatsCard 
            title="Out of Stock" 
            value="11" 
            change="+3% vs. last month" 
            trend="up" 
            icon={Truck} 
            iconColor="bg-purple-500"
          />
          <StatsCard 
            title="Low Stock Items" 
            value="3" 
            change="-20% vs. last month" 
            trend="down" 
            icon={AlertTriangle} 
            iconColor="bg-red-500"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Recent Stock</h2>
              <a href="#" className="text-sm text-safety-yellow">See all →</a>
            </div>
            <RecentStockTable items={recentStock} />
            
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Your Devices</h2>
              <a href="#" className="text-sm text-safety-yellow">View all →</a>
            </div>
            <YourDevicesTable devices={yourDevices} />
            
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Recent Activity</h2>
              <a href="#" className="text-sm text-safety-yellow">View all →</a>
            </div>
            <RecentActivity items={recentActivity} />
          </div>
          
          <div className="space-y-6">
            <InventorySummary categories={inventoryCategories} />
            <div>
              <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
