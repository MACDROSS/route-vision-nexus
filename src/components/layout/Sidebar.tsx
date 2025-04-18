
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
  Map, 
  Settings, 
  Truck,
  PackageOpen,
  Factory,
  Ship,
  BarChart3,
  Shield,
  HelpCircle,
  FileStack,
  Network,
  Building,
  MoveHorizontal,
  Users,
  BoxesIcon,
  Calendar,
  CalendarClock
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
      icon: Map,
      label: "Route Optimization",
      href: "/route-optimization"
    },
    {
      icon: FileStack,
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
      icon: BoxesIcon,
      label: "Load Plans",
      href: "/load-plans"
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
    },
    {
      icon: CalendarClock,
      label: "Long Term Planning",
      href: "/long-term-planning"
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
      label: "Package Tracking",
      href: "/package-tracking"
    },
    {
      icon: Building,
      label: "Facilities",
      href: "/facilities"
    },
    {
      icon: Calendar,
      label: "Facility Schedule",
      href: "/facility-schedule"
    },
    {
      icon: MoveHorizontal,
      label: "Sort Planning",
      href: "/sort-planning"
    },
    {
      icon: Users,
      label: "Personnel",
      href: "/personnel"
    }
  ];

  return (
    <ShadcnSidebar>
      <SidebarHeader className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Truck className="h-6 w-6 text-primary" />
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
              <Link to="/help" className="flex gap-3 items-center">
                <HelpCircle className="h-5 w-5" />
                <span>Help & Documentation</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
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
