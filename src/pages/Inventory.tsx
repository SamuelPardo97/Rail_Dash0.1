import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Package,
  Search,
  Filter,
  Download,
  Eye,
  MapPin,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react";

interface InventoryItem {
  qrId: string;
  vendor: string;
  lotNumber: string;
  itemType: string;
  manufactureDate: string;
  supplyDate: string;
  warrantyExpiry: string;
  inspectionStatus: "passed" | "failed" | "pending";
  location: string;
}

const inventoryData: InventoryItem[] = [
  {
    qrId: "QR-2024-001",
    vendor: "RailTech Solutions",
    lotNumber: "LOT-RT-001",
    itemType: "Elastic Rail Clip",
    manufactureDate: "2023-06-15",
    supplyDate: "2023-07-01",
    warrantyExpiry: "2025-07-01",
    inspectionStatus: "passed",
    location: "Zone A - Track 1"
  },
  {
    qrId: "QR-2024-002",
    vendor: "TrackFit Industries",
    lotNumber: "LOT-TF-045",
    itemType: "Rail Pad",
    manufactureDate: "2023-08-20",
    supplyDate: "2023-09-05",
    warrantyExpiry: "2024-09-05",
    inspectionStatus: "failed",
    location: "Zone B - Track 3"
  },
  {
    qrId: "QR-2024-003",
    vendor: "SteelRail Corp",
    lotNumber: "LOT-SR-089",
    itemType: "Concrete Sleeper",
    manufactureDate: "2023-05-10",
    supplyDate: "2023-06-15",
    warrantyExpiry: "2027-06-15",
    inspectionStatus: "passed",
    location: "Zone C - Track 2"
  },
  {
    qrId: "QR-2024-004",
    vendor: "FlexiTrack Ltd",
    lotNumber: "LOT-FL-023",
    itemType: "Rail Liner",
    manufactureDate: "2023-09-12",
    supplyDate: "2023-10-01",
    warrantyExpiry: "2025-10-01",
    inspectionStatus: "pending",
    location: "Zone A - Track 4"
  },
  {
    qrId: "QR-2024-005",
    vendor: "DuraRail Systems",
    lotNumber: "LOT-DR-156",
    itemType: "Elastic Rail Clip",
    manufactureDate: "2023-07-08",
    supplyDate: "2023-08-15",
    warrantyExpiry: "2025-08-15",
    inspectionStatus: "passed",
    location: "Zone B - Track 1"
  },
];

const vendors = [...new Set(inventoryData.map(item => item.vendor))];
const itemTypes = [...new Set(inventoryData.map(item => item.itemType))];

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<string>("");
  const [selectedItemType, setSelectedItemType] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  console.log("Inventory component rendered"); // Debug log
  console.log("Inventory data length:", inventoryData.length); // Debug log

  const filteredData = inventoryData.filter((item) => {
    return (
      (searchTerm === "" ||
        item.qrId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.lotNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedVendor === "" || item.vendor === selectedVendor) &&
      (selectedItemType === "" || item.itemType === selectedItemType) &&
      (selectedStatus === "" || item.inspectionStatus === selectedStatus)
    );
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "passed":
        return <Badge className="status-active">Passed</Badge>;
      case "failed":
        return <Badge className="status-expired">Failed</Badge>;
      case "pending":
        return <Badge className="status-warning">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return null;
    }
  };

  // SIMPLIFIED TEST VERSION - Just return basic content to test rendering
  return (
    <div className="space-y-6">
      {/* Debug Banner */}
      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
        <strong>Debug:</strong> Inventory component is rendering. Data count: {inventoryData.length}
      </div>

      {/* Simple Test Content */}
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
        <h1 className="text-2xl font-bold">Inventory Page Test</h1>
        <p>If you can see this, the component is rendering!</p>
        <p>Search Term: {searchTerm || 'None'}</p>
        <p>Selected Vendor: {selectedVendor || 'None'}</p>
        <p>Filtered Data Count: {filteredData.length}</p>
      </div>

      {/* Basic Form Test */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Test Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Test search input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-4"
          />
          <Button onClick={() => alert('Button clicked!')}>
            Test Button
          </Button>
        </CardContent>
      </Card>

      {/* Simple Data Display */}
      <Card className="dashboard-card">
        <CardHeader>
          <CardTitle>Test Data Display</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {inventoryData.slice(0, 3).map((item, index) => (
              <div key={index} className="p-2 border rounded">
                <strong>{item.qrId}</strong> - {item.vendor} - {item.itemType}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}