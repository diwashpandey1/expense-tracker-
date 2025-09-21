import React, {useState, useEffect} from "react";
import {Bar} from "react-chartjs-2";
import {ArrowUpDown} from "lucide-react";
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Tooltip,
   Legend,
   Title,
} from "chart.js";

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);

const CurrencyExchange = () => {
   const [amount, setAmount] = useState(1);
   const [fromCurrency, setFromCurrency] = useState("USD");
   const [toCurrency, setToCurrency] = useState("EUR");
   const [convertedAmount, setConvertedAmount] = useState(null);
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);

   // ✅ API Key from .env (must be VITE_API_KEY in Vite projects)
   const apiKey = import.meta.env.VITE_API_KEY;

   // ✅ Fetch country + currency data from GitHub JSON
   useEffect(() => {
      fetch(
         "https://raw.githubusercontent.com/mluqmaan/world-countries-json/main/countries.json"
      )
         .then((response) => response.json())
         .then((json) => setData(json))
         .catch((error) => console.error("Error fetching JSON:", error));
   }, []);

   // ✅ Fetch conversion rate when currencies or amount change
   useEffect(() => {
      if (!fromCurrency || !toCurrency || !apiKey) return;

      setLoading(true);
      fetch(
         `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&currencies=${toCurrency}&base_currency=${fromCurrency}`
      )
         .then((response) => response.json())
         .then((json) => {
            const rate = json.data?.[toCurrency]?.value || 0;
            setConvertedAmount(amount * rate);
         })
         .catch((error) =>
            console.error("Error fetching currency data:", error)
         )
         .finally(() => setLoading(false));
   }, [fromCurrency, toCurrency, amount, apiKey]);

   //for swapping currencies
   const handleSwap = () => {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
   };

   // Chart data
   const chartData = {
      labels: [`From (${fromCurrency})`, `To (${toCurrency})`],
      datasets: [
         {
            label: "Currency Comparison",
            data: [amount, convertedAmount || 0],
            backgroundColor: ["#4CAF50", "#FF6384"],
            hoverBackgroundColor: ["#45A049", "#FF4364"],
            borderColor: "#ffffff",
            borderWidth: 2,
            borderRadius: 8, // rounded bars for modern look
         },
      ],
   };

   // Chart options
   const chartOptions = {
      responsive: true,
      plugins: {
         legend: {
            display: false, // hide legend since we only compare 2 bars
         },
         tooltip: {
            callbacks: {
               label: (context) =>
                  `${context.formattedValue} ${
                     context.label.includes("From") ? fromCurrency : toCurrency
                  }`,
            },
         },
         title: {
            display: true,
            text: "Currency Conversion Comparison",
            font: {size: 16, weight: "bold"},
            color: "#374151",
         },
      },
      scales: {
         x: {
            grid: {display: false},
            ticks: {font: {size: 14, weight: "bold"}},
         },
         y: {
            beginAtZero: true,
            ticks: {font: {size: 12}},
         },
      },
   };

   return (
      <section className="flex items-center justify-center w-full min-h-screen p-6 font-sans bg-gray-50">
         <div className="flex flex-col w-full max-w-5xl gap-10 mt-10">
            <h2 className="mt-10 text-2xl font-semibold text-center text-gray-700 md:text-left">
               Currency Exchange Calculator
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
               {/* Left Section */}
               <div className="p-6 bg-white shadow-lg rounded-xl">
                  <form className="space-y-5">
                     {/* Amount Input */}
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">
                           Amount
                        </label>
                        <input
                           type="number"
                           value={amount}
                           onChange={(e) => setAmount(Number(e.target.value))}
                           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                     </div>

                     {/* From Currency */}
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">
                           From Currency
                        </label>
                        <select
                           value={fromCurrency}
                           onChange={(e) => setFromCurrency(e.target.value)}
                           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                           <option value="">-- Choose a currency --</option>
                           {data.map((item, index) => (
                              <option key={index} value={item.currency.code}>
                                 {item.name} — {item.currency.name} (
                                 {item.currency.code})
                              </option>
                           ))}
                        </select>
                     </div>

                     {/* 🔄 Swap Button */}
                     <div className="flex justify-center">
                        <button
                           type="button"
                           onClick={handleSwap}
                           className="p-2 mt-6 text-white bg-green-500 rounded-full shadow-md hover:bg-green-600">
                            <ArrowUpDown className="w-6 h-6" />
                        </button>
                     </div>

                     {/* To Currency */}
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-600">
                           To Currency
                        </label>
                        <select
                           value={toCurrency}
                           onChange={(e) => setToCurrency(e.target.value)}
                           className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                           <option value="">-- Choose a currency --</option>
                           {data.map((item, index) => (
                              <option key={index} value={item.currency.code}>
                                 {item.name} — {item.currency.name} (
                                 {item.currency.code})
                              </option>
                           ))}
                        </select>
                     </div>
                  </form>
               </div>

               {/* Right Section */}
               <div className="flex flex-col items-center justify-center p-6 bg-white shadow-lg rounded-xl">
                  <div className="flex flex-col items-center w-full h-auto max-w-sm">
                     <div className="w-64 h-64 mb-6">
                        <Bar data={chartData} options={chartOptions} />
                     </div>
                     <div className="w-full space-y-4">
                        <p className="flex justify-between text-gray-600">
                           <span>From:</span>
                           <span className="text-xl font-bold text-green-500">
                              {amount} {fromCurrency}
                           </span>
                        </p>
                        <p className="flex justify-between text-gray-600">
                           <span>To:</span>
                           <span className="text-xl font-bold text-green-500">
                              {loading
                                 ? "Loading..."
                                 : convertedAmount
                                 ? convertedAmount.toFixed(2)
                                 : "0.00"}{" "}
                              {toCurrency}
                           </span>
                        </p>
                     </div>
                  </div>
               </div>
            </div>
            {/* Bottom Information */}
            <div className="flex flex-col gap-6">
               {/* Formula Section */}
               <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-[1.7em] font-semibold mb-4">
                     Understanding Currency Exchange
                  </h3>
                  <p className="mb-4 text-[#4b5563]">
                     Currency exchange is the process of converting one
                     country’s currency into another, based on the current
                     exchange rate. These rates are determined by global
                     financial markets and can change frequently.
                  </p>
                  <div className="px-4 py-6 bg-green-100 rounded-md shadow-md">
                     <h4 className="mb-2 text-lg font-semibold">
                        Currency Exchange Formula Explained
                     </h4>
                     <p className="mb-4 text-[#4b5563]">
                        Converted Amount = Amount × Exchange Rate
                     </p>
                     <p className="text-[#4b5563]">
                        <span>Where:</span>
                        <br /> Amount = Money you want to convert
                        <br /> Exchange Rate = Value of 1 unit of source
                        currency in target currency
                        <br /> Converted Amount = Final value after conversion
                     </p>
                  </div>
               </div>

               {/* Applications Section */}
               <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="text-[1.7em] font-semibold mb-4">
                     When to Use Currency Exchange
                  </h3>
                  <h4 className="mb-2 text-lg font-semibold">
                     Common Applications
                  </h4>
                  <ul className="pl-5 mb-4 list-disc">
                     <li>International travel</li>
                     <li>Online shopping in foreign stores</li>
                     <li>Sending money abroad</li>
                     <li>Import and export businesses</li>
                     <li>Investments in foreign markets</li>
                     <li>Receiving remittances</li>
                  </ul>
                  <h4 className="mb-2 text-lg font-semibold">Advantages</h4>
                  <ul className="pl-5 list-disc">
                     <li>Quick and straightforward conversion</li>
                     <li>Helps in global trade and travel</li>
                     <li>Accessible through banks, apps, and forex services</li>
                     <li>Real-time updates on exchange rates</li>
                     <li>Enables easy comparison between currencies</li>
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
                           Watch for Exchange Rate Fluctuations
                        </span>
                        <p className="text-[#4b5563]">
                           Exchange rates change daily. Always check the latest
                           rates before making a transaction to avoid losses.
                        </p>
                     </div>
                     <div className="mb-4 px-4 py-3 border-l-[5px] border-l-green-500">
                        <span className="text-lg font-semibold text-black">
                           Be Aware of Conversion Fees
                        </span>
                        <p className=" text-[#4b5563]">
                           Many banks and services charge a fee or add a margin
                           to exchange rates. Compare providers to get the best
                           deal.
                        </p>
                     </div>
                     <div className="mb-4 px-4 py-3 border-l-[5px] border-l-green-500">
                        <span className="text-lg font-semibold text-black">
                           Use Trusted Platforms
                        </span>
                        <p className=" text-[#4b5563]">
                           Always use verified apps, banks, or forex services to
                           ensure safe and secure transactions.
                        </p>
                     </div>
                  </div>
               </div>

               {/* Example Section */}
               <div className="p-6 bg-white rounded-lg shadow-md">
                  <h3 className="mb-4 text-lg font-semibold">
                     Example Conversions
                  </h3>
                  <p className="mb-4">Here are some sample calculations:</p>
                  <p className="px-2 py-4 mb-4 bg-gray-100 rounded-md shadow-md ">
                     <strong>Example 1: USD to EUR</strong> <br />
                     Amount: $1000 <br />
                     Exchange Rate: 1 USD = 0.92 EUR <br />
                     Converted Amount = 1000 × 0.92 = €920
                  </p>
                  <p className="px-2 py-4 bg-gray-100 rounded-md shadow-md">
                     <strong>Example 2: INR to USD</strong> <br />
                     Amount: ₹50,000 <br />
                     Exchange Rate: 1 INR = 0.012 USD <br />
                     Converted Amount = 50,000 × 0.012 = $600
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
};

export default CurrencyExchange;
