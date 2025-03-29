
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
import { Eye, Edit, Plus } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { toast } from "sonner";

interface Store {
  id: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  description: string;
}

export default function Stores() {
  const [stores, setStores] = useState<Store[]>([
    {
      id: "1",
      name: "BloomTech",
      address: "Kazanchis Bloomtech",
      latitude: "9.0152096",
      longitude: "38.7857688",
      description: "Bloom tech store"
    },
    {
      id: "2",
      name: "Jakros Store",
      address: "Jakros",
      latitude: "9.0047965",
      longitude: "38.8161081",
      description: "jakros store"
    },
    {
      id: "3",
      name: "Kality Store",
      address: "Akaki Kality, Addis Ababa",
      latitude: "8.897106",
      longitude: "38.768922",
      description: "Akaki Kality Store"
    },
    {
      id: "4",
      name: "Bahir Dar",
      address: "Across from St. George Church, Abysinia Bank Building",
      latitude: "11.594679",
      longitude: "37.387434",
      description: "Bahirdar Store"
    },
    {
      id: "5",
      name: "Bloomtech No 2",
      address: "Kazanchis",
      latitude: "9.0152961",
      longitude: "38.7857681",
      description: "This section is dedicated to office stationery."
    },
    {
      id: "6",
      name: "Bloomtech No 3",
      address: "Kazanchis",
      latitude: "9.0152964",
      longitude: "38.7857684",
      description: "This section is for less frequently accessed items."
    },
    {
      id: "7",
      name: "Mina Store",
      address: "Mina Building",
      latitude: "8.9915813902571525",
      longitude: "38.77219714573763",
      description: "Mina Store"
    },
    {
      id: "8",
      name: "Dawit",
      address: "Taehay Real Estate",
      latitude: "9.022244092325239",
      longitude: "38.8541727501475",
      description: "Taehay Real Estate Data Center"
    },
    {
      id: "9",
      name: "ITP 1",
      address: "ICT Park Head Office",
      latitude: "8.996393926950989",
      longitude: "38.84045267970642",
      description: "ITP 1 is a dedicated store for fast-moving items and distribution of high-demand products."
    },
    {
      id: "10",
      name: "ITP 2",
      address: "ICT Park Head Office",
      latitude: "8.996174114313671",
      longitude: "38.84047440019552",
      description: "ITP 2 is a dedicated store for non-fast-moving items, optimized for the secure and organized storage of products with lower turnover rates."
    },
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleEdit = (id: string) => {
    toast.info(`Editing store ${id}`);
  };
  
  const handleView = (id: string) => {
    toast.info(`Viewing store ${id}`);
  };
  
  const handleCreateStore = () => {
    toast.info("Creating new store");
  };

  return (
    <AppLayout title="STORES" subtitle="Overview">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <Input
              placeholder="Search stores by name or address..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-4 pr-10"
            />
          </div>
          <Button 
            onClick={handleCreateStore}
            className="bg-safety-yellow hover:bg-safety-yellow/90 text-black"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Store
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Latitude</TableHead>
                <TableHead>Longitude</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStores.map((store) => (
                <TableRow key={store.id}>
                  <TableCell className="font-medium">{store.name}</TableCell>
                  <TableCell>{store.address}</TableCell>
                  <TableCell>{store.latitude}</TableCell>
                  <TableCell>{store.longitude}</TableCell>
                  <TableCell>{store.description}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleEdit(store.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleView(store.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </AppLayout>
  );
}
