import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cxoData } from "@/data/cxoData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCxos = Object.entries(cxoData).filter(([_, details]) => {
    const query = searchQuery.toLowerCase();
    return (
      details.name.toLowerCase().includes(query) ||
      details.title.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="container mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Meet Our Leadership</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            The executive team driving RightSense Technologies forward.
          </p>
        </div>
        <div className="relative mb-8 mx-auto max-w-md">
          <Input
            type="text"
            placeholder="Search by name or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 rounded-full"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCxos.length > 0 ? (
            filteredCxos.map(([role, details]) => (
              <Link to={`/cxos/${role}`} key={role} className="group">
                <Card className="h-full transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
                  <CardHeader className="items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarImage src={details.imageUrl} alt={details.name} />
                      <AvatarFallback>{details.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <CardTitle>{details.name}</CardTitle>
                    <CardDescription>{details.title}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No results found for "{searchQuery}".
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;