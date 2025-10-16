import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, createContext, useContext } from "react";

// Pages
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import JobForm from "./pages/JobForm";
import JobList from "./pages/JobList";
import LocalJobsList from "./pages/LocalJobsList";
import LocalJobForm from "./pages/LocalJobForm";
import BannersList from "./pages/BannersList";
import BannerForm from "./pages/BannerForm";
import PremiumPostersList from "./pages/PremiumPostersList";
import PremiumPosterForm from "./pages/PremiumPosterForm";
import CategoriesList from "./pages/CategoriesList";
import CategoryForm from "./pages/CategoryForm";
import UsersList from "./pages/UsersList";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

// Auth Context
interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("admin_authenticated") === "true"
  );

  const login = (email: string, password: string) => {
    // Simple authentication - in real app, validate against server
    if (email === "admin@jobdashboard.com" && password === "admin123") {
      setIsAuthenticated(true);
      localStorage.setItem("admin_authenticated", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_authenticated");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route 
                path="/login" 
                element={
                  isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
                } 
              />
              <Route 
                path="/" 
                element={
                  isAuthenticated ? (
                    <DashboardLayout />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="jobs/new" element={<JobForm />} />
                <Route path="jobs/edit/:id" element={<JobForm />} />
                <Route path="jobs" element={<JobList />} />
                <Route path="local-jobs" element={<LocalJobsList />} />
                <Route path="local-jobs/new" element={<LocalJobForm />} />
                <Route path="local-jobs/edit/:id" element={<LocalJobForm />} />
                <Route path="banners" element={<BannersList />} />
                <Route path="banners/new" element={<BannerForm />} />
                <Route path="banners/edit/:id" element={<BannerForm />} />
                <Route path="premium-posters" element={<PremiumPostersList />} />
                <Route path="premium-posters/new" element={<PremiumPosterForm />} />
                <Route path="premium-posters/edit/:id" element={<PremiumPosterForm />} />
                <Route path="categories" element={<CategoriesList />} />
                <Route path="categories/new" element={<CategoryForm />} />
                <Route path="categories/edit/:id" element={<CategoryForm />} />
                <Route path="users" element={<UsersList />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;