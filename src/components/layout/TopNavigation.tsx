
import { Bell, User, Search, Settings, LogOut, SwitchCamera } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define user account types and permissions
interface UserAccount {
  id: string;
  name: string;
  role: string;
  email: string;
  initials: string;
  avatarUrl?: string;
  accessibleApps: string[];
}

// Sample user accounts with different permissions
const userAccounts: UserAccount[] = [
  {
    id: "user1",
    name: "John Doe",
    role: "Administrator",
    email: "john.doe@example.com",
    initials: "JD",
    avatarUrl: "",
    accessibleApps: ["all"] // Administrator has access to all apps
  },
  {
    id: "user2",
    name: "Sarah Chen",
    role: "Operations Manager",
    email: "sarah.chen@example.com",
    initials: "SC",
    avatarUrl: "",
    accessibleApps: ["route-optimization", "fleet", "facilities", "personnel", "shipping-transportation"]
  },
  {
    id: "user3",
    name: "Michael Brown",
    role: "Production Planner",
    email: "michael.brown@example.com",
    initials: "MB",
    avatarUrl: "",
    accessibleApps: ["production-planning", "sort-planning", "load-plans"]
  },
  {
    id: "user4",
    name: "Jessica Kim",
    role: "Data Analyst",
    email: "jessica.kim@example.com",
    initials: "JK",
    avatarUrl: "",
    accessibleApps: ["data-catalog", "scenarios", "analytics"]
  }
];

const TopNavigation = () => {
  const [currentUser, setCurrentUser] = useState<UserAccount>(userAccounts[0]);
  const navigate = useNavigate();

  // Check if current route is accessible to selected user
  useEffect(() => {
    const currentPath = window.location.pathname.split('/')[1];
    
    // Skip check for root path and paths that everyone can access
    if (currentPath === '' || currentPath === 'help') {
      return;
    }

    // Check if user has access to current path
    const hasAccess = 
      currentUser.accessibleApps.includes('all') || 
      currentUser.accessibleApps.includes(currentPath);
    
    // Redirect to dashboard if user doesn't have access
    if (!hasAccess) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleUserSwitch = (userId: string) => {
    const selectedUser = userAccounts.find(user => user.id === userId);
    if (selectedUser) {
      setCurrentUser(selectedUser);
    }
  };

  return (
    <div className="border-b border-border h-14 px-4 flex items-center justify-between bg-background">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-8 w-full"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-auto">
              <DropdownMenuItem className="p-3">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">Route optimization completed</p>
                  <p className="text-sm text-muted-foreground">10 routes optimized. 15% improvement in delivery times.</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">New scenario created</p>
                  <p className="text-sm text-muted-foreground">Scenario "Holiday Rush 2025" was created by Admin.</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3">
                <div className="flex flex-col gap-1">
                  <p className="font-medium">System alert</p>
                  <p className="text-sm text-muted-foreground">3 delivery vehicles require maintenance.</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* User account dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2">
              <Avatar className="h-8 w-8">
                {currentUser.avatarUrl ? (
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                ) : (
                  <AvatarFallback className="bg-primary text-primary-foreground">{currentUser.initials}</AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{currentUser.name}</span>
                <span className="text-xs text-muted-foreground">{currentUser.role}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {/* User profile options */}
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            {/* User switching section */}
            <DropdownMenuLabel>Switch Account</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={currentUser.id} onValueChange={handleUserSwitch}>
              {userAccounts.map((user) => (
                <DropdownMenuRadioItem key={user.id} value={user.id} className="py-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      {user.avatarUrl ? (
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                      ) : (
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">{user.initials}</AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm">{user.name}</span>
                      <span className="text-xs text-muted-foreground">{user.role}</span>
                    </div>
                  </div>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default TopNavigation;
