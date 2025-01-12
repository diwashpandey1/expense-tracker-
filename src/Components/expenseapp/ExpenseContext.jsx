import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Context
const ExpenseContext = createContext();

// Create a Provider Component
export function ExpenseProvider({ children }) {

  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "रु"
 );
 const [monthlyIncome, setmonthlyIncome] = useState();
 const [addCategory, setAddCategory] = useState();

 const [totalBalance, setTotalBalance] = useState( 
  localStorage.getItem("totalBalance") || 50000
 );

 const [expenseCategories, setExpenseCategories] = useState([
  { category: 'Food', total: 150 },
  { category: 'Transport', total: 80 },
  { category: 'Entertainment', total: 120 },
  { category: 'Health', total: 200 },
]);


 useEffect(() => {
  localStorage.setItem("currency", currency);
}, [currency]);

 useEffect(() => {
  localStorage.setItem("totalBalance", totalBalance);
}, [totalBalance]);




  return (
    <ExpenseContext.Provider
      value={{
        currency,
        setCurrency,
        monthlyIncome,
        setmonthlyIncome,
        addCategory,
        setAddCategory,
        expenseCategories,
        setExpenseCategories,
        totalBalance,
        setTotalBalance,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

// Create a custom hook to use the Context
export function useExpenseContext() {
  return useContext(ExpenseContext);
}
