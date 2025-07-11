import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Analytics = () => {
  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle>Platform Analytics</CardTitle>
        <p className="text-muted-foreground">Performance metrics and insights</p>
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
  );
};

export default Analytics;
