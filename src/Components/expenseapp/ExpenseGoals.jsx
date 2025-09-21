import React, { useState, useContext, useEffect } from "react";
import { useExpenseContext } from "./ExpenseContext";
import GoalCard from "./GoalCard";
import { Target, PiggyBank, Wallet, Plus, X } from "lucide-react";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "../../backend/Firebase";
import { AuthContext } from "../../backend/AuthContext";
import { toast } from "react-hot-toast";

// --- Goal Form ---
function GoalForm({ onSubmit, initialData, onClose }) {
  const [targetDate, setTargetDate] = useState(initialData?.targetDate || "");
  const [goalName, setGoalName] = useState(initialData?.goalName || "");
  const [goalAmount, setGoalAmount] = useState(initialData?.goalAmount || "");
  const [targetAmount, setTargetAmount] = useState(initialData?.targetAmount || "");
  const [goalDisc, setGoalDisc] = useState(initialData?.goalDisc || "");
  const [remainingChar, setRemainingChar] = useState(
    50 - (initialData?.goalDisc?.length || 0)
  );

  const isEditMode = !!initialData;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validations
    if (!targetDate) return toast.error("Target Date is required.");
    if (!goalName) return toast.error("Goal Name is required.");
    if (goalAmount === "" || isNaN(goalAmount) || Number(goalAmount) < 0)
      return toast.error("Currently Saved must be >= 0.");
    if (!targetAmount || isNaN(targetAmount) || Number(targetAmount) <= 0)
      return toast.error("Target Amount must be > 0.");
    if (Number(goalAmount) > Number(targetAmount))
      return toast.error("Saved cannot exceed Target.");
    if (!goalDisc) return toast.error("Description is required.");

    const goalFormData = {
      targetDate,
      goalName,
      goalAmount: Number(goalAmount),
      targetAmount: Number(targetAmount),
      goalDisc,
      createdAt: initialData?.createdAt || serverTimestamp(),
    };

    onSubmit(goalFormData, initialData?.id);
  };

  const handleRemainingCharacters = (event) => {
    setGoalDisc(event.target.value);
    setRemainingChar(event.target.maxLength - event.target.value.length);
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-[90%] max-w-lg p-6 rounded-lg shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute text-gray-600 top-3 right-3 hover:text-gray-800"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2 className="mb-4 text-xl font-bold text-center">
          {isEditMode ? "Edit Goal" : "Add a New Goal"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Goal Name
            </label>
            <input
              type="text"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-300"
              placeholder="e.g., New Laptop"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Target Date
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Currently Saved
            </label>
            <input
              type="number"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-300"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Target Amount
            </label>
            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-300"
              placeholder="1000.00"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              maxLength="50"
              value={goalDisc}
              onChange={handleRemainingCharacters}
              className="w-full px-3 py-2 border rounded-lg resize-none focus:ring-2 focus:ring-green-300"
              placeholder="A short note about this goal..."
            />
            <p className="mt-1 text-sm text-right text-gray-500">
              {remainingChar} characters remaining
            </p>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 md:col-span-2"
          >
            {isEditMode ? "Update Goal" : "Add Goal"}
          </button>
        </form>
      </div>
    </div>
  );
}

// --- Main ExpenseGoals ---
function ExpenseGoals() {
  const [goals, setGoals] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const { totalBalance, currency } = useExpenseContext();
  const { UID } = useContext(AuthContext);

  // --- Fetch goals ---
  useEffect(() => {
    if (!UID) return;
    const goalsRef = collection(firestore, "goals", UID, "userGoals");
    const q = query(goalsRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedGoals = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGoals(fetchedGoals);
    });
    return unsubscribe;
  }, [UID]);

  // --- Summary ---
  const totalSaved = goals.reduce((sum, g) => sum + Number(g.goalAmount || 0), 0);
  const totalTarget = goals.reduce((sum, g) => sum + Number(g.targetAmount || 0), 0);
  const overallProgress =
    totalTarget > 0 ? ((totalSaved / totalTarget) * 100).toFixed(1) : 0;

  // --- Handlers ---
  const handleAddClick = () => {
    setEditingGoal(null);
    setIsFormVisible(true);
  };

  const handleGoalFormSubmit = async (goalData, goalId = null) => {
    if (!UID) return toast.error("You must be logged in.");
    try {
      const goalsRef = collection(firestore, "goals", UID, "userGoals");
      if (goalId) {
        await updateDoc(doc(goalsRef, goalId), goalData);
        toast.success("Goal updated!");
      } else {
        await addDoc(goalsRef, goalData);
        toast.success("Goal added!");
      }
      setIsFormVisible(false);
      setEditingGoal(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save goal.");
    }
  };

  const handleDeleteGoal = async (goalId) => {
    if (!window.confirm("Are you sure you want to delete this goal?")) return;
    try {
      await deleteDoc(doc(firestore, "goals", UID, "userGoals", goalId));
      toast.success("Goal deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete goal.");
    }
  };

  return (
    <section className="relative w-full h-screen">
      <div className="flex flex-col items-center w-full h-full gap-8 pt-24 pb-10 overflow-y-scroll bg-gray-100">
        {/* Summary Section */}
        <div className="w-[97%] md:w-3/5 lg:w-1/2 bg-white p-6 rounded-lg shadow-lg flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center p-4 text-center rounded-lg bg-green-50">
              <Wallet className="mb-2 text-green-500" />
              <span className="text-sm font-semibold text-gray-600">Balance</span>
              <span className="text-xl font-bold text-green-700">
                {currency}{totalBalance.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col items-center p-4 text-center rounded-lg bg-blue-50">
              <PiggyBank className="mb-2 text-blue-500" />
              <span className="text-sm font-semibold text-gray-600">Saved</span>
              <span className="text-xl font-bold text-blue-700">
                {currency}{totalSaved.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col items-center p-4 text-center rounded-lg bg-yellow-50">
              <Target className="mb-2 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-600">Target</span>
              <span className="text-xl font-bold text-yellow-700">
                {currency}{totalTarget.toFixed(2)}
              </span>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1 text-sm font-semibold text-gray-600">
              <span>Overall Progress</span>
              <span>{overallProgress}%</span>
            </div>
            <div className="relative w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full transition-all duration-500 bg-green-500"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Goals List */}
        <div className="w-[97%] md:w-3/5 lg:w-1/2 bg-gray-200 p-4 rounded-lg flex flex-col gap-5 items-center">
          {goals.length > 0 ? (
            goals.map((goal) => (
              <GoalCard
                key={goal.id}
                {...goal} // ✅ spread props for GoalCard
                currency={currency}
                onEdit={() => {
                  setEditingGoal(goal);
                  setIsFormVisible(true);
                }}
                onDelete={() => handleDeleteGoal(goal.id)}
                goalsLengthCount={goals.length}
                currentIndex={goals.indexOf(goal)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-10 text-center bg-white rounded-lg shadow-md">
              <Target size={48} className="mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-700">No Goals Yet</h3>
              <p className="text-gray-500">Click '+' to add your first goal.</p>
            </div>
          )}
        </div>
      </div>
      {/* Floating Add Button */}
      <button
        onClick={handleAddClick}
        className="absolute flex items-center justify-center text-white transition-transform bg-green-500 rounded-full shadow-lg top-6 right-6 w-14 h-14 hover:bg-green-600 hover:scale-110"
      >
        <Plus size={28} />
      </button>

      {isFormVisible && (
        <GoalForm
          onSubmit={handleGoalFormSubmit}
          initialData={editingGoal}
          onClose={() => {
            setIsFormVisible(false);
            setEditingGoal(null);
          }}
        />
      )}
    </section>
  );
}

export default ExpenseGoals;
