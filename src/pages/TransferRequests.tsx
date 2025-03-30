
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
import { TransferRequestDialog } from "@/components/dialogs/TransferRequestDialog";
import { Badge } from "@/components/ui/badge";

interface TransferRequest {
  id: string;
  from: string;
  to: string;
  requestedBy: string;
  requestDate: string;
  product: string;
  quantity: number;
  status: "pending" | "approved" | "rejected" | "completed";
  summary: string;
}

export default function TransferRequests() {
  const [requests, setRequests] = useState<TransferRequest[]>([
    {
      id: "TR-001",
      from: "BloomTech",
      to: "Jakros Store",
      requestedBy: "Abraham Tibebu",
      requestDate: "2023-06-10",
      product: "UISP airMAX NanoStation 5AC Loco",
      quantity: 3,
      status: "completed",
      summary: "Monthly inventory rebalancing"
    },
    {
      id: "TR-002",
      from: "BloomTech No 3",
      to: "BloomTech",
      requestedBy: "Abraham Tibebu",
      requestDate: "2023-06-15",
      product: "EdgeRouter X",
      quantity: 5,
      status: "pending",
      summary: "Centralizing stock for easier management"
    },
    {
      id: "TR-003",
      from: "Jakros Store",
      to: "BloomTech No 2",
      requestedBy: "Abraham Tibebu",
      requestDate: "2023-06-20",
      product: "450Mbps Wireless N Router",
      quantity: 10,
      status: "approved",
      summary: "High demand at destination location"
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleRequestTransfer = () => {
    setIsDialogOpen(true);
  };

  const filteredRequests = requests.filter(request => 
    request.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: TransferRequest['status']) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-blue-100 text-blue-800">Approved</Badge>;
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <AppLayout title="TRANSFER REQUESTS" subtitle="Overview">
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
            onClick={handleRequestTransfer}
            className="bg-safety-yellow hover:bg-safety-yellow/90 text-black"
          >
            <Plus className="mr-2 h-4 w-4" /> Request Transfer
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Qty</TableHead>
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
                    <TableCell>{request.from}</TableCell>
                    <TableCell>{request.to}</TableCell>
                    <TableCell>{request.requestedBy}</TableCell>
                    <TableCell>{request.requestDate}</TableCell>
                    <TableCell>{request.product}</TableCell>
                    <TableCell>{request.quantity}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>{request.summary}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="text-center py-10 text-muted-foreground">
                    No transfer requests found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <TransferRequestDialog 
          open={isDialogOpen} 
          onOpenChange={setIsDialogOpen} 
        />
      </div>
    </AppLayout>
  );
}
