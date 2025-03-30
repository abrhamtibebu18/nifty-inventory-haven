
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Package, BarChart3, FileText, Store, Building, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { CreateStoreDialog } from "@/components/dialogs/CreateStoreDialog";
import { CreateTallyDialog } from "@/components/dialogs/CreateTallyDialog";
import { AddProductDialog } from "@/components/dialogs/AddProductDialog";
import { AddVendorDialog } from "@/components/dialogs/AddVendorDialog";
import { CreateFacilityDialog } from "@/components/dialogs/CreateFacilityDialog";

export function QuickActions() {
  const [storeDialogOpen, setStoreDialogOpen] = useState(false);
  const [tallyDialogOpen, setTallyDialogOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [vendorDialogOpen, setVendorDialogOpen] = useState(false);
  const [facilityDialogOpen, setFacilityDialogOpen] = useState(false);

  const handleClick = (name: string) => {
    toast(`Navigating to ${name}`);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <Button 
          className="flex-1 bg-safety-yellow hover:bg-safety-yellow/90 text-black h-14"
          onClick={() => setProductDialogOpen(true)}
        >
          <Package className="mr-2 h-5 w-5" />
          Add Products
        </Button>
        
        <Button 
          className="flex-1 bg-safety-yellow hover:bg-safety-yellow/90 text-black h-14"
          onClick={() => setTallyDialogOpen(true)}
        >
          <BarChart3 className="mr-2 h-5 w-5" />
          New Tally
        </Button>
        
        <Button 
          className="flex-1 bg-safety-yellow hover:bg-safety-yellow/90 text-black h-14"
          onClick={() => setStoreDialogOpen(true)}
        >
          <Store className="mr-2 h-5 w-5" />
          Create Store
        </Button>
        
        <Button 
          className="flex-1 bg-safety-yellow hover:bg-safety-yellow/90 text-black h-14"
          onClick={() => setVendorDialogOpen(true)}
        >
          <Users className="mr-2 h-5 w-5" />
          Add Vendors
        </Button>
        
        <Button 
          className="flex-1 bg-safety-yellow hover:bg-safety-yellow/90 text-black h-14 col-span-2"
          onClick={() => setFacilityDialogOpen(true)}
        >
          <Building className="mr-2 h-5 w-5" />
          Create Facilities
        </Button>
      </div>

      <CreateStoreDialog 
        open={storeDialogOpen} 
        onOpenChange={setStoreDialogOpen} 
      />
      
      <CreateTallyDialog 
        open={tallyDialogOpen} 
        onOpenChange={setTallyDialogOpen} 
      />
      
      <AddProductDialog 
        open={productDialogOpen} 
        onOpenChange={setProductDialogOpen} 
      />
      
      <AddVendorDialog 
        open={vendorDialogOpen} 
        onOpenChange={setVendorDialogOpen} 
      />
      
      <CreateFacilityDialog 
        open={facilityDialogOpen} 
        onOpenChange={setFacilityDialogOpen} 
      />
    </>
  );
}
