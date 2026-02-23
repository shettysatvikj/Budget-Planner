// import React from "react";
import Sidebar from "./Sidebar";
import {
  HelpCircle,
  FileQuestion,
  Settings,
  Mail,
  BarChart3,
  Wallet,
  Target,
} from "lucide-react";

export default function Help() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#f5f6fa] font-inter">
      {/* Sidebar */}
      <div className="w-full lg:w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
     <div className="flex-1 p-5 md:p-10 bg-[#f5f6fa] mt-16 md:mt-0">

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800 flex items-center gap-3">
          <HelpCircle className="text-[#7E62E6]" size={32} /> Help & Support
        </h1>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {/* Individual Help Cards */}
          {[
            {
              icon: <Wallet className="text-[#7E62E6]" size={28} />,
              title: "Using Your Dashboard",
              items: [
                "View total balance & recent transactions",
                "Quick-add income/expense",
                "Refresh if data doesn’t update",
              ],
            },
            {
              icon: <FileQuestion className="text-[#7E62E6]" size={28} />,
              title: "Managing Transactions",
              items: [
                "Fill title, amount & category",
                "Type must be income or expense",
                "If item missing → check input fields",
              ],
            },
            {
              icon: <Target className="text-[#7E62E6]" size={28} />,
              title: "Saving Goals",
              items: [
                "Add / edit savings goals",
                "Savings automatically added to transactions",
                "Bar not showing? Ensure type = 'savings'",
              ],
            },
            {
              icon: <BarChart3 className="text-[#7E62E6]" size={28} />,
              title: "Analytics Not Showing?",
              items: [
                "Ensure type, category & month fields exist",
                "Clear storage & re-add data if needed",
                "Charts auto-refresh on valid data",
              ],
            },
            {
              icon: <Settings className="text-[#7E62E6]" size={28} />,
              title: "Common Fixes",
              items: [
                "Clear localStorage",
                "Re-add at least one transaction",
                "Refresh analytics page",
              ],
            },
            {
              icon: <Mail className="text-[#7E62E6]" size={28} />,
              title: "Contact Support",
              items: [
                "📧 support@yourapp.com",
                "📞 +91 98765 43210",
               
              ],
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 md:p-6 rounded-2xl shadow-xl border hover:shadow-2xl transition flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                {card.icon}
                <h2 className="text-xl font-semibold">{card.title}</h2>
              </div>
              <ul className="text-gray-600 space-y-2 flex-1">
                {card.items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
