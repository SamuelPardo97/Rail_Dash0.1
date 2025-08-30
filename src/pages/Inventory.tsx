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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventory & Records</h1>
          <p className="text-muted-foreground">Manage and track railway track fittings</p>
        </div>
        <Button className="btn-primary">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Filters Section */}
      <Card className="dashboard-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Filter className="h-5 w-5 text-primary" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search QR ID, vendor, or lot..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedVendor} onValueChange={setSelectedVendor}>
              <SelectTrigger>
                <SelectValue placeholder="All Vendors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Vendors</SelectItem>
                {vendors.map((vendor) => (
                  <SelectItem key={vendor} value={vendor}>
                    {vendor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedItemType} onValueChange={setSelectedItemType}>
              <SelectTrigger>
                <SelectValue placeholder="All Item Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Item Types</SelectItem>
                {itemTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedVendor("");
                setSelectedItemType("");
                setSelectedStatus("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dashboard-card text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <div className="text-2xl font-bold">{filteredData.length}</div>
          <div className="text-sm text-muted-foreground">Total Items</div>
        </Card>

        <Card className="dashboard-card text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <div className="text-2xl font-bold">
            {filteredData.filter(item => item.inspectionStatus === "passed").length}
          </div>
          <div className="text-sm text-muted-foreground">Passed Inspections</div>
        </Card>

        <Card className="dashboard-card text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <div className="text-2xl font-bold">
            {filteredData.filter(item => item.inspectionStatus === "failed").length}
          </div>
          <div className="text-sm text-muted-foreground">Failed Inspections</div>
        </Card>

        <Card className="dashboard-card text-center p-4">
          <div className="flex items-center justify-center mb-2">
            <Clock className="h-8 w-8 text-warning" />
          </div>
          <div className="text-2xl font-bold">
            {filteredData.filter(item => item.inspectionStatus === "pending").length}
          </div>
          <div className="text-sm text-muted-foreground">Pending Inspections</div>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="data-table">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Inventory Records
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="table-header">
              <TableRow>
                <TableHead>QR ID</TableHead>
                <TableHead>Vendor Name</TableHead>
                <TableHead>Lot Number</TableHead>
                <TableHead>Item Type</TableHead>
                <TableHead>Manufacture Date</TableHead>
                <TableHead>Supply Date</TableHead>
                <TableHead>Warranty Expiry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.qrId} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{item.qrId}</TableCell>
                  <TableCell>{item.vendor}</TableCell>
                  <TableCell>{item.lotNumber}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.itemType}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {item.manufactureDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      {item.supplyDate}
                    </div>
                  </TableCell>
                  <TableCell>{item.warrantyExpiry}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.inspectionStatus)}
                      {getStatusBadge(item.inspectionStatus)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {item.location}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}