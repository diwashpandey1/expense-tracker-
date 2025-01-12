import React from "react";
import Profile from "/src/assets/images/me-footer.jpg";

const ExpenseProfile = () => {
   return (
      <section className="w-full h-screen bg-gray-100 flex items-start justify-center">
         <div className="w-[90%] md:w-[50%] rounded-lg p-6 flex flex-col gap-5">
            {/* Upper Section */}
            <div className="upper text-center mb-8 bg-white shadow-lg p-6 rounded-lg">
               <h1 className="text-2xl font-bold text-gray-700 mb-4">
                  Profile Details
               </h1>
               <hr className="mb-6 border-gray-300" />
               <div className="flex flex-col items-center space-y-4">
                  <img
                     src={Profile}
                     alt="Profile"
                     className="w-32 h-32 rounded-full shadow-[0_10px_10px_#00000025,0_-10px_10px_#00000025,10px_0px_10px_#00000025,-10px_0px_10px_#00000025]"
                  />
                  <span className="text-xl font-semibold text-gray-800">
                     Diwash Pandey
                  </span>
                  <span className="text-sm text-gray-500">
                     diwashpandey803@gmail.com
                  </span>
               </div>
            </div>

            {/* Lower Section */}
            <div className="lower bg-white shadow-lg p-6 rounded-lg">
               <h1 className="text-2xl font-bold text-gray-700 mb-4">
                  Account Details
               </h1>
               <hr className="mb-6 border-gray-300" />
               <div className="space-y-4">
                  <div className="flex flex-col gp-3 justify-between items-center">
                     <h2 className="text-md font-semibold text-gray-600">
                        Member Since
                     </h2>
                     <p className="text-lg font-bold font-roboto text-gray-500">
                        January 01, 2005
                     </p>
                  </div>
                  <button className="px-3 py-2 w-full bg-red-100 rounded-lg text-red-400 font-semibold shadow-sm hover:bg-red-200">
                     Log Out
                  </button>
               </div>
            </div>
            <div className="w-full h-[20vh] mt-5"></div>
         </div>
      </section>
   );
};

export default ExpenseProfile;
