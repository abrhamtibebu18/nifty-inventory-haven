
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
import { ChevronDown, Filter } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Device {
  id: string;
  vendor: string;
  product: string;
  serial: string;
  mac: string | null;
  status: "Store" | "Client";
  store: string;
}

export default function Devices() {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      vendor: "TP-LINK",
      product: "3G/4G WIRELESS N ROUTER",
      serial: "2179035R03993",
      mac: null,
      status: "Store",
      store: "BloomTech"
    },
    {
      id: "2",
      vendor: "TP-LINK",
      product: "3G/4G WIRELESS N ROUTER",
      serial: "2179035R03994",
      mac: null,
      status: "Store",
      store: "BloomTech"
    },
    {
      id: "3",
      vendor: "TP-LINK",
      product: "3G/4G WIRELESS N ROUTER",
      serial: "2179035R03991",
      mac: null,
      status: "Client",
      store: "BloomTech"
    },
    {
      id: "4",
      vendor: "TP-LINK",
      product: "3G/4G WIRELESS N ROUTER",
      serial: "2179035R04000",
      mac: null,
      status: "Client",
      store: "BloomTech"
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredDevices = devices.filter(device => 
    device.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.serial.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleActivity = (id: string) => {
    toast.info(`Viewing activity for device ${id}`);
  };

  const handleUpdateCondition = (id: string) => {
    toast.info(`Updating condition for device ${id}`);
  };

  const handleDelete = (id: string) => {
    toast.info(`Deleting device ${id}`);
  };

  const handleSwap = (id: string) => {
    toast.info(`Swapping device ${id}`);
  };

  const handleAddToInventory = (id: string) => {
    toast.info(`Adding device ${id} to inventory`);
  };

  return (
    <AppLayout title="DEVICES" subtitle="Overview">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <Input
              placeholder="Search devices by product name, vendor, serial no or mac address"
              value={searchQuery}
              onChange={handleSearch}
              className="pl-4 pr-10"
            />
          </div>
          <Button 
            variant="outline" 
            className="ml-4"
          >
            <Filter className="mr-2 h-4 w-4" />
            FILTERS
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Device Serial</TableHead>
                <TableHead>Device MAC</TableHead>
                <TableHead>Device Status</TableHead>
                <TableHead>Store</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>{device.vendor}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center">
                        <img src="/placeholder.svg" alt={device.product} className="h-8 w-8" />
                      </div>
                      <span>{device.product}</span>
                    </div>
                  </TableCell>
                  <TableCell>{device.serial}</TableCell>
                  <TableCell>{device.mac || "N/A"}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className="bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800"
                    >
                      {device.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{device.store}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white w-full"
                          >
                            ACTIVITY <ChevronDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleActivity(device.id)}>
                            View Activity
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleUpdateCondition(device.id)}
                        className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                      >
                        UPDATE CONDITION <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                      
                      {device.status === "Client" && (
                        <>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                              >
                                SWAP <ChevronDown className="ml-2 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem onClick={() => handleSwap(device.id)}>
                                Swap Device
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAddToInventory(device.id)}
                            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                          >
                            ADD TO INVENTORY
                          </Button>
                        </>
                      )}
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(device.id)}
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      >
                        DELETE
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
