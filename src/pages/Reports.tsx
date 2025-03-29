
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Download } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";

const monthlyDeviceMovement = [
  { name: "Jan", checkedOut: 42, returned: 21 },
  { name: "Feb", checkedOut: 28, returned: 15 },
  { name: "Mar", checkedOut: 38, returned: 25 },
  { name: "Apr", checkedOut: 33, returned: 28 },
  { name: "May", checkedOut: 46, returned: 36 },
  { name: "Jun", checkedOut: 50, returned: 41 }
];

const deviceCategoryDistribution = [
  { name: "Network Devices", value: 42 },
  { name: "Accessories", value: 27 },
  { name: "Cables", value: 20 },
  { name: "Other Hardware", value: 11 }
];

const monthlyDefectRate = [
  { name: "Jan", rate: 2.4 },
  { name: "Feb", rate: 3.2 },
  { name: "Mar", rate: 2.5 },
  { name: "Apr", rate: 1.6 },
  { name: "May", rate: 1.8 },
  { name: "Jun", rate: 1.5 }
];

const checkedDevices = [
  { name: "3G/4G Wireless N Router", beginning: 0, checkedIn: 0, checkedOut: 0, ending: 0 },
  { name: "UISP airMAX NanoStation 5AC Loco", beginning: 0, checkedIn: 1, checkedOut: 1, ending: 0 },
  { name: "UISP Fiber NanoG", beginning: 0, checkedIn: 1, checkedOut: 1, ending: 0 }
];

const COLORS = ["#FFCD00", "#FFE069", "#FFAA00", "#333333"];

export default function Reports() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  
  const handleFilter = () => {
    toast.info("Filtering reports");
  };
  
  const handleExport = () => {
    toast.info("Exporting to Excel");
  };

  return (
    <AppLayout title="REPORTS" subtitle="Overview">
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
          
          <Button 
            onClick={handleExport}
            variant="outline"
            className="ml-auto"
          >
            <Download className="mr-2 h-4 w-4" /> EXPORT TO EXCEL
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="h-4 w-4 rounded-full bg-safety-yellow"></span>
                Monthly Device Movement
              </CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyDeviceMovement}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="checkedOut" name="Checked Out" fill="#FFCD00" />
                  <Bar dataKey="returned" name="Returned" fill="#FFB74D" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="h-4 w-4 rounded-full bg-safety-yellow"></span>
                Device Category Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceCategoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceCategoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <span className="h-4 w-4 rounded-full bg-safety-yellow"></span>
                Monthly Defect Rate
              </CardTitle>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyDefectRate}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rate" name="Defect Rate %" stroke="#FFCD00" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8">
          <Tabs defaultValue="checked">
            <TabsList className="grid w-[600px] grid-cols-3">
              <TabsTrigger value="checked">Checked Devices</TabsTrigger>
              <TabsTrigger value="returned">Returned Products</TabsTrigger>
              <TabsTrigger value="defected">Defected Items</TabsTrigger>
            </TabsList>
            <TabsContent value="checked" className="mt-6">
              <div className="rounded-md border">
                <div className="bg-black text-white p-4">
                  <h3 className="font-bold">Total Number of Checked in Devices Per Product</h3>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Beginning</TableHead>
                      <TableHead>Checked In Count</TableHead>
                      <TableHead>Checked Out</TableHead>
                      <TableHead>Ending Count</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {checkedDevices.map((device, index) => (
                      <TableRow key={index}>
                        <TableCell>{device.name}</TableCell>
                        <TableCell>{device.beginning}</TableCell>
                        <TableCell>{device.checkedIn}</TableCell>
                        <TableCell>{device.checkedOut}</TableCell>
                        <TableCell>{device.ending}</TableCell>
                        <TableCell>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 6V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="returned">
              <div className="p-8 text-center text-muted-foreground">
                No returned products data available for the selected period.
              </div>
            </TabsContent>
            <TabsContent value="defected">
              <div className="p-8 text-center text-muted-foreground">
                No defected items data available for the selected period.
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
