
import { AppLayout } from "@/components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileCheck, Download, Eye, Plus } from "lucide-react";

interface DeclarationFile {
  id: string;
  status: "complete" | "incomplete";
  date: string;
  title: string;
  fileSize: string;
  action: string;
}

const incompleteDeclarations: DeclarationFile[] = [
  {
    id: "1",
    status: "incomplete",
    date: "2023-04-15",
    title: "April_Inventory_Declaration.pdf",
    fileSize: "1.2 MB",
    action: "Pending Signature"
  },
  {
    id: "2",
    status: "incomplete",
    date: "2023-05-10",
    title: "May_Inventory_Declaration.pdf",
    fileSize: "0.9 MB",
    action: "Pending Review"
  },
  {
    id: "3",
    status: "incomplete",
    date: "2023-06-18",
    title: "Q2_Device_Transfer.pdf",
    fileSize: "1.4 MB",
    action: "Incomplete Information"
  },
  {
    id: "4",
    status: "incomplete",
    date: "2023-06-30",
    title: "June_Monthly_Report.pdf",
    fileSize: "2.1 MB",
    action: "Pending Approval"
  },
  {
    id: "5",
    status: "incomplete",
    date: "2023-07-15",
    title: "July_Inventory_Count.pdf",
    fileSize: "1.7 MB",
    action: "Pending Signature"
  },
  {
    id: "6",
    status: "incomplete",
    date: "2023-08-05",
    title: "BloomTech_Inventory_Declaration.pdf",
    fileSize: "3.2 MB",
    action: "Incomplete Information"
  }
];

const completeDeclarations: DeclarationFile[] = [
  {
    id: "7",
    status: "complete",
    date: "2023-01-31",
    title: "January_Inventory_Declaration.pdf",
    fileSize: "2.8 MB",
    action: "Approved"
  },
  {
    id: "8",
    status: "complete",
    date: "2023-02-28",
    title: "February_Inventory_Declaration.pdf",
    fileSize: "1.9 MB",
    action: "Approved"
  },
  {
    id: "9",
    status: "complete",
    date: "2023-03-31",
    title: "March_Inventory_Declaration.pdf",
    fileSize: "2.6 MB",
    action: "Approved"
  },
  {
    id: "10",
    status: "complete",
    date: "2023-04-05",
    title: "Q1_Summary_Report.pdf",
    fileSize: "2.3 MB",
    action: "Approved"
  },
  {
    id: "11",
    status: "complete",
    date: "2023-05-12",
    title: "Special_Audit_Declaration.pdf",
    fileSize: "1.8 MB",
    action: "Approved with Comments"
  },
  {
    id: "12",
    status: "complete",
    date: "2023-06-03",
    title: "Device_Return_Declaration.pdf",
    fileSize: "1.2 MB",
    action: "Approved"
  }
];

export default function Declarations() {
  return (
    <AppLayout title="DECLARATION FILES" subtitle="Overview">
      <div className="container py-6">
        <Tabs defaultValue="incomplete" className="w-full">
          <div className="flex justify-end mb-4">
            <Button className="bg-safety-yellow hover:bg-safety-yellow/90 text-black">
              <Plus className="mr-2 h-4 w-4" />
              New Declaration
            </Button>
          </div>
          
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="incomplete">Incomplete Declarations</TabsTrigger>
            <TabsTrigger value="complete">Complete Declarations</TabsTrigger>
          </TabsList>
          
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search declarations..." className="pl-10" />
            </div>
          </div>
          
          <TabsContent value="incomplete" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {incompleteDeclarations.map((file) => (
              <div key={file.id} className="relative rounded-lg border p-4 bg-amber-50/10">
                <div className="absolute top-4 left-4">
                  <span className="h-2 w-2 rounded-full bg-warning inline-block mr-2"></span>
                  <span className="text-sm text-warning font-medium">Incomplete</span>
                </div>
                <div className="absolute top-4 right-4 text-xs text-muted-foreground">{file.date}</div>
                
                <div className="pt-10">
                  <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="h-6 w-6 text-muted-foreground" />
                    <h3 className="font-medium">{file.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">{file.fileSize}</p>
                  
                  <div className="mb-4">
                    <span className="text-xs text-warning">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-warning mr-1"></span>
                      {file.action}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="mr-1 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="complete" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completeDeclarations.map((file) => (
              <div key={file.id} className="relative rounded-lg border p-4 bg-green-50/10">
                <div className="absolute top-4 left-4">
                  <span className="h-2 w-2 rounded-full bg-success inline-block mr-2"></span>
                  <span className="text-sm text-success font-medium">Complete</span>
                </div>
                <div className="absolute top-4 right-4 text-xs text-muted-foreground">{file.date}</div>
                
                <div className="pt-10">
                  <div className="flex items-center gap-2 mb-2">
                    <FileCheck className="h-6 w-6 text-muted-foreground" />
                    <h3 className="font-medium">{file.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">{file.fileSize}</p>
                  
                  <div className="mb-4">
                    <span className="text-xs text-success">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-success mr-1"></span>
                      {file.action}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="mr-1 h-3 w-3" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
