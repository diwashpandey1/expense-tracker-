import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import { useExpenseContext } from "./ExpenseContext";
import { faBullseye, faPiggyBank, faWallet,faPlus, faClose } from "@fortawesome/free-solid-svg-icons";


function GoalForm() {
   const [isFormVisible, setIsFormVisible] = useState(false);
   const [remainingChar, setRemainingChar] = useState(50);

   const handleRemainingCharacters = (event) => {
    setRemainingChar((event.target.maxLength)-(event.target.value.length))
   }

   const toggleForm = () => {
      setIsFormVisible(!isFormVisible);
      document.body.style.overflow = isFormVisible ? "auto" : "hidden"; // Lock scroll
   };

   return (
      <>
         {/* Floating Button */}
         <button title="Add Goals"
            onClick={toggleForm}
            className="absolute top-6 right-6 bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
            <FontAwesomeIcon icon={faPlus} className="text-xl" />
         </button>

         {/* Popup Form */}
         {isFormVisible && (
            <div
               className="fixed inset-0 z-[999] flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-[2px]"
               onClick={toggleForm}>
               <div
                  className="bg-white w-[90%] max-w-lg p-6 rounded-lg shadow-md relative"
                  onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
               >
                  {/* Close Button */}
                  <button
                     className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                     onClick={toggleForm}>
                     <FontAwesomeIcon icon={faClose} className="text-xl" />
                  </button>

                  <h2 className="text-xl font-bold text-center mb-4">
                     Add a New Goal
                  </h2>
                  <form>
                     <div className="flex justify-around">
                        {/* Target Date */}
                        <div className="mb-4">
                           <label
                              htmlFor="targetDate"
                              className="block text-sm font-medium text-gray-700 mb-1">
                              Target Date
                           </label>
                           <input
                              type="date"
                              id="targetDate"
                              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                           />
                        </div>

                        {/* Goal Name */}
                        <div className="mb-4">
                           <label
                              htmlFor="goalName"
                              className="block text-sm font-medium text-gray-700 mb-1">
                              Goal Name
                           </label>
                           <input
                              type="text"
                              id="goalName"
                              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                              placeholder="Enter goal name"
                           />
                        </div>
                     </div>
                     <div className="flex justify-around">
                        {/* Goal Amount */}
                        <div className="mb-4">
                           <label
                              htmlFor="goalAmount"
                              className="block text-sm font-medium text-gray-700 mb-1">
                              Goal Amount
                           </label>
                           <input
                              type="number"
                              id="goalAmount"
                              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                              placeholder="Enter goal amount"
                           />
                        </div>
                        {/* Target Amount */}
                        <div className="mb-4">
                           <label
                              htmlFor="targetAmount"
                              className="block text-sm font-medium text-gray-700 mb-1">
                              Goal Amount
                           </label>
                           <input
                              type="number"
                              id="targetAmount"
                              className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                              placeholder="Enter target amount"
                           />
                        </div>
                     </div>

                     {/* Description */}
                     <div className="mb-4">
                        <label
                           htmlFor="description"
                           className="block text-sm font-medium text-gray-700 mb-1">
                           Description
                        </label>
                        <textarea onChange={handleRemainingCharacters}
                           id="description"
                           maxLength="50"
                           className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 resize-none"
                           placeholder="Enter a short description (max 50 characters)"></textarea>
                        <p className="text-sm text-gray-500 mt-1">
                           {remainingChar} characters remaining...
                        </p>
                     </div>

                     {/* Submit Button */}
                     <button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition">
                        Add Goal
                     </button>
                  </form>
               </div>
            </div>
         )};
      </>
   );
}


function ExpenseGoals() {

  const {totalBalance, currency} = useExpenseContext();

  return (
    <>
      <GoalForm />
      <section className="w-full h-[90vh] flex flex-col gap-10 justify-start pt-10 pb-10 items-center bg-gray-100 -y-scroll">
        <div className="w-[97%] md:w-[50%] bg-white p-8 rounded-lg shadow-md flex flex-col gap-8">
          {/* Overview Section */}
          <div className="flex justify-between gap-6 flex-col md:flex-row">
            {/* Total Balance */}
            <div className="w-full md:w flex flex-col items-center bg-green-50 p-4 rounded-lg shadow-sm">
              <p className="text-sm text-gray-600">Total Balance</p>
              <FontAwesomeIcon icon={faWallet} className="text-green-500 text-2xl mt-2" />
              <span className="text-xl font-bold text-green-700 mt-2">{currency} {totalBalance}</span>
              <p className="text-sm text-gray-600">Total income across all</p>
            </div>

            {/* Total Saved */}
            <div className="flex w-full md:w flex-col items-center bg-blue-50 p-4 rounded-lg shadow-sm ">
              <span className="text-sm text-gray-600">Total Saved</span>
              <FontAwesomeIcon icon={faPiggyBank} className="text-blue-500 text-2xl mt-2" />
              <span className="text-xl font-bold text-blue-700 mt-2">$4,000</span>
              <p className="text-sm text-gray-600">30% of goal</p>
            </div>

            {/* Goals Target */}
            <div className="flex w-full md:w  flex-col items-center bg-yellow-50 p-4 rounded-lg shadow-sm">
              <span className="text-sm text-gray-600">Goals Target</span>
              <FontAwesomeIcon icon={faBullseye} className="text-yellow-500 text-2xl mt-2" />
              <span className="text-xl font-bold text-yellow-700 mt-2">$40,000</span>
              <p className="text-sm text-gray-600">Across 2 Goals</p>
            </div>
          </div>

          {/* Progress Bar Section */}
          <div>
            <div className="flex justify-between">
              <p className="text-gray-600 text-sm">Overall Progress</p>
              <p className="text-sm text-gray-500">30%</p>
            </div>
            <div className="relative w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-green-500" style={{ width: "30%" }}></div>
            </div>
          </div>
        </div>

        {/* Goal Sections */}
        <div className="w-[97%] md:w-[50%] min-h-[400px] h-auto flex flex-col gap-5">
          {/* Add your goal cards here */}
        </div>
      </section>
    </>
  );
}

export default ExpenseGoals;
