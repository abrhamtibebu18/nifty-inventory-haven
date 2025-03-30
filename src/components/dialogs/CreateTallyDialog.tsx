
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save } from "lucide-react";
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
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 border-b flex flex-row items-center justify-between">
          <h2 className="text-xl font-bold uppercase">NEW TALLY</h2>
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
            <Label htmlFor="tallyName" className="text-sm font-normal">Tally Name</Label>
            <Input 
              id="tallyName" 
              placeholder="enter tally name"
              value={tallyName}
              onChange={(e) => setTallyName(e.target.value)}
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="tallyStore" className="text-sm font-normal">Store</Label>
            <Select value={tallyStore} onValueChange={setTallyStore}>
              <SelectTrigger id="tallyStore">
                <SelectValue placeholder="select store" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bloomtech">BloomTech</SelectItem>
                <SelectItem value="bloomtech-2">BloomTech No 2</SelectItem>
                <SelectItem value="bloomtech-3">BloomTech No 3</SelectItem>
                <SelectItem value="jakros">Jakros Store</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="tallyType" className="text-sm font-normal">Tally Type</Label>
            <Select value={tallyType} onValueChange={setTallyType}>
              <SelectTrigger id="tallyType">
                <SelectValue placeholder="select tally type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Inventory</SelectItem>
                <SelectItem value="partial">Partial Inventory</SelectItem>
                <SelectItem value="category">Category-specific</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
