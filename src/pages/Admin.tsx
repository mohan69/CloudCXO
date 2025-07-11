import { useState, useEffect } from "react";
import { getStats, getCXOs, getBusinessRequests } from "@/api/admin";
import { Stats, CXO, BusinessRequest } from "@/types/admin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield } from "lucide-react";
import Dashboard from "@/components/admin/Dashboard";
import Analytics from "@/components/admin/Analytics";
import CXOManagement from "@/components/admin/CXOManagement";
import RequestManagement from "@/components/admin/RequestManagement";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState<Stats | null>(null);
  const [cxos, setCxos] = useState<CXO[]>([]);
  const [requests, setRequests] = useState<BusinessRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, cxosData, requestsData] = await Promise.all([
          getStats(),
          getCXOs(),
          getBusinessRequests(),
        ]);
        setStats(statsData);
        setCxos(cxosData);
        setRequests(requestsData);
      } catch (error) {
        console.error("Failed to fetch admin data", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "completed":
        return "bg-gradient-success text-success-foreground";
      case "pending":
      case "open":
        return "bg-primary/10 text-primary";
      case "in progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Manage CXOs, business requests, and platform analytics</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="cxos">CXOs</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard stats={stats} cxos={cxos} requests={requests} getStatusColor={getStatusColor} />
          </TabsContent>

          {/* CXOs Tab */}
          <TabsContent value="cxos" className="space-y-6">
            <CXOManagement cxos={cxos} getStatusColor={getStatusColor} />
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <RequestManagement requests={requests} getStatusColor={getStatusColor} />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Analytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
