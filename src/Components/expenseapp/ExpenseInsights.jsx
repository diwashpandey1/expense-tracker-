import React from 'react';
import { useState } from 'react';
import { useExpenseContext } from './ExpenseContext';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line,
} from 'recharts';
import { Award, TrendingDown, PiggyBank } from 'lucide-react';

// --- Reusable Child Components for the Insights Page ---

// Card 1: Stays the same, shows total balance, income, expense, savings.
function SummaryCards() {
    const { currency, totalIncome, totalExpense, totalSavings, totalBalance } = useExpenseContext();
    return (
        <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col w-full gap-4 px-5 py-6 text-xl font-semibold text-gray-800 rounded-lg shadow-lg bg-gradient-to-r from-blue-100 to-purple-100">
                <div className="flex flex-wrap items-center justify-between w-full">
                    <h1 className="mb-2 text-3xl font-extrabold text-gray-700">Total Balance</h1>
                    <p className="text-3xl font-bold text-gray-900">{currency}{totalBalance.toFixed(2)}</p>
                </div>
                <div className="text-lg italic font-medium text-left text-purple-600 sm:text-center">Keep tracking your finances. You're on the right path! 🌟</div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
                <div className="p-4 text-green-800 bg-green-100 rounded-lg shadow-md"><p className="text-sm font-semibold">Total Income</p><p className="text-2xl font-bold">{currency}{totalIncome.toFixed(2)}</p></div>
                <div className="p-4 text-red-800 bg-red-100 rounded-lg shadow-md"><p className="text-sm font-semibold">Total Expenses</p><p className="text-2xl font-bold">{currency}{totalExpense.toFixed(2)}</p></div>
                <div className="p-4 text-blue-800 bg-blue-100 rounded-lg shadow-md"><p className="text-sm font-semibold">Total Savings</p><p className="text-2xl font-bold">{currency}{totalSavings.toFixed(2)}</p></div>
            </div>
        </div>
    );
}

// Card 2: New component to show the top category for each type.
function TopCategoriesCard() {
    const { categories, currency } = useExpenseContext();

    const findTopCategory = (type) => {
        const categoryList = categories[type];
        if (!categoryList || categoryList.length === 0) {
            return { name: "No data yet", totalAmount: 0 };
        }
        // Filter out categories with 0 amount, then sort
        const sortedCategories = [...categoryList]
            .filter(cat => cat.totalAmount > 0)
            .sort((a, b) => b.totalAmount - a.totalAmount);

        return sortedCategories.length > 0 ? sortedCategories[0] : { name: "No transactions", totalAmount: 0 };
    };

    const topIncome = findTopCategory('income');
    const topExpense = findTopCategory('expense');
    const topSaving = findTopCategory('saving');

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-gray-800">Top Categories</h3>
            <div className="grid gap-4 md:grid-cols-3">
                {/* Top Income */}
                <div className="flex items-center p-4 space-x-4 rounded-lg bg-green-50">
                    <div className="p-3 text-green-600 bg-green-200 rounded-full">
                        <Award size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-green-800">Top Income Source</p>
                        <p className="text-lg font-bold text-gray-900">{topIncome.name}</p>
                        <p className="text-sm font-medium text-gray-600">{currency}{topIncome.totalAmount.toFixed(2)}</p>
                    </div>
                </div>
                {/* Top Expense */}
                <div className="flex items-center p-4 space-x-4 rounded-lg bg-red-50">
                    <div className="p-3 text-red-600 bg-red-200 rounded-full">
                        <TrendingDown size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-red-800">Highest Spending Area</p>
                        <p className="text-lg font-bold text-gray-900">{topExpense.name}</p>
                        <p className="text-sm font-medium text-gray-600">{currency}{topExpense.totalAmount.toFixed(2)}</p>
                    </div>
                </div>
                {/* Top Saving */}
                <div className="flex items-center p-4 space-x-4 rounded-lg bg-blue-50">
                    <div className="p-3 text-blue-600 bg-blue-200 rounded-full">
                        <PiggyBank size={24} />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-blue-800">Top Saving Category</p>
                        <p className="text-lg font-bold text-gray-900">{topSaving.name}</p>
                        <p className="text-sm font-medium text-gray-600">{currency}{topSaving.totalAmount.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Card 3: New component for the overall Income vs Expense vs Saving chart.
function OverallBreakdownChart() {
    const { totalIncome, totalExpense, totalSavings } = useExpenseContext();
    const data = [
        { name: 'Income', value: totalIncome },
        { name: 'Expense', value: totalExpense },
        { name: 'Saving', value: totalSavings }
    ];

    // Only render the chart if there's any data
    const hasData = totalIncome > 0 || totalExpense > 0 || totalSavings > 0;

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-gray-800">Overall Financial Breakdown</h3>
            <div className="w-full h-80">
                {hasData ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                            <Bar dataKey="value" barSize={60}>
                                {data.map((entry, index) => {
                                    const colors = ["#22c55e", "#ef4444", "#3b82f6"]; // green, red, blue
                                    return <Cell key={`cell-${index}`} fill={colors[index]} />;
                                })}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-400">Add transactions to see your financial breakdown.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

// Card 4: The original chart, now focused on breaking down specific categories.
function CategoryBreakdownChart() {
    const { categories } = useExpenseContext();
    const [chartType, setChartType] = useState("pieChart");
    const [categoryType, setCategoryType] = useState("expense");
    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d0ed57", "#8dd1e1", "#a4de6c", "#d0a1f1"];
    
    // Filter out categories with no transactions before rendering the chart
    const data = categories[categoryType]?.filter(item => item.totalAmount > 0).map(item => ({ name: item.name, value: item.totalAmount }));

    const renderChart = () => {
        if (!data || data.length === 0) {
            return <div className="flex items-center justify-center h-full"><p className="p-10 text-gray-400">No data to display for this category.</p></div>;
        }

        switch (chartType) {
            case "barChart":
                return (
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                );
            case "pieChart":
                return (
                    <PieChart>
                        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                            {data.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                        </Pie>
                        <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                    </PieChart>
                );
            case "lineChart":
                 return (
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                );
            default:
                return null;
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 className="text-xl font-bold text-gray-800">Category Breakdown</h3>
                <div className="flex gap-3">
                    <select className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg" value={categoryType} onChange={(e) => setCategoryType(e.target.value)}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                        <option value="saving">Savings</option>
                    </select>
                    <select className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg" value={chartType} onChange={(e) => setChartType(e.target.value)}>
                        <option value="pieChart">Pie Chart</option>
                        <option value="barChart">Bar Graph</option>
                        <option value="lineChart">Line Graph</option>
                    </select>
                </div>
            </div>
            <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                </ResponsiveContainer>
            </div>
        </div>
    );
}

// --- Main Insights Component ---
// This now acts as a layout container for the more specific insight cards.
function ExpenseInsights() {
    return (
        <section className="flex flex-col items-center w-full min-h-screen p-4 text-black bg-gray-100 md:p-6">
            <div className="flex flex-col w-full h-full max-w-5xl gap-6">
                <SummaryCards />
                <TopCategoriesCard />
                <OverallBreakdownChart />
                <CategoryBreakdownChart />
            </div>
            <div className="mb-20"></div>
        </section>
    );
}

export default ExpenseInsights;
