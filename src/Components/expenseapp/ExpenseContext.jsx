import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { AuthContext } from "../../backend/AuthContext";
import { firestore } from "../../backend/Firebase";
import { calculateExpenseSummary } from "./financeCalculations";

const ExpenseContext = createContext();

export function ExpenseProvider({ children }) {
  const { UID } = useContext(AuthContext);
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "₹");
  const [transactions, setTransactions] = useState([]);
  const [transactionError, setTransactionError] = useState("");

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  useEffect(() => {
    if (!UID) {
      setTransactions([]);
      return undefined;
    }

    const transactionsRef = collection(
      firestore,
      "transactionDetails",
      UID,
      "transactions"
    );
    const transactionsQuery = query(transactionsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      transactionsQuery,
      (snapshot) => {
        const fetchedTransactions = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        setTransactions(fetchedTransactions);
        setTransactionError("");
      },
      (error) => {
        console.error("Error fetching transactions:", error);
        setTransactionError("Failed to load transactions.");
      }
    );

    return () => unsubscribe();
  }, [UID]);

  const summary = useMemo(
    () => calculateExpenseSummary(transactions),
    [transactions]
  );

  return (
    <ExpenseContext.Provider
      value={{
        currency,
        setCurrency,
        transactions,
        setTransactions,
        transactionError,
        ...summary,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenseContext() {
  return useContext(ExpenseContext);
}
