
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface TransferRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransferRequestDialog({ open, onOpenChange }: TransferRequestDialogProps) {
  const [sourceStore, setSourceStore] = useState("");
  const [destStore, setDestStore] = useState("");
  const [verifier, setVerifier] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  
  const handleSubmit = () => {
    if (!sourceStore) {
      toast.error("Please select a source store");
      return;
    }
    
    if (!destStore) {
      toast.error("Please select a destination store");
      return;
    }
    
    if (!verifier) {
      toast.error("Please select a store verifier");
      return;
    }
    
    if (!selectedProduct) {
      toast.error("Please select a product");
      return;
    }
    
    // Submit the request
    toast.success("Transfer request submitted successfully");
    
    // Reset form and close dialog
    resetForm();
    onOpenChange(false);
  };
  
  const resetForm = () => {
    setSourceStore("");
    setDestStore("");
    setVerifier("");
    setSelectedProduct("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-safety-yellow rounded-full w-8 h-8 flex items-center justify-center text-black font-bold">
              1
            </div>
            <div>
              <DialogTitle className="text-xl">Request Transfer</DialogTitle>
              <DialogDescription>Request Bulk Device Transfer from one store to another</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <label htmlFor="source" className="text-sm font-medium">Select Store</label>
            <Select value={sourceStore} onValueChange={setSourceStore}>
              <SelectTrigger>
                <SelectValue placeholder="source store to transfer devices from" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bloomtech">BloomTech</SelectItem>
                <SelectItem value="bloomtech-2">BloomTech No 2</SelectItem>
                <SelectItem value="bloomtech-3">BloomTech No 3</SelectItem>
                <SelectItem value="jakros">Jakros Store</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="destination" className="text-sm font-medium">Select Destination Store</label>
            <Select value={destStore} onValueChange={setDestStore}>
              <SelectTrigger>
                <SelectValue placeholder="destination store" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bloomtech">BloomTech</SelectItem>
                <SelectItem value="bloomtech-2">BloomTech No 2</SelectItem>
                <SelectItem value="bloomtech-3">BloomTech No 3</SelectItem>
                <SelectItem value="jakros">Jakros Store</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="verifier" className="text-sm font-medium">Store Verifier</label>
            <Select value={verifier} onValueChange={setVerifier}>
              <SelectTrigger>
                <SelectValue placeholder="store verifier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="abraham">Abraham Tibebu</SelectItem>
                <SelectItem value="kaleb">Kaleb Kebede</SelectItem>
                <SelectItem value="mengistu">Mengistu Abebe</SelectItem>
                <SelectItem value="dagmawi">Dagmawi Shiferaw</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="products" className="text-sm font-medium">Choose Products to Transfer</label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Products" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="router">3G/4G Wireless N Router</SelectItem>
                <SelectItem value="nanostation">UISP airMAX NanoStation 5AC Loco</SelectItem>
                <SelectItem value="litebeam">UISP airMAX LiteBeam 5AC Bridge GEN2</SelectItem>
                <SelectItem value="wireless-router">450Mbps Wireless N Router</SelectItem>
                <SelectItem value="edge-router">EdgeRouter X</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleSubmit}
            className="w-full bg-safety-yellow hover:bg-safety-yellow/90 text-black"
          >
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
