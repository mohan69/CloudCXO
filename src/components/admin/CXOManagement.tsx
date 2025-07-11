import { CXO } from "@/types/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2 } from "lucide-react";

interface CXOManagementProps {
  cxos: CXO[];
  getStatusColor: (status: string) => string;
}

const CXOManagement: React.FC<CXOManagementProps> = ({ cxos, getStatusColor }) => {
  return (
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
            {cxos.map((cxo) => (
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
                    <Button variant="ghost" size="sm" onClick={() => console.log("View CXO", cxo.id)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => console.log("Edit CXO", cxo.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => console.log("Delete CXO", cxo.id)}>
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
  );
};

export default CXOManagement;
