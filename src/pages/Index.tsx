import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar, Users, Heart, MessageCircle, Share2, Image, Smile, Send, User, Menu, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import EmojiPicker from 'emoji-picker-react';
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Mock data for posts
const posts = [
  {
    id: 1,
    author: {
      name: "Rahul Sharma",
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
  const { toast } = useToast();
  const [postContent, setPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        toast({
          title: "Image uploaded",
          description: "Your image has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiSelect = (emojiObject: any) => {
    setPostContent(prev => prev + emojiObject.emoji);
  };

  const handleShare = (postId: number) => {
    // Here you would typically implement social sharing functionality
    toast({
      title: "Share post",
      description: "Sharing functionality will be implemented soon!",
    });
  };

  const handleLike = (postId: number) => {
    setLikedPosts(prev => {
      const isLiked = prev.includes(postId);
      if (isLiked) {
        return prev.filter(id => id !== postId);
      } else {
        return [...prev, postId];
      }
    });
  };

  const handlePost = () => {
    if (!postContent && !selectedImage) {
      toast({
        title: "Empty post",
        description: "Please add some content or an image to your post.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Post created",
      description: "Your post has been published successfully!",
    });
    
    setPostContent("");
    setSelectedImage(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6">
      {/* Hero Section */}
      <section className="text-center space-y-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
          Welcome to Saksham
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Connect with your community, share moments, and stay updated with the latest happenings.
        </p>
      </section>

      {/* Main Feed and Menu */}
      <div className="flex justify-end mb-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="space-y-4 mt-4">
              {/* Quick Actions Card */}
              <Card className="glass-card border-none shadow-lg bg-gradient-to-br from-orange-100 to-pink-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="h-5 w-5 text-orange-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid gap-2">
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
                  </div>
                </CardContent>
              </Card>

              {/* Announcements Card */}
              <Card className="glass-card border-none shadow-lg bg-gradient-to-br from-blue-100 to-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    Announcements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
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
                  </div>
                </CardContent>
              </Card>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-6">
        {/* Create Post Card */}
        <Card className="glass-card border-none shadow-lg bg-white/80">
          <CardContent className="pt-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-4">
                <Textarea
                  placeholder="Share something with your community..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
                {selectedImage && (
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="rounded-lg max-h-[300px] w-full object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="image-upload"
                      onChange={handleImageUpload}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => document.getElementById('image-upload')?.click()}
                    >
                      <Image className="h-5 w-5 text-blue-500" />
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Smile className="h-5 w-5 text-yellow-500" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 border-none">
                        <EmojiPicker
                          onEmojiClick={handleEmojiSelect}
                          width="100%"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Button 
                    className="bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                    onClick={handlePost}
                  >
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
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base sm:text-lg font-semibold">
                  {post.author.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {post.author.role} • {post.time}
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base break-words">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post attachment"
                  className="rounded-lg w-full object-cover max-h-[400px]"
                />
              )}
            </CardContent>
            <CardFooter className="border-t py-4">
              <div className="flex flex-wrap gap-4 justify-between w-full">
                <div className="flex gap-4">
                  <Button 
                    variant="ghost" 
                    className={cn(
                      "text-rose-500 hover:text-rose-600",
                      likedPosts.includes(post.id) && "text-rose-600 bg-rose-50"
                    )}
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart className="h-5 w-5 mr-2" fill={likedPosts.includes(post.id) ? "currentColor" : "none"} />
                    <span className="hidden sm:inline">{post.likes + (likedPosts.includes(post.id) ? 1 : 0)}</span>
                  </Button>
                  <Button variant="ghost" className="text-blue-500 hover:text-blue-600">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">{post.comments}</span>
                  </Button>
                </div>
                <Button variant="ghost" onClick={() => handleShare(post.id)}>
                  <Share2 className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Share</span>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
