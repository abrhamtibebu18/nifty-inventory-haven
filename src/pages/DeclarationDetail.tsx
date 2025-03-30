
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Edit, FileText, ExternalLink, AlertTriangle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Declaration {
  id: string;
  status: "complete" | "incomplete";
  type: string;
  serial: string;
  createdAt: string;
  description: string[];
  products: {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    unit: string;
    image?: string;
    status?: "success" | "error";
  }[];
  hasAttachments: boolean;
  attachments?: {
    name: string;
    type: string;
  }[];
}

export default function DeclarationDetail() {
  const { id } = useParams();
  const [declaration, setDeclaration] = useState<Declaration | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching declaration data
    const fetchDeclaration = () => {
      setLoading(true);
      
      // This would be an API call in a real application
      setTimeout(() => {
        // Mock declarations database
        const declarations: Declaration[] = [
          {
            id: "1",
            status: "incomplete",
            type: "Local Purchase",
            serial: "Fuel-Purchase",
            createdAt: "Mar 4, 2025 11:57 AM",
            description: ["Generator Fuel"],
            products: [
              {
                id: "808",
                name: "Generator Fuel",
                quantity: 440,
                unitPrice: 198.98,
                unit: "Pieces",
                image: "/placeholder.svg",
                status: "error"
              }
            ],
            hasAttachments: false
          },
          {
            id: "2",
            status: "complete",
            type: "Manufactured",
            serial: "WS-DECL-19(28/03/2025)",
            createdAt: "Mar 28, 2025 1:57 PM",
            description: [
              "WS Fiber Patch Cable 100m SC/UPC-SC/UPC with Fast Connector",
              "WS Fiber Patch Cable 50m SC/UPC-SC/UPC with Fast Connector"
            ],
            products: [
              {
                id: "374",
                name: "WS Fiber Patch Cable 50m SC/UPC-SC/UPC with Fast Connector",
                quantity: 2,
                unitPrice: 1.00,
                unit: "Meters",
                image: "/placeholder.svg",
                status: "success"
              },
              {
                id: "766",
                name: "WS Fiber Patch Cable 100m SC/UPC-SC/UPC with Fast Connector",
                quantity: 28,
                unitPrice: 1.00,
                unit: "Meters",
                image: "/placeholder.svg",
                status: "success"
              }
            ],
            hasAttachments: true,
            attachments: [
              {
                name: "ATTACHMENT-1.PDF",
                type: "pdf"
              }
            ]
          }
        ];
        
        // For simplicity, return declaration based on status in the route params
        const foundDeclaration = declarations.find(d => d.id === id) || 
                               (id === "incomplete" ? declarations[0] : declarations[1]);
        
        setDeclaration(foundDeclaration);
        setLoading(false);
      }, 500);
    };
    
    fetchDeclaration();
  }, [id]);

  const handleComplete = () => {
    if (declaration) {
      const updatedDeclaration = { ...declaration, status: "complete" as const };
      setDeclaration(updatedDeclaration);
      toast.success("Declaration marked as complete");
    }
  };

  const handleEdit = () => {
    toast.info("Editing declaration");
  };

  if (loading) {
    return (
      <AppLayout title="DECLARATION FILES" subtitle="Loading...">
        <div className="p-6 flex justify-center items-center min-h-[400px]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-48 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!declaration) {
    return (
      <AppLayout title="DECLARATION FILES" subtitle="Error">
        <div className="p-6">
          <div className="text-red-500 mb-4">Declaration not found</div>
          <Button asChild variant="outline">
            <Link to="/declarations">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Declarations
            </Link>
          </Button>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="DECLARATION FILES" subtitle="Overview">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Button asChild variant="outline">
            <Link to="/declarations">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Declarations
            </Link>
          </Button>
          
          <div className="flex items-center gap-2">
            {declaration.status === "incomplete" ? (
              <>
                <Button variant="outline" onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  EDIT
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleComplete}>
                  COMPLETE
                </Button>
              </>
            ) : (
              <Button variant="outline" onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4" />
                EDIT
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white border rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                <div className="bg-gray-100 p-4 rounded-lg h-40 w-40 flex items-center justify-center">
                  <FileText className="h-16 w-16 text-gray-400" />
                </div>
                
                <div>
                  <div className="text-sm text-gray-500">Document-Serial:</div>
                  <h1 className="text-xl font-bold mb-2">{declaration.serial}</h1>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                    <div>
                      <div className="text-sm text-gray-500">Document Type:</div>
                      <div className="font-medium">{declaration.type}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500">Created At:</div>
                      <div className="font-medium">{declaration.createdAt}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-gray-500 text-sm mb-2">Description</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {declaration.description.map((desc, index) => (
                    <p key={index}>{desc}</p>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-gray-500 text-sm mb-4">Products</h2>
                
                {declaration.products.map((product) => (
                  <div key={product.id} className="mb-6 border-b pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="font-medium text-gray-700">{product.id}</div>
                      
                      {product.image && (
                        <div className="bg-gray-100 rounded h-10 w-10 flex items-center justify-center">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="max-h-8 max-w-8"
                          />
                        </div>
                      )}
                      
                      <div className="grow">
                        <div className="text-blue-600 hover:underline">
                          {product.name}
                        </div>
                      </div>
                      
                      {product.status && (
                        <div>
                          {product.status === "success" ? (
                            <div className="bg-green-100 rounded-full w-6 h-6 flex items-center justify-center">
                              <svg className="w-4 h-4 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          ) : (
                            <div className="bg-red-100 rounded-full w-6 h-6 flex items-center justify-center">
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Quantity</div>
                        <div className="border rounded px-3 py-2">{product.quantity}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 mb-1">UnitPrice</div>
                        <div className="border rounded px-3 py-2 flex items-center">
                          <span className="text-gray-500 mr-1">$</span>
                          {product.unitPrice.toFixed(2)}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Measurement Unit</div>
                        <div className="border rounded px-3 py-2">{product.unit}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="text-blue-600">
                        view devices under this declaration
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white border rounded-lg p-6">
              <h2 className="font-medium mb-4">Attachments</h2>
              
              {declaration.hasAttachments ? (
                <div>
                  {declaration.attachments?.map((attachment, index) => (
                    <div key={index} className="flex justify-between items-center mb-2 last:mb-0">
                      <div className="flex items-center">
                        <div className="bg-red-100 text-red-800 px-2 py-1 text-xs rounded mr-3">
                          PDF
                        </div>
                        <div className="text-blue-600 hover:underline text-sm">
                          {attachment.name}
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                    <div className="bg-blue-100 rounded-full h-10 w-10 flex items-center justify-center mb-2">
                      <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2v6h6v12H6V2h6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M18 8h-6V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Add Attachment
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-red-50 p-4 rounded-lg flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-600">
                    this document doesn't have any attachments
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
