
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface DeviceRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeviceRequestDialog({ open, onOpenChange }: DeviceRequestDialogProps) {
  const [storeLocation, setStoreLocation] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [requestReason, setRequestReason] = useState("");
  
  const handleSubmit = () => {
    if (!storeLocation) {
      toast.error("Please select a store location");
      return;
    }
    
    if (!selectedProduct) {
      toast.error("Please select a product");
      return;
    }
    
    // Submit the request
    toast.success("Device request submitted successfully");
    
    // Reset form and close dialog
    resetForm();
    onOpenChange(false);
  };
  
  const resetForm = () => {
    setStoreLocation("");
    setSelectedProduct("");
    setRequestReason("");
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
              <DialogTitle className="text-xl">Request Device</DialogTitle>
              <DialogDescription>Request Device from store</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <label htmlFor="store" className="text-sm font-medium">Select Store Location</label>
            <Select value={storeLocation} onValueChange={setStoreLocation}>
              <SelectTrigger>
                <SelectValue placeholder="select store to request device from" />
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
            <label htmlFor="products" className="text-sm font-medium">Choose Products to Request</label>
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
          
          <div className="space-y-2">
            <label htmlFor="reason" className="text-sm font-medium">Request reason</label>
            <Textarea 
              id="reason" 
              placeholder="Comment"
              value={requestReason}
              onChange={(e) => setRequestReason(e.target.value)}
              rows={4}
            />
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
