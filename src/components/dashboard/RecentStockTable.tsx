
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

interface RecentStockItem {
  batchNo: string;
  product: string;
  productImage: string;
  batchCode: string;
}

interface RecentStockTableProps {
  items: RecentStockItem[];
}

export function RecentStockTable({ items }: RecentStockTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Batch No.</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Batch Code</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.batchNo}>
              <TableCell className="font-medium">{item.batchNo}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <img 
                    src={item.productImage} 
                    alt={item.product}
                    className="w-8 h-8 object-contain"
                  />
                  <span>{item.product}</span>
                </div>
              </TableCell>
              <TableCell>{item.batchCode}</TableCell>
              <TableCell className="text-right">
                <Button 
                  size="sm" 
                  variant="default" 
                  className="bg-rich-black hover:bg-rich-black/90"
                  asChild
                >
                  <Link to={`/batches/${item.batchNo}`}>More</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
