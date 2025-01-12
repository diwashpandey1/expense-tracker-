import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useExpenseContext} from "./ExpenseContext";
import {
   faArrowAltCircleUp,
   faArrowAltCircleDown,
   faSearch,
   faPlus,
} from "@fortawesome/free-solid-svg-icons";
import React, {useState, useEffect} from "react";

function ExpenseIncomeAddForm({onClose, onSubmit}) {
   const {expenseCategories, setExpenseCategories} = useExpenseContext();
   const [type, setType] = useState("expense");
   const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
   const [amount, setAmount] = useState("");
   const [note, setNote] = useState("");
   const [category, setCategory] = useState(""); // Added missing category state

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!category || !amount || isNaN(amount)) {
         alert("Please fill in all required fields correctly.");
         return;
      }
      const formData = {type, category, date, amount, note};
      onSubmit(formData);
      onClose();
   };

   return (
      <div
         className="w-full h-full flex justify-center items-center"
         onClick={onClose}>
         <form
            onClick={(e) => e.stopPropagation()}
            className="p-6 bg-white rounded-lg shadow-lg md:h-auto h-full md:w-auto w-full space-y-6"
            onSubmit={handleSubmit}>
            <div className="flex justify-between items-center">
               <h2 className="text-xl font-bold">New Transaction</h2>
               <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={onClose}>
                  Close
               </button>
            </div>

            {/* Income/Expense Toggle */}
            <div className="flex items-center justify-center gap-4">
               <button
                  type="button"
                  onClick={() => setType("expense")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                     type === "expense"
                        ? "bg-red-100 text-red-600 border-red-300"
                        : "text-gray-600 border-gray-300"
                  }`}>
                  Expense
               </button>
               <button
                  type="button"
                  onClick={() => setType("income")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                     type === "income"
                        ? "bg-blue-100 text-blue-600 border-blue-300"
                        : "text-gray-600 border-gray-300"
                  }`}>
                  Income
               </button>
            </div>

            {/* Category and Date */}
            <div className="grid md:grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium mb-1">
                     Category
                  </label>
                  <select
                     id="category-select"
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
                     <option value="">--Please choose an option--</option>
                     {expenseCategories.map((expense, index) => (
                        <option key={index} value={expense.category}>
                           {expense.category}
                        </option>
                     ))}
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium mb-1">
                     Transaction Date
                  </label>
                  <input
                     type="date"
                     value={date}
                     onChange={(e) => setDate(e.target.value)}
                     className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
               </div>
            </div>

            {/* Amount Input */}
            <div>
               <label className="block text-sm font-medium mb-1">Amount</label>
               <input
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full text-center px-4 py-2 border rounded-md text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-300"
               />
            </div>

            {/* Note Input */}
            <div>
               <label className="block text-sm font-medium mb-1">
                  Add a note
               </label>
               <textarea
                  rows="2"
                  placeholder="Add a note..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"></textarea>
            </div>

            {/* Submit Button */}
            <button
               type="submit"
               className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition">
               Add {type}
            </button>
         </form>
      </div>
   );
}

// ExpenseWorkSpace

function ExpenseWorkSpace() {
   const [showForm, setShowForm] = useState(false);
   const [transactions, setTransactions] = useState([]);
   const {currency, totalBalance, setTotalBalance} = useExpenseContext();

   const toggleForm = () => setShowForm(!showForm);

   const handleFormSubmit = (formData) => {
      setTransactions([...transactions, formData]);
   };

   useEffect(() => {
      const totalIncome = transactions
         .filter((t) => t.type === "income")
         .reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);

      setTotalBalance(totalIncome); // Update the state
   }, [transactions]); 

   return (
      <>
         <section className="w-full min-h-[90vh] h-auto bg-gray-50 text-black p-6 overflow-y-scroll relative flex flex-col items-center">
            <div className="flex flex-col gap-6 h-full w-[99%] md:w-[60%]">
               {/* Upper Section */}
               <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4">
                  {/* Search Bar and Date Selector */}
                  <div className="flex flex-col-reverse justify-center items-start gap-5 md:gap-0 md:flex-row md:justify-between md:items-center">
                     <div className="flex items-center w-auto">
                        <input
                           type="text"
                           placeholder="Search..."
                           className="w-[100%] md:w-auto px-4 py-2 border border-gray-300 rounded-tl-[10px] rounded-bl-[10px] shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-tr-[10px] rounded-br-[10px] shadow-md hover:bg-blue-600">
                           <FontAwesomeIcon icon={faSearch} />
                        </button>
                     </div>
                     <select
                        name="date"
                        id="date"
                        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none">
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="year">This Year</option>
                     </select>
                  </div>

                  {/* Financial Summary */}
                  <div className="grid md:grid-cols-3 gap-4 items-center">
                     <div className="bg-green-100 text-green-700 rounded-lg p-4 shadow-md">
                        <p className="text-sm font-semibold">Earning</p>
                        <p className="text-lg font-bold">
                           {currency + " "}
                           {transactions
                              .filter((t) => t.type === "income")
                              .reduce(
                                 (sum, t) => sum + parseFloat(t.amount || 0),
                                 0
                              )}
                        </p>
                     </div>
                     <div className="bg-red-100 text-red-700 rounded-lg p-4 shadow-md">
                        <p className="text-sm font-semibold">Expenses</p>
                        <p className="text-lg font-bold">
                           {currency + " "}
                           {transactions
                              .filter((t) => t.type === "expense")
                              .reduce(
                                 (sum, t) => sum + parseFloat(t.amount || 0),
                                 0
                              )}
                        </p>
                     </div>
                     <div className="bg-gray-100 text-gray-700 rounded-lg p-4 shadow-md">
                        <p className="text-sm font-semibold">Total</p>
                        <p className="text-lg font-bold">
                           {currency + " "}
                           {totalBalance}
                        </p>
                     </div>
                  </div>
               </div>

               {/* Lower Section */}
               <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col gap-6">
                  <div className="flex justify-center gap-8">
                     <button className="px-6 py-2 rounded-lg text-blue-600 font-semibold hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Daily
                     </button>
                     <button className="px-6 py-2 rounded-lg text-gray-600 font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500">
                        Recurring
                     </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                     {/* Income Section */}
                     <div>
                        <span className="flex gap-2 justify-center items-center mb-5 text-green-400">
                           <FontAwesomeIcon icon={faArrowAltCircleUp} />
                           &nbsp; Income
                        </span>
                        {transactions.filter((t) => t.type === "income")
                           .length > 0 ? (
                           transactions
                              .filter(
                                 (transaction) => transaction.type === "income"
                              )
                              .map((transaction, index) => (
                                 <div
                                    key={index}
                                    className="p-4 rounded-lg shadow-md bg-green-100 text-green-700">
                                    <p>
                                       <strong>
                                          {transaction.type.toUpperCase()}
                                       </strong>
                                       : {currency + " "}
                                       {transaction.amount} (
                                       {transaction.category})
                                    </p>
                                    <p>Date: {transaction.date}</p>
                                    <p>Note: {transaction.note}</p>
                                 </div>
                              ))
                        ) : (
                           <p className="text-center text-gray-500">
                              No transactions yet
                           </p>
                        )}
                     </div>

                     {/* Expenses Section */}
                     <div>
                        <span className="flex gap-2 justify-center items-center mb-5 text-red-400">
                           <FontAwesomeIcon icon={faArrowAltCircleDown} />
                           &nbsp; Expenses
                        </span>
                        {transactions.filter((t) => t.type === "expense")
                           .length > 0 ? (
                           transactions
                              .filter(
                                 (transaction) => transaction.type === "expense"
                              )
                              .map((transaction, index) => (
                                 <div
                                    key={index}
                                    className="p-4 rounded-lg shadow-md bg-red-100 text-red-700">
                                    <p>
                                       <strong>
                                          {transaction.type.toUpperCase()}
                                       </strong>
                                       : {currency + " "}
                                       {transaction.amount} (
                                       {transaction.category})
                                    </p>
                                    <p>Date: {transaction.date}</p>
                                    <p>Note: {transaction.note}</p>
                                 </div>
                              ))
                        ) : (
                           <p className="text-center text-gray-500">
                              No transactions yet
                           </p>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            <button
               title="new transaction"
               onClick={toggleForm}
               className="fixed right-[5%] top-[80%] md:right-6 md:top-6 bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
               <FontAwesomeIcon icon={faPlus} className="text-xl" />
            </button>

            {showForm && (
               <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <ExpenseIncomeAddForm
                     onClose={toggleForm}
                     onSubmit={handleFormSubmit}
                  />
               </div>
            )}
            <div className="w-full h-[20vh] mt-5"></div>
         </section>
      </>
   );
}

export default ExpenseWorkSpace;
