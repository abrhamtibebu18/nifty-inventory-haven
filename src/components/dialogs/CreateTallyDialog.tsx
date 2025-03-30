
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface CreateTallyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTallyDialog({ open, onOpenChange }: CreateTallyDialogProps) {
  const [tallyName, setTallyName] = useState("");
  const [tallyStore, setTallyStore] = useState("");
  const [tallyType, setTallyType] = useState("");
  
  const handleSubmit = () => {
    if (!tallyName) {
      toast.error("Please enter a tally name");
      return;
    }
    
    if (!tallyStore) {
      toast.error("Please select a store");
      return;
    }
    
    if (!tallyType) {
      toast.error("Please select a tally type");
      return;
    }
    
    // Submit the tally
    toast.success("Tally created successfully");
    
    // Reset form and close dialog
    resetForm();
    onOpenChange(false);
  };
  
  const resetForm = () => {
    setTallyName("");
    setTallyStore("");
    setTallyType("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Tally</DialogTitle>
          <DialogDescription>Create a new tally sheet</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <Label htmlFor="tallyName">Tally Name</Label>
            <Input 
              id="tallyName" 
              placeholder="Enter tally name"
              value={tallyName}
              onChange={(e) => setTallyName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tallyStore">Store</Label>
            <Select value={tallyStore} onValueChange={setTallyStore}>
              <SelectTrigger>
                <SelectValue placeholder="Select store" />
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
            <Label htmlFor="tallyType">Tally Type</Label>
            <Select value={tallyType} onValueChange={setTallyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select tally type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Inventory</SelectItem>
                <SelectItem value="partial">Partial Inventory</SelectItem>
                <SelectItem value="category">Category-specific</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleSubmit}
            className="w-full bg-safety-yellow hover:bg-safety-yellow/90 text-black"
          >
            Create Tally
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
