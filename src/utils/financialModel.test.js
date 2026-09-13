import { describe, it, expect } from 'vitest';
import {
    calculateSummary,
    calculateBudgetStatus,
    calculateGoalProgress,
    normalizeTransactionType,
    normalizeAmount,
} from './financialModel';

describe('financial model', () => {
    it('calculates income, expenses, savings, and balances consistently', () => {
        const transactions = [
            { type: 'income', amount: 5000 },
            { type: 'expense', amount: 1800 },
            { type: 'expense', amount: 500 },
            { type: 'savings', amount: 900 },
        ];

        const summary = calculateSummary(transactions);

        expect(summary.totalIncome).toBe(5000);
        expect(summary.totalExpense).toBe(2300);
        expect(summary.totalSavings).toBe(900);
        expect(summary.availableBalance).toBe(1800);
        expect(summary.netCashFlow).toBe(1800);
        expect(summary.savingsRate).toBeCloseTo(18, 5);
    });

    it('normalizes savings transaction types across variants', () => {
        expect(normalizeTransactionType('saving')).toBe('savings');
        expect(normalizeTransactionType('savings')).toBe('savings');
        expect(normalizeTransactionType('income')).toBe('income');
        expect(normalizeTransactionType('EXPENSE')).toBe('expense');
    });

    it('ignores invalid and non-positive amounts', () => {
        expect(normalizeAmount('30.5')).toBe(30.5);
        expect(normalizeAmount('-10')).toBe(0);
        expect(normalizeAmount('0')).toBe(0);
        expect(normalizeAmount('abc')).toBe(0);
    });

    it('computes budget status correctly', () => {
        expect(calculateBudgetStatus(1000, 700)).toMatchObject({
            status: 'watch',
            overBudget: false,
        });

        expect(calculateBudgetStatus(1000, 1000)).toMatchObject({
            status: 'exceeded',
            overBudget: false,
        });

        expect(calculateBudgetStatus(1000, 1200)).toMatchObject({
            status: 'exceeded',
            overBudget: true,
        });
    });

    it('computes goal progress and completion states', () => {
        expect(calculateGoalProgress(250, 500)).toMatchObject({
            progress: 50,
            status: 'in-progress',
        });

        expect(calculateGoalProgress(500, 500)).toMatchObject({
            progress: 100,
            status: 'completed',
        });

        expect(calculateGoalProgress(400, 500)).toMatchObject({
            remaining: 100,
        });
    });
});
