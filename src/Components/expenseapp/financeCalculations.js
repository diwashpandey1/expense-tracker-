export const DEFAULT_CATEGORIES = {
  expense: [
    { name: "Housing", totalAmount: 0 },
    { name: "Childcare", totalAmount: 0 },
    { name: "Transportation", totalAmount: 0 },
    { name: "Utilities", totalAmount: 0 },
    { name: "Food/Supplies", totalAmount: 0 },
    { name: "Pets", totalAmount: 0 },
    { name: "Entertainment", totalAmount: 0 },
    { name: "Healthcare", totalAmount: 0 },
    { name: "Insurance", totalAmount: 0 },
    { name: "Personal Care", totalAmount: 0 },
    { name: "Debt", totalAmount: 0 },
    { name: "Gifts", totalAmount: 0 },
    { name: "Donations", totalAmount: 0 },
    { name: "Clothing", totalAmount: 0 },
    { name: "Education", totalAmount: 0 },
    { name: "Subscriptions", totalAmount: 0 },
    { name: "Miscellaneous", totalAmount: 0 },
    { name: "Taxes", totalAmount: 0 },
  ],
  income: [
    { name: "Salary", totalAmount: 0 },
    { name: "House Property", totalAmount: 0 },
    { name: "Profits and Gains", totalAmount: 0 },
    { name: "Capital Gain", totalAmount: 0 },
    { name: "Gifts", totalAmount: 0 },
    { name: "Investments", totalAmount: 0 },
    { name: "Side Hustles", totalAmount: 0 },
    { name: "Government Benefits", totalAmount: 0 },
  ],
  saving: [
    { name: "Retirement Funds", totalAmount: 0 },
    { name: "Emergency Funds", totalAmount: 0 },
    { name: "College Funds", totalAmount: 0 },
    { name: "Travel Funds", totalAmount: 0 },
    { name: "Sinking Funds", totalAmount: 0 },
    { name: "Common Savings", totalAmount: 0 },
    { name: "Medical Funds", totalAmount: 0 },
    { name: "Child Savings", totalAmount: 0 },
    { name: "Large Purchases", totalAmount: 0 },
  ],
};

export const TRANSACTION_TYPES = ["income", "expense", "saving"];

export const formatMoney = (currency, amount) =>
  `${currency} ${Number(amount || 0).toFixed(2)}`;

export const clampPercentage = (value) => {
  const percentage = Number(value);
  if (!Number.isFinite(percentage)) return 0;
  return Math.min(Math.max(percentage, 0), 100);
};

export const normalizeTransactionType = (type) => {
  const normalizedType = String(type || "").trim().toLowerCase();
  return normalizedType === "savings" ? "saving" : normalizedType;
};

export const normalizeAmount = (amount) => {
  const parsedAmount = Number.parseFloat(amount);
  return Number.isFinite(parsedAmount) && parsedAmount > 0 ? parsedAmount : 0;
};

export const getEmptyCategoryTotals = () => ({
  expense: DEFAULT_CATEGORIES.expense.map((cat) => ({ ...cat, totalAmount: 0 })),
  income: DEFAULT_CATEGORIES.income.map((cat) => ({ ...cat, totalAmount: 0 })),
  saving: DEFAULT_CATEGORIES.saving.map((cat) => ({ ...cat, totalAmount: 0 })),
});

const addCategoryAmount = (categoryTotals, type, categoryName, amount) => {
  const fallbackCategory = type === "saving" ? "Common Savings" : "Miscellaneous";
  const normalizedName = String(categoryName || fallbackCategory).trim() || fallbackCategory;
  const existingCategory = categoryTotals[type].find(
    (cat) => cat.name.toLowerCase() === normalizedName.toLowerCase()
  );

  if (existingCategory) {
    existingCategory.totalAmount += amount;
    return;
  }

  categoryTotals[type].push({
    name: normalizedName,
    totalAmount: amount,
  });
};

export function calculateExpenseSummary(transactions = []) {
  const categoryTotals = getEmptyCategoryTotals();
  const totals = {
    income: 0,
    expense: 0,
    saving: 0,
  };

  transactions.forEach((transaction) => {
    const type = normalizeTransactionType(transaction?.type);
    const amount = normalizeAmount(transaction?.amount);

    if (!TRANSACTION_TYPES.includes(type) || amount === 0) return;

    totals[type] += amount;
    addCategoryAmount(categoryTotals, type, transaction?.category, amount);
  });

  const totalIncome = totals.income;
  const totalExpense = totals.expense;
  const totalSavings = totals.saving;
  const totalOutflow = totalExpense + totalSavings;
  const netAfterExpenses = totalIncome - totalExpense;
  const availableBalance = totalIncome - totalOutflow;
  const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;

  return {
    categories: categoryTotals,
    totalIncome,
    totalExpense,
    totalSavings,
    totalOutflow,
    netAfterExpenses,
    availableBalance,
    totalBalance: availableBalance,
    savingsRate,
  };
}
