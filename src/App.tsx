import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AppLayout from "./components/layout/AppLayout";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import DepartmentDashboard from "./pages/DepartmentDashboard";
import DepartmentStaffDashboard from "./pages/DepartmentStaffDashboard";
import PatientPortal from "./pages/PatientPortal";
import RequestsPage from "./pages/RequestsPage";
import RequestDetailPage from "./pages/RequestDetailPage";
import CreateRequestPage from "./pages/CreateRequestPage";
import WorkflowPage from "./pages/WorkflowPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected Route wrapper component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to user's default dashboard based on role
    const redirectPath = user.role === "admin" ? "/admin" 
      : user.role === "department_staff" ? "/department-staff"
      : user.role === "patient" ? "/patient"
      : "/login";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

// Root redirect component
const RootRedirect = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const redirectPath = user?.role === "admin" ? "/admin"
    : user?.role === "department_staff" ? "/department-staff"
    : user?.role === "patient" ? "/patient"
    : "/admin";
  
  return <Navigate to={redirectPath} replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AppLayout />}>
            {/* Root - redirect based on role */}
            <Route path="/" element={<RootRedirect />} />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/department" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <DepartmentDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Department Staff Routes */}
            <Route 
              path="/department-staff" 
              element={
                <ProtectedRoute allowedRoles={["department_staff"]}>
                  <DepartmentStaffDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Patient Routes */}
            <Route 
              path="/patient" 
              element={
                <ProtectedRoute allowedRoles={["patient"]}>
                  <PatientPortal />
                </ProtectedRoute>
              } 
            />
            
            {/* Shared Routes */}
            <Route 
              path="/requests" 
              element={
                <ProtectedRoute>
                  <RequestsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/requests/:id" 
              element={
                <ProtectedRoute>
                  <RequestDetailPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-request" 
              element={
                <ProtectedRoute allowedRoles={["admin", "department_staff"]}>
                  <CreateRequestPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/workflow" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <WorkflowPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <ReportsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } 
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
