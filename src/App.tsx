
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Declarations from "./pages/Declarations";
import NotFound from "./pages/NotFound";
import Stores from "./pages/Stores";
import Tally from "./pages/Tally";
import DeviceRequests from "./pages/DeviceRequests";
import TransferRequests from "./pages/TransferRequests";
import Eligibility from "./pages/Eligibility";
import Devices from "./pages/Devices";
import YourDevices from "./pages/YourDevices";
import Facilities from "./pages/Facilities";
import Vendors from "./pages/Vendors";
import Anomalies from "./pages/Anomalies";
import Reports from "./pages/Reports";
import Activity from "./pages/Activity";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/declarations" element={<Declarations />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/tally" element={<Tally />} />
          <Route path="/device-requests" element={<DeviceRequests />} />
          <Route path="/transfer-requests" element={<TransferRequests />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/your-devices" element={<YourDevices />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/anomalies" element={<Anomalies />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
