
import { Button } from "@/components/ui/button";
import { Package, BarChart3, FileText, Store } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function QuickActions() {
  const handleClick = (name: string) => {
    toast(`Navigating to ${name}`);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button 
        className="flex-1 bg-safety-yellow hover:bg-safety-yellow/90 text-black h-14"
        onClick={() => handleClick("Products")}
        asChild
      >
        <Link to="/products">
          <Package className="mr-2 h-5 w-5" />
          Products
        </Link>
      </Button>
      
      <Button 
        className="flex-1 bg-safety-yellow hover:bg-safety-yellow/90 text-black h-14"
        onClick={() => handleClick("Tally")}
        asChild
      >
        <Link to="/tally">
          <BarChart3 className="mr-2 h-5 w-5" />
          Tally
        </Link>
      </Button>
      
      <Button 
        className="flex-1 bg-safety-yellow hover:bg-safety-yellow/90 text-black h-14"
        onClick={() => handleClick("Requests")}
        asChild
      >
        <Link to="/device-requests">
          <FileText className="mr-2 h-5 w-5" />
          Requests
        </Link>
      </Button>
      
      <Button 
        className="flex-1 bg-safety-yellow hover:bg-safety-yellow/90 text-black h-14"
        onClick={() => handleClick("Stores")}
        asChild
      >
        <Link to="/stores">
          <Store className="mr-2 h-5 w-5" />
          Stores
        </Link>
      </Button>
    </div>
  );
}
