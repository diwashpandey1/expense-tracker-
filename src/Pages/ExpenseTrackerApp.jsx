import {Routes, Route,Link} from "react-router-dom";
import {ExpenseProvider} from "../Components/expenseapp/ExpenseContext.jsx";
import ExpenseFooter from "../Components/expenseapp/ExpenseFooter.jsx";
import ExpenseGoals from "../Components/expenseapp/ExpenseGoals.jsx";
import ExpenseInsights from "../Components/expenseapp/ExpenseInsights.jsx";
// import ExpenseProfile from "../Components/expenseapp/ExpenseProfile.jsx";
import ExpenseSetting from "../Components/expenseapp/ExpenseSetting.jsx";
import ExpenseWorkSpace from "../Components/expenseapp/ExpenseWorkSpace.jsx";
import Header from "../Components/Common/Header.jsx";
import {AuthContext} from "../backend/AuthContext.jsx";
import {useContext} from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

function ExpenseTrackerApp() {
   const {user} = useContext(AuthContext);

   if (!user) {
      return (
         <>
         <Header/>
            <div className="flex items-center justify-center w-full h-screen bg-gray-100">
               <div className="flex flex-col items-center p-8 space-y-6 bg-white rounded-lg shadow-lg">
                  <p className="text-lg font-semibold text-gray-700">
                     You are not logged in. Please login first.
                  </p>
                  <Link to="/login"
                     className="px-6 py-2 font-bold text-white transition bg-blue-500 rounded-lg shadow-md hover:bg-blue-600">
                     Login
                  </Link>
               </div>
            </div>
         </>
      );
   }

   return (
      <ExpenseProvider>
         <motion.div
            initial={{width: 44, borderRadius: 9999}} // start as circle
            whileHover={{width: 160, borderRadius: 12}} // expand to pill
            transition={{type: "spring", stiffness: 300, damping: 20}}
            className="absolute overflow-hidden text-white bg-gray-800 top-4 left-4">
            <Link
               to="/"
               className="flex items-center px-2 transition-colors rounded-lg h-11 hover:bg-gray-900">
               <ArrowLeft size={24} className="flex-shrink-0" />
               <motion.span
                  initial={{opacity: 0, x: -10}}
                  animate={{opacity: 0, x: -10}} // default hidden
                  whileHover={{opacity: 1, x: 0}} // show on hover
                  transition={{duration: 0.3}}
                  className="ml-2 whitespace-nowrap">
                  Back to Home
               </motion.span>
            </Link>
         </motion.div>
         <div className="flex flex-col h-screen">
            <div className="flex-grow overflow-y-auto">
               <Routes>
                  <Route path="/" element={<ExpenseWorkSpace />} />
                  <Route path="/insights" element={<ExpenseInsights />} />
                  <Route path="/goals" element={<ExpenseGoals />} />
                  <Route path="/setting" element={<ExpenseSetting />} />
               </Routes>
            </div>
            <div className="shrink-0">
               <ExpenseFooter />
            </div>
         </div>
      </ExpenseProvider>
   );
}

export default ExpenseTrackerApp;
