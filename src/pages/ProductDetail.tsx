
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Package, Download, Edit, Trash, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Product {
  id: string;
  image: string;
  name: string;
  category: string;
  vendor: string;
  modelNo: string;
  sku: string;
  inStock: number;
  onOrder: number;
  minThreshold: number;
  criticalThreshold: number;
  description: string[];
  barcode?: string;
  hsCode?: string;
  macSn?: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching product data
    const fetchProduct = () => {
      setLoading(true);
      
      // This would be an API call in a real application
      setTimeout(() => {
        // Mock products database
        const products: Product[] = [
          {
            id: "1",
            image: "/placeholder.svg",
            name: "UISP airMAX NanoStation 5AC Loco",
            category: "Networking",
            vendor: "Ubiquiti Networks",
            modelNo: "NS-5ACL-US",
            sku: "MACONLY",
            inStock: 15,
            onOrder: 5,
            minThreshold: 10,
            criticalThreshold: 3,
            barcode: "121468252258",
            hsCode: "85176290",
            macSn: "MACSN",
            description: [
              "High-performance device for professional use",
              "Compatible with a wide range of systems and networks",
              "Energy-efficient design for reduced operating costs",
              "Built-in security features to protect against unauthorized access",
              "Extended warranty available for added peace of mind"
            ]
          },
          {
            id: "2",
            image: "/placeholder.svg",
            name: "UISP Fiber NanoG",
            category: "Fiber Optics",
            vendor: "Ubiquiti Networks",
            modelNo: "UF-NANO",
            sku: "UF-NANO",
            inStock: 8,
            onOrder: 0,
            minThreshold: 5,
            criticalThreshold: 2,
            description: [
              "High-speed fiber connectivity solution",
              "Easy deployment and configuration",
              "Compact and durable design",
              "Low power consumption",
              "Suitable for various network environments"
            ]
          },
        ];
        
        const foundProduct = products.find(p => p.id === id) || products[0];
        
        if (foundProduct) {
          setProduct(foundProduct);
          setError(null);
        } else {
          setError("Product not found");
        }
        
        setLoading(false);
      }, 500);
    };
    
    fetchProduct();
  }, [id]);

  const handleRequestTransfer = () => {
    toast.info("Requesting transfer for this product");
  };

  const handleRequestItem = () => {
    toast.info("Requesting additional items");
  };

  const handleDelete = () => {
    toast.success("Product deleted successfully");
    // Navigate away after deletion in a real app
  };

  const handleEdit = () => {
    toast.info("Editing product");
  };

  if (loading) {
    return (
      <AppLayout title="PRODUCT DETAILS" subtitle="Loading...">
        <div className="p-6 flex justify-center items-center min-h-[400px]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-48 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (error || !product) {
    return (
      <AppLayout title="PRODUCT DETAILS" subtitle="Error">
        <div className="p-6">
          <div className="text-red-500 mb-4">{error || "Failed to load product"}</div>
          <Button asChild variant="outline">
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="PRODUCT DETAILS" subtitle="Overview">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <Button asChild variant="outline">
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            
            <Button variant="outline" onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the product
                    from the inventory system.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4">
                <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center h-[240px]">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="max-w-full max-h-full object-contain" 
                  />
                </div>
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className="bg-safety-yellow text-black">{product.category}</Badge>
                  <Badge variant="outline">{product.vendor}</Badge>
                  <Badge variant="outline" className="bg-gray-100">{product.sku}</Badge>
                </div>
                
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-500 mb-6">Model: {product.modelNo}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Inventory Status</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">In Stock</span>
                          <span className="text-sm font-semibold">{product.inStock}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ 
                              width: `${Math.min(100, (product.inStock / product.minThreshold) * 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">On Order</span>
                          <span className="text-sm font-semibold">{product.onOrder}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-sm">Minimum Threshold</span>
                        <span className="text-sm font-medium">{product.minThreshold}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm">Critical Threshold</span>
                        <span className="text-sm font-medium">{product.criticalThreshold}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Product Details</h3>
                    
                    <div className="space-y-2">
                      {product.barcode && (
                        <div className="flex justify-between">
                          <span className="text-sm">Barcode</span>
                          <span className="text-sm font-medium">{product.barcode}</span>
                        </div>
                      )}
                      
                      {product.hsCode && (
                        <div className="flex justify-between">
                          <span className="text-sm">HS Code</span>
                          <span className="text-sm font-medium">{product.hsCode}</span>
                        </div>
                      )}
                      
                      {product.macSn && (
                        <div className="flex justify-between">
                          <span className="text-sm">MAC/SN</span>
                          <span className="text-sm font-medium">{product.macSn}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-6">
                  <Button className="bg-safety-yellow hover:bg-safety-yellow/80 text-black flex-1" onClick={handleRequestTransfer}>
                    Request Transfer
                  </Button>
                  
                  <Button variant="outline" className="flex-1" onClick={handleRequestItem}>
                    Request Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="shelf">Shelf</TabsTrigger>
            <TabsTrigger value="history">Import History</TabsTrigger>
            <TabsTrigger value="report">Stock Report</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6 p-6 border rounded-lg bg-white">
            <h3 className="text-lg font-medium mb-4">Description</h3>
            <ul className="list-disc pl-5 space-y-2">
              {product.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </TabsContent>
          
          <TabsContent value="shelf" className="mt-6 p-6 border rounded-lg bg-white">
            <div className="flex flex-col items-center justify-center py-8">
              <Package className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Shelf Information</h3>
              <p className="text-gray-500 mb-4">This product is stored in multiple locations</p>
              <table className="w-full max-w-xl border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border px-4 py-2 text-left">Location</th>
                    <th className="border px-4 py-2 text-left">Shelf ID</th>
                    <th className="border px-4 py-2 text-right">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border px-4 py-2">BloomTech</td>
                    <td className="border px-4 py-2">A-12-3</td>
                    <td className="border px-4 py-2 text-right">10</td>
                  </tr>
                  <tr>
                    <td className="border px-4 py-2">Jakros Store</td>
                    <td className="border px-4 py-2">B-05-2</td>
                    <td className="border px-4 py-2 text-right">5</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6 p-6 border rounded-lg bg-white">
            <div className="flex flex-col items-center justify-center py-8">
              <ExternalLink className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Import History</h3>
              <p className="text-gray-500">No import history available for this product</p>
            </div>
          </TabsContent>
          
          <TabsContent value="report" className="mt-6 p-6 border rounded-lg bg-white">
            <div className="flex flex-col items-center justify-center py-8">
              <ExternalLink className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Stock Report</h3>
              <p className="text-gray-500">Stock reporting is not available for this product</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
