
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface CreateBatchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateBatchDialog({ open, onOpenChange }: CreateBatchDialogProps) {
  const [batchName, setBatchName] = useState("");
  const [storeLocation, setStoreLocation] = useState("");
  const [declaration, setDeclaration] = useState("");
  const [product, setProduct] = useState("");
  const [batchTallier, setBatchTallier] = useState("");
  const [batchVerifier, setBatchVerifier] = useState("");
  const [storeVerifier, setStoreVerifier] = useState("");
  
  const handleSubmit = () => {
    if (!batchName) {
      toast.error("Please enter a batch name");
      return;
    }
    
    if (!storeLocation) {
      toast.error("Please select a store location");
      return;
    }
    
    if (!product) {
      toast.error("Please select a product");
      return;
    }
    
    // Submit the batch
    toast.success("Batch created successfully");
    
    // Reset form and close dialog
    resetForm();
    onOpenChange(false);
  };
  
  const resetForm = () => {
    setBatchName("");
    setStoreLocation("");
    setDeclaration("");
    setProduct("");
    setBatchTallier("");
    setBatchVerifier("");
    setStoreVerifier("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">New Batch</DialogTitle>
          <DialogDescription>Create a new product batch</DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="space-y-2">
            <Label htmlFor="batchName">Batch Name</Label>
            <Input 
              id="batchName" 
              placeholder="Enter batch name"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="storeLocation">Store</Label>
            <Select value={storeLocation} onValueChange={setStoreLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select store location" />
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
            <Label htmlFor="declaration">Declaration Document</Label>
            <Select value={declaration} onValueChange={setDeclaration}>
              <SelectTrigger>
                <SelectValue placeholder="Select declaration document" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dec-001">DEC-001 (May 15, 2023)</SelectItem>
                <SelectItem value="dec-002">DEC-002 (May 22, 2023)</SelectItem>
                <SelectItem value="dec-003">DEC-003 (May 30, 2023)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="product">Product</Label>
            <Select value={product} onValueChange={setProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pigtail">PIGTAIL SM LC UPC 9/125, 1.5M</SelectItem>
                <SelectItem value="trunking">CABLE TRUNKING 3M</SelectItem>
                <SelectItem value="gpon">WS GPON TERMINAL</SelectItem>
                <SelectItem value="fiber">WS FIBER PATCH CABLE 100M</SelectItem>
                <SelectItem value="headset">PLANTRONICS HEADSET</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="batchTallier">Batch Tallier</Label>
            <Select value={batchTallier} onValueChange={setBatchTallier}>
              <SelectTrigger>
                <SelectValue placeholder="Select batch tallier user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="abraham">Abraham Tibebu</SelectItem>
                <SelectItem value="kedir">Kedir Yusuf</SelectItem>
                <SelectItem value="dawit">Dawit Tesfaye</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="batchVerifier">Batch Verifier</Label>
            <Select value={batchVerifier} onValueChange={setBatchVerifier}>
              <SelectTrigger>
                <SelectValue placeholder="Select batch verifying user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mengistu">Mengistu Abebe</SelectItem>
                <SelectItem value="kaleb">Kaleb Kebede</SelectItem>
                <SelectItem value="dagmawi">Dagmawi Shiferaw</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="storeVerifier">Store Verifier</Label>
            <Select value={storeVerifier} onValueChange={setStoreVerifier}>
              <SelectTrigger>
                <SelectValue placeholder="Select store keeper" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yonas">Yonas Kebede</SelectItem>
                <SelectItem value="samuel">Samuel Tefera</SelectItem>
                <SelectItem value="henok">Henok Assefa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleSubmit}
            className="w-full bg-black hover:bg-black/90 text-white"
          >
            CREATE
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
