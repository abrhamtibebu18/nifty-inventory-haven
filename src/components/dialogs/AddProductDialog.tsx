
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
  const isMobile = useIsMobile();
  const [vendor, setVendor] = useState("");
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [minimumThreshold, setMinimumThreshold] = useState("");
  const [criticalThreshold, setCriticalThreshold] = useState("");
  const [productId, setProductId] = useState("");
  const [partNo, setPartNo] = useState("");
  const [hsCode, setHsCode] = useState("");
  const [upcCode, setUpcCode] = useState("");
  const [productDescription, setProductDescription] = useState("");
  
  const handleSubmit = () => {
    if (!productName) {
      toast.error("Please enter a product name");
      return;
    }
    
    if (!vendor) {
      toast.error("Please select a vendor");
      return;
    }
    
    if (!productType) {
      toast.error("Please select a product type");
      return;
    }
    
    // Submit the product
    toast.success("Product added successfully");
    
    // Reset form and close dialog
    resetForm();
    onOpenChange(false);
  };
  
  const resetForm = () => {
    setVendor("");
    setProductType("");
    setProductName("");
    setMinimumThreshold("");
    setCriticalThreshold("");
    setProductId("");
    setPartNo("");
    setHsCode("");
    setUpcCode("");
    setProductDescription("");
  };

  const renderContent = () => (
    <>
      <div className={`${isMobile ? "sticky top-0 z-10 bg-background" : ""} p-4 border-b flex flex-row items-center justify-between`}>
        <h2 className="text-xl font-bold uppercase">NEW PRODUCT</h2>
        <div className="flex items-center gap-3">
          <Button onClick={handleSubmit} variant="default" className="bg-blue-500 hover:bg-blue-600">
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
      </div>
      
      <div className="p-4 md:p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-1">
            <Label htmlFor="vendor" className="text-sm font-normal">Vendor</Label>
            <Select value={vendor} onValueChange={setVendor}>
              <SelectTrigger id="vendor" placeholder="select vendor">
                <SelectValue placeholder="select vendor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tp-link">TP-Link</SelectItem>
                <SelectItem value="ubiquiti">Ubiquiti</SelectItem>
                <SelectItem value="cisco">Cisco</SelectItem>
                <SelectItem value="huawei">Huawei</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="productType" className="text-sm font-normal">Product Type</Label>
            <Select value={productType} onValueChange={setProductType}>
              <SelectTrigger id="productType" placeholder="select product type">
                <SelectValue placeholder="select product type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="network-devices">Network Devices</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="cables">Cables</SelectItem>
                <SelectItem value="other-hardware">Other Hardware</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <div className="md:col-span-2 space-y-1">
            <Label htmlFor="productName" className="text-sm font-normal">Product Name</Label>
            <Input 
              id="productName" 
              placeholder="enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">name of the product</p>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="minimumThreshold" className="text-sm font-normal">Minimum Threshold</Label>
            <Input 
              id="minimumThreshold" 
              placeholder="enter minimum threshold"
              value={minimumThreshold}
              onChange={(e) => setMinimumThreshold(e.target.value)}
            />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="criticalThreshold" className="text-sm font-normal">Critical Threshold</Label>
            <Input 
              id="criticalThreshold" 
              placeholder="enter critical threshold"
              value={criticalThreshold}
              onChange={(e) => setCriticalThreshold(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-1">
            <Label htmlFor="productId" className="text-sm font-normal">Product ID</Label>
            <Input 
              id="productId" 
              placeholder="enter product id"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">unique id used by the manufacturer to identify the product</p>
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="partNo" className="text-sm font-normal">Part No</Label>
            <Input 
              id="partNo" 
              placeholder="enter product part no"
              value={partNo}
              onChange={(e) => setPartNo(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">unique part no used by the manufacturer to identify the product</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="space-y-1">
            <Label htmlFor="hsCode" className="text-sm font-normal">HS-CODE</Label>
            <Input 
              id="hsCode" 
              placeholder="enter hs code for the project"
              value={hsCode}
              onChange={(e) => setHsCode(e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">customs authorities code used to identify this product</p>
          </div>
          
          <div className="space-y-1 relative">
            <Label htmlFor="upcCode" className="text-sm font-normal">UPC-CODE</Label>
            <div className="flex">
              <Input 
                id="upcCode" 
                placeholder="enter UPC code for the project"
                value={upcCode}
                onChange={(e) => setUpcCode(e.target.value)}
                className="pr-10"
              />
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-6 h-10"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">code used by the manufacturer to identify the product name</p>
          </div>
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="productDescription" className="text-sm font-normal">Product Description</Label>
          <Textarea 
            id="productDescription" 
            placeholder="enter product description"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            rows={5}
          />
          <p className="text-xs text-muted-foreground mt-1">specify a brief description of the product. i.e what it does or how it works</p>
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="productImages" className="text-sm font-normal">Product Images</Label>
          <div className="border rounded-md p-4 flex items-center gap-2 bg-muted/20">
            <Button variant="outline" size="sm" className="text-sm">
              <span className="mr-2">📎</span>
              Product Images
            </Button>
          </div>
        </div>
      </div>
    </>
  );

  // Use Sheet component for mobile devices and Dialog for larger screens
  return isMobile ? (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0">
        {renderContent()}
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
