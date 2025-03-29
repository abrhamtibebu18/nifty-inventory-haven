
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
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { AlertTriangle } from "lucide-react";

interface Anomaly {
  id: string;
  macAddress: string;
  serialNumber: string;
  quantity: number;
}

export default function Anomalies() {
  const [anomalies, setAnomalies] = useState<Anomaly[]>([
    {
      id: "1",
      macAddress: "F16AC039957",
      serialNumber: "F16AC039957",
      quantity: 2
    },
    {
      id: "2",
      macAddress: "F16BC006711",
      serialNumber: "F16BC006711",
      quantity: 2
    },
    {
      id: "3",
      macAddress: "F16AC039939",
      serialNumber: "F16AC039939",
      quantity: 2
    }
  ]);
  
  const [rowsPerPage, setRowsPerPage] = useState("10");

  return (
    <AppLayout title="ANOMALIES" subtitle="Overview">
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          Anomalies
        </h2>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mac Address</TableHead>
                <TableHead>Serial No</TableHead>
                <TableHead>Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {anomalies.map((anomaly) => (
                <TableRow key={anomaly.id}>
                  <TableCell>{anomaly.macAddress}</TableCell>
                  <TableCell>{anomaly.serialNumber}</TableCell>
                  <TableCell>{anomaly.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Rows per page:</span>
            <Select
              value={rowsPerPage}
              onValueChange={setRowsPerPage}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="text-sm text-muted-foreground">
            1-3 of 3
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
      </div>
    </AppLayout>
  );
}
