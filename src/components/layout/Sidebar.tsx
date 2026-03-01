import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, FileText, PlusCircle, GitBranch, BarChart3,
  Settings, Building2, ChevronLeft, Activity, FolderHeart, History,
  ListChecks, ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export const Sidebar = ({ open, onToggle }: SidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();

  // Define navigation items based on role
  const getNavItemsForRole = () => {
    if (!user) return [];

    switch (user.role) {
      case "admin":
        return [
          { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
          { label: "Department Analytics", icon: Building2, path: "/department" },
          { label: "All Requests", icon: FileText, path: "/requests" },
          { label: "Workflows", icon: GitBranch, path: "/workflow" },
          { label: "Reports", icon: BarChart3, path: "/reports" },
          { label: "Settings", icon: Settings, path: "/settings" },
        ];
      
      case "department_staff":
        return [
          { label: "My Dashboard", icon: LayoutDashboard, path: "/department-staff" },
          { label: "Assigned Requests", icon: FileText, path: "/requests" },
          { label: "Create Request", icon: PlusCircle, path: "/create-request" },
          { label: "Track Requests", icon: ArrowUpRight, path: "/department-staff/track" },
          { label: "Settings", icon: Settings, path: "/settings" },
        ];
      
      case "patient":
        return [
          { label: "My Portal", icon: FolderHeart, path: "/patient" },
          { label: "My Requests", icon: ListChecks, path: "/patient/requests" },
          { label: "My History", icon: History, path: "/patient/history" },
          { label: "Settings", icon: Settings, path: "/settings" },
        ];
      
      default:
        return [
          { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
          { label: "Settings", icon: Settings, path: "/settings" },
        ];
    }
  };

  const navItems = getNavItemsForRole();

  // Get role display name
  const getRoleDisplay = () => {
    if (!user) return "";
    switch (user.role) {
      case "admin": return "Administrator";
      case "department_staff": return `${user.department} Staff`;
      case "patient": return "Patient";
      default: return user.role;
    }
  };

  // Get user initials
  const getUserInitials = () => {
    if (!user) return "??";
    return user.name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-foreground/20 lg:hidden"
          onClick={onToggle}
        />
      )}
      <aside
        className={cn(
          "fixed z-30 flex h-full flex-col border-r border-border bg-sidebar transition-all duration-300 lg:relative lg:z-auto",
          open ? "w-64" : "w-0 lg:w-16",
          !open && "overflow-hidden lg:overflow-visible"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          {open && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground tracking-tight">MediFlow</span>
              <span className="text-[10px] text-muted-foreground">Workflow Automation</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="ml-auto hidden rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground lg:block"
          >
            <ChevronLeft className={cn("h-4 w-4 transition-transform", !open && "rotate-180")} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || 
              (item.path === "/admin" && location.pathname === "/");
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {open && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        {open && user && (
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                {getUserInitials()}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-foreground">{user.name}</span>
                <span className="text-[10px] text-muted-foreground">{getRoleDisplay()}</span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
