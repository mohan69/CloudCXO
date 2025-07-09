import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, TrendingUp, Shield, Eye, Edit, Trash2 } from "lucide-react";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for demonstration
  const stats = {
    totalCXOs: 24,
    totalRequests: 156,
    activeProjects: 42,
    completedProjects: 89
  };

  const recentCXOs = [
    { id: 1, name: "Sarah Johnson", email: "sarah@example.com", expertise: "Technology", experience: "15 years", status: "Active" },
    { id: 2, name: "Michael Chen", email: "michael@example.com", expertise: "Marketing", experience: "12 years", status: "Pending" },
    { id: 3, name: "Emily Rodriguez", email: "emily@example.com", expertise: "Operations", experience: "18 years", status: "Active" },
  ];

  const recentRequests = [
    { id: 1, company: "TechCorp Inc", requirement: "Digital Transformation Strategy", budget: "$50,000", status: "Open", date: "2024-01-15" },
    { id: 2, company: "Growth Solutions", requirement: "Marketing Automation Setup", budget: "$25,000", status: "In Progress", date: "2024-01-14" },
    { id: 3, company: "Innovation Labs", requirement: "Product Strategy Review", budget: "$75,000", status: "Completed", date: "2024-01-13" },
  ];

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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-card hover:shadow-hover transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total CXOs</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.totalCXOs}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-hover transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.totalRequests}</div>
                  <p className="text-xs text-muted-foreground">+8% from last month</p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-hover transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.activeProjects}</div>
                  <p className="text-xs text-muted-foreground">+15% from last month</p>
                </CardContent>
              </Card>

              <Card className="shadow-card hover:shadow-hover transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Completed</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.completedProjects}</div>
                  <p className="text-xs text-muted-foreground">+22% from last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Recent CXO Registrations</CardTitle>
                  <CardDescription>Latest professionals who joined the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentCXOs.slice(0, 3).map((cxo) => (
                      <div key={cxo.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div>
                          <p className="font-medium text-foreground">{cxo.name}</p>
                          <p className="text-sm text-muted-foreground">{cxo.expertise} • {cxo.experience}</p>
                        </div>
                        <Badge className={getStatusColor(cxo.status)}>{cxo.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Recent Business Requests</CardTitle>
                  <CardDescription>Latest requirements from businesses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentRequests.slice(0, 3).map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div>
                          <p className="font-medium text-foreground">{request.company}</p>
                          <p className="text-sm text-muted-foreground">{request.requirement}</p>
                        </div>
                        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* CXOs Tab */}
          <TabsContent value="cxos" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>CXO Management</CardTitle>
                <CardDescription>Manage registered CXOs and their profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Expertise</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentCXOs.map((cxo) => (
                      <TableRow key={cxo.id}>
                        <TableCell className="font-medium">{cxo.name}</TableCell>
                        <TableCell>{cxo.email}</TableCell>
                        <TableCell>{cxo.expertise}</TableCell>
                        <TableCell>{cxo.experience}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(cxo.status)}>{cxo.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Business Requests</CardTitle>
                <CardDescription>Manage business requirements and project requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Requirement</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.company}</TableCell>
                        <TableCell>{request.requirement}</TableCell>
                        <TableCell>{request.budget}</TableCell>
                        <TableCell>{request.date}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Performance metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Key Metrics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Average Project Value</span>
                        <span className="font-medium">$45,250</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Success Rate</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Average Project Duration</span>
                        <span className="font-medium">6.2 weeks</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Client Satisfaction</span>
                        <span className="font-medium">4.8/5.0</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Growth Trends</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Monthly Revenue Growth</span>
                        <span className="font-medium text-green-600">+18%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">New CXO Registrations</span>
                        <span className="font-medium text-green-600">+12%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Business Requests</span>
                        <span className="font-medium text-green-600">+8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Platform Usage</span>
                        <span className="font-medium text-green-600">+25%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;