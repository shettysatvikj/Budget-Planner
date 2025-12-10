import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";   // ✅ ADD THIS

export default function Budget() {
  const [budgetData, setBudgetData] = useState([]);

  const COLORS = ["#845ef7", "#5f3dc4", "#9775fa", "#b197fc", "#d0bfff", "#e5dbff"];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("budgets")) || [];
    setBudgetData(saved);
  }, []);

  return (
    <div className="bg-white p-5 rounded-2xl border shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Budget</h2>

        {/* ✅ When clicked → goes to /budget */}
        <Link to="/budget">
          <ArrowUpRight size={20} className="cursor-pointer hover:text-purple-600 transition" />
        </Link>
      </div>

      <div className="flex justify-center items-center my-4">
        <ResponsiveContainer width="80%" height={200}>
          <PieChart>
            <Tooltip 
              formatter={(value, name, props) => [
                `₹${value}`,
                props.payload.name
              ]}
            />

            <Pie 
              data={budgetData} 
              innerRadius={60} 
              outerRadius={80} 
              dataKey="value"
            >
              {budgetData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {budgetData.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span>{item.name}</span>
            <span className="font-semibold">₹{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
