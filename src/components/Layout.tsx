
import { cn } from "@/lib/utils";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Bell, Home, Menu, QrCode, Search, Settings, TreePine, User, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calendar, Users } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/family-tree", icon: TreePine, label: "Family" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

// Mock data for announcements (moved from Index.tsx)
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

export default function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScannerOpen, setScannerOpen] = useState(false);

  const openScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setScannerOpen(true);
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/50 to-background">
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-gradient-to-r from-orange-500/10 to-pink-500/10 backdrop-blur supports-[backdrop-filter]:bg-background/50 hidden md:block">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center space-x-2">
            <span className="text-xl font-semibold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Saksham</span>
          </div>
          
          <nav className="flex flex-1 items-center space-x-2">
            {navItems.map(({ to, icon: Icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  cn("nav-link flex items-center gap-2", isActive && "active")
                }
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
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
                      <div className="grid grid-cols-1 gap-2">
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
            <button className="nav-link flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </button>
          </div>
        </div>
      </header>

      <main className="page-container">
        <Outlet />
      </main>

      {/* Mobile Navigation */}
      <nav className="mobile-nav bg-gradient-to-r from-orange-500/10 to-pink-500/10 backdrop-blur">
        <div className="mobile-nav-content">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn("mobile-nav-link", isActive && "active")
              }
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          ))}
          <button
            className="mobile-nav-link"
            onClick={openScanner}
          >
            <QrCode className="h-5 w-5" />
            <span>Scan</span>
          </button>
        </div>
      </nav>

      {/* QR Scanner Dialog */}
      <Dialog open={isScannerOpen} onOpenChange={setScannerOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
            <video
              id="qr-video"
              className="w-full h-full object-cover"
              autoPlay
              playsInline
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
