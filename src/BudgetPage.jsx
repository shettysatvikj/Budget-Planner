
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("budgets")) || [];
    setBudgets(saved);
  }, []);

  const saveBudgets = (updated) => {
    setBudgets(updated);
    localStorage.setItem("budgets", JSON.stringify(updated));
  };

  const addBudget = () => {
    if (!name || !value) return alert("Enter all fields");

    const newItem = { name, value: Number(value) };
    const updated = [...budgets, newItem];
    saveBudgets(updated);

    setName("");
    setValue("");
  };

  const deleteBudget = (index) => {
    const updated = budgets.filter((_, i) => i !== index);
    saveBudgets(updated);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f5f6fa]">
      {/* Sidebar */}
      <div className="w-full md:w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
  <div className="flex-1 p-5 md:p-10 bg-[#f5f6fa] mt-16 md:mt-0">

        <h1 className="text-2xl md:text-3xl font-bold mb-6">Manage Budget</h1>

        {/* Add Budget */}
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full mb-8">
          <h2 className="text-lg font-semibold mb-4">Add Budget</h2>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <input
              type="text"
              placeholder="Category"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 p-3 border rounded-xl mb-3 sm:mb-0"
            />
            <input
              type="number"
              placeholder="Amount"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 p-3 border rounded-xl mb-3 sm:mb-0"
            />
            <button
              onClick={addBudget}
              className="bg-[#7E62E6] text-white px-4 py-3 rounded-xl w-full sm:w-auto hover:opacity-90 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Show Budgets */}
        <div className="bg-white p-6 rounded-2xl shadow-lg w-full">
          <h2 className="text-lg font-semibold mb-4">Your Budgets</h2>

          {budgets.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No budgets added.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {budgets.map((b, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b py-2 gap-2"
                >
                  <span className="font-medium">{b.name}</span>
                  <span className="font-semibold">₹{b.value}</span>
                  <button
                    onClick={() => deleteBudget(i)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
