
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, ChevronDown, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface Eligibility {
  id: string;
  name: string;
  address: string;
  partnerType: string;
  submissionDate: string;
  status: "approved" | "pending" | "declined";
}

export default function Eligibility() {
  const [eligibilities, setEligibilities] = useState<Eligibility[]>([
    {
      id: "1",
      name: "Jakros Internet Services",
      address: "Bole Arabsa, Addis Ababa",
      partnerType: "ISP Partner",
      submissionDate: "Jan 15, 2023",
      status: "approved"
    },
    {
      id: "2",
      name: "Ethioclick Solutions",
      address: "Meskel Square, Addis Ababa",
      partnerType: "Telecom Reseller",
      submissionDate: "Feb 2, 2023",
      status: "approved"
    },
    {
      id: "3",
      name: "Habesha Net",
      address: "Lideta, Addis Ababa",
      partnerType: "Service Provider",
      submissionDate: "Mar 10, 2023",
      status: "pending"
    },
    {
      id: "4",
      name: "Awash Fiber",
      address: "Kazanchis, Addis Ababa",
      partnerType: "ISP Partner",
      submissionDate: "Apr 5, 2023",
      status: "declined"
    },
    {
      id: "5",
      name: "TelNet Ethiopia",
      address: "Bole, Addis Ababa",
      partnerType: "Telecom Reseller",
      submissionDate: "May 20, 2023",
      status: "approved"
    },
    {
      id: "6",
      name: "Websprix Net",
      address: "Sarbet, Addis Ababa",
      partnerType: "Service Provider",
      submissionDate: "Jun 8, 2023",
      status: "pending"
    },
    {
      id: "7",
      name: "Blue Network Solutions",
      address: "Megenagna, Addis Ababa",
      partnerType: "ISP Partner",
      submissionDate: "Jul 17, 2023",
      status: "approved"
    },
    {
      id: "8",
      name: "Fast Connect ISP",
      address: "Ayat, Addis Ababa",
      partnerType: "Telecom Reseller",
      submissionDate: "Aug 3, 2023",
      status: "declined"
    }
  ]);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredEligibilities = eligibilities.filter(e => {
    const matchesSearch = 
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.partnerType.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === "all") return matchesSearch;
    return matchesSearch && e.status === statusFilter;
  });

  const getStatusBadge = (status: Eligibility['status']) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" />
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" />
            Pending
          </Badge>
        );
      case "declined":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 flex items-center gap-1">
            <XCircle className="h-3.5 w-3.5" />
            Declined
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <AppLayout title="PARTNER ELIGIBILITY" subtitle="Applications and Status">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="relative grow max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search partners by name or location..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className={statusFilter === "all" ? "bg-muted" : ""} 
              onClick={() => setStatusFilter("all")}
            >
              All
            </Button>
            <Button 
              variant="outline" 
              className={statusFilter === "approved" ? "bg-green-100 border-green-200" : ""} 
              onClick={() => setStatusFilter("approved")}
            >
              <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
              Approved
            </Button>
            <Button 
              variant="outline" 
              className={statusFilter === "pending" ? "bg-amber-100 border-amber-200" : ""} 
              onClick={() => setStatusFilter("pending")}
            >
              <AlertCircle className="h-4 w-4 mr-2 text-amber-600" />
              Pending
            </Button>
            <Button 
              variant="outline" 
              className={statusFilter === "declined" ? "bg-red-100 border-red-200" : ""} 
              onClick={() => setStatusFilter("declined")}
            >
              <XCircle className="h-4 w-4 mr-2 text-red-600" />
              Declined
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            className="ml-auto"
          >
            <Filter className="mr-2 h-4 w-4" />
            More Filters
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">ID</TableHead>
                <TableHead>Partner Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Partner Type</TableHead>
                <TableHead>Submission Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEligibilities.map((eligibility) => (
                <TableRow key={eligibility.id}>
                  <TableCell className="font-medium">{eligibility.id}</TableCell>
                  <TableCell>{eligibility.name}</TableCell>
                  <TableCell>{eligibility.address}</TableCell>
                  <TableCell>{eligibility.partnerType}</TableCell>
                  <TableCell>{eligibility.submissionDate}</TableCell>
                  <TableCell>{getStatusBadge(eligibility.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View Details</Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredEligibilities.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No eligibility applications found
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
