
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
import { Plus, Building2, MapPin } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { toast } from "sonner";

interface Facility {
  id: string;
  name: string;
  description: string;
  location: string;
}

interface FacilityDevice {
  id: string;
  productId: string;
  serial: string;
  mac: string;
  status: string;
}

export default function Facilities() {
  const [facilities, setFacilities] = useState<Facility[]>([
    {
      id: "2",
      name: "Summit Condominium Date Center",
      description: "Devices (material used )installed in SMT data center",
      location: ""
    },
    {
      id: "3",
      name: "Gelan Condominium Date Center",
      description: "Devices(materials) used(installed) in GLC data center",
      location: ""
    },
    {
      id: "4",
      name: "Jemmo Condominium Date Center",
      description: "Devices(materials) used(installed) in JMC data center",
      location: ""
    },
    {
      id: "5",
      name: "Haile Garment Condominium Date Center",
      description: "Devices(materials) used(installed) in HGC",
      location: ""
    },
    {
      id: "6",
      name: "Ayat Tafo Condominium",
      description: "Devices (material used )installed in ATF data center",
      location: ""
    },
    {
      id: "7",
      name: "Bole Arabsa Condominium Date Center",
      description: "Devices (material used )installed in BAR data center",
      location: ""
    },
    {
      id: "8",
      name: "Yeka Abado Condominium Data Center",
      description: "Devices (material used )installed in YAC data center",
      location: ""
    },
    {
      id: "9",
      name: "Tsebel Condominium Data Center",
      description: "Devices (material used )installed in TBL data center",
      location: ""
    },
    {
      id: "10",
      name: "Ayat 5 Condominium Data Center",
      description: "Devices (material used )installed in A5Y data center",
      location: ""
    },
    {
      id: "11",
      name: "Tulu Dimtu Condo. DC",
      description: "Data center for our customers around TD condo and the surrounding ares",
      location: ""
    }
  ]);
  
  const [facilityDevices, setFacilityDevices] = useState<FacilityDevice[]>([
    {
      id: "1",
      productId: "347",
      serial: "6018952306E7",
      mac: "N/A",
      status: "Supervisor"
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredFacilities = facilities.filter(facility => 
    facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    facility.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleShowItems = (id: string) => {
    toast.info(`Showing items for facility ${id}`);
  };
  
  const handleCreateFacility = () => {
    toast.info("Creating new facility");
  };

  return (
    <AppLayout title="FACILITIES" subtitle="Overview">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <Input
              placeholder="Search vendors by it's name or vendor code"
              value={searchQuery}
              onChange={handleSearch}
              className="pl-4 pr-10"
            />
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={handleCreateFacility}
              className="bg-black hover:bg-black/90 text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> CREATE FACILITY
            </Button>
            <Button variant="outline">
              EXPORT
            </Button>
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Location</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFacilities.map((facility) => (
                <TableRow key={facility.id}>
                  <TableCell>{facility.id}</TableCell>
                  <TableCell>{facility.name}</TableCell>
                  <TableCell>{facility.description}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="p-0">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      className="flex items-center"
                      onClick={() => handleShowItems(facility.id)}
                    >
                      <Building2 className="mr-2 h-4 w-4" />
                      SHOW ITEMS
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <Tabs defaultValue="mac">
          <TabsList className="grid w-[400px] grid-cols-3">
            <TabsTrigger value="mac">MAC OR SN</TabsTrigger>
            <TabsTrigger value="pieces">PIECES</TabsTrigger>
            <TabsTrigger value="pending">PENDING REQUESTS</TabsTrigger>
          </TabsList>
          <TabsContent value="mac" className="mt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Device Serial</TableHead>
                    <TableHead>Device MAC</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {facilityDevices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell>{device.productId}</TableCell>
                      <TableCell>{device.serial}</TableCell>
                      <TableCell>{device.mac}</TableCell>
                      <TableCell>{device.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                1-1 of 1
              </div>
              
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </TabsContent>
          <TabsContent value="pieces">No pieces data available</TabsContent>
          <TabsContent value="pending">No pending requests</TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
