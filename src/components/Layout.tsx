
import { cn } from "@/lib/utils";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Bell, Home, Menu, QrCode, Search, Settings, TreePine, User, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/profile", icon: User, label: "Profile" },
  { to: "/family-tree", icon: TreePine, label: "Family" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScannerOpen, setScannerOpen] = useState(false);

  const openScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setScannerOpen(true);
      // Here you would typically initialize a QR code scanner library
      // For now, we'll just show the camera feed
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
      <header className="sticky top-0 z-50 w-full border-b bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50 hidden md:block">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center space-x-2">
            <span className="text-xl font-semibold">Saksham</span>
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
      <nav className="mobile-nav">
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
