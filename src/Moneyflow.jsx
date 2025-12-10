import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Moneyflow = () => {
  const [moneyFlowData, setMoneyFlowData] = useState([]);

  useEffect(() => {
    const tx = JSON.parse(localStorage.getItem("transactions")) || [];

    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthly = months.map((m) => ({
      month: m,
      income: 0,
      expense: 0,
    }));

    tx.forEach((t) => {
      if (!t.date) return;

      // Extract month from date string yyyy-mm-dd
      const monthIndex = new Date(t.date).getMonth();

      const isExpense =
        t.category?.toLowerCase() === "expense" ||
        t.type?.toLowerCase() === "expense";

      const isIncome =
        t.category?.toLowerCase() === "income" ||
        t.type?.toLowerCase() === "income";

      if (isIncome) {
        monthly[monthIndex].income += Number(t.amount);
      } else if (isExpense) {
        monthly[monthIndex].expense += Number(t.amount);
      }
    });

    setMoneyFlowData(monthly);
  }, []);

  return (
    <div className="bg-white p-5 rounded-2xl border shadow-sm lg:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Money flow</h2>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={moneyFlowData}>
          <XAxis dataKey="month" />
          <Tooltip />

          <Bar dataKey="income" fill="#9c6bff" radius={[5, 5, 0, 0]} />
          <Bar dataKey="expense" fill="#c6b3ff" radius={[5, 5, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Moneyflow;
