import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useContext } from "react";
import { AuthProvider } from "./backend/AuthContext.jsx";
import { AuthContext } from "./backend/AuthContext.jsx";

const Homepage = lazy(() => import("./Pages/Homepage.jsx"));
const ToolsPage = lazy(() => import("./Pages/ToolsPage.jsx"));
const BlogPage = lazy(() => import("./Pages/BlogPage.jsx"));
const ExpenseTrackerApp = lazy(() => import("./Pages/ExpenseTrackerApp.jsx"));
const LoginForm = lazy(() => import("./Components/Common/LoginForm.jsx"));
const SignupForm = lazy(() => import("./Components/Common/SignupForm.jsx"));
const Profile = lazy(() => import("./Components/Common/Profile.jsx"));
const ForgetPassword = lazy(() => import("./Components/Common/ForgetPassword.jsx"));

// Page transition wrapper
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="w-full"
  >
    {children}
  </motion.div>
);

// Separate component to use useLocation inside Router
const AnimatedRoutes = () => {
  const location = useLocation();
  const { loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Homepage /></PageTransition>} />
          <Route path="/login" element={<PageTransition><LoginForm /></PageTransition>} />
          <Route path="/signup" element={<PageTransition><SignupForm /></PageTransition>} />
          <Route path="/forget-password" element={<PageTransition><ForgetPassword /></PageTransition>} />
          <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
          <Route path="/tools/*" element={<PageTransition><ToolsPage /></PageTransition>} />
          <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
          <Route path="/expense-tracker-app/*" element={<PageTransition><ExpenseTrackerApp /></PageTransition>} />
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
