
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save } from "lucide-react";
import { toast } from "sonner";

interface CreateFacilityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateFacilityDialog({ open, onOpenChange }: CreateFacilityDialogProps) {
  const [facilityName, setFacilityName] = useState("");
  const [facilityType, setFacilityType] = useState("");
  const [facilityAddress, setFacilityAddress] = useState("");
  const [facilityManager, setFacilityManager] = useState("");
  const [facilityCoordinates, setFacilityCoordinates] = useState("");
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
    
    if (!facilityAddress) {
      toast.error("Please enter a facility address");
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
    setFacilityAddress("");
    setFacilityManager("");
    setFacilityCoordinates("");
    setFacilityDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <DialogHeader className="p-6 border-b flex flex-row items-center justify-between">
          <h2 className="text-xl font-bold uppercase">NEW FACILITY</h2>
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
            <Label htmlFor="facilityName" className="text-sm font-normal">Facility Name</Label>
            <Input 
              id="facilityName" 
              placeholder="enter facility name"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="facilityType" className="text-sm font-normal">Facility Type</Label>
            <Select value={facilityType} onValueChange={setFacilityType}>
              <SelectTrigger id="facilityType">
                <SelectValue placeholder="select facility type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warehouse">Warehouse</SelectItem>
                <SelectItem value="store">Store</SelectItem>
                <SelectItem value="office">Office</SelectItem>
                <SelectItem value="datacenter">Data Center</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="facilityAddress" className="text-sm font-normal">Facility Address</Label>
            <Textarea 
              id="facilityAddress" 
              placeholder="enter facility address"
              value={facilityAddress}
              onChange={(e) => setFacilityAddress(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="facilityManager" className="text-sm font-normal">Facility Manager</Label>
            <Input 
              id="facilityManager" 
              placeholder="enter facility manager"
              value={facilityManager}
              onChange={(e) => setFacilityManager(e.target.value)}
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="facilityCoordinates" className="text-sm font-normal">Facility Coordinates</Label>
            <Input 
              id="facilityCoordinates" 
              placeholder="enter facility coordinates (latitude, longitude)"
              value={facilityCoordinates}
              onChange={(e) => setFacilityCoordinates(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">e.g 8.999080, 9.123456</p>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="facilityDescription" className="text-sm font-normal">Facility Description</Label>
            <Textarea 
              id="facilityDescription" 
              placeholder="enter facility description"
              value={facilityDescription}
              onChange={(e) => setFacilityDescription(e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
