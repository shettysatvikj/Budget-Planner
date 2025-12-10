
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function StatsCards() {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [savings, setSavings] = useState(0);

  const [incomeChange, setIncomeChange] = useState(0);
  const [expenseChange, setExpenseChange] = useState(0);
  const [balanceChange, setBalanceChange] = useState(0);
  const [savingsChange, setSavingsChange] = useState("N/A");

  const calculateStats = () => {
    const tx = JSON.parse(localStorage.getItem("transactions")) || [];
    const goals = JSON.parse(localStorage.getItem("savingGoals")) || [];
    const walletBalance =
      JSON.parse(localStorage.getItem("walletBalance")) || 0;

    const now = new Date();
    const currentMonth = now.getMonth();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const currentYear = now.getFullYear();
    const lastMonthYear = lastMonth === 11 ? currentYear - 1 : currentYear;

    let currentIncome = 0,
      currentExpense = 0,
      prevIncome = 0,
      prevExpense = 0;

    tx.forEach((t) => {
      const txDate = new Date(t.date);
      const isThisMonth =
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear;
      const isLastMonth =
        txDate.getMonth() === lastMonth &&
        txDate.getFullYear() === lastMonthYear;

      if (t.type === "income") {
        if (isThisMonth) currentIncome += t.amount;
        if (isLastMonth) prevIncome += t.amount;
      }

      if (t.type === "expense") {
        if (isThisMonth) currentExpense += t.amount;
        if (isLastMonth) prevExpense += t.amount;
      }
    });

    const totalSavingsFromGoals = goals.reduce(
      (sum, g) => sum + (g.saved || 0),
      0
    );

    const currentBalance = walletBalance - totalSavingsFromGoals;

    const prevBalance = prevIncome - prevExpense;

    const percent = (cur, prev) => {
      if (prev === 0 && cur === 0) return "0%";
      if (prev === 0 && cur > 0) return "N/A";
      return ((cur - prev) / prev * 100).toFixed(1) + "%";
    };

    setIncome(currentIncome);
    setExpense(currentExpense);
    setBalance(currentBalance);

    setIncomeChange(percent(currentIncome, prevIncome));
    setExpenseChange(percent(currentExpense, prevExpense));
    setBalanceChange(percent(currentBalance, prevBalance));

    setSavings(totalSavingsFromGoals);
  };

  useEffect(() => {
    calculateStats();

    const handleStorage = () => calculateStats();
    window.addEventListener("storage", handleStorage);

    const interval = setInterval(calculateStats, 500);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  const stats = [
    {
      title: "Total balance",
      amount: balance,
      change: balanceChange,
      color: balanceChange >= 0 ? "text-green-500" : "text-red-500",
    },
    {
      title: "Income",
      amount: income,
      change: incomeChange,
      color: incomeChange >= 0 ? "text-green-500" : "text-red-500",
    },
    {
      title: "Expense",
      amount: expense,
      change: expenseChange,
      color: expenseChange >= 0 ? "text-green-500" : "text-red-500",
    },
    {
      title: "Total savings (Goals)",
      amount: savings,
      change: savingsChange,
      color: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-all duration-200"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-gray-500 font-medium">{item.title}</h2>
            <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-gray-600" />
            </div>
          </div>

          <p className="text-3xl font-semibold">
            ₹{item.amount.toLocaleString()}
          </p>

          <div className="flex items-center mt-2 gap-1">
            <span className={`text-sm font-medium ${item.color}`}>
              {item.change}
            </span>
            <span className="text-gray-400 text-sm">vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
