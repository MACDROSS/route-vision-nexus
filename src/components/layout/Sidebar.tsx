
import { 
  Sidebar as ShadcnSidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarTrigger,
  SidebarFooter
} from "@/components/ui/sidebar";

import { 
  LayoutDashboard, 
  Database, 
  MapPin, 
  BarChart3, 
  Network, 
  Settings, 
  Truck, 
  PackageOpen,
  Users,
  Factory,
  MoveHorizontal,
  Ship,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const mainMenuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/"
    },
    {
      icon: MapPin,
      label: "Route Optimization",
      href: "/route-optimization"
    },
    {
      icon: Database,
      label: "Data Catalog",
      href: "/data-catalog"
    },
    {
      icon: Network,
      label: "Scenarios",
      href: "/scenarios"
    },
    {
      icon: Factory,
      label: "Production Planning",
      href: "/production-planning"
    },
    {
      icon: Ship,
      label: "Shipping",
      href: "/shipping-transportation"
    },
    {
      icon: BarChart3,
      label: "Analytics",
      href: "/analytics"
    },
    {
      icon: Shield,
      label: "Compliance",
      href: "/compliance-monitoring"
    }
  ];

  const resourcesMenuItems = [
    {
      icon: Truck,
      label: "Fleet",
      href: "/fleet"
    },
    {
      icon: PackageOpen,
      label: "Packages",
      href: "/packages"
    },
    {
      icon: Users,
      label: "Personnel",
      href: "/personnel"
    },
    {
      icon: MoveHorizontal,
      label: "Sort Planning",
      href: "/sort-planning"
    }
  ];

  return (
    <ShadcnSidebar>
      <SidebarHeader className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Truck className="h-6 w-6 text-sidebar-accent" />
          <span className="font-semibold text-lg">CourierTwin</span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarTrigger className="absolute -right-4 top-6 bg-sidebar-background border border-sidebar-border h-8 w-8 rounded-full flex items-center justify-center text-sidebar-foreground" />
        
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link to={item.href} className="flex gap-3 items-center">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourcesMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <Link to={item.href} className="flex gap-3 items-center">
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/settings" className="flex gap-3 items-center">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export default Sidebar;
