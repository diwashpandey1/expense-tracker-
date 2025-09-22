import { Routes, Route, Link } from "react-router-dom";
import { ExpenseProvider } from "../Components/expenseapp/ExpenseContext.jsx";
import ExpenseFooter from "../Components/expenseapp/ExpenseFooter.jsx";
import ExpenseGoals from "../Components/expenseapp/ExpenseGoals.jsx";
import ExpenseInsights from "../Components/expenseapp/ExpenseInsights.jsx";
import ExpenseSetting from "../Components/expenseapp/ExpenseSetting.jsx";
import ExpenseWorkSpace from "../Components/expenseapp/ExpenseWorkSpace.jsx";
import Header from "../Components/Common/Header.jsx";
import { AuthContext } from "../backend/AuthContext.jsx";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// Page transition wrapper for nested routes
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="w-full"
  >
    {children}
  </motion.div>
);

function ExpenseTrackerApp() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center w-full h-screen bg-gray-100">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center p-10 space-y-6 bg-white shadow-xl rounded-xl"
          >
            <p className="text-xl font-semibold text-center text-gray-700">
              You are not logged in. Please log in first to access the Expense Tracker.
            </p>
            <Link
              to="/login"
              className="px-6 py-3 font-bold text-white transition-all bg-green-500 rounded-lg shadow-md hover:bg-green-600"
            >
              Login
            </Link>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <ExpenseProvider>
      {/* Back Button */}
      <motion.div
        initial={{ width: 44, borderRadius: 9999 }}
        whileHover={{ width: 160, borderRadius: 12 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute z-50 overflow-hidden text-white bg-gray-800 top-4 left-4"
      >
        <Link
          to="/"
          className="flex items-center px-2 transition-colors rounded-lg h-11 hover:bg-gray-900"
        >
          <ArrowLeft size={24} className="flex-shrink-0" />
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-2 font-medium whitespace-nowrap"
          >
            Back to Home
          </motion.span>
        </Link>
      </motion.div>

      <div className="flex flex-col h-screen">
        <div className="flex-grow overflow-y-auto">
          <AnimatePresence mode="wait">
            <Routes>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <ExpenseWorkSpace />
                  </PageTransition>
                }
              />
              <Route
                path="/insights"
                element={
                  <PageTransition>
                    <ExpenseInsights />
                  </PageTransition>
                }
              />
              <Route
                path="/goals"
                element={
                  <PageTransition>
                    <ExpenseGoals />
                  </PageTransition>
                }
              />
              <Route
                path="/setting"
                element={
                  <PageTransition>
                    <ExpenseSetting />
                  </PageTransition>
                }
              />
            </Routes>
          </AnimatePresence>
        </div>
        <div className="shrink-0">
          <ExpenseFooter />
        </div>
      </div>
    </ExpenseProvider>
  );
}

export default ExpenseTrackerApp;
