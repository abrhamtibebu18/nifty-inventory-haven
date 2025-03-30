
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface AddVendorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddVendorDialog({ open, onOpenChange }: AddVendorDialogProps) {
  const [vendorName, setVendorName] = useState("");
  const [vendorContact, setVendorContact] = useState("");
  const [vendorEmail, setVendorEmail] = useState("");
  const [vendorPhone, setVendorPhone] = useState("");
  const [vendorAddress, setVendorAddress] = useState("");
  
  const handleSubmit = () => {
    if (!vendorName) {
      toast.error("Please enter a vendor name");
      return;
    }
    
    if (!vendorContact) {
      toast.error("Please enter a contact person");
      return;
    }
    
    if (!vendorEmail) {
      toast.error("Please enter an email address");
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
    setVendorContact("");
    setVendorEmail("");
    setVendorPhone("");
    setVendorAddress("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Vendor</DialogTitle>
          <DialogDescription>Add a new vendor to the system</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <Label htmlFor="vendorName">Vendor Name</Label>
            <Input 
              id="vendorName" 
              placeholder="Enter vendor name"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vendorContact">Contact Person</Label>
            <Input 
              id="vendorContact" 
              placeholder="Enter contact person"
              value={vendorContact}
              onChange={(e) => setVendorContact(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vendorEmail">Email</Label>
            <Input 
              id="vendorEmail" 
              type="email"
              placeholder="Enter email address"
              value={vendorEmail}
              onChange={(e) => setVendorEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vendorPhone">Phone</Label>
            <Input 
              id="vendorPhone" 
              placeholder="Enter phone number"
              value={vendorPhone}
              onChange={(e) => setVendorPhone(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vendorAddress">Address</Label>
            <Textarea 
              id="vendorAddress" 
              placeholder="Enter vendor address"
              value={vendorAddress}
              onChange={(e) => setVendorAddress(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleSubmit}
            className="w-full bg-safety-yellow hover:bg-safety-yellow/90 text-black"
          >
            Add Vendor
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
