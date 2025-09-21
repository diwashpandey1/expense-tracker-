import React from "react";
import {Edit, Trash2} from "lucide-react";

function GoalCard({
   targetDate,
   currency,
   goalName,
   goalAmount,
   targetAmount,
   goalDisc,
   onEdit,
   onDelete,
   goalsLengthCount,
   currentIndex,
}) {
   const saved = Number(goalAmount) || 0;
   const target = Number(targetAmount) || 0;

   // Calculate progress safely
   const progressPercentage =
      target > 0 ? Math.min((saved / target) * 100, 100).toFixed(2) : 0;

   return (
      <div
         className={`flex flex-col w-full gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-md ${
            goalsLengthCount - 1 === currentIndex ? "mb-10" : ""
         }`}>
         {/* Goal Name and Target Date + Action Buttons */}
         <div className="flex items-center justify-between">
            <div>
               <h2 className="text-lg font-semibold text-gray-700">
                  {goalName || "Unnamed Goal"}
               </h2>
               <span className="text-sm text-gray-500">
                  {targetDate || "No date set"}
               </span>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
               <button
                  onClick={onEdit}
                  className="p-2 text-blue-600 rounded hover:bg-blue-100">
                  <Edit size={18} />
               </button>
               <button
                  onClick={onDelete}
                  className="p-2 text-red-600 rounded hover:bg-red-100">
                  <Trash2 size={18} />
               </button>
            </div>
         </div>

         {/* Goal Progress */}
         <div>
            <div className="flex justify-between mb-1 text-sm text-gray-600">
               <span>Progress</span>
               <span>{progressPercentage}%</span>
            </div>
            <div className="relative w-full h-2 overflow-hidden bg-gray-200 rounded-full">
               <div
                  className="absolute top-0 left-0 h-full bg-green-500"
                  style={{width: `${progressPercentage}%`}}></div>
            </div>
         </div>

         {/* Amounts */}
         <div className="flex justify-between text-sm text-gray-600">
            <div>
               <span className="block font-medium text-gray-700">Saved:</span>
               <span className="font-bold text-green-500">
                  {currency}
                  {saved.toFixed(2)}
               </span>
            </div>
            <div>
               <span className="block font-medium text-gray-700">Target:</span>
               <span className="font-bold text-gray-700">
                  {currency}
                  {target.toFixed(2)}
               </span>
            </div>
         </div>

         {/* Description */}
         {goalDisc && (
            <div className="text-sm italic text-gray-600">
               <p>"{goalDisc}"</p>
            </div>
         )}
      </div>
   );
}

export default GoalCard;
