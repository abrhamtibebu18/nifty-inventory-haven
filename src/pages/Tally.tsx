
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
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface TallyItem {
  id: string;
  user: string;
  date: string;
  type: "Store" | "Facility";
  location: string;
  status: "Closed" | "Open" | "Pending";
  initials: string;
}

export default function Tally() {
  const [tallyItems, setTallyItems] = useState<TallyItem[]>([
    {
      id: "1",
      user: "Kaleb Kebede Beyene",
      date: "May 15, 2023",
      type: "Store",
      location: "BloomTech",
      status: "Closed",
      initials: "K"
    },
    {
      id: "2",
      user: "Kaleb Kebede Beyene",
      date: "May 22, 2023",
      type: "Facility",
      location: "Summit Condominium Data Center",
      status: "Closed",
      initials: "K"
    },
    {
      id: "3",
      user: "Mengistu Abebe",
      date: "May 30, 2023",
      type: "Facility",
      location: "Ayat Tafo Condominium",
      status: "Closed",
      initials: "M"
    },
    {
      id: "4",
      user: "Mengistu Abebe",
      date: "May 30, 2023",
      type: "Facility",
      location: "Bole Arabsa Condominium Data Center",
      status: "Closed",
      initials: "M"
    },
    {
      id: "5",
      user: "Dagmawi Shiferaw",
      date: "May 28, 2023",
      type: "Store",
      location: "Bloomtech No 3",
      status: "Closed",
      initials: "D"
    },
    {
      id: "6",
      user: "Dagmawi Shiferaw",
      date: "Jun 3, 2023",
      type: "Store",
      location: "Jakros Store",
      status: "Closed",
      initials: "D"
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState("10");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredItems = tallyItems.filter(item => 
    item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleNewTally = () => {
    toast.info("Creating new tally");
  };

  return (
    <AppLayout title="INVENTORY TALLY" subtitle="Overview">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <Input
              placeholder="Search tally by store by's name or address"
              value={searchQuery}
              onChange={handleSearch}
              className="pl-4 pr-10"
            />
          </div>
          <Button 
            onClick={handleNewTally}
            className="bg-black hover:bg-black/90 text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> NEW TALLY
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead width={50}></TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Facility</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
                      {item.initials}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{item.user}</div>
                    <div className="text-xs text-muted-foreground">{item.date}</div>
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.type === "Store" ? item.location : ""}</TableCell>
                  <TableCell>{item.type === "Facility" ? item.location : ""}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "Closed" ? "outline" : "default"} className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
                      {item.status}
                    </Badge>
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
            1-10 of 68
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
