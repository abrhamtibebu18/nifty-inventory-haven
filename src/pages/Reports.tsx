import { useState, useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Filter, 
  Fuel, 
  Car, 
  Package, 
  AlertTriangle,
  ChevronRight,
  AlertCircle
} from "lucide-react";
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
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { endOfDay, format, isWithinInterval, parseISO, startOfDay, subDays } from "date-fns";

const productPerformance = [
  { name: "3G/4G Wireless N Router", checkIns: 32, checkOuts: 40 },
  { name: "UISP airMAX NanoStation", checkIns: 45, checkOuts: 38 },
  { name: "UISP Fiber NanoG", checkIns: 18, checkOuts: 22 },
  { name: "Network Switch", checkIns: 28, checkOuts: 33 },
  { name: "Cable Modem", checkIns: 15, checkOuts: 19 }
];

const fuelConsumptionCars = [
  { month: "Jan", "Car A": 45, "Car B": 35, "Car C": 42 },
  { month: "Feb", "Car A": 38, "Car B": 32, "Car C": 37 },
  { month: "Mar", "Car A": 42, "Car B": 30, "Car C": 39 },
  { month: "Apr", "Car A": 40, "Car B": 34, "Car C": 41 },
  { month: "May", "Car A": 35, "Car B": 28, "Car C": 33 },
  { month: "Jun", "Car A": 37, "Car B": 31, "Car C": 36 }
];

const fuelConsumptionGenerator = [
  { month: "Jan", consumption: 125 },
  { month: "Feb", consumption: 118 },
  { month: "Mar", consumption: 132 },
  { month: "Apr", consumption: 115 },
  { month: "May", consumption: 128 },
  { month: "Jun", consumption: 122 }
];

const defectRateData = [
  { name: "Defective", value: 8 },
  { name: "Non-Defective", value: 92 }
];

const lowStockItems = [
  { name: "3G/4G Wireless N Router", currentStock: 5, threshold: 10, status: "Critical" },
  { name: "UISP airMAX NanoStation", currentStock: 8, threshold: 10, status: "Low" },
  { name: "Ethernet Cable (5m)", currentStock: 3, threshold: 15, status: "Critical" },
  { name: "USB-C Cable", currentStock: 7, threshold: 20, status: "Critical" },
  { name: "Power Adapters", currentStock: 12, threshold: 15, status: "Low" }
];

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

const COLORS = ["#FFCD00", "#FFE069", "#FFAA00", "#333333"];
const DEFECT_COLORS = ["#EF4444", "#10B981"];

const checkedDevices = [
  { name: "3G/4G Wireless N Router", beginning: 50, checkedIn: 32, checkedOut: 40, ending: 42 },
  { name: "UISP airMAX NanoStation", beginning: 30, checkedIn: 45, checkedOut: 38, ending: 37 },
  { name: "UISP Fiber NanoG", beginning: 25, checkedIn: 18, checkedOut: 22, ending: 21 },
  { name: "Network Switch", beginning: 40, checkedIn: 28, checkedOut: 33, ending: 35 },
  { name: "Cable Modem", beginning: 35, checkedIn: 15, checkedOut: 19, ending: 31 }
];

export default function Reports() {
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  
  const handleFilter = () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast.error("Please select a valid date range");
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Reports filtered successfully");
    }, 800);
  };
  
  const handleExport = () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast.error("Please select a valid date range before exporting");
      return;
    }
    
    toast.success("Exporting reports for " + 
      format(dateRange.from, "MMM d, yyyy") + 
      " to " + 
      format(dateRange.to, "MMM d, yyyy"));
  };
  
  const filteredData = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) {
      return {
        productPerformance,
        fuelConsumptionCars,
        fuelConsumptionGenerator,
        lowStockItems,
        monthlyDeviceMovement,
        deviceCategoryDistribution,
        monthlyDefectRate,
        checkedDevices
      };
    }
    
    const filtered = {
      productPerformance: productPerformance.map(item => ({
        ...item,
        checkIns: item.checkIns * (Math.random() * 0.4 + 0.8),
        checkOuts: item.checkOuts * (Math.random() * 0.4 + 0.8)
      })),
      fuelConsumptionCars,
      fuelConsumptionGenerator,
      lowStockItems: lowStockItems.filter(() => Math.random() > 0.3),
      monthlyDeviceMovement: monthlyDeviceMovement.filter(() => Math.random() > 0.2),
      deviceCategoryDistribution,
      monthlyDefectRate,
      checkedDevices: checkedDevices.map(item => ({
        ...item,
        checkedIn: item.checkedIn * (Math.random() * 0.4 + 0.8),
        checkedOut: item.checkedOut * (Math.random() * 0.4 + 0.8)
      }))
    };
    
    return filtered;
  }, [dateRange]);
  
  const hasFilteredData = filteredData.lowStockItems.length > 0;

  return (
    <AppLayout title="REPORTS" subtitle="Overview">
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <DateRangePicker 
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            isLoading={isLoading}
            className="w-full md:w-auto"
          />
          
          <Button 
            onClick={handleFilter}
            className="bg-safety-yellow hover:bg-safety-yellow/90 text-black"
            disabled={isLoading || !dateRange?.from || !dateRange?.to}
          >
            {isLoading ? (
              <>Loading...</>
            ) : (
              <>
                <Filter className="mr-2 h-4 w-4" /> FILTER
              </>
            )}
          </Button>
          
          <Button 
            onClick={handleExport}
            variant="outline"
            className="md:ml-auto"
            disabled={isLoading || !dateRange?.from || !dateRange?.to}
          >
            <Download className="mr-2 h-4 w-4" /> EXPORT TO EXCEL
          </Button>
        </div>
        
        {!hasFilteredData && (
          <div className="bg-muted/50 rounded-md p-8 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <h3 className="font-medium text-lg">No data available</h3>
            <p className="text-muted-foreground mt-1 mb-4">
              There is no data available for the selected date range.
            </p>
            <Button
              onClick={() => setDateRange({
                from: subDays(new Date(), 30),
                to: new Date(),
              })}
              variant="outline"
            >
              Reset to Last 30 Days
            </Button>
          </div>
        )}
        
        {hasFilteredData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="h-4 w-4 rounded-full bg-safety-yellow"></span>
                    Product Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredData.productPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end"
                        height={70} 
                        interval={0}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="checkOuts" name="Check Outs" fill="#FFCD00" />
                      <Bar dataKey="checkIns" name="Check Ins" fill="#FFB74D" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="h-4 w-4 rounded-full bg-safety-yellow"></span>
                    Quality Control Metrics - Defect Rate
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-72 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={defectRateData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {defectRateData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={DEFECT_COLORS[index % DEFECT_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Fuel className="h-5 w-5 text-safety-yellow" />
                    Fuel Consumption per Car
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={filteredData.fuelConsumptionCars}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Car A" stroke="#FFCD00" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="Car B" stroke="#FFB74D" />
                      <Line type="monotone" dataKey="Car C" stroke="#FF9800" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Fuel className="h-5 w-5 text-safety-yellow" />
                    Generator Fuel Consumption
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={filteredData.fuelConsumptionGenerator}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="consumption" name="Fuel Used (L)" fill="#FF9800" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Low Stock Inventory Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product Name</TableHead>
                        <TableHead>Current Stock</TableHead>
                        <TableHead>Threshold</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredData.lowStockItems.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell>{item.currentStock}</TableCell>
                          <TableCell>{item.threshold}</TableCell>
                          <TableCell>
                            <Badge variant={item.status === "Critical" ? "destructive" : "outline"}>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      data={filteredData.monthlyDeviceMovement}
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
                        data={filteredData.deviceCategoryDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {filteredData.deviceCategoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8">
              <Tabs defaultValue="checked">
                <TabsList className="grid w-full md:w-[600px] grid-cols-3">
                  <TabsTrigger value="checked">Checked Devices</TabsTrigger>
                  <TabsTrigger value="returned">Returned Products</TabsTrigger>
                  <TabsTrigger value="defected">Defected Items</TabsTrigger>
                </TabsList>
                <TabsContent value="checked" className="mt-6">
                  <div className="rounded-md border">
                    <div className="bg-black text-white p-4">
                      <h3 className="font-bold">Total Number of Checked in Devices Per Product</h3>
                      {dateRange?.from && dateRange?.to && (
                        <p className="text-sm opacity-80 mt-1">
                          {format(dateRange.from, "MMM d, yyyy")} - {format(dateRange.to, "MMM d, yyyy")}
                        </p>
                      )}
                    </div>
                    <div className="overflow-x-auto">
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
                          {filteredData.checkedDevices.map((device, index) => (
                            <TableRow key={index}>
                              <TableCell>{device.name}</TableCell>
                              <TableCell>{device.beginning}</TableCell>
                              <TableCell>{Math.round(device.checkedIn)}</TableCell>
                              <TableCell>{Math.round(device.checkedOut)}</TableCell>
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
                  </div>
                </TabsContent>
                <TabsContent value="returned">
                  <div className="p-8 text-center text-muted-foreground">
                    {dateRange?.from && dateRange?.to ? (
                      <>No returned products data available for the selected period.</>
                    ) : (
                      <>Please select a date range to view returned products.</>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="defected">
                  <div className="p-8 text-center text-muted-foreground">
                    {dateRange?.from && dateRange?.to ? (
                      <>No defected items data available for the selected period.</>
                    ) : (
                      <>Please select a date range to view defected items.</>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
