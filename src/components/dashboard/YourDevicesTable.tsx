
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DeviceItem {
  id: string;
  vendor: string;
  product: string;
  status: "Store" | "Check" | "Client";
  location: string;
}

interface YourDevicesTableProps {
  devices: DeviceItem[];
}

export function YourDevicesTable({ devices }: YourDevicesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device) => (
            <TableRow key={device.id}>
              <TableCell className="font-medium">{device.vendor}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">📱</span>
                  <span>{device.product}</span>
                </div>
              </TableCell>
              <TableCell>
                <span className={`inv-status-badge ${
                  device.status === "Store" ? "inv-status-badge-success" : 
                  device.status === "Check" ? "inv-status-badge-warning" : 
                  "inv-status-badge-info"
                }`}>
                  {device.status}
                </span>
              </TableCell>
              <TableCell>{device.location}</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="default" className="bg-rich-black hover:bg-rich-black/90">
                  {device.status === "Check" ? "Return" : "Request"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
