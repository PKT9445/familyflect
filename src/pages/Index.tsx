
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";

const announcements = [
  {
    id: 1,
    title: "Community Meet",
    date: "March 15, 2024",
    description: "Join us for our monthly community gathering!",
  },
  {
    id: 2,
    title: "New Members",
    date: "March 10, 2024",
    description: "Welcome to the 5 new families who joined our community!",
  },
];

const Index = () => {
  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to Saksham</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with your community, explore your family tree, and stay updated
          with the latest announcements.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Latest Announcements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="border-b last:border-0 pb-4 last:pb-0"
              >
                <h3 className="font-medium">{announcement.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {announcement.date}
                </p>
                <p className="text-sm mt-1">{announcement.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="secondary"
              className="w-full justify-start"
              onClick={() => window.location.href = "/profile"}
            >
              View My Profile
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-start"
              onClick={() => window.location.href = "/family-tree"}
            >
              Explore Family Tree
            </Button>
            <Button
              variant="secondary"
              className="w-full justify-start"
              onClick={() => window.location.href = "/search"}
            >
              Search Members
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
