
import { Button } from "@/components/ui/button";
import { Package, BarChart3, FileText, Store } from "lucide-react";

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button className="flex-1 bg-safety-yellow hover:bg-safety-yellow/90 text-black h-14">
        <Package className="mr-2 h-5 w-5" />
        Products
      </Button>
      
      <Button className="flex-1 bg-safety-yellow hover:bg-safety-yellow/90 text-black h-14">
        <BarChart3 className="mr-2 h-5 w-5" />
        Tally
      </Button>
      
      <Button className="flex-1 bg-safety-yellow hover:bg-safety-yellow/90 text-black h-14">
        <FileText className="mr-2 h-5 w-5" />
        Requests
      </Button>
      
      <Button className="flex-1 bg-safety-yellow hover:bg-safety-yellow/90 text-black h-14">
        <Store className="mr-2 h-5 w-5" />
        Stores
      </Button>
    </div>
  );
}
