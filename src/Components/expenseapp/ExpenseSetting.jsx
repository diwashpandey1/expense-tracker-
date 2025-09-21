import React, { useState } from "react";
import { useExpenseContext } from "./ExpenseContext";
import Popup from "../smallComps/Popup.jsx";
import { auth } from "../../backend/Firebase.jsx";
import { GoogleAuthProvider, reauthenticateWithPopup, deleteUser, signOut } from "firebase/auth";

function ExpenseSetting() {
  const {
    currency,
    setCurrency,
    setMonthlyIncome,
    addCategory,
    setAddCategory,
    expenseCategories,
    setExpenseCategories,
  } = useExpenseContext();

  const [popupData, setPopupData] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const [reauthPassword, setReauthPassword] = useState(""); // For storing re-authentication password

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleSaveButton = () => {
    if (addCategory.trim() === "") return;
    if (expenseCategories.some((cat) => cat.category === addCategory)) {
      alert("Category already exists!");
      return;
    }
    setExpenseCategories([
      ...expenseCategories,
      { category: addCategory, total: 0 },
    ]);
    setAddCategory("");
  };

  const handleMonthlyIncomeChange = (e) => {
    const value = parseFloat(e.target.value);
    if (value < 0) {
      alert("Monthly income cannot be negative!");
      return;
    }
    setMonthlyIncome(value);
  };

  const handlePopupOpen = (title, message, onConfirm) => {
    setPopupData({
      isOpen: true,
      title,
      message,
      onConfirm,
    });
  };

  const handlePopupClose = () => {
    setPopupData({ isOpen: false, title: "", message: "", onConfirm: null });
  };

  const handleResetData = () => {
    console.log("Data has been reset.");
    handlePopupClose();
  };


const handleDeleteAccount = async () => {
   try {
      const provider = new GoogleAuthProvider();
      const user = auth.currentUser;

      if (!user) {
         console.error("No user is logged in.");
         return;
      }

      // Prompt the user to reauthenticate
      await reauthenticateWithPopup(user, provider);

      // After successful reauthentication, delete the user
      await deleteUser(user);

      alert("Your account has been deleted successfully.");
   } catch (error) {
      console.error("Error deleting account:", error.message);
      if (error.code === "auth/requires-recent-login") {
         alert("Please log in again to confirm your identity before deleting your account.");
      } 
   } finally {
      handlePopupClose();
   }
};


  const handleLogout = async () => {
    try {
      await signOut(auth); // This signs the user out
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  

  return (
    <section className="w-full min-h-[90vh] h-auto p-1 pb-10 md:p-6 bg-gray-100 flex justify-center">
      <div className="flex gap-10 flex-col w-[97%] md:w-[50%]">
        <div className="w-full bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">General Settings</h1>
          <hr className="mb-10" />

          <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
            <label
              htmlFor="currency"
              className="block text-sm font-medium text-gray-700"
            >
              <span>Currency ({currency})</span>
              <span className="block text-gray-500 text-sm">
                Select your preferred currency
              </span>
            </label>
            <select
              name="currency"
              id="currency"
              value={currency}
              onChange={handleCurrencyChange}
              className="block w-[15em] border-gray-300 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 p-2"
            >
              <option value="💰">Select Currency </option>
              <option value="रु">NPR - Nepali Rupee (रु)</option>
              <option value="$">USD - US Dollar ($)</option>
              <option value="€">EUR - Euro (€)</option>
              <option value="₹">INR - Indian Rupee (₹)</option>
              <option value="¥">JPY - Japanese Yen (¥)</option>
            </select>
          </div>

          <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
            <label
              htmlFor="monthlyIncome"
              className="block text-sm font-medium text-gray-700"
            >
              Monthly Income
            </label>
            <input
              type="number"
              id="monthlyIncome"
              onChange={handleMonthlyIncomeChange}
              placeholder="Enter your monthly income"
              className="block w-[15em] border-gray-300 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 p-2"
            />
          </div>

          <div className="mb-6 flex flex-col md:flex-row justify-between items-center">
            <label
              htmlFor="AddCategory"
              className="block text-sm font-medium text-gray-700"
            >
              Add Category
            </label>
            <input
              className="block w-[15em] border-gray-300 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 p-2"
              id="new-category"
              type="text"
              value={addCategory}
              onChange={(e) => setAddCategory(e.target.value)}
              placeholder="Enter category name"
            />
          </div>

          <button
            onClick={handleSaveButton}
            className="py-1 px-4 text-xl mt-5 bg-green-400 rounded-md text-white"
          >
            Save
          </button>
        </div>

        <div className="w-full bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-red-400">
            Account/Data Settings
          </h1>
          <hr className="mb-10" />
          <div className="flex gap-4 flex-col md:flex-row">
            <button
              onClick={() =>
                handlePopupOpen(
                  "Reset All Data",
                  "Are you sure you want to reset all data?",
                  handleResetData
                )
              }
              className="px-3 py-2 bg-red-100 hover:bg-red-400 hover:text-white transition-all  rounded-lg text-red-400 font-semibold shadow-sm"
            >
              Reset All Data
            </button>
            <button
              onClick={() =>
                handlePopupOpen(
                  "Delete Account",
                  "Enter your password to confirm deletion:",
                  handleDeleteAccount
                )
              }
              className="px-3 py-2 bg-red-100 hover:bg-red-400 hover:text-white transition-all rounded-lg text-red-400 font-semibold shadow-sm"
            >
              Delete Account
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-red-100 hover:bg-red-400 hover:text-white transition-all rounded-lg text-red-400 font-semibold shadow-sm"
            >
              Log Out
            </button>
          </div>
          <p className="my-2 text-sm text-gray-500">
            Once data is reset or account is deleted, there is no way to
            recover.
          </p>
        </div>
        <div className="w-full h-[10vh]"></div>
      </div>

      {/* Popup Component */}
      <Popup
        title={popupData.title}
        message={popupData.message}
        clickedOkey={popupData.onConfirm}
        isPopUpOpen={popupData.isOpen}
        setIsPopUpOpen={() => setPopupData({ ...popupData, isOpen: false })}
      />
    </section>
  );
}

export default ExpenseSetting;
