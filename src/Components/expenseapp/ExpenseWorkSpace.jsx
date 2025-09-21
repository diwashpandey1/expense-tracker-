// --- Main Workspace Component (Corrected) ---
import React, {useState, useEffect, useContext} from "react";
import {AuthContext} from "../../backend/AuthContext";
import {useExpenseContext} from "./ExpenseContext";
import {firestore} from "../../backend/Firebase";
import {Pencil, Trash, X} from "lucide-react"; // Import X for close button
import toast from "react-hot-toast"; // Import react-hot-toast for notifications
import {
   collection,
   addDoc,
   Timestamp,
   onSnapshot,
   query,
   orderBy,
   doc, // Import doc for specific document reference
   deleteDoc, // Import deleteDoc for deleting documents
   updateDoc, // Import updateDoc for updating documents
} from "firebase/firestore";

// --- Reusable UI Components (local to this file) ---

// Removed the old MessageBox component, will use react-hot-toast instead.

function Card({
   type,
   currency,
   amount,
   date,
   category,
   note,
   id,
   onEdit,
   onDelete,
}) {
   const cardColor = {
      INCOME: "border-green-500",
      EXPENSE: "border-red-500",
      SAVING: "border-blue-500",
   };

   return (
      <div
         className={`mb-4 p-4 border-l-4 ${cardColor[type]} bg-white rounded-r-lg shadow-sm hover:shadow-md transition-shadow duration-300`}>
         <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-800">{category}</span>
            <span
               className={`text-lg font-bold ${
                  type === "INCOME"
                     ? "text-green-600"
                     : type === "EXPENSE"
                     ? "text-red-600"
                     : "text-blue-600"
               }`}>
               {currency} {parseFloat(amount).toFixed(2)}
            </span>
         </div>

         <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-gray-600">
               {note || "No note provided"}
            </p>
            <p className="mt-1 text-xs text-right text-gray-500">{date}</p>
         </div>
         <div className="flex justify-end gap-4 mt-4">
            {" "}
            {/* Align icons to the right */}
            <button
               onClick={() => onEdit(id)} // Pass ID to onEdit
               className="p-1 text-blue-500 transition-colors rounded-full hover:bg-blue-100"
               title="Edit transaction">
               <Pencil size={18} />{" "}
               {/* Increased size for better clickability */}
            </button>
            <button
               onClick={() => onDelete(id)} // Pass ID to onDelete
               className="p-1 text-red-500 transition-colors rounded-full hover:bg-red-100"
               title="Delete transaction">
               <Trash size={18} />{" "}
               {/* Increased size for better clickability */}
            </button>
         </div>
      </div>
   );
}

function ExpenseIncomeAddForm({onClose, onSubmit, initialData, isEditMode}) {
   const {categories} = useExpenseContext();
   const [date, setDate] = useState(
      initialData?.date || new Date().toISOString().split("T")[0]
   );
   const [amount, setAmount] = useState(initialData?.amount || "");
   const [note, setNote] = useState(initialData?.note || "");
   const [category, setCategory] = useState(initialData?.category || ""); // This should be the official category
   const [searchTerm, setSearchTerm] = useState(initialData?.category || "");
   const [type, setType] = useState(initialData?.type || "expense");
   const [isDropdownVisible, setIsDropdownVisible] = useState(false);

   const {user} = useContext(AuthContext);

   const handleSubmit = (e) => {
      e.preventDefault();

      if (
         !type ||
         !category ||
         !amount ||
         isNaN(amount) ||
         Number(amount) <= 0
      ) {
         toast.error(
            "Please fill in all required fields with a valid, positive amount."
         );
         return;
      }

      const formData = {
         type,
         category,
         date,
         amount: parseFloat(amount),
         note,
         createdAt: initialData?.createdAt || Timestamp.now(), // Preserve original createdAt if editing
      };

      onSubmit(formData, initialData?.id); // Pass id if editing
   };

   const allCategories = Object.entries(categories).flatMap(
      ([typeKey, items]) =>
         items.map((item) => ({type: typeKey, name: item.name}))
   );

   const handleCategorySelect = (selectedCat) => {
      setCategory(selectedCat.name);
      setType(selectedCat.type); // this will still work fine
      setSearchTerm(selectedCat.name);
      setIsDropdownVisible(false);
   };
   const filteredCategories = allCategories.filter(
      (cat) =>
         cat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
         cat.type === type
   );

   // useEffect(() => {
   //    setSearchTerm("");
   // }, [type]);

   return (
      <div
         className="fixed inset-0 z-[999] flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm"
         onClick={onClose}>
         <form
            onClick={(e) => e.stopPropagation()}
            className="p-6 bg-white md:rounded-lg rounded-none shadow-xl md:h-auto h-full md:w-[500px] w-full space-y-6 overflow-y-auto"
            onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
               <h2 className="text-2xl font-bold text-gray-800">
                  {isEditMode ? "Edit Transaction" : "New Transaction"}
               </h2>
               <button
                  type="button"
                  className="text-gray-500 hover:text-gray-800"
                  onClick={onClose}>
                  <X size={24} /> {/* Lucide X icon */}
               </button>
            </div>

            <div className="flex items-center justify-center gap-4">
               <button
                  type="button"
                  onClick={() => setType("expense")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                     type === "expense"
                        ? "bg-red-100 text-red-700 border-red-300"
                        : "text-gray-600 border-gray-300 hover:bg-red-50"
                  }`}>
                  Expense
               </button>
               <button
                  type="button"
                  onClick={() => setType("income")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                     type === "income"
                        ? "bg-green-100 text-green-700 border-green-300"
                        : "text-gray-600 border-gray-300 hover:bg-green-50"
                  }`}>
                  Income
               </button>
               <button
                  type="button"
                  onClick={() => setType("saving")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                     type === "saving"
                        ? "bg-blue-100 text-blue-700 border-blue-300"
                        : "text-gray-600 border-gray-300 hover:bg-blue-50"
                  }`}>
                  Saving
               </button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
               <div className="relative">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                     Category
                  </label>
                  <input
                     type="text"
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                     value={searchTerm}
                     onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsDropdownVisible(true);
                     }}
                     onFocus={() => setIsDropdownVisible(true)}
                     onBlur={() =>
                        setTimeout(() => setIsDropdownVisible(false), 1000)
                     }
                     placeholder={`Select a ${type} category`}
                  />
                  {isDropdownVisible && (
                     <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white rounded-md shadow-lg max-h-48">
                        {filteredCategories.length > 0 ? (
                           filteredCategories.map((cat, index) => (
                              <li
                                 key={index}
                                 className="p-2 cursor-pointer hover:bg-gray-100"
                                 onClick={() => handleCategorySelect(cat)}>
                                 <span>{cat.name}</span>
                              </li>
                           ))
                        ) : (
                           <li className="p-2 text-gray-500">
                              No categories found
                           </li>
                        )}
                     </ul>
                  )}
               </div>

               <div>
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                     Date
                  </label>
                  <input
                     type="date"
                     value={date}
                     onChange={(e) => setDate(e.target.value)}
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
               </div>
            </div>

            <div>
               <label className="block mb-1 text-sm font-medium text-gray-700">
                  Amount
               </label>
               <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 text-xl font-semibold text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
               />
            </div>

            <div>
               <label className="block mb-1 text-sm font-medium text-gray-700">
                  Note
               </label>
               <textarea
                  rows="2"
                  placeholder="Add a note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
            </div>

            <button
               type="submit"
               className="w-full py-3 font-medium text-white transition bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
               {isEditMode ? "Update Transaction" : "Add Transaction"}
            </button>
         </form>
      </div>
   );
}

// --- Main Workspace Component ---

function ExpenseWorkSpace() {
   const [showForm, setShowForm] = useState(false);
   const [filter, setFilter] = useState("all");
   const [error, setError] = useState(""); // Keeping this for general component errors
   const [editingTransaction, setEditingTransaction] = useState(null); // State to hold transaction being edited

   const {UID} = useContext(AuthContext);

   const {
      currency,
      transactions,
      totalIncome,
      totalExpense,
      totalSavings,
      totalBalance,
      setTransactions, // A way to update the state in context
   } = useExpenseContext();

   useEffect(() => {
      if (!UID) return;
      const userTransactionsRef = collection(
         firestore,
         "transactionDetails",
         UID,
         "transactions"
      );
      const q = query(userTransactionsRef, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(
         q,
         (snapshot) => {
            const fetchedTransactions = snapshot.docs.map((doc) => ({
               id: doc.id,
               ...doc.data(),
            }));
            setTransactions(fetchedTransactions);
            setError("");
         },
         (err) => {
            console.error("Error fetching transactions: ", err);
            setError("Failed to fetch transactions. Please try again.");
            toast.error("Failed to load transactions."); // Use toast for user feedback
         }
      );

      return () => unsubscribe();
   }, [UID, setTransactions]);

   const handleFormSubmit = async (formData, transactionId = null) => {
      if (!UID) {
         toast.error("You must be logged in to add/edit a transaction.");
         return;
      }

      const transactionCollectionRef = collection(
         firestore,
         "transactionDetails",
         UID,
         "transactions"
      );

      try {
         if (transactionId) {
            // Update existing document
            const transactionDocRef = doc(
               transactionCollectionRef,
               transactionId
            );
            await updateDoc(transactionDocRef, formData);
            toast.success("Transaction updated successfully!");
         } else {
            // Add new document
            await addDoc(transactionCollectionRef, formData);
            toast.success("Transaction added successfully!");
         }
         setShowForm(false);
         setEditingTransaction(null); // Clear editing state
      } catch (error) {
         console.error("Error saving transaction: ", error);
         toast.error(
            `Failed to ${
               transactionId ? "update" : "add"
            } transaction. Please check your Firestore security rules.`
         );
      }
   };

   const handleDeleteTransaction = async (id) => {
      if (!UID) {
         toast.error("You must be logged in to delete a transaction.");
         return;
      }
      if (
         !window.confirm("Are you sure you want to delete this transaction?")
      ) {
         return;
      }

      try {
         const transactionDocRef = doc(
            firestore,
            "transactionDetails",
            UID,
            "transactions",
            id
         );
         await deleteDoc(transactionDocRef);
         toast.success("Transaction deleted successfully!");
      } catch (error) {
         console.error("Error deleting transaction: ", error);
         toast.error("Failed to delete transaction. Please try again.");
      }
   };

   const handleEditClick = (id) => {
      const transactionToEdit = transactions.find((t) => t.id === id);
      if (transactionToEdit) {
         setEditingTransaction(transactionToEdit);
         setShowForm(true);
      } else {
         toast.error("Transaction not found for editing.");
      }
   };

   const filteredTransactions = transactions.filter((transaction) => {
      if (filter === "all") return true;
      return transaction.type === filter;
   });

   return (
      <section className="flex flex-col items-center w-full min-h-screen p-4 text-black bg-gray-100 md:p-6">
         {/* General component error display (less critical, for development mostly) */}
         {error && (
            <div
               className="fixed top-5 left-1/2 -translate-x-1/2 z-[1000] bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg"
               role="alert">
               <span className="block sm:inline">{error}</span>
            </div>
         )}

         <div className="flex flex-col w-full h-full max-w-4xl gap-6">
            {/* --- Summary Cards Section --- */}
            <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
               <div className="flex flex-col w-full gap-4 px-5 py-6 text-xl font-semibold text-gray-800 rounded-lg shadow-lg bg-gradient-to-r from-blue-100 to-purple-100">
                  <div className="flex flex-wrap items-center justify-between w-full">
                     <h1 className="mb-2 text-3xl font-extrabold text-gray-700">
                        Total Balance
                     </h1>
                     <p className="text-3xl font-bold text-gray-900">
                        {currency} {totalBalance.toFixed(2)}
                     </p>
                  </div>
                  <div className="text-lg italic font-medium text-left text-purple-600 sm:text-center">
                     Keep tracking your finances. You're on the right path! 🌟
                  </div>
               </div>

               <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 text-green-800 bg-green-100 rounded-lg shadow-md">
                     <p className="text-sm font-semibold">Income</p>
                     <p className="text-2xl font-bold">
                        {currency} {totalIncome.toFixed(2)}
                     </p>
                  </div>
                  <div className="p-4 text-red-800 bg-red-100 rounded-lg shadow-md">
                     <p className="text-sm font-semibold">Expenses</p>
                     <p className="text-2xl font-bold">
                        {currency} {totalExpense.toFixed(2)}
                     </p>
                  </div>
                  <div className="p-4 text-blue-800 bg-blue-100 rounded-lg shadow-md">
                     <p className="text-sm font-semibold">Savings</p>
                     <p className="text-2xl font-bold">
                        {currency} {totalSavings.toFixed(2)}
                     </p>
                  </div>
               </div>
            </div>

            {/* --- Transactions List Section --- */}
            <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg">
               <div className="flex flex-wrap items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-700">
                     Recent Transactions
                  </h2>
                  <select
                     value={filter}
                     onChange={(e) => setFilter(e.target.value)}
                     className="px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md md:mt-0 focus:outline-none focus:ring-2 focus:ring-blue-400">
                     <option value="all">All Transactions</option>
                     <option value="income">Income</option>
                     <option value="expense">Expense</option>
                     <option value="saving">Savings</option>
                  </select>
               </div>

               {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction) => (
                     <Card
                        key={transaction.id}
                        id={transaction.id} // Pass the ID
                        type={transaction.type.toUpperCase()}
                        currency={currency}
                        amount={transaction.amount}
                        date={transaction.date}
                        category={transaction.category}
                        note={transaction.note}
                        onEdit={handleEditClick} // Pass the edit handler
                        onDelete={handleDeleteTransaction} // Pass the delete handler
                     />
                  ))
               ) : (
                  <p className="py-8 text-center text-gray-500">
                     No transactions yet. Click the '+' button to add one!
                  </p>
               )}
            </div>
         </div>
         <div className="mb-20"></div>
         {/* --- Floating Action Button --- */}
         <button
            title="New Transaction"
            onClick={() => {
               setEditingTransaction(null); // Ensure no transaction is in edit mode when opening for new
               setShowForm(true);
            }}
            className="fixed flex items-center justify-center text-white transition-transform transform bg-green-500 rounded-full shadow-lg right-6 top-6 hover:bg-green-600 w-14 h-14 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               className="w-6 h-6"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor">
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
               />
            </svg>
         </button>

         {showForm && (
            <ExpenseIncomeAddForm
               onClose={() => {
                  setShowForm(false);
                  setEditingTransaction(null); // Clear editing state when form closes
               }}
               onSubmit={handleFormSubmit}
               initialData={editingTransaction} // Pass data if editing
               isEditMode={!!editingTransaction} // Determine if in edit mode
            />
         )}
      </section>
   );
}

export default ExpenseWorkSpace;
