import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState, useEffect } from "react";
import { supabase } from "../integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { Badge } from "./ui/badge";

export function NavigationMenu() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Initial session check
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Session check error:", error);
          setIsLoggedIn(false);
          return;
        }
        console.log("Initial session check:", { session });
        setIsLoggedIn(!!session);

        // Fetch user role if logged in
        if (session?.user) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error("Error fetching user role:", profileError);
          } else {
            console.log("User role:", profile?.role);
            setUserRole(profile?.role || 'member');
          }
        }
      } catch (error) {
        console.error("Session check failed:", error);
        setIsLoggedIn(false);
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", { event, session });
      
      if (event === "SIGNED_IN" && session) {
        console.log("User signed in:", session.user);
        setIsLoggedIn(true);

        // Fetch user role on sign in
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          console.error("Error fetching user role:", profileError);
        } else {
          console.log("User role on sign in:", profile?.role);
          setUserRole(profile?.role || 'member');
        }

        toast({
          title: "Signed in successfully",
          description: "Welcome back!",
        });
      } else if (event === "SIGNED_OUT") {
        console.log("User signed out");
        setIsLoggedIn(false);
        setUserRole(null);
        navigate('/login');
      } else if (event === "TOKEN_REFRESHED") {
        console.log("Token refreshed successfully");
        setIsLoggedIn(true);
      } else if (event === "USER_UPDATED") {
        console.log("User data updated");
        setIsLoggedIn(true);
      }
    });

    return () => {
      console.log("Cleaning up auth subscription");
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleNavigation = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      console.log("Attempting logout...");
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error);
        toast({
          title: "Logout failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      console.log("Logout successful");
      setIsLoggedIn(false);
      setUserRole(null);
      toast({
        title: "Logged out successfully",
        description: "Come back soon!",
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const getRoleBadgeVariant = (role: string | null) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'collector':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              PWA Burton
            </span>
          </Link>
          {isLoggedIn && userRole && (
            <Badge variant={getRoleBadgeVariant(userRole)} className="capitalize">
              {userRole}
            </Badge>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {isLoggedIn ? (
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          )}
          <Link to="/register">
            <Button variant="default" size="sm">
              Register
            </Button>
          </Link>
          {isLoggedIn && (
            <Link to="/admin">
              <Button variant="outline" size="sm">
                Admin Panel
              </Button>
            </Link>
          )}
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[385px] p-0">
              <div className="flex flex-col gap-4 p-6">
                <div className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
                  Menu
                </div>
                {isLoggedIn ? (
                  <Button
                    variant="outline"
                    className="justify-start bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="justify-start bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    onClick={() => handleNavigation("/login")}
                  >
                    Login
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="justify-start bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                  onClick={() => handleNavigation("/register")}
                >
                  Register
                </Button>
                {isLoggedIn && (
                  <Button
                    variant="outline"
                    className="justify-start bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                    onClick={() => handleNavigation("/admin")}
                  >
                    Admin Panel
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}