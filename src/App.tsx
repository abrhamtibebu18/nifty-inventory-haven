
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

// Import pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Stores from "./pages/Stores";
import DeviceRequests from "./pages/DeviceRequests";
import TransferRequests from "./pages/TransferRequests";
import Vendors from "./pages/Vendors";
import Tally from "./pages/Tally";
import TallyDetail from "./pages/TallyDetail";
import YourDevices from "./pages/YourDevices";
import Facilities from "./pages/Facilities";
import Activity from "./pages/Activity";
import Declarations from "./pages/Declarations";
import DeclarationDetail from "./pages/DeclarationDetail";
import Anomalies from "./pages/Anomalies";
import Reports from "./pages/Reports";
import Eligibility from "./pages/Eligibility";
import Devices from "./pages/Devices";
import Batches from "./pages/Batches";
import BatchDetail from "./pages/BatchDetail";
import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/device-requests" element={<DeviceRequests />} />
        <Route path="/transfer-requests" element={<TransferRequests />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/tally" element={<Tally />} />
        <Route path="/tally/:id" element={<TallyDetail />} />
        <Route path="/your-devices" element={<YourDevices />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/declarations" element={<Declarations />} />
        <Route path="/declarations/:id" element={<DeclarationDetail />} />
        <Route path="/anomalies" element={<Anomalies />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/eligibility" element={<Eligibility />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/batches" element={<Batches />} />
        <Route path="/batches/:id" element={<BatchDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
