import { Routes, Route } from "react-router-dom";
import { ExpenseProvider } from "../Components/expenseapp/ExpenseContext.jsx";
import ExpenseFooter from "../Components/expenseapp/ExpenseFooter.jsx";
import ExpenseGoals from "../Components/expenseapp/ExpenseGoals.jsx";
import ExpenseInsights from "../Components/expenseapp/ExpenseInsights.jsx";
import ExpenseProfile from "../Components/expenseapp/ExpenseProfile.jsx";
import ExpenseSetting from "../Components/expenseapp/ExpenseSetting.jsx";
import ExpenseWorkSpace from "../Components/expenseapp/ExpenseWorkSpace.jsx";

function ExpenseTrackerApp() {
   return (
      <ExpenseProvider>
         <div className="flex flex-col h-screen">
            <div className="flex-grow overflow-y-auto">
               <Routes>
                  <Route path="/" element={<ExpenseWorkSpace />} />
                  <Route path="insights" element={<ExpenseInsights />} />
                  <Route path="goals" element={<ExpenseGoals />} />
                  <Route path="profile" element={<ExpenseProfile />} />
                  <Route path="setting" element={<ExpenseSetting />} />
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
