import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useContext } from "react";
import { AuthProvider, AuthContext } from "./backend/AuthContext.jsx";

const Homepage = lazy(() => import("./Pages/Homepage.jsx"));
const ToolsPage = lazy(() => import("./Pages/ToolsPage.jsx"));
const BlogPage = lazy(() => import("./Pages/BlogPage.jsx"));
const ExpenseTrackerApp = lazy(() => import("./Pages/ExpenseTrackerApp.jsx"));
const LoginForm = lazy(() => import("./Components/Common/LoginForm.jsx"));
const SignupForm = lazy(() => import("./Components/Common/SignupForm.jsx"));
const Profile = lazy(() => import("./Components/Common/Profile.jsx"));
const ForgetPassword = lazy(() => import("./Components/Common/ForgetPassword.jsx"));
const NotFound = lazy(() => import("./Pages/NotFound.jsx"));

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
    className="w-full"
  >
    {children}
  </motion.div>
);

const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-gray-600">Loading your account…</div>;
  }

  if (user) {
    return <Navigate to="/app" replace />;
  }

  return children;
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-gray-600">Checking session…</div>;
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-gray-600">Loading page…</div>}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Homepage /></PageTransition>} />
          <Route path="/login" element={<PublicOnlyRoute><PageTransition><LoginForm /></PageTransition></PublicOnlyRoute>} />
          <Route path="/signup" element={<PublicOnlyRoute><PageTransition><SignupForm /></PageTransition></PublicOnlyRoute>} />
          <Route path="/forget-password" element={<PublicOnlyRoute><PageTransition><ForgetPassword /></PageTransition></PublicOnlyRoute>} />
          <Route path="/auth/login" element={<PublicOnlyRoute><PageTransition><LoginForm /></PageTransition></PublicOnlyRoute>} />
          <Route path="/auth/signup" element={<PublicOnlyRoute><PageTransition><SignupForm /></PageTransition></PublicOnlyRoute>} />
          <Route path="/auth/forgot-password" element={<PublicOnlyRoute><PageTransition><ForgetPassword /></PageTransition></PublicOnlyRoute>} />
          <Route path="/profile" element={<ProtectedRoute><PageTransition><Profile /></PageTransition></ProtectedRoute>} />
          <Route path="/tools/*" element={<PageTransition><ToolsPage /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
          <Route path="/app/*" element={<ProtectedRoute><PageTransition><ExpenseTrackerApp /></PageTransition></ProtectedRoute>} />
          <Route path="/expense-tracker-app/*" element={<Navigate to="/app" replace />} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}
