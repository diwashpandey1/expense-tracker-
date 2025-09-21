import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "../../backend/AuthContext";
import { firestore } from "../../backend/Firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const { UID } = useContext(AuthContext);

  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "रु"
  );
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const [transactions, setTransactions] = useState([]);

  const [categories, setCategories] = useState({
    expense: [
      { name: "Housing", totalAmount: 0 },
      { name: "Childcare", totalAmount: 0 },
      { name: "Transportation", totalAmount: 0 },
      { name: "Utilities", totalAmount: 0 },
      { name: "Food/Supplies", totalAmount: 0 },
      { name: "Pets", totalAmount: 0 },
      { name: "Entertainment", totalAmount: 0 },
      { name: "Healthcare", totalAmount: 0 },
      { name: "Insurance", totalAmount: 0 },
      { name: "Personal Care", totalAmount: 0 },
      { name: "Debt", totalAmount: 0 },
      { name: "Gifts", totalAmount: 0 },
      { name: "Donations", totalAmount: 0 },
      { name: "Clothing", totalAmount: 0 },
      { name: "Education", totalAmount: 0 },
      { name: "Subscriptions", totalAmount: 0 },
      { name: "Miscellaneous", totalAmount: 0 },
      { name: "Taxes", totalAmount: 0 },
    ],
    income: [
      { name: "Salary", totalAmount: 0 },
      { name: "House Property", totalAmount: 0 },
      { name: "Profits and Gains", totalAmount: 0 },
      { name: "Capital Gain", totalAmount: 0 },
      { name: "Gifts", totalAmount: 0 },
      { name: "Investments", totalAmount: 0 },
      { name: "Side Hustles", totalAmount: 0 },
      { name: "Government Benefits", totalAmount: 0 },
    ],
    saving: [
      { name: "Retirement Funds", totalAmount: 0 },
      { name: "Emergency Funds", totalAmount: 0 },
      { name: "College Funds", totalAmount: 0 },
      { name: "Travel Funds", totalAmount: 0 },
      { name: "Sinking Funds", totalAmount: 0 },
      { name: "Common Savings", totalAmount: 0 },
      { name: "Medical Funds", totalAmount: 0 },
      { name: "Child Savings", totalAmount: 0 },
      { name: "Large Purchases", totalAmount: 0 },
    ],
  });

  useEffect(() => {
    if (!UID) return;

    // Use the correct Firestore collection path from your database structure
    const transactionsRef = collection(firestore, "transactionDetails", UID, "transactions");
    const q = query(transactionsRef, orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTransactions = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(fetchedTransactions);

      let incomeSum = 0;
      let expenseSum = 0;
      let savingsSum = 0;
      const newCategoryTotals = {
        expense: categories.expense.map(cat => ({...cat, totalAmount: 0})),
        income: categories.income.map(cat => ({...cat, totalAmount: 0})),
        saving: categories.saving.map(cat => ({...cat, totalAmount: 0})),
      };

      fetchedTransactions.forEach((t) => {
        const amount = Number(t.amount);
        if (t.type === "income") {
          incomeSum += amount;
          const categoryIndex = newCategoryTotals.income.findIndex(c => c.name === t.category);
          if (categoryIndex !== -1) {
            newCategoryTotals.income[categoryIndex].totalAmount += amount;
          }
        } else if (t.type === "expense") {
          expenseSum += amount;
          const categoryIndex = newCategoryTotals.expense.findIndex(c => c.name === t.category);
          if (categoryIndex !== -1) {
            newCategoryTotals.expense[categoryIndex].totalAmount += amount;
          }
        } else if (t.type === "saving") {
          savingsSum += amount;
          const categoryIndex = newCategoryTotals.saving.findIndex(c => c.name === t.category);
          if (categoryIndex !== -1) {
            newCategoryTotals.saving[categoryIndex].totalAmount += amount;
          }
        }
      });

      setTotalIncome(incomeSum);
      setTotalExpense(expenseSum);
      setTotalSavings(savingsSum);
      setTotalBalance(incomeSum - expenseSum + savingsSum);
      setCategories(newCategoryTotals);
    });

    return () => unsubscribe();
  }, [UID]);

  return (
    <ExpenseContext.Provider
      value={{
        currency,
        setCurrency,
        totalBalance,
        totalIncome,
        totalSavings,
        totalExpense,
        categories,
        transactions,
        setTransactions,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenseContext() {
  return useContext(ExpenseContext);
}