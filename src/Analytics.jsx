import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Analytics() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(saved);
  }, []);

  const COLORS = ["#7E62E6", "#FF6B6B", "#4ECB71", "#FFA851", "#00C9A7"];

  // Totals
  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + Number(b.amount), 0);

  const expenseTotal = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + Number(b.amount), 0);

  const savingsTotal = transactions
    .filter((t) => t.type === "savings")
    .reduce((a, b) => a + Number(b.amount), 0);

  const pieData = [
    { name: "Income", value: incomeTotal },
    { name: "Expenses", value: expenseTotal },
    { name: "Savings", value: savingsTotal },
  ];

  // Monthly
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthlyData = monthNames.map((month, index) => {
    const expense = transactions
      .filter((t) => t.type === "expense" && Number(t.month) === index)
      .reduce((a, b) => a + Number(b.amount), 0);
    const savings = transactions
      .filter((t) => t.type === "savings" && Number(t.month) === index)
      .reduce((a, b) => a + Number(b.amount), 0);
    return { month, expense, savings };
  });

  // Category-wise
  const categoryMap = {};
  transactions
    .filter((t) => t.type === "expense" || t.type === "savings")
    .forEach((t) => {
      const cat = t.category || "Others";
      categoryMap[cat] = (categoryMap[cat] || 0) + Number(t.amount);
    });
  const categoryData = Object.entries(categoryMap).map(([key, val]) => ({
    name: key,
    value: val,
  }));

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f5f6fa]">
      {/* Sidebar */}
      <div className="w-full lg:w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
<div className="flex-1 p-5 md:p-10 bg-[#f5f6fa] mt-16 md:mt-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">Analytics</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Income vs Expense vs Savings */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border">
            <h2 className="text-xl font-semibold mb-4">Income vs Expense vs Savings</h2>
            <div className="w-full h-64 md:h-80">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData.filter((i) => i.value > 0)}
                    dataKey="value"
                    outerRadius="80%"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Analytics */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border">
            <h2 className="text-xl font-semibold mb-4">Monthly Analytics</h2>
            <div className="w-full h-64 md:h-80">
              <ResponsiveContainer>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="expense" name="Expenses" fill="#FF6B6B" />
                  <Bar dataKey="savings" name="Savings" fill="#4ECB71" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Category-wise Breakdown</h2>
            {categoryData.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No category data yet.</p>
            ) : (
              <div className="w-full h-64 md:h-80">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      dataKey="value"
                      outerRadius="80%"
                      label
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
