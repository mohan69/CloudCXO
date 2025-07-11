import { useParams, Navigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cxoData } from "@/data/cxoData";

const CxoProfilePage = () => {
  const { role } = useParams<{ role: string }>();

  if (!role) {
    return <Navigate to="/" />; // Or a 404 page
  }

  const details = cxoData[role.toUpperCase()];

  if (!details) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4 md:p-8">
        <Card>
          <CardHeader>
            <h1 className="text-2xl font-bold">Profile Not Found</h1>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The profile for the role "{role}" could not be found.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-col items-center gap-4 bg-muted/40 p-6 text-center md:flex-row md:text-left">
            <Avatar className="h-24 w-24 border-4 border-background">
              <AvatarImage src={details.imageUrl} alt={details.name} />
              <AvatarFallback>{details.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <h1 className="text-2xl font-bold">{details.name}</h1>
              <p className="text-lg text-muted-foreground">{details.title}</p>
            </div>
          </CardHeader>
          <CardContent className="grid gap-8 p-6">
            <div>
              <h2 className="mb-4 text-xl font-semibold">Biography</h2>
              <p className="text-muted-foreground">{details.bio}</p>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold">Key Achievements</h2>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                {details.keyAchievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-xl font-semibold">Areas of Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {details.expertise.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CxoProfilePage;