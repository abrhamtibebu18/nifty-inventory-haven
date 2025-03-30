
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Save } from "lucide-react";
import { toast } from "sonner";

interface AddVendorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddVendorDialog({ open, onOpenChange }: AddVendorDialogProps) {
  const [vendorName, setVendorName] = useState("");
  const [vendorCode, setVendorCode] = useState("");
  const [vendorDescription, setVendorDescription] = useState("");
  
  const handleSubmit = () => {
    if (!vendorName) {
      toast.error("Please enter a vendor name");
      return;
    }
    
    if (!vendorCode) {
      toast.error("Please enter a vendor code");
      return;
    }
    
    // Submit the vendor
    toast.success("Vendor added successfully");
    
    // Reset form and close dialog
    resetForm();
    onOpenChange(false);
  };
  
  const resetForm = () => {
    setVendorName("");
    setVendorCode("");
    setVendorDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 border-b flex flex-row items-center justify-between">
          <h2 className="text-xl font-bold uppercase">NEW VENDOR</h2>
          <div className="flex items-center gap-3">
            <Button onClick={handleSubmit} variant="default" className="bg-gray-600 hover:bg-gray-700">
              <Save className="mr-2 h-4 w-4" />
              SAVE
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="rounded-full h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="p-6 space-y-6">
          <div className="space-y-1">
            <Label htmlFor="vendorName" className="text-sm font-normal">Vendor Name</Label>
            <Input 
              id="vendorName" 
              placeholder="enter vendor name"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="vendorCode" className="text-sm font-normal">Vendor Code</Label>
            <Input 
              id="vendorCode" 
              placeholder="enter vendor code"
              value={vendorCode}
              onChange={(e) => setVendorCode(e.target.value)}
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="vendorDescription" className="text-sm font-normal">Vendor Description</Label>
            <Textarea 
              id="vendorDescription" 
              placeholder="enter vendor description"
              value={vendorDescription}
              onChange={(e) => setVendorDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
