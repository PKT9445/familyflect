
import { cn } from "@/lib/utils";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Bell, Home, Menu, Search, Settings, TreePine, User, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/profile", icon: User, label: "My Profile" },
  { to: "/family-tree", icon: TreePine, label: "Family Tree" },
  { to: "/search", icon: Search, label: "Search" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function Layout() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary/50 to-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center space-x-2">
            <span className="text-xl font-semibold">Saksham</span>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 items-center space-x-2">
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
          
          <div className="ml-auto flex items-center space-x-4">
            <button className="nav-link flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Notifications</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95">
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      "nav-link flex items-center gap-2 px-4 py-3",
                      isActive && "active"
                    )
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>
      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}
