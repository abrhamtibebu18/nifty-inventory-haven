
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Search, Trash, FileText, Download } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface TallyProduct {
  id: string;
  batchId: string;
  product: string;
  batchCode: string;
  status: "reconciled" | "unreconciled";
  image: string;
  macSn: string;
}

export default function TallyDetail() {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [tallyProducts, setTallyProducts] = useState<TallyProduct[]>([
    {
      id: "1",
      batchId: "#564",
      product: "3G/4G Wireless N Router",
      batchCode: "TL-MR3420",
      status: "reconciled",
      image: "/placeholder.svg",
      macSn: "MACSN"
    },
    {
      id: "2",
      batchId: "#565",
      product: "UISP airMAX NanoStation 5AC Loco",
      batchCode: "NS-5ACL-US",
      status: "reconciled",
      image: "/placeholder.svg",
      macSn: "MACONLY"
    },
    {
      id: "3",
      batchId: "#567",
      product: "UISP airMAX LiteBeam 5AC Bridge GEN2",
      batchCode: "LBE-5AC-Gen2",
      status: "reconciled",
      image: "/placeholder.svg",
      macSn: "MACONLY"
    },
    {
      id: "4",
      batchId: "#568",
      product: "450Mbps Wireless N Router",
      batchCode: "TL-WR940N",
      status: "reconciled",
      image: "/placeholder.svg",
      macSn: "MACSN"
    },
    {
      id: "5",
      batchId: "#570",
      product: "EdgeRouter X",
      batchCode: "ER-X",
      status: "reconciled",
      image: "/placeholder.svg",
      macSn: "MACSN"
    }
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = tallyProducts.filter(product => 
    product.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.batchCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.batchId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveEmpty = () => {
    toast.info("Removing empty batches");
  };

  return (
    <AppLayout title="INVENTORY TALLY DETAILS" subtitle="BloomTech - May 15, 2023 Tally">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <Button asChild variant="outline">
            <Link to="/tally">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tally
            </Link>
          </Button>
          
          <Badge className="bg-green-100 text-green-800">Closed</Badge>
        </div>
        
        <Tabs defaultValue="batches" className="w-full">
          <TabsList>
            <TabsTrigger value="batches">Batches</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="batches">
            <div className="flex justify-between items-center mt-6 mb-3">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search batches..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10"
                />
              </div>
              
              <Button 
                variant="destructive" 
                onClick={handleRemoveEmpty}
                className="ml-2"
              >
                <Trash className="mr-2 h-4 w-4" />
                REMOVE EMPTY
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch ID</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Batch Code</TableHead>
                    <TableHead>Tallyers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.batchId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.image} 
                            alt={product.product} 
                            className="h-8 w-8 rounded"
                          />
                          <div>
                            <div>{product.product}</div>
                            <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded w-fit mt-1">
                              {product.macSn}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{product.batchCode}</TableCell>
                      <TableCell>
                        <div className="flex -space-x-2">
                          <div className="h-8 w-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs border-2 border-white">F</div>
                          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs border-2 border-white">Y</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {product.status === "reconciled" ? (
                          <div className="text-green-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Reconciled
                          </div>
                        ) : (
                          <div className="text-amber-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                              <path d="M12 8v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                              <circle cx="12" cy="16" r="1" fill="currentColor" />
                            </svg>
                            Unreconciled
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end space-x-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Trash className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="reports">
            <div className="mt-6 p-8 border rounded-lg flex flex-col items-center justify-center">
              <FileText className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">No Reports Available</h3>
              <p className="text-gray-500 mb-6 text-center">
                There are no reports generated for this tally yet.<br />
                Generate a report to see the details.
              </p>
              <Button>
                <FileText className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
