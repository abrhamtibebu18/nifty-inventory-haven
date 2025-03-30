
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
  const [productName, setProductName] = useState("");
  const [productSKU, setProductSKU] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productVendor, setProductVendor] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  
  const handleSubmit = () => {
    if (!productName) {
      toast.error("Please enter a product name");
      return;
    }
    
    if (!productSKU) {
      toast.error("Please enter a product SKU");
      return;
    }
    
    if (!productCategory) {
      toast.error("Please select a product category");
      return;
    }
    
    // Submit the product
    toast.success("Product added successfully");
    
    // Reset form and close dialog
    resetForm();
    onOpenChange(false);
  };
  
  const resetForm = () => {
    setProductName("");
    setProductSKU("");
    setProductCategory("");
    setProductVendor("");
    setProductDescription("");
    setProductQuantity("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add New Product</DialogTitle>
          <DialogDescription>Add a new product to inventory</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="space-y-2">
            <Label htmlFor="productName">Product Name</Label>
            <Input 
              id="productName" 
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="productSKU">Product SKU</Label>
            <Input 
              id="productSKU" 
              placeholder="Enter product SKU"
              value={productSKU}
              onChange={(e) => setProductSKU(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="productCategory">Category</Label>
            <Select value={productCategory} onValueChange={setProductCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="network-devices">Network Devices</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="cables">Cables</SelectItem>
                <SelectItem value="other-hardware">Other Hardware</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="productVendor">Vendor</Label>
            <Select value={productVendor} onValueChange={setProductVendor}>
              <SelectTrigger>
                <SelectValue placeholder="Select vendor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tp-link">TP-Link</SelectItem>
                <SelectItem value="ubiquiti">Ubiquiti</SelectItem>
                <SelectItem value="cisco">Cisco</SelectItem>
                <SelectItem value="huawei">Huawei</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="productQuantity">Initial Quantity</Label>
            <Input 
              id="productQuantity" 
              type="number"
              placeholder="Enter initial quantity"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="productDescription">Description</Label>
            <Textarea 
              id="productDescription" 
              placeholder="Enter product description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              rows={3}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            onClick={handleSubmit}
            className="w-full bg-safety-yellow hover:bg-safety-yellow/90 text-black"
          >
            Add Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
