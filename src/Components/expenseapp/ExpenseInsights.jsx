import React, {useState} from "react";
import {useExpenseContext} from "./ExpenseContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
   faPiggyBank,
   faArrowAltCircleDown,
   faMoneyCheckAlt,
   faAngleDoubleDown,
   faAngleDoubleUp,
   faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import {
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
   PieChart,
   Pie,
   Cell,
   LineChart,
   Line,
} from "recharts";

function ExpenseInsights() {
   const {currency} = useExpenseContext();
   const [chartType, setChartType] = useState("barChart"); // Default chart type is 'barChart'

   const categories = {
      Food: 300,
      Transportation: 150,
      Entertainment: 200,
      Shopping: 400,
      Utilities: 250,
      Healthcare: 100,
      Education: 350,
      Rent: 1200,
      Savings: 500,
   };

   // Convert categories object to an array for Recharts
   const data = Object.keys(categories).map((key) => ({
      category: key,
      value: categories[key],
   }));

   const COLORS = [
      "#8884d8",
      "#82ca9d",
      "#ffc658",
      "#ff8042",
      "#d0ed57",
      "#8dd1e1",
      "#a4de6c",
      "#d0a1f1",
      "#a4d8a4",
   ];

   return (
      <section className="py-10 px-4 bg-gray-100 flex justify-center items-center min-h-screen">
         <div className="w-full md:w-[50%] flex flex-col gap-10">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
               {/* Total Income */}
               <div className="bg-white shadow-lg rounded-lg p-4 h-auto">
                  <div className="mb-4 flex justify-between items-center gap-3 ">
                     <FontAwesomeIcon
                        icon={faMoneyCheckAlt}
                        className="text-green-500 text-2xl"
                     />
                     <p className="text-[1em] font-semibold text-green-700">
                        Total Income
                     </p>
                     <span className="text-green-400">
                        {" "}
                        <FontAwesomeIcon icon={faAngleDoubleUp} /> 100%
                     </span>
                  </div>
                  <p className="text-4xl font-bold text-green-500 mt-2 text-center">
                     {currency} 50,000
                  </p>
               </div>
               {/* Total Savings */}
               <div className="bg-white shadow-lg rounded-lg p-4 h-auto">
                  <div className="mb-4 flex justify-between items-center gap-3 ">
                     <FontAwesomeIcon
                        icon={faPiggyBank}
                        className="text-blue-500 text-2xl"
                     />
                     <p className="text-[1em] font-semibold text-blue-700">
                        Total Savings
                     </p>
                     <span className="text-blue-400">
                        {" "}
                        <FontAwesomeIcon icon={faAngleUp} /> 30%
                     </span>
                  </div>
                  <p className="text-4xl font-bold text-blue-500 mt-2 text-center">
                     {currency} 15,000
                  </p>
               </div>
               {/* Total Expenses */}
               <div className="bg-white shadow-lg rounded-lg p-4 h-auto">
                  <div className="mb-4 flex justify-between items-center gap-3 ">
                     <FontAwesomeIcon
                        icon={faMoneyCheckAlt}
                        className="text-red-500 text-2xl"
                     />
                     <p className="text-[1em] font-semibold text-red-700">
                        Total Expenses
                     </p>
                     <span className="text-red-400">
                        {" "}
                        <FontAwesomeIcon icon={faAngleDoubleDown} /> 70%
                     </span>
                  </div>
                  <p className="text-4xl font-bold text-red-500 mt-2 text-center">
                     {currency} 35,000
                  </p>
               </div>
            </div>

            {/* Expenses by Category */}
            <div className="bg-white shadow-lg rounded-lg p-6">
               <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Expenses by Category{" "}
                  <span className="opacity-[.4]">(Top 5)</span>
               </h3>
               <ul className="space-y-3">
                  {Object.entries(categories)
                     .sort(([, amountA], [, amountB]) => amountB - amountA) // Sort in descending order
                     .slice(0, 5) // Show only the top 5 categories
                     .map(([category, amount]) => (
                        <li
                           key={category}
                           className="flex justify-between text-gray-700">
                           <span>{category}</span>
                           <span className="font-bold">
                              {currency} {amount}
                           </span>
                        </li>
                     ))}
               </ul>
            </div>

            {/* Charts Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
               <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                     Charts
                  </h3>
                  <select
                     name="chart"
                     id="chart"
                     className="border border-gray-300 rounded-lg px-3 py-1 text-sm text-gray-600"
                     value={chartType}
                     onChange={(e) => setChartType(e.target.value)}>
                     <option value="barChart">Bar Graph</option>
                     <option value="pieChart">Pie Chart</option>
                     <option value="lineChart">Line Graph</option>
                  </select>
               </div>
               <div className="flex justify-center items-center h-auto bg-gray-50 rounded-lg overflow-x-auto">
                  {data && data.length > 0 ? (
                     chartType === "barChart" ? (
                        <ResponsiveContainer width={400} height={400}>
                           <BarChart data={data}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="category" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="value" fill="#8884d8" />
                           </BarChart>
                        </ResponsiveContainer>
                     ) : chartType === "pieChart" ? (
                        <ResponsiveContainer width={500} height={400}>
                           <ResponsiveContainer width={400} height={400}>
                              <PieChart>
                                 <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="category"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label={({name, percent}) =>
                                       `${name} (${(percent * 100).toFixed(
                                          0
                                       )}%)`
                                    } // Show category name and percentage
                                 >
                                    {data.map((entry, index) => (
                                       <Cell
                                          key={`cell-${index}`}
                                          fill={COLORS[index % COLORS.length]}
                                       />
                                    ))}
                                 </Pie>
                                 <Tooltip />{" "}
                                 {/* Optional: Adds hover tooltips for more details */}
                              </PieChart>
                           </ResponsiveContainer>
                        </ResponsiveContainer>
                     ) : chartType === "lineChart" ? (
                        <ResponsiveContainer width={400} height={400}>
                           <LineChart data={data}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="category" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line
                                 type="monotone"
                                 dataKey="value"
                                 stroke="#8884d8"
                              />
                           </LineChart>
                        </ResponsiveContainer>
                     ) : null
                  ) : (
                     <p className="text-gray-400">
                        Chart will be displayed here
                     </p>
                  )}
               </div>
            </div> 
            <div className="w-full h-10vh mt-10"></div>
         </div>
      </section>
   );
}

export default ExpenseInsights;
