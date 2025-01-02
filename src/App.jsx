import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage.jsx";
import ToolsPage from "./Pages/ToolsPage.jsx";
import BlogPage from "./Pages/BlogPage.jsx";

export default function App() {
  return (
    <Router basename="/expense-tracker">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </Router>
  );
}
