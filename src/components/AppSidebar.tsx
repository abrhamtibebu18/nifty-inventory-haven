
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger 
} from "@/components/ui/sidebar";
import { 
  Home,
  Smartphone,
  Laptop,
  Building2,
  Users,
  Package,
  Store,
  AlertTriangle,
  BarChart3,
  FileText,
  ClipboardCheck,
  ArrowRightLeft,
  FileSpreadsheet,
  FileCheck,
  ActivitySquare
} from "lucide-react";

export function AppSidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar>
      <SidebarContent className="p-2">
        <div className="flex flex-col gap-1">
          <div className="px-4 py-2 mb-2">
            <h1 className="text-xl font-bold text-safety-yellow">Inventory Hub</h1>
          </div>
          
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-white/50">INVENTORY ITEMS</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={isActive("/") ? "bg-safety-yellow text-rich-black" : ""}>
                    <Link to="/" className="flex items-center gap-3">
                      <Home size={18} />
                      <span>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={isActive("/devices") ? "bg-safety-yellow text-rich-black" : ""}>
                    <Link to="/devices" className="flex items-center gap-3">
                      <Smartphone size={18} />
                      <span>Devices</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={isActive("/your-devices") ? "bg-safety-yellow text-rich-black" : ""}>
                    <Link to="/your-devices" className="flex items-center gap-3">
                      <Laptop size={18} />
                      <span>Your Devices</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={isActive("/facilities") ? "bg-safety-yellow text-rich-black" : ""}>
                    <Link to="/facilities" className="flex items-center gap-3">
                      <Building2 size={18} />
                      <span>Facilities</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={isActive("/vendors") ? "bg-safety-yellow text-rich-black" : ""}>
                    <Link to="/vendors" className="flex items-center gap-3">
                      <Users size={18} />
                      <span>Vendors</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={isActive("/products") ? "bg-safety-yellow text-rich-black" : ""}>
                    <Link to="/products" className="flex items-center gap-3">
                      <Package size={18} />
                      <span>Products</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={isActive("/stores") ? "bg-safety-yellow text-rich-black" : ""}>
                    <Link to="/stores" className="flex items-center gap-3">
                      <Store size={18} />
                      <span>Stores</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={isActive("/anomalies") ? "bg-safety-yellow text-rich-black" : ""}>
                    <Link to="/anomalies" className="flex items-center gap-3">
                      <AlertTriangle size={18} />
                      <span>Anomalies</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-white/50">INVENTORY TALLY</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={isActive("/tally") ? "bg-safety-yellow text-rich-black" : ""}>
                    <Link to="/tally" className="flex items-center gap-3">
                      <BarChart3 size={18} />
                      <span>Tally</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-white/50">REQUESTS</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={isActive("/device-requests") ? "bg-safety-yellow text-rich-black" : ""}>
                    <Link to="/device-requests" className="flex items-center gap-3">
                      <Smartphone size={18} />
                      <span>Device Requests</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={isActive("/transfer-requests") ? "bg-safety-yellow text-rich-black" : ""}>
                    <Link to="/transfer-requests" className="flex items-center gap-3">
                      <ArrowRightLeft size={18} />
                      <span>Transfer Requests</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-white/50">DECLARATION DOCUMENTS</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={isActive("/declarations") ? "bg-safety-yellow text-rich-black" : ""}>
                    <Link to="/declarations" className="flex items-center gap-3">
                      <FileCheck size={18} />
                      <span>Declarations</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-white/50">PARTNER ELIGIBILITY</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={isActive("/eligibility") ? "bg-safety-yellow text-rich-black" : ""}>
                    <Link to="/eligibility" className="flex items-center gap-3">
                      <FileSpreadsheet size={18} />
                      <span>Eligibility</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          
          <SidebarGroup>
            <SidebarGroupLabel className="text-xs font-medium text-white/50">REPORTS</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={isActive("/reports") ? "bg-safety-yellow text-rich-black" : ""}>
                    <Link to="/reports" className="flex items-center gap-3">
                      <FileText size={18} />
                      <span>Reports</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className={isActive("/activity") ? "bg-safety-yellow text-rich-black" : ""}>
                    <Link to="/activity" className="flex items-center gap-3">
                      <ActivitySquare size={18} />
                      <span>Activity</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
