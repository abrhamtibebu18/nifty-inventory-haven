
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface CreateStoreDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateStoreDialog({ open, onOpenChange }: CreateStoreDialogProps) {
  const [storeName, setStoreName] = useState("");
  const [storeLocation, setStoreLocation] = useState("");
  const [storeManager, setStoreManager] = useState("");
  const [storeDescription, setStoreDescription] = useState("");
  
  const handleSubmit = () => {
    if (!storeName) {
      toast.error("Please enter a store name");
      return;
    }
    
    if (!storeLocation) {
      toast.error("Please enter a store location");
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
    setStoreLocation("");
    setStoreManager("");
    setStoreDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Store</DialogTitle>
          <DialogDescription>Add a new store to the system</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input 
              id="storeName" 
              placeholder="Enter store name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="storeLocation">Store Location</Label>
            <Input 
              id="storeLocation" 
              placeholder="Enter store location"
              value={storeLocation}
              onChange={(e) => setStoreLocation(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="storeManager">Store Manager</Label>
            <Input 
              id="storeManager" 
              placeholder="Enter store manager"
              value={storeManager}
              onChange={(e) => setStoreManager(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="storeDescription">Description</Label>
            <Textarea 
              id="storeDescription" 
              placeholder="Enter store description"
              value={storeDescription}
              onChange={(e) => setStoreDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleSubmit}
            className="w-full bg-safety-yellow hover:bg-safety-yellow/90 text-black"
          >
            Create Store
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
