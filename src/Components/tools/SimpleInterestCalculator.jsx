import React, {useState} from "react";
import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function SimpleInterestCalculator() {
   const [principal, setPrincipal] = useState(0);
   const [time, setTime] = useState(0);
   const [rate, setRate] = useState(0);
   const [currency, setCurrency] = useState("रु");
   const [simpleInterest, setSimpleInterest] = useState(null);
   const [totalAmount, setTotalAmount] = useState(null);

   const data = {
      labels: ["Principal", "Interest"],
      datasets: [
         {
            label: "Amount Distribution",
            data: [principal, simpleInterest || 0],
            backgroundColor: ["#4CAF50", "#FF6384"],
            hoverBackgroundColor: ["#45A049", "#FF4364"],
         },
      ],
   };

   const options = {
      responsive: true,
      cutout: "70%",
      plugins: {
         legend: {
            position: "top",
         },
      },
   };

   const handleCurrency = (e) => {
      setCurrency(e.target.value);
   };

   const handlePrincipal = (e) => {
      setPrincipal(Number(e.target.value));
   };

   const handleRate = (e) => {
      setRate(Number(e.target.value));
   };

   const handleTime = (e) => {
      setTime(Number(e.target.value));
   };

   const handleCalculatedResult = (e) => {
      e.preventDefault();
      const interest = (principal * rate * time) / 100;
      setSimpleInterest(interest);
      setTotalAmount(principal + interest);
   };

   return (
      <section className="flex items-center justify-center w-full min-h-screen p-6 bg-gray-50">
         <div className="flex flex-col w-full max-w-5xl gap-10 mt-10">
            {/* Title */}
            <h2 className="mt-10 text-2xl font-semibold text-gray-700">
               Simple Interest Calculator
            </h2>

            {/* Main Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
               {/* Left Section */}
               <div className="p-6 bg-white rounded-lg shadow-md">
                  <form className="space-y-5" onSubmit={handleCalculatedResult}>
                     {/* Currency Selector */}
                     <div>
                        <label className="block mb-2 text-gray-600">
                           Currency ({currency})
                        </label>
                        <select
                           onChange={handleCurrency}
                           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                           <option value="💸">Select Currency</option>
                           <option value="रु">NPR - Nepali Rupee (रु)</option>
                           <option value="$">USD - US Dollar ($)</option>
                           <option value="€">EUR - Euro (€)</option>
                           <option value="₹">INR - Indian Rupee (₹)</option>
                           <option value="¥">JPY - Japanese Yen (¥)</option>
                        </select>
                     </div>

                     {/* Principal Input */}
                     <div>
                        <label className="block mb-2 text-gray-600">
                           Principal (P)
                        </label>
                        <input
                           onChange={handlePrincipal}
                           type="number"
                           placeholder="Enter Principal"
                           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                     </div>

                     {/* Time Input */}
                     <div>
                        <label className="block mb-2 text-gray-600">
                           Time (T)
                        </label>
                        <input
                           onChange={handleTime}
                           type="number"
                           placeholder="Enter Time in Years"
                           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                     </div>

                     {/* Rate Input */}
                     <div>
                        <label className="block mb-2 text-gray-600">
                           Rate of Interest (R)
                        </label>
                        <input
                           onChange={handleRate}
                           type="number"
                           placeholder="Enter Rate in %"
                           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                     </div>

                     {/* Calculate Button */}
                     <button
                        type="submit"
                        className="w-full py-2 text-white transition duration-300 bg-green-500 rounded-lg hover:bg-green-600">
                        Calculate
                     </button>
                  </form>
               </div>

               {/* Right Section */}
               <div className="p-6 bg-white rounded-lg shadow-md">
                  <div className="flex justify-center mb-6">
                     <div className="w-64 h-64">
                        <Doughnut data={data} options={options} />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <p className="flex justify-between text-gray-600">
                        <span>Principal Amount:</span>
                        <span className="text-lg font-bold text-green-500">
                           {currency + " " + principal}
                        </span>
                     </p>
                     <p className="flex justify-between text-gray-600">
                        <span>Simple Interest:</span>
                        <span className="text-lg font-bold text-green-500">
                           {currency + " " + (simpleInterest || 0)}
                        </span>
                     </p>
                     <hr />
                     <p className="flex justify-between text-gray-600">
                        <span>Total Amount:</span>
                        <span className="text-xl font-bold text-green-500">
                           {currency + " " + (totalAmount || 0)}
                        </span>
                     </p>
                  </div>
               </div>
            </div>

            {/* Bottom Information */}
            <div className="flex flex-col gap-6">
               {/* Formula Section */}
               <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-[1.7em] font-semibold mb-4">
                     Understanding Simple Interest
                  </h3>
                  <p className="mb-4 text-[#4b5563]">
                     Simple interest is a basic method of calculating interest
                     where interest is earned or charged only on the initial
                     principal amount. Unlike compound interest, the interest
                     earned does not earn additional interest over time.
                  </p>
                  <div className="px-4 py-6 bg-green-100 rounded-md shadow-md">
                     <h4 className="mb-2 text-lg font-semibold">
                        Simple Interest Formula Explained
                     </h4>
                     <p className="mb-4 text-[#4b5563]">
                        SI = (P × R × T) / 100
                     </p>
                     <p className="text-[#4b5563]">
                        <span>Where:</span>
                        <br /> SI = Simple Interest
                        <br /> P = Principal amount (initial investment)
                        <br /> R = Interest rate (in decimal form)
                        <br /> T = Time period (in years)
                     </p>
                  </div>
               </div>

               {/* Applications Section */}
               <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-[1.7em] font-semibold mb-4">
                     When to Use Simple Interest
                  </h3>
                  <h4 className="mb-2 text-lg font-semibold">
                     Common Applications
                  </h4>
                  <ul className="pl-5 mb-4 list-disc">
                     <li>Short-term personal loans</li>
                     <li>Car loans and auto financing</li>
                     <li>Consumer loans</li>
                     <li>Bridge loans</li>
                     <li>Some types of mortgages</li>
                     <li>Education loans</li>
                  </ul>
                  <h4 className="mb-2 text-lg font-semibold">Advantages</h4>
                  <ul className="pl-5 list-disc">
                     <li>Easy to calculate and understand</li>
                     <li>Predictable payment amounts</li>
                     <li>Lower total interest compared to compound interest</li>
                     <li>Transparent interest charges</li>
                     <li>Suitable for short-term financial planning</li>
                  </ul>
               </div>

               {/* Tips and Considerations Section */}
               <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-[1.7em] font-semibold mb-4">
                     Tips and Considerations
                  </h3>
                  <div>
                     <div className="mb-4 px-4 py-3 border-l-[5px] border-l-green-500">
                        <span className="text-lg font-semibold text-black">
                           Compare Interest Rates
                        </span>
                        <p className="text-[#4b5563]">
                           Always compare interest rates from different lenders
                           before making a decision. Even a small difference in
                           interest rate can lead to significant savings.
                        </p>
                     </div>
                     <div className="mb-4 px-4 py-3 border-l-[5px] border-l-green-500">
                        <span className="text-lg font-semibold text-black">
                           Consider the Time Period
                        </span>
                        <p className=" text-[#4b5563]"> Longer loan terms mean more interest paid
                        overall. Consider if a shorter term with higher payments
                        might be more beneficial.
                        </p>
                     </div>
                     <div className="mb-4 px-4 py-3 border-l-[5px] border-l-green-500">
                        <span className="text-lg font-semibold text-black">
                           Check for Additional Fees
                        </span>
                        <p className=" text-[#4b5563]"> Besides interest, look for any processing fees,
                        prepayment penalties, or other charges that might affect
                        the total cost.
                        </p>
                     </div>
                  </div>
               </div>

               {/* Example Section */}
               <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="mb-4 text-lg font-semibold">
                     Example Calculations
                  </h3>
                  <p className="mb-4">Let's look at some practical examples:</p>
                  <p className="px-2 py-4 mb-4 bg-gray-100 rounded-md shadow-md ">
                     <strong>Example 1: Personal Loan</strong> <br />
                     Principal: $10,000 <br />
                     Interest Rate: 5% per year <br />
                     Time: 3 years <br />
                     Simple Interest = $10,000 × 0.05 × 3 = $1,500 <br />
                     Total Amount = $11,500
                  </p>
                  <p className="px-2 py-4 bg-gray-100 rounded-md shadow-md">
                     <strong>Example 2: Car Loan</strong> <br />
                     Principal: $20,000 <br />
                     Interest Rate: 4% per year <br />
                     Time: 5 years <br />
                     Simple Interest = $20,000 × 0.04 × 5 = $4,000 <br />
                     Total Amount = $24,000
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
}

export default SimpleInterestCalculator;
