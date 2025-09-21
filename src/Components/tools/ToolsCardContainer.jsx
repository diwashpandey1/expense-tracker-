import { faChartLine, faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTransfer } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom"; // Ensure you import Link correctly

function ToolsCardContainer() {
  return (
    <section className="w-full min-h-[100vh] h-auto flex justify-center items-center bg-gray-50 py-10 px-4">
      <div className="w-full md:w-[50%]  min-h-[80vh] h-auto mt-10">
        {/* Section Header */}
        <div className="flex flex-col">
          <h2 className="text-[1.7em] font-[Roboto] font-bold">
            Advanced Financial Calculators & Tools
          </h2>
          <p className="text-sm text-gray-600">
            Explore our comprehensive suite of online financial calculators designed to empower you with informed and effective financial decision-making.
          </p>
        </div>

        {/* Popular Calculators Section */}
        <div className="flex flex-col mt-10">
          <h2 className="font-semibold font-[Roboto] text-[1.5em] mb-10">Popular Calculators</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Simple Interest Calculator */}
            <Link
              to="/tools/interestCalculator"
              className="h-50 bg-white hover:bg-[#ffffff45] rounded-md p-4 shadow-md hover:shadow-lg transition-all  flex flex-col gap-3"
            >
              <span className="flex items-center justify-center w-10 h-10 bg-green-200 rounded-lg">
                <span className="border-green-800 border-[3px] w-6 h-6 rounded-full flex justify-center items-center text-sm font-bold">
                <FontAwesomeIcon icon={faDollarSign} color="green" size="sm"/>
                </span>
              </span>
              <div>
                <h3 className="text-lg font-semibold">
                  Simple Interest Calculator
                </h3>
                <p className="mt-3 text-gray-600">

                  Calculate interest on loans and investments easily.
                </p>
              </div>
            </Link>

            {/* SIP Calculator */}
            <Link
              to="/tools/SIPCalculator"
              className="h-50 bg-white hover:bg-[#ffffff45] rounded-md p-4 shadow-md hover:shadow-lg transition-all flex flex-col gap-3"
            >
              <span className="flex items-center justify-center w-10 h-10 bg-green-200 rounded-lg">
                <FontAwesomeIcon icon={faChartLine} color="green" size="lg" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">SIP Calculator</h3>
                <p className="mt-3 text-gray-600">Plan your mutual fund investments.</p>
              </div>
            </Link>

            <Link
              to="/tools/currencyExchange"
              className="h-50 bg-white hover:bg-[#ffffff45] rounded-md p-4 shadow-md hover:shadow-lg transition-all flex flex-col gap-3"
            >
              <span className="flex items-center justify-center w-10 h-10 bg-green-200 rounded-lg">
                <FontAwesomeIcon icon={faMoneyBillTransfer} color="green" size="lg" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">Currency Exchange</h3>
                <p className="mt-3 text-gray-600">Know how is the currency rate going on.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ToolsCardContainer;
