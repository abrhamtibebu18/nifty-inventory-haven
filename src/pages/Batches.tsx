
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
import { Plus, ChevronRight } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { CreateBatchDialog } from "@/components/dialogs/CreateBatchDialog";

interface BatchItem {
  id: string;
  batchNumber: string;
  product: string;
  productImage: string;
  batchCode: string;
}

export default function Batches() {
  const [batchItems, setBatchItems] = useState<BatchItem[]>([
    {
      id: "1",
      batchNumber: "3899",
      product: "PIGTAIL SM LC UPC 9/125, 1.5M",
      productImage: "/placeholder.svg",
      batchCode: "Pigtail SM LC UPC 9/125, 1.5m"
    },
    {
      id: "2",
      batchNumber: "3904",
      product: "CABLE TRUNKING 3M",
      productImage: "/placeholder.svg",
      batchCode: "Cable Trunking 3M"
    },
    {
      id: "3",
      batchNumber: "3907",
      product: "WS GPON TERMINAL",
      productImage: "/placeholder.svg",
      batchCode: "Wsssss"
    },
    {
      id: "4",
      batchNumber: "3917",
      product: "WS FIBER PATCH CABLE 100M SC/UPC-SC/UPC WITH FAST CONNECTOR",
      productImage: "/placeholder.svg",
      batchCode: "100mmm"
    },
    {
      id: "5",
      batchNumber: "3920",
      product: "PLANTRONICS HEADSET",
      productImage: "/placeholder.svg",
      batchCode: "Headset"
    },
    {
      id: "6",
      batchNumber: "3921",
      product: "2M UTP CAT6 COPPER CABLE WITH RJ45",
      productImage: "/placeholder.svg",
      batchCode: "30mmmm"
    },
    {
      id: "7",
      batchNumber: "3950",
      product: "UISP AIRMAX NANOSTATION 5AC LOCO",
      productImage: "/placeholder.svg",
      batchCode: "Nano S"
    },
    {
      id: "8",
      batchNumber: "3974",
      product: "450MBPS WIRELESS N ROUTER",
      productImage: "/placeholder.svg",
      batchCode: "tplink"
    },
    {
      id: "9",
      batchNumber: "3977",
      product: "3G/4G WIRELESS N ROUTER",
      productImage: "/placeholder.svg",
      batchCode: "TPLINKK"
    },
    {
      id: "10",
      batchNumber: "3987",
      product: "0.5M (2FT) 40G QSFP+ PASSIVE DIRECT ATTACH",
      productImage: "/placeholder.svg",
      batchCode: "0.5m (2ft) 40G QSFP+ Passive Direct Attach"
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  const [batchDialogOpen, setBatchDialogOpen] = useState(false);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredItems = batchItems.filter(item => 
    item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.batchCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout title="BATCH MANAGEMENT" subtitle="Overview">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <Input
              placeholder="Search batches by number, product or code"
              value={searchQuery}
              onChange={handleSearch}
              className="pl-4 pr-10"
            />
          </div>
          <Button 
            onClick={() => setBatchDialogOpen(true)}
            className="bg-black hover:bg-black/90 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> NEW BATCH
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch Number</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Batch Code</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.batchNumber}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img 
                        src={item.productImage} 
                        alt={item.product}
                        className="w-8 h-8 object-contain"
                      />
                      <span>{item.product}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.batchCode}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex items-center gap-1"
                      asChild
                    >
                      <Link to={`/batches/${item.id}`}>
                        MORE <ChevronRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </TableCell>
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
            1-10 of 30
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

      <CreateBatchDialog
        open={batchDialogOpen}
        onOpenChange={setBatchDialogOpen}
      />
    </AppLayout>
  );
}
