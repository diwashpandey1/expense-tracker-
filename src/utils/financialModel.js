export const DEFAULT_TRANSACTION_TYPES = ["income", "expense", "savings"];

export const normalizeTransactionType = (type) => {
    const normalized = String(type || "").trim().toLowerCase();
    if (normalized === "saving" || normalized === "savings") return "savings";
    return DEFAULT_TRANSACTION_TYPES.includes(normalized) ? normalized : "expense";
};

export const normalizeAmount = (value) => {
    const parsed = Number.parseFloat(value);
    if (!Number.isFinite(parsed) || parsed <= 0) return 0;
    return Number(parsed.toFixed(2));
};

export const calculateSummary = (transactions = []) => {
    const totals = {
        income: 0,
        expense: 0,
        savings: 0,
    };

    for (const transaction of transactions) {
        const type = normalizeTransactionType(transaction?.type);
        const amount = normalizeAmount(transaction?.amount);

        if (!DEFAULT_TRANSACTION_TYPES.includes(type) || amount === 0) {
            continue;
        }

        totals[type] += amount;
    }

    const totalIncome = totals.income;
    const totalExpense = totals.expense;
    const totalSavings = totals.savings;
    const netCashFlow = totalIncome - totalExpense - totalSavings;
    const availableBalance = totalIncome - totalExpense - totalSavings;
    const savingsRate = totalIncome > 0 ? (totalSavings / totalIncome) * 100 : 0;

    return {
        totalIncome,
        totalExpense,
        totalSavings,
        netCashFlow,
        availableBalance,
        savingsRate,
    };
};

export const calculateBudgetStatus = (budgetAmount, spentAmount) => {
    const budget = Number(budgetAmount) || 0;
    const spent = Number(spentAmount) || 0;

    if (budget <= 0) return { percentage: 0, status: "unbounded", remaining: 0, overBudget: false };

    const percentage = (spent / budget) * 100;
    const remaining = budget - spent;
    const overBudget = spent > budget;

    let status = "healthy";
    if (percentage >= 100) status = "exceeded";
    else if (percentage >= 90) status = "warning";
    else if (percentage >= 70) status = "watch";

    return { percentage, status, remaining, overBudget };
};

export const calculateGoalProgress = (currentAmount, targetAmount) => {
    const current = Number(currentAmount) || 0;
    const target = Number(targetAmount) || 0;

    if (target <= 0) return { progress: 0, remaining: 0, status: "inactive" };

    const progress = (current / target) * 100;
    const remaining = Math.max(target - current, 0);

    let status = "in-progress";
    if (progress >= 100) status = "completed";
    else if (progress >= 75) status = "near-complete";

    return { progress, remaining, status };
};
