import { getStats, getCXOs, getBusinessRequests } from "@/api/admin";
import { Stats, CXO, BusinessRequest } from "@/types/admin";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/admin/Dashboard";
import Analytics from "@/components/admin/Analytics";
import CXOManagement from "@/components/admin/CXOManagement";
import RequestManagement from "@/components/admin/RequestManagement";

const Admin = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [cxos, setCXOs] = useState<CXO[]>([]);
  const [requests, setRequests] = useState<BusinessRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, cxosData, requestsData] = await Promise.all([
          getStats(),
          getCXOs(),
          getBusinessRequests(),
        ]);

        setStats(statsData);
        setCXOs(cxosData);
        setRequests(requestsData);
      } catch (error) {
        console.error("Failed to fetch admin data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage CXOs, track business requests, and monitor platform analytics.
        </p>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="cxos">CXO Management</TabsTrigger>
          <TabsTrigger value="requests">Request Management</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {stats && <Dashboard stats={stats} cxos={cxos} requests={requests} />}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {stats && <Analytics stats={stats} cxos={cxos} requests={requests} />}
        </TabsContent>

        <TabsContent value="cxos" className="space-y-6">
          <CXOManagement cxos={cxos} />
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <RequestManagement requests={requests} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
