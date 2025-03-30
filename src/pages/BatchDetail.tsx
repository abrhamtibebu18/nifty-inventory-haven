
import { useParams } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Truck, Clipboard, Printer } from "lucide-react";

const BatchDetail = () => {
  const { id } = useParams();
  
  // This would normally come from an API
  const batchDetails = {
    batchNo: id,
    product: "DIGITAL SM LC UPC 9/125, 1.5M",
    productCode: "DSM-LC-UPC-15",
    vendor: "Fiber Optics Inc.",
    dateReceived: "2023-10-15",
    quantity: 250,
    location: "Warehouse A",
    status: "In Stock"
  };

  return (
    <AppLayout title={`BATCH #${id}`} subtitle="Batch Details">
      <div className="container py-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Batch Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Product Name</p>
                  <p className="font-medium">{batchDetails.product}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Product Code</p>
                  <p className="font-medium">{batchDetails.productCode}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Vendor</p>
                  <p className="font-medium">{batchDetails.vendor}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date Received</p>
                  <p className="font-medium">{batchDetails.dateReceived}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-medium">{batchDetails.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{batchDetails.location}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{batchDetails.status}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-safety-yellow hover:bg-safety-yellow/90 text-black">
                  <Package className="mr-2 h-4 w-4" />
                  Update Stock
                </Button>
                <Button className="bg-safety-yellow hover:bg-safety-yellow/90 text-black">
                  <Truck className="mr-2 h-4 w-4" />
                  Transfer Batch
                </Button>
                <Button className="bg-safety-yellow hover:bg-safety-yellow/90 text-black">
                  <Clipboard className="mr-2 h-4 w-4" />
                  View History
                </Button>
                <Button className="bg-safety-yellow hover:bg-safety-yellow/90 text-black">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Label
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Batch History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b">
                <div className="rounded-full bg-blue-100 p-2">
                  <Package className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium">Batch received</p>
                  <p className="text-sm text-muted-foreground">2023-10-15 09:30 AM</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 pb-3 border-b">
                <div className="rounded-full bg-green-100 p-2">
                  <Clipboard className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Inventory counted</p>
                  <p className="text-sm text-muted-foreground">2023-10-20 11:15 AM</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 pb-3">
                <div className="rounded-full bg-purple-100 p-2">
                  <Truck className="h-4 w-4 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium">Partial transfer to Store B</p>
                  <p className="text-sm text-muted-foreground">2023-11-05 02:45 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default BatchDetail;
