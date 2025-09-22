import React, { useState } from "react";
import { useExpenseContext } from "./ExpenseContext";
import {
  reauthenticateWithPopup,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
  signOut,
} from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore, googleProvider, auth, storage } from "../../backend/Firebase.jsx";
import { ref, deleteObject } from "firebase/storage";
import toast from "react-hot-toast";

function ExpenseSetting() {
  const { currency, setCurrency } = useExpenseContext();

  // Popup state
  const [popup, setPopup] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    requirePassword: false,
  });
  const [passwordInput, setPasswordInput] = useState("");

  const openPopup = (title, message, onConfirm, requirePassword = false) => {
    setPasswordInput("");
    setPopup({ isOpen: true, title, message, onConfirm, requirePassword });
  };

  const closePopup = () =>
    setPopup({ isOpen: false, title: "", message: "", onConfirm: null, requirePassword: false });

  // Delete Firestore data
  const deleteUserData = async (uid) => {
    try {
      // Delete transactions
      const txRef = collection(firestore, "transactionDetails", uid, "transactions");
      const txSnap = await getDocs(txRef);
      await Promise.all(txSnap.docs.map((d) => deleteDoc(doc(txRef, d.id))));

      // Delete goals
      const goalsRef = collection(firestore, "goals", uid, "userGoals");
      const goalsSnap = await getDocs(goalsRef);
      await Promise.all(goalsSnap.docs.map((d) => deleteDoc(doc(goalsRef, d.id))));
    } catch (err) {
      console.error("Error deleting Firestore data:", err);
    }
  };

  // Delete Storage data
  const deleteUserStorage = async (uid) => {
    try {
      const profilePicRef = ref(storage, `profilePictures/${uid}.jpg`); // adjust path if needed
      await deleteObject(profilePicRef);
    } catch (err) {
      if (err.code !== "storage/object-not-found") {
        console.error("Error deleting profile picture:", err);
      }
    }
  };

  // Final delete account handler
  const handleDeleteAccount = async (passwordInput = null) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      // Step 1: Reauthenticate
      if (user.providerData[0]?.providerId === "password") {
        if (!passwordInput) {
          toast.error("Please enter your password to confirm deletion.");
          return;
        }
        const credential = EmailAuthProvider.credential(user.email, passwordInput);
        await reauthenticateWithCredential(user, credential);
      } else {
        await reauthenticateWithPopup(user, googleProvider);
      }

      // Step 2: Delete Firestore + Storage
      await deleteUserData(user.uid);
      await deleteUserStorage(user.uid);

      // Step 3: Delete Auth account
      await deleteUser(user);

      toast.success("Your account and all associated data have been permanently deleted.");
    } catch (err) {
      if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password. Try again.");
      } else if (err.code === "auth/requires-recent-login") {
        toast.error("Please log in again to confirm your identity.");
      } else {
        console.error("Delete account error:", err);
        toast.error("Failed to delete account. Try again.");
      }
    } finally {
      closePopup();
    }
  };

  // Reset all data (delete Firestore transactions + goals)
  const handleResetData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const transactionsRef = collection(firestore, "transactionDetails", user.uid, "transactions");
      const goalsRef = collection(firestore, "goals", user.uid, "userGoals");

      const transactionsSnapshot = await getDocs(transactionsRef);
      const goalsSnapshot = await getDocs(goalsRef);

      const deleteTransactions = transactionsSnapshot.docs.map((docSnap) =>
        deleteDoc(doc(transactionsRef, docSnap.id))
      );
      const deleteGoals = goalsSnapshot.docs.map((docSnap) => deleteDoc(doc(goalsRef, docSnap.id)));

      await Promise.all([...deleteTransactions, ...deleteGoals]);

      toast.success("All data has been reset.");
    } catch (err) {
      console.error("Error resetting data:", err);
      toast.error("Failed to reset data.");
    } finally {
      closePopup();
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      closePopup();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="w-full min-h-[90vh] p-6 flex justify-center bg-gray-100">
      <div className="flex flex-col gap-6 w-[97%] md:w-[50%]">
        {/* General Settings */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">General Settings</h1>
          <hr className="mb-6 border-gray-300" />

          {/* Currency */}
          <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
            <label className="text-gray-700">Currency ({currency})</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-[15em] p-2 rounded-md border border-gray-300 bg-white text-gray-800"
            >
              <option value="💰">Select Currency</option>
              <option value="रु">NPR - Nepali Rupee (रु)</option>
              <option value="$">USD - US Dollar ($)</option>
              <option value="€">EUR - Euro (€)</option>
              <option value="₹">INR - Indian Rupee (₹)</option>
              <option value="¥">JPY - Japanese Yen (¥)</option>
            </select>
          </div>
        </div>

        {/* Account Settings */}
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <h1 className="mb-6 text-2xl font-bold text-red-400">Account Settings</h1>
          <hr className="mb-6 border-gray-300" />
          <div className="flex flex-col gap-4 md:flex-row">
            <button
              onClick={() =>
                openPopup(
                  "Delete Account",
                  "This will permanently delete your account. Enter your password if required.",
                  handleDeleteAccount,
                  auth.currentUser?.providerData[0]?.providerId === "password"
                )
              }
              className="px-3 py-2 font-semibold text-red-400 bg-red-100 rounded-lg hover:bg-red-400 hover:text-white"
            >
              Delete Account
            </button>
            <button
              onClick={() =>
                openPopup(
                  "Reset All Data",
                  "Are you sure you want to reset all your transactions?",
                  handleResetData
                )
              }
              className="px-3 py-2 font-semibold text-red-400 bg-red-100 rounded-lg hover:bg-red-400 hover:text-white"
            >
              Reset All Data
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-2 font-semibold text-red-400 bg-red-100 rounded-lg hover:bg-red-400 hover:text-white"
            >
              Log Out
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Deleting your account or resetting data is irreversible. Logout will end your session.
          </p>
        </div>
      </div>

      {/* Inline Popup */}
      {popup.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="p-6 bg-white rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="mb-4 text-xl font-bold text-gray-800">{popup.title}</h2>
            <p className="mb-6 text-gray-600">{popup.message}</p>

            {popup.requirePassword && (
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              />
            )}

            <div className="flex justify-end gap-4">
              <button
                onClick={closePopup}
                className="px-4 py-2 transition-colors bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => popup.onConfirm(passwordInput)}
                className="px-4 py-2 text-white transition-colors bg-red-400 rounded-lg hover:bg-red-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default ExpenseSetting;
