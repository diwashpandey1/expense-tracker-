import React from "react";

function Card({ type, currency, amount, category, date, note }) {
   return (
      <div className="w-full bg-white rounded-lg shadow-md p-4 border border-gray-200 flex flex-col gap-3">
         {/* Type and Amount */}
         <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold text-gray-500 uppercase">{type}</h2>
            <span className="text-xl font-bold text-green-500">{currency}{amount}</span>
         </div>

         {/* Category */}
         <div>
            <span className="inline-block bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
               {category}
            </span>
         </div>

         {/* Date */}
         <div className="text-xs text-gray-400 flex items-center">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-4 w-4 mr-1"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10m-5 4h.01M4 21h16a2 2 0 002-2V7a2 2 0 00-2-2h-3V3m-10 2H4a2 2 0 00-2 2v12a2 2 0 002 2z"
               />
            </svg>
            {date}
         </div>

         {/* Note */}
         <div className="text-xs text-gray-600">
            <p>"{note}"</p>
         </div>
      </div>
   );
}

export default Card;
