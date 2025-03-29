
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
import { Plus, Edit, Eye } from "lucide-react";
import { toast } from "sonner";

interface Vendor {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
}

export default function Vendors() {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: "1",
      name: "TP-LINK",
      contact: "John Smith",
      email: "john.smith@tplink.com",
      phone: "+251911234567"
    },
    {
      id: "2",
      name: "UBIQUITI",
      contact: "Sarah Johnson",
      email: "sarah.johnson@ubnt.com",
      phone: "+251922345678"
    },
    {
      id: "3",
      name: "CISCO",
      contact: "Michael Williams",
      email: "m.williams@cisco.com",
      phone: "+251933456789"
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredVendors = vendors.filter(vendor => 
    vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleEdit = (id: string) => {
    toast.info(`Editing vendor ${id}`);
  };
  
  const handleView = (id: string) => {
    toast.info(`Viewing vendor ${id}`);
  };
  
  const handleCreateVendor = () => {
    toast.info("Creating new vendor");
  };

  return (
    <AppLayout title="VENDORS" subtitle="Overview">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <Input
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-4 pr-10"
            />
          </div>
          <Button 
            onClick={handleCreateVendor}
            className="bg-safety-yellow hover:bg-safety-yellow/90 text-black"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Vendor
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.name}</TableCell>
                  <TableCell>{vendor.contact}</TableCell>
                  <TableCell>{vendor.email}</TableCell>
                  <TableCell>{vendor.phone}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleEdit(vendor.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleView(vendor.id)}
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
      </div>
    </AppLayout>
  );
}
