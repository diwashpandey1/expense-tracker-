import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Homepage from "./Pages/Homepage.jsx";
import ToolsPage from "./Pages/ToolsPage.jsx";
import BlogPage from "./Pages/BlogPage.jsx";
import ExpenseTrackerApp from "./Pages/ExpenseTrackerApp.jsx";
import {AuthProvider} from "./backend/AuthContext.jsx";
import ChatBot from "./Components/Chatbot/ChatBot.jsx";
import LoginForm from "./Components/Common/LoginForm.jsx"
import SignupForm from "./Components/Common/SignupForm.jsx"
import Profile from "./Components/Common/Profile.jsx";
import ForgetPassword from "./Components/Common/ForgetPassword.jsx";

export default function App() {
   return (
      <>
         <AuthProvider>
            <Router>
               <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/signup" element={<SignupForm />} />
                  <Route path="/forget-password" element={<ForgetPassword />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/tools/*" element={<ToolsPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route
                     path="/expense-tracker-app/*"
                     element={<ExpenseTrackerApp />}
                  />
               </Routes>
            </Router>
            {/* <ChatBot /> */}
         </AuthProvider>
      </>
   );
}
