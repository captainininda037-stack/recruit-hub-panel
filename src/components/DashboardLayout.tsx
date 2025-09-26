import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/App";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Plus, 
  FileText, 
  Users, 
  BarChart3, 
  LogOut,
  Menu,
  Bell,
  Settings
} from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

const DashboardLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full gradient-surface">
        <AppSidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-16 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  {getPageTitle(location.pathname)}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {getPageDescription(location.pathname)}
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full text-xs"></span>
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <div className="animate-fade-in">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

// Helper functions for dynamic page titles
const getPageTitle = (pathname: string): string => {
  switch (pathname) {
    case "/dashboard":
      return "Dashboard";
    case "/jobs/new":
      return "Create Job";
    case "/jobs":
      return "Job Management";
    case "/users":
      return "User Management";
    case "/analytics":
      return "Analytics";
    default:
      if (pathname.includes("/jobs/edit/")) return "Edit Job";
      return "Dashboard";
  }
};

const getPageDescription = (pathname: string): string => {
  switch (pathname) {
    case "/dashboard":
      return "Overview of your job notification system";
    case "/jobs/new":
      return "Create a new job posting";
    case "/jobs":
      return "Manage all job postings";
    case "/users":
      return "View and manage registered users";
    case "/analytics":
      return "Job engagement metrics and insights";
    default:
      if (pathname.includes("/jobs/edit/")) return "Edit existing job posting";
      return "Welcome to your admin dashboard";
  }
};

export default DashboardLayout;