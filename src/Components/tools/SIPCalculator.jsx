import React, {useState} from "react";
import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function SIPCalculator() {
   const [currency, setCurrency] = useState("रु");
   const [monthlyInvestment, setMonthlyInvestment] = useState(0);
   const [rate, setRate] = useState(0);
   const [time, setTime] = useState(0);
   const [totalInvestment, setTotalInvestment] = useState(null);
   const [expectedReturn, setExpectedReturn] = useState(null);
   const [totalValue, setTotalValue] = useState(null);

   const data = {
      labels: ["Total Investment", "Expected Return"],
      datasets: [
         {
            label: "Investment Distribution",
            data: [totalInvestment || 0, expectedReturn || 0],
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

   const handleMonthlyInvestment = (e) => {
      setMonthlyInvestment(Number(e.target.value));
   };

   const handleRate = (e) => {
      setRate(Number(e.target.value));
   };

   const handleTime = (e) => {
      setTime(Number(e.target.value));
   };

   const handleCalculatedResult = (e) => {
      e.preventDefault();

      const annualRate = rate; // Annual interest rate
      const monthlyRate = annualRate / 12 / 100; // Convert to monthly rate
      const months = time * 12; // Convert years to months

      // Total investment
      const totalInvestment = (monthlyInvestment * months).toFixed(2);

      // Total value (future value)
      const totalValue =
         (monthlyInvestment *
            (((Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate))) /
         monthlyRate).toFixed(2);

      // Expected return
      const expectedReturn = (totalValue - totalInvestment).toFixed(2);

      // Update state
      setTotalInvestment(totalInvestment);
      setExpectedReturn(expectedReturn);
      setTotalValue(totalValue);
   };

   return (
      <section className="w-full min-h-screen flex justify-center items-center bg-gray-50 p-6">
         <div className="w-full max-w-5xl flex flex-col gap-10 mt-10">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-700 mt-10">
               SIP Calculator
            </h2>

            {/* Main Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Left Section */}
               <div className="bg-white p-6 rounded-lg shadow-md">
                  <form className="space-y-5" onSubmit={handleCalculatedResult}>
                     {/* Currency Selector */}
                     <div>
                        <label className="block text-gray-600 mb-2">
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

                     {/* Monthly Investment Input */}
                     <div>
                        <label className="block text-gray-600 mb-2">
                           Monthly Investment (M)
                        </label>
                        <input
                           onChange={handleMonthlyInvestment}
                           type="number"
                           placeholder="Enter Monthly Investment"
                           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                     </div>

                     {/* Rate Input */}
                     <div>
                        <label className="block text-gray-600 mb-2">
                           Expected Return Rate (R)
                        </label>
                        <input
                           onChange={handleRate}
                           type="decimal"
                           placeholder="Enter Rate in %"
                           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                     </div>

                     {/* Time Period Input */}
                     <div>
                        <label className="block text-gray-600 mb-2">
                           Time Period (Years)
                        </label>
                        <input
                           onChange={handleTime}
                           type="number"
                           placeholder="Enter Time Period in Years"
                           className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                     </div>

                     {/* Calculate Button */}
                     <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300">
                        Calculate
                     </button>
                  </form>
               </div>

               {/* Right Section */}
               <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-center mb-6">
                     <div className="w-64 h-64">
                        <Doughnut data={data} options={options} />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <p className="text-gray-600 flex justify-between">
                        <span>Total Investment:</span>
                        <span className="text-lg font-bold text-green-500">
                           {currency + " " + (totalInvestment || 0)}
                        </span>
                     </p>
                     <p className="text-gray-600 flex justify-between">
                        <span>Expected Return:</span>
                        <span className="text-lg font-bold text-green-500">
                           {currency + " " + (expectedReturn || 0)}
                        </span>
                     </p>
                     <hr />
                     <p className="text-gray-600 flex justify-between">
                        <span>Total Value:</span>
                        <span className="text-xl font-bold text-green-500">
                           {currency + " " + (totalValue || 0)}
                        </span>
                     </p>
                  </div>
               </div>
            </div>

            {/* Bottom Information */}
            <div className="flex flex-col gap-6">
               {/* SIP Info Section */}
               <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-[1.7em] font-semibold mb-4">
                     What is SIP?
                  </h3>
                  <p className="mb-4 text-[#4b5563]">
                     A Systematic Investment Plan (SIP) is a method of investing
                     a fixed amount regularly in mutual funds. It helps in
                     building wealth through the power of compounding and
                     disciplined investing.
                  </p>
                  <h4 className="text-lg font-semibold mb-2">
                     Benefits of SIP
                  </h4>
                  <ul className="list-disc pl-5 mb-4">
                     <li>Disciplined investing approach</li>
                     <li>Benefit from rupee cost averaging</li>
                     <li>Power of compounding</li>
                     <li>Start with small amounts</li>
                  </ul>
                  <h4 className="text-lg font-semibold mb-2">How SIP Works</h4>
                  <p className="mb-4 text-[#4b5563]">
                     The SIP calculator uses the following formula to calculate
                     returns:
                  </p>
                  <p className="py-6 px-4 bg-green-100 rounded-md font-semibold shadow-md mb-5">
                     {`M × {(1 + r)^n - 1} × (1 + r)/r`}
                  </p>
                  <p className="text-[#4b5563]">
                     Where:
                     <br /> M = Monthly investment amount
                     <br /> r = Monthly rate of return (annual rate/12)
                     <br /> n = Total number of months
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
}

export default SIPCalculator;
