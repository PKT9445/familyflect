
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search as SearchIcon } from "lucide-react";

const mockResults = [
  {
    id: 1,
    name: "Jane Smith",
    location: "Chicago, IL",
    profession: "Software Engineer",
  },
  {
    id: 2,
    name: "Mike Johnson",
    location: "San Francisco, CA",
    profession: "Teacher",
  },
];

const Search = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-6">
      <section className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Search Members</h1>
        <p className="text-muted-foreground">
          Find community members by name, location, or profession
        </p>
      </section>

      <div className="max-w-2xl mx-auto">
        <div className="flex gap-4">
          <Input
            placeholder="Search members..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button>
            <SearchIcon className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        <div className="mt-8 space-y-4">
          {mockResults.map((result) => (
            <Card key={result.id} className="glass-card hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{result.name}</CardTitle>
                <CardDescription>
                  {result.profession} • {result.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
