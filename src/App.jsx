import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage.jsx";
import ToolsPage from "./Pages/ToolsPage.jsx";
import BlogPage from "./Pages/BlogPage.jsx";
import ExpenseTrackerApp from "./Pages/ExpenseTrackerApp.jsx";
import LoginForm from "./Components/Common/LoginForm.jsx";
import SignupForm from "./Components/Common/SignupForm.jsx";

export default function App() {
  return (
    <>
      <Router basename="/expense-tracker">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/tools/*" element={<ToolsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route
            path="/expense-tracker-app/*"
            element={<ExpenseTrackerApp />}
          />
          <Route path="/login" element={<LoginForm />} /> {/* Fixed here */}
          <Route path="/signup" element={<SignupForm />} />
        </Routes>
      </Router>
    </>
  );
}
