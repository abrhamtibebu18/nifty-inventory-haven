
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import { toast } from "sonner";

interface EligibilityRecord {
  id: string;
  initial: string;
  user: string;
  product: string;
  totalAllowed: number;
  atHand: number;
  date: string;
}

export default function Eligibility() {
  const [eligibilityRecords, setEligibilityRecords] = useState<EligibilityRecord[]>([
    {
      id: "1",
      initial: "L",
      user: "Leuel Mesfin",
      product: "WS GPON Terminal",
      totalAllowed: 3,
      atHand: 0,
      date: "Dec 2, 2021 10:53 AM"
    },
    {
      id: "2",
      initial: "H",
      user: "Hamdihun Nuru",
      product: "WS GPON Terminal",
      totalAllowed: 4,
      atHand: 0,
      date: "Dec 2, 2021 10:53 AM"
    },
    {
      id: "3",
      initial: "H",
      user: "Habtamu Addis",
      product: "WS GPON Terminal",
      totalAllowed: 3,
      atHand: 1,
      date: "Dec 2, 2021 10:55 AM"
    },
    {
      id: "4",
      initial: "T",
      user: "Tewdros Tesfaye",
      product: "WS GPON Terminal",
      totalAllowed: 3,
      atHand: 0,
      date: "Jan 14, 2022 10:05 AM"
    },
    {
      id: "5",
      initial: "F",
      user: "Fraol Tabor",
      product: "WS GPON Terminal",
      totalAllowed: 3,
      atHand: 0,
      date: "Jan 25, 2022 10:50 AM"
    },
    {
      id: "6",
      initial: "T",
      user: "Tewdros Tesfaye",
      product: "WS GPON Terminal",
      totalAllowed: 3,
      atHand: 0,
      date: "Jan 25, 2022 10:59 AM"
    },
    {
      id: "7",
      initial: "E",
      user: "Eyob Solomon",
      product: "WS GPON Terminal",
      totalAllowed: 2,
      atHand: 0,
      date: "Jan 25, 2022 11:02 AM"
    },
    {
      id: "8",
      initial: "D",
      user: "Dexios Mulatu",
      product: "WS GPON Terminal",
      totalAllowed: 2,
      atHand: 4,
      date: "Jan 25, 2022 11:05 AM"
    },
    {
      id: "9",
      initial: "S",
      user: "Seare W/gebriel",
      product: "WS GPON Terminal",
      totalAllowed: 8,
      atHand: 0,
      date: "Jan 25, 2022 11:09 AM"
    },
    {
      id: "10",
      initial: "E",
      user: "Ephrem Tiruneh",
      product: "WS GPON Terminal",
      totalAllowed: 3,
      atHand: 2,
      date: "Jan 25, 2022 11:13 AM"
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredRecords = eligibilityRecords.filter(record => 
    record.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.product.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleEdit = (id: string) => {
    toast.info(`Editing eligibility record ${id}`);
  };
  
  const handleCreateEligibility = () => {
    toast.info("Creating new eligibility record");
  };

  return (
    <AppLayout title="ELIGIBILITY" subtitle="Overview">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <Input
              placeholder="Search a user by name, etc."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-4 pr-10"
            />
          </div>
          <Button 
            onClick={handleCreateEligibility}
            className="bg-black hover:bg-black/90 text-white"
          >
            NEW ELIGIBILITY
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead width={50}></TableHead>
                <TableHead>Assigned User</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
                      {record.initial}
                    </div>
                  </TableCell>
                  <TableCell>{record.user}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center">
                        WS
                      </div>
                      <span>{record.product}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>Total Allowed: {record.totalAllowed}</div>
                    <div>At Hand: {record.atHand}</div>
                  </TableCell>
                  <TableCell className="text-right">{record.date}</TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(record.id)}
                      className="border-safety-yellow text-safety-yellow hover:bg-safety-yellow hover:text-black"
                    >
                      <Edit className="h-4 w-4 mr-2" /> EDIT
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
