import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import db from "@/api/db.json";

interface CXO {
  id: number;
  name: string;
  email: string;
  expertise: string;
  experience: string;
  status: string;
  personalInfo?: {
    profilePicture?: string;
    name?: string;
  };
  professionalInfo?: {
    headline?: string;
    skills?: string[];
  };
}

const roleMapping: { [key: string]: string } = {
  CFO: "Finance",
  CMO: "Marketing",
  CTO: "Technology",
  COO: "Operations",
  CIO: "Information Systems",
  CDO: "Data",
};

const CXOList = () => {
  const { role } = useParams<{ role: string }>();
  const [filteredCXOs, setFilteredCXOs] = useState<CXO[]>([]);

  useEffect(() => {
    if (role) {
      const expertise = roleMapping[role.toUpperCase()];
      const filtered = db.cxos.filter(
        (cxo) => cxo.expertise === expertise
      );
      setFilteredCXOs(filtered);
    }
  }, [role]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-foreground mb-8">
        Available {role?.toUpperCase()}s
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCXOs.map((cxo) => (
          <Card key={cxo.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={cxo.personalInfo?.profilePicture} alt={cxo.name} />
                <AvatarFallback>{cxo.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{cxo.name}</CardTitle>
                <p className="text-muted-foreground">{cxo.professionalInfo?.headline}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {cxo.professionalInfo?.skills?.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CXOList;
