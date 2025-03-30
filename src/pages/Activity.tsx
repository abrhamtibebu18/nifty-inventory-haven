
import { AppLayout } from "@/components/AppLayout";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ActivityItem } from "@/components/dashboard/RecentActivity";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Filter, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

// Define activities data
const activities: ActivityItem[] = [
  {
    id: "1",
    type: "add",
    title: "Added new device",
    description: "Added UISP airMAX NanoStation 5AC Loco",
    user: "Abraham Tibebu",
    time: "2 hours ago"
  },
  {
    id: "2",
    type: "update",
    title: "Updated device count",
    description: "Updated EdgeRouter X inventory count to 15",
    user: "Abraham Tibebu",
    time: "3 hours ago"
  },
  {
    id: "3",
    type: "transfer",
    title: "Transferred device",
    description: "Transferred 3 UISP Fiber NanoG to BloomTech",
    user: "Abraham Tibebu",
    time: "1 day ago"
  },
  {
    id: "4",
    type: "add",
    title: "Added new batch",
    description: "Added 5 UISP airMAX LiteBeam 5AC Bridge GEN2",
    user: "Abraham Tibebu",
    time: "1 day ago"
  },
  {
    id: "5",
    type: "update",
    title: "Updated product details",
    description: "Updated POE 24V Adapter specifications",
    user: "Abraham Tibebu",
    time: "2 days ago"
  },
  {
    id: "6",
    type: "transfer",
    title: "Transferred devices",
    description: "Transferred 10 450Mbps Wireless N Router to Jakros Store",
    user: "Abraham Tibebu",
    time: "3 days ago"
  },
  {
    id: "7",
    type: "add",
    title: "Added new product",
    description: "Added UISP Fiber Loco to product catalog",
    user: "Abraham Tibebu",
    time: "5 days ago"
  },
  {
    id: "8",
    type: "update",
    title: "Updated inventory status",
    description: "Updated inventory status for 3 products",
    user: "Abraham Tibebu",
    time: "1 week ago"
  },
  {
    id: "9",
    type: "transfer",
    title: "Transferred inventory",
    description: "Bulk transferred 25 devices from BloomTech to Summit Data Center",
    user: "Abraham Tibebu",
    time: "1 week ago"
  },
  {
    id: "10",
    type: "add",
    title: "Added new supplier",
    description: "Added TechWorks as new supplier",
    user: "Abraham Tibebu",
    time: "2 weeks ago"
  }
];

export default function Activity() {
  const [filter, setFilter] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter activities based on search query
  const filteredActivities = activities.filter(activity => 
    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.user.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <AppLayout title="ACTIVITY LOG" subtitle="System activity history">
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search activity by user or description..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select
              value={dateRange}
              onValueChange={setDateRange}
            >
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
            <TabsTrigger value="all">All Activity</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="users">User Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={`
                            ${activity.type === "add" ? "bg-green-100 text-green-800" : ""}
                            ${activity.type === "update" ? "bg-blue-100 text-blue-800" : ""}
                            ${activity.type === "transfer" ? "bg-amber-100 text-amber-800" : ""}
                          `}
                        >
                          {activity.type === "add" ? "Added" : ""}
                          {activity.type === "update" ? "Updated" : ""}
                          {activity.type === "transfer" ? "Transferred" : ""}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">{activity.description}</div>
                      </TableCell>
                      <TableCell>{activity.user}</TableCell>
                      <TableCell>{activity.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="inventory" className="mt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActivities
                    .filter(activity => 
                      activity.title.toLowerCase().includes("device") || 
                      activity.title.toLowerCase().includes("inventory") ||
                      activity.title.toLowerCase().includes("product")
                    )
                    .map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${activity.type === "add" ? "bg-green-100 text-green-800" : ""}
                              ${activity.type === "update" ? "bg-blue-100 text-blue-800" : ""}
                              ${activity.type === "transfer" ? "bg-amber-100 text-amber-800" : ""}
                            `}
                          >
                            {activity.type === "add" ? "Added" : ""}
                            {activity.type === "update" ? "Updated" : ""}
                            {activity.type === "transfer" ? "Transferred" : ""}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-muted-foreground">{activity.description}</div>
                        </TableCell>
                        <TableCell>{activity.user}</TableCell>
                        <TableCell>{activity.time}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="users" className="mt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActivities
                    .filter(activity => 
                      activity.title.toLowerCase().includes("user") || 
                      activity.description.toLowerCase().includes("login") ||
                      activity.description.toLowerCase().includes("user")
                    )
                    .map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`
                              ${activity.type === "add" ? "bg-green-100 text-green-800" : ""}
                              ${activity.type === "update" ? "bg-blue-100 text-blue-800" : ""}
                              ${activity.type === "transfer" ? "bg-amber-100 text-amber-800" : ""}
                            `}
                          >
                            {activity.type === "add" ? "Added" : ""}
                            {activity.type === "update" ? "Updated" : ""}
                            {activity.type === "transfer" ? "Transferred" : ""}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{activity.title}</div>
                          <div className="text-sm text-muted-foreground">{activity.description}</div>
                        </TableCell>
                        <TableCell>{activity.user}</TableCell>
                        <TableCell>{activity.time}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
