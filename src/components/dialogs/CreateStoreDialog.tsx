
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Save } from "lucide-react";
import { toast } from "sonner";

interface CreateStoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateStoreDialog({ open, onOpenChange }: CreateStoreDialogProps) {
  const [storeName, setStoreName] = useState("");
  const [storeAddress, setStoreAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  
  const handleSubmit = () => {
    if (!storeName) {
      toast.error("Please enter a store name");
      return;
    }
    
    if (!storeAddress) {
      toast.error("Please enter a store address");
      return;
    }
    
    // Submit the store
    toast.success("Store created successfully");
    
    // Reset form and close dialog
    resetForm();
    onOpenChange(false);
  };
  
  const resetForm = () => {
    setStoreName("");
    setStoreAddress("");
    setLatitude("");
    setLongitude("");
    setStoreDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 border-b flex flex-row items-center justify-between">
          <h2 className="text-xl font-bold uppercase">NEW STORE</h2>
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
            <Label htmlFor="storeName" className="text-sm font-normal">Store Name</Label>
            <Input 
              id="storeName" 
              placeholder="enter store name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="storeAddress" className="text-sm font-normal">Store Address</Label>
            <Textarea 
              id="storeAddress" 
              placeholder="enter descriptive address of the store's location"
              value={storeAddress}
              onChange={(e) => setStoreAddress(e.target.value)}
              rows={3}
            />
          </div>
          
          <div>
            <Label className="text-sm font-normal mb-2 block">Store Coordinates</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="latitude" className="text-sm font-normal">Latitude</Label>
                <Input 
                  id="latitude" 
                  placeholder="enter latitude coordinate"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">e.g 8.999080</p>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="longitude" className="text-sm font-normal">Longitude</Label>
                <Input 
                  id="longitude" 
                  placeholder="enter longitude coordinate"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">e.g 8.999080</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="storeDescription" className="text-sm font-normal">Store Description</Label>
            <Textarea 
              id="storeDescription" 
              placeholder="enter store description"
              value={storeDescription}
              onChange={(e) => setStoreDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        
        <DialogFooter className="border-t p-4">
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
