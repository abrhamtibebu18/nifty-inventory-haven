
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface CreateFacilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateFacilityDialog({ open, onOpenChange }: CreateFacilityDialogProps) {
  const [facilityName, setFacilityName] = useState("");
  const [facilityType, setFacilityType] = useState("");
  const [facilityLocation, setFacilityLocation] = useState("");
  const [facilityManager, setFacilityManager] = useState("");
  const [facilityDescription, setFacilityDescription] = useState("");
  
  const handleSubmit = () => {
    if (!facilityName) {
      toast.error("Please enter a facility name");
      return;
    }
    
    if (!facilityType) {
      toast.error("Please select a facility type");
      return;
    }
    
    if (!facilityLocation) {
      toast.error("Please enter a facility location");
      return;
    }
    
    // Submit the facility
    toast.success("Facility created successfully");
    
    // Reset form and close dialog
    resetForm();
    onOpenChange(false);
  };
  
  const resetForm = () => {
    setFacilityName("");
    setFacilityType("");
    setFacilityLocation("");
    setFacilityManager("");
    setFacilityDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Facility</DialogTitle>
          <DialogDescription>Add a new facility to the system</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <Label htmlFor="facilityName">Facility Name</Label>
            <Input 
              id="facilityName" 
              placeholder="Enter facility name"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="facilityType">Facility Type</Label>
            <Select value={facilityType} onValueChange={setFacilityType}>
              <SelectTrigger>
                <SelectValue placeholder="Select facility type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warehouse">Warehouse</SelectItem>
                <SelectItem value="store">Store</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="datacenter">Data Center</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="facilityLocation">Location</Label>
            <Input 
              id="facilityLocation" 
              placeholder="Enter facility location"
              value={facilityLocation}
              onChange={(e) => setFacilityLocation(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="facilityManager">Facility Manager</Label>
            <Input 
              id="facilityManager" 
              placeholder="Enter facility manager"
              value={facilityManager}
              onChange={(e) => setFacilityManager(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="facilityDescription">Description</Label>
            <Textarea 
              id="facilityDescription" 
              placeholder="Enter facility description"
              value={facilityDescription}
              onChange={(e) => setFacilityDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleSubmit}
            className="w-full bg-safety-yellow hover:bg-safety-yellow/90 text-black"
          >
            Create Facility
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
