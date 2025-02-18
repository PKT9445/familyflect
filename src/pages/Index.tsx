
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Users, Heart, MessageCircle, Share2, Image, Smile, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

// Mock data for posts
const posts = [
  {
    id: 1,
    author: {
      name: "Rahul Sharma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      role: "Community Leader"
    },
    content: "Excited to announce our upcoming Diwali celebration! 🪔 Join us for an evening of festivities, food, and cultural performances. Mark your calendars for next Saturday. #SakshamCommunity #Celebration",
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800&auto=format&fit=crop",
    likes: 45,
    comments: 12,
    time: "2 hours ago"
  },
  {
    id: 2,
    author: {
      name: "Priya Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      role: "Event Coordinator"
    },
    content: "Thank you everyone for making yesterday's youth meetup a huge success! The energy and enthusiasm was incredible. Special thanks to our speakers and volunteers. Looking forward to our next gathering! 🙏",
    likes: 38,
    comments: 8,
    time: "5 hours ago"
  },
];

// Mock data for announcements
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
  const [postContent, setPostContent] = useState("");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Hero Section */}
      <section className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
          Welcome to Saksham
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with your community, share moments, and stay updated with the latest happenings.
        </p>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Main Feed */}
        <div className="md:col-span-2 space-y-6">
          {/* Create Post Card */}
          <Card className="glass-card border-none shadow-lg bg-white/80">
            <CardContent className="pt-6">
              <div className="flex gap-4 items-start">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-4">
                  <Textarea
                    placeholder="Share something with your community..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Image className="h-5 w-5 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Smile className="h-5 w-5 text-yellow-500" />
                      </Button>
                    </div>
                    <Button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white">
                      <Send className="h-4 w-4 mr-2" /> Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts Feed */}
          {posts.map((post) => (
            <Card key={post.id} className="glass-card border-none shadow-lg overflow-hidden hover:shadow-xl transition-shadow bg-white/80">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg font-semibold">
                    {post.author.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {post.author.role} • {post.time}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base">{post.content}</p>
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post attachment"
                    className="rounded-lg w-full object-cover max-h-[400px]"
                  />
                )}
              </CardContent>
              <CardFooter className="border-t py-4 flex justify-between">
                <div className="flex gap-6">
                  <Button variant="ghost" className="text-rose-500 hover:text-rose-600">
                    <Heart className="h-5 w-5 mr-2" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" className="text-blue-500 hover:text-blue-600">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    {post.comments}
                  </Button>
                </div>
                <Button variant="ghost">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="glass-card border-none shadow-lg bg-gradient-to-br from-orange-100 to-pink-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-orange-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="secondary"
                className="w-full justify-start hover:bg-white/50"
                onClick={() => window.location.href = "/profile"}
              >
                View My Profile
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-start hover:bg-white/50"
                onClick={() => window.location.href = "/family-tree"}
              >
                Explore Family Tree
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-start hover:bg-white/50"
                onClick={() => window.location.href = "/search"}
              >
                Search Members
              </Button>
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card className="glass-card border-none shadow-lg bg-gradient-to-br from-blue-100 to-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5 text-blue-500" />
                Announcements
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
        </div>
      </div>
    </div>
  );
};

export default Index;
