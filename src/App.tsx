import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { NavigationMenu } from "@/components/NavigationMenu";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";
import TermsAndConditions from "./pages/TermsAndConditions";
import CollectorResponsibilities from "./pages/CollectorResponsibilities";
import MedicalExaminerProcess from "./pages/MedicalExaminerProcess";
import { AdminLayout } from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Members from "./pages/admin/Members";
import Collectors from "./pages/admin/Collectors";
import Registrations from "./pages/admin/Registrations";
import Database from "./pages/admin/Database";
import Finance from "./pages/admin/Finance";
import Support from "./pages/admin/Support";
import Profile from "./pages/admin/Profile";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      networkMode: 'always',
    },
  },
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Auth check error:', error);
          setIsAuthenticated(false);
          return;
        }
        console.log('Auth check result:', { session });
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Auth check failed:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Auth state changed:', { event: _event, session });
      setIsAuthenticated(!!session);
    });

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  // Protected route wrapper
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }
    
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    return <>{children}</>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <NavigationMenu />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/change-password" element={<ChangePassword />} />
                  <Route path="/terms" element={<TermsAndConditions />} />
                  <Route path="/collector-responsibilities" element={<CollectorResponsibilities />} />
                  <Route path="/medical-examiner-process" element={<MedicalExaminerProcess />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Dashboard />} />
                    <Route path="members" element={<Members />} />
                    <Route path="collectors" element={<Collectors />} />
                    <Route path="registrations" element={<Registrations />} />
                    <Route path="database" element={<Database />} />
                    <Route path="finance" element={<Finance />} />
                    <Route path="support" element={<Support />} />
                    <Route path="profile" element={<Profile />} />
                  </Route>
                </Routes>
              </div>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;