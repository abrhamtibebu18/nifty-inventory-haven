
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
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function TransferRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleRequestTransfer = () => {
    toast.info("Creating new transfer request");
  };

  return (
    <AppLayout title="TRANSFER REQUESTS" subtitle="Overview">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <Input
              placeholder="Search your requests..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-4 pr-10"
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
                <TableHead>Transfer Summary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length > 0 ? (
                requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.from}</TableCell>
                    <TableCell>{request.to}</TableCell>
                    <TableCell>{request.requestedBy}</TableCell>
                    <TableCell>{request.summary}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    You've not made any requests yet...
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
