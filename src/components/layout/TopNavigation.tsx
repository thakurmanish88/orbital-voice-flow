import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Settings, LogOut } from "lucide-react";
import { useLocation } from "react-router-dom";

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Dashboard";
    case "/create-agent":
      return "Create Agent";
    case "/run-campaign":
      return "Run Campaign";
    case "/analytics":
      return "Campaign Analytics";
    case "/settings":
      return "Settings";
    default:
      return "Dashboard";
  }
};

export function TopNavigation() {
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);

  return (
    <header className="h-16 border-b bg-card flex items-center justify-between px-6 shadow-soft">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <span className="font-semibold text-lg">OrbitalConnect AI</span>
        </div>
      </div>

      <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}