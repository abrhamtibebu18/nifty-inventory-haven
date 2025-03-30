
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  image: string;
  name: string;
  category: string;
  subCategory?: string;
  vendor: string;
  modelNo: string;
  sku: string;
}

interface Category {
  name: string;
  count: number | null;
  subCategories?: string[];
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      image: "/placeholder.svg",
      name: "UISP airMAX NanoStation 5AC Loco",
      category: "Networking",
      subCategory: "Wireless",
      vendor: "Ubiquiti Networks",
      modelNo: "NS-5ACL-US",
      sku: "MACONLY"
    },
    {
      id: "2",
      image: "/placeholder.svg",
      name: "UISP Fiber NanoG",
      category: "Fiber Optics",
      subCategory: "Connectors",
      vendor: "Ubiquiti Networks",
      modelNo: "UF-NANO",
      sku: "UF-NANO"
    },
    {
      id: "3",
      image: "/placeholder.svg",
      name: "UISP airMAX LiteBeam 5AC Bridge GEN2",
      category: "Networking",
      subCategory: "Wireless",
      vendor: "Ubiquiti Networks",
      modelNo: "LBE-5AC-Gen2",
      sku: "MACONLY"
    },
    {
      id: "4",
      image: "/placeholder.svg",
      name: "450Mbps Wireless N Router",
      category: "Routers",
      subCategory: "Wireless",
      vendor: "TP-Link",
      modelNo: "TL-WR940N",
      sku: "MACSN"
    },
    {
      id: "5",
      image: "/placeholder.svg",
      name: "POE 24V Adapter",
      category: "Power Supplies",
      vendor: "Ubiquiti Networks",
      modelNo: "POE-24V",
      sku: "POE-24V"
    },
    {
      id: "6",
      image: "/placeholder.svg",
      name: "EdgeRouter X",
      category: "Routers",
      subCategory: "Wired",
      vendor: "Ubiquiti Networks",
      modelNo: "ER-X",
      sku: "ER-X"
    },
    {
      id: "7",
      image: "/placeholder.svg",
      name: "UISP Fiber Loco",
      category: "Fiber Optics",
      subCategory: "Terminals",
      vendor: "Ubiquiti Networks",
      modelNo: "UF-LOCO",
      sku: "MACSN"
    },
    {
      id: "8",
      image: "/placeholder.svg",
      name: "UISP airCube ISP Access Point",
      category: "Networking",
      subCategory: "Access Points",
      vendor: "Ubiquiti Networks",
      modelNo: "ACB-AC US",
      sku: "MACONLY"
    },
    {
      id: "9",
      image: "/placeholder.svg",
      name: "Cat6 Ethernet Cable 5m",
      category: "Cables",
      subCategory: "Ethernet",
      vendor: "Generic",
      modelNo: "CAT6-5M",
      sku: "CAT6-5M"
    }
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { name: "All", count: null },
    { name: "Cables", count: 1, subCategories: ["Ethernet", "Fiber", "Power"] },
    { name: "Fiber Optics", count: 2, subCategories: ["Connectors", "Terminals", "Splitters"] },
    { name: "Networking", count: 3, subCategories: ["Wireless", "Access Points", "Switches"] },
    { name: "Power Supplies", count: 1, subCategories: ["Adapters", "UPS"] },
    { name: "Routers", count: 2, subCategories: ["Wired", "Wireless"] }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategory(null);
  };

  const handleSubCategorySelect = (subCategoryName: string) => {
    setSelectedSubCategory(subCategoryName === selectedSubCategory ? null : subCategoryName);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.modelNo.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === "All") return matchesSearch;
    
    const matchesCategory = product.category === selectedCategory;
    
    if (!selectedSubCategory) return matchesCategory && matchesSearch;
    
    return matchesCategory && product.subCategory === selectedSubCategory && matchesSearch;
  });

  // Get subcategories for the selected category
  const selectedCategoryObj = categories.find(cat => cat.name === selectedCategory);
  const subCategories = selectedCategoryObj?.subCategories || [];

  return (
    <AppLayout title="PRODUCTS" subtitle="Overview">
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search products by name, vendor or model..." 
              className="pl-10"
              value={searchQuery}
              onChange={handleSearch} 
            />
          </div>
          <Button className="bg-safety-yellow hover:bg-safety-yellow/90 text-black w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge 
              key={category.name} 
              className={`cursor-pointer ${
                category.name === selectedCategory 
                  ? "bg-rich-black" 
                  : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
              }`}
              onClick={() => handleCategorySelect(category.name)}
            >
              {category.name} {category.count && <span className="ml-1">•&nbsp;{category.count}</span>}
            </Badge>
          ))}
        </div>
        
        {selectedCategory !== "All" && subCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 pl-4 border-l-2 border-gray-200">
            {subCategories.map((subCategory) => (
              <Badge 
                key={subCategory} 
                variant="outline"
                className={`cursor-pointer ${
                  subCategory === selectedSubCategory 
                    ? "bg-safety-yellow text-black border-safety-yellow" 
                    : ""
                }`}
                onClick={() => handleSubCategorySelect(subCategory)}
              >
                {subCategory}
              </Badge>
            ))}
          </div>
        )}
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Model No.</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-10 w-10 rounded object-cover"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-muted-foreground">{product.category}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.vendor}</TableCell>
                    <TableCell>{product.modelNo}</TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/products/${product.id}`}>
                          DETAIL
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                    No products found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
