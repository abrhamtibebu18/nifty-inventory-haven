
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
import { Plus, Search } from "lucide-react";
import { DeviceRequestDialog } from "@/components/dialogs/DeviceRequestDialog";
import { Badge } from "@/components/ui/badge";

interface DeviceRequest {
  id: string;
  requestedBy: string;
  requestDate: string;
  product: string;
  store: string;
  status: "pending" | "approved" | "rejected";
  summary: string;
}

export default function DeviceRequests() {
  const [requests, setRequests] = useState<DeviceRequest[]>([
    {
      id: "REQ-001",
      requestedBy: "Abraham Tibebu",
      requestDate: "2023-06-10",
      product: "UISP airMAX NanoStation 5AC Loco",
      store: "BloomTech",
      status: "approved",
      summary: "Needed for new client installation"
    },
    {
      id: "REQ-002",
      requestedBy: "Abraham Tibebu",
      requestDate: "2023-06-15",
      product: "EdgeRouter X",
      store: "Jakros Store",
      status: "pending",
      summary: "Required for network upgrade"
    },
    {
      id: "REQ-003",
      requestedBy: "Abraham Tibebu",
      requestDate: "2023-06-20",
      product: "450Mbps Wireless N Router",
      store: "BloomTech No 3",
      status: "rejected",
      summary: "Out of stock, suggested alternative"
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleRequestDevice = () => {
    setIsDialogOpen(true);
  };

  const filteredRequests = requests.filter(request => 
    request.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.store.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: DeviceRequest['status']) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <AppLayout title="DEVICE REQUESTS" subtitle="Overview">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search your requests..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10 pr-4"
            />
          </div>
          <Button 
            onClick={handleRequestDevice}
            className="bg-safety-yellow hover:bg-safety-yellow/90 text-black"
          >
            <Plus className="mr-2 h-4 w-4" /> Request Device
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.requestedBy}</TableCell>
                    <TableCell>{request.requestDate}</TableCell>
                    <TableCell>{request.product}</TableCell>
                    <TableCell>{request.store}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>{request.summary}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                    No device requests found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <DeviceRequestDialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen} 
        />
      </div>
    </AppLayout>
  );
}
