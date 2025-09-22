import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Homepage from "./Pages/Homepage.jsx";
import ToolsPage from "./Pages/ToolsPage.jsx";
import BlogPage from "./Pages/BlogPage.jsx";
import ExpenseTrackerApp from "./Pages/ExpenseTrackerApp.jsx";
import { AuthProvider } from "./backend/AuthContext.jsx";
import LoginForm from "./Components/Common/LoginForm.jsx";
import SignupForm from "./Components/Common/SignupForm.jsx";
import Profile from "./Components/Common/Profile.jsx";
import ForgetPassword from "./Components/Common/ForgetPassword.jsx";

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

  return (
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
