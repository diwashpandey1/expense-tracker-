import { useContext, useEffect } from "react";
import { useExpenseContext } from "../Components/expenseapp/ExpenseContext";
import { database } from "./Firebase"; // Firebase should be initialized in this file
import { AuthContext } from "./AuthContext";
import { ref, set, onValue } from "firebase/database"; // Firebase Realtime Database methods

function DataBase() {
  const { user, UID } = useContext(AuthContext); // Get the authenticated user's information
  const {
    currency,
    setCurrency,
    totalBalance,
    setTotalBalance,
    totalIncome,
    setTotalIncome,
    totalSavings,
    setTotalSavings,
    totalExpense,
    setTotalExpense,
    categories,
    setCategories,
  } = useExpenseContext(); // Access the expense state and methods

  useEffect(() => {
    if (UID) {
      const userRef = ref(database, `users/${UID}`); // Reference to user data in Firebase

      // Fetch data from Firebase on component mount
      onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Update the local state with data from Firebase
          setCurrency(data.currency || "USD");
          setTotalBalance(data.totalBalance || 0);
          setTotalIncome(data.totalIncome || 0);
          setTotalSavings(data.totalSavings || 0);
          setTotalExpense(data.totalExpense || 0);
          setCategories(data.categories || []);
        }
      });
    }
  }, [UID, setCurrency, setTotalBalance, setTotalIncome, setTotalSavings, setTotalExpense, setCategories]);

  const saveDataToFirebase = () => {
    if (UID) {
      const userRef = ref(database, `users/${UID}`); // Reference to user data in Firebase
      const userData = {
        currency,
        totalBalance,
        totalIncome,
        totalSavings,
        totalExpense,
        categories,
      };

      set(userRef, userData) // Save the updated data to Firebase
        .then(() => {
          console.log("Data saved successfully!");
        })
        .catch((error) => {
          console.error("Error saving data:", error);
        });
    }
  };

  useEffect(() => {
    // Save data to Firebase whenever any of the expense state changes
    saveDataToFirebase();
  }, [currency, totalBalance, totalIncome, totalSavings, totalExpense, categories]); // Dependencies

  return null; // This component does not render anything visible
}

export default DataBase;
