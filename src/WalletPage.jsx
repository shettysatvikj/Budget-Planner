// import React, { useEffect, useState } from "react";
// import { ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react";
// import Sidebar from "./Sidebar";

// export default function WalletPage() {
//   const [walletBalance, setWalletBalance] = useState(0); // raw balance
//   const [balance, setBalance] = useState(0); // balance after savings
//   const [amount, setAmount] = useState("");
//   const [date, setDate] = useState("");
//   const [transactions, setTransactions] = useState([]);

//   // Load wallet and transactions
//   useEffect(() => {
//     const savedWallet = JSON.parse(localStorage.getItem("walletBalance")) || 0;
//     const savedTx = JSON.parse(localStorage.getItem("transactions")) || [];
//     setWalletBalance(savedWallet);
//     setTransactions(savedTx);
//   }, []);

//   // Recalculate balance after savings whenever walletBalance or savingGoals change
//   const recalcBalance = () => {
//     const goals = JSON.parse(localStorage.getItem("savingGoals")) || [];
//     const totalSaved = goals.reduce((sum, g) => sum + (g.saved || 0), 0);
//     setBalance(walletBalance - totalSaved);
//   };

//   useEffect(() => {
//     recalcBalance();

//     // Optional: listen for storage changes from other tabs
//     const handleStorage = () => {
//       const savedWallet = JSON.parse(localStorage.getItem("walletBalance")) || 0;
//       setWalletBalance(savedWallet);
//       recalcBalance();
//       const savedTx = JSON.parse(localStorage.getItem("transactions")) || [];
//       setTransactions(savedTx);
//     };

//     window.addEventListener("storage", handleStorage);
//     return () => window.removeEventListener("storage", handleStorage);
//   }, [walletBalance]);

//   const saveData = (newWalletBalance, newTxList) => {
//     setWalletBalance(newWalletBalance);
//     localStorage.setItem("walletBalance", JSON.stringify(newWalletBalance));

//     setTransactions(newTxList);
//     localStorage.setItem("transactions", JSON.stringify(newTxList));

//     recalcBalance();
//   };

//   const getTransactionDate = () => {
//     return date ? new Date(date).toLocaleString() : new Date().toLocaleString();
//   };

//   const addMoney = () => {
//     if (!amount) return;
//     const newWalletBalance = walletBalance + parseFloat(amount);

//     const newTx = {
//       id: Date.now(),
//       type: "income",
//       title: "Credited",
//       amount: parseFloat(amount),
//       date: getTransactionDate(),
//     };

//     saveData(newWalletBalance, [newTx, ...transactions]);
//     setAmount("");
//     setDate("");
//   };

//   const removeMoney = () => {
//     if (!amount) return;
//     const newWalletBalance = walletBalance - parseFloat(amount);

//     const newTx = {
//       id: Date.now(),
//       type: "expense",
//       title: "Debited",
//       amount: parseFloat(amount),
//       date: getTransactionDate(),
//     };

//     saveData(newWalletBalance, [newTx, ...transactions]);
//     setAmount("");
//     setDate("");
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="w-full min-h-screen p-10 bg-[#f5f6fa]">
//         <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-3">
//           <Wallet className="w-10 h-10 text-[#7E62E6]" /> Wallet
//         </h1>

//         {/* Balance Card */}
//         <div className="bg-white p-8 rounded-2xl shadow-xl border mb-10">
//           <p className="text-gray-600">Current Balance</p>
//           <h2 className="text-4xl font-bold mt-2">₹{balance.toLocaleString()}</h2>
//         </div>

//         {/* Add / Remove Money */}
//         <div className="bg-white p-6 rounded-2xl shadow-xl border mb-10">
//           <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Wallet</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             <input
//               type="number"
//               placeholder="Enter amount"
//               className="px-4 py-3 border rounded-xl"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />
//             <input
//               type="date"
//               className="px-4 py-3 border rounded-xl"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//             <button
//               onClick={addMoney}
//               className="bg-[#7E62E6] text-white py-3 rounded-xl flex items-center justify-center gap-2"
//             >
//               <ArrowUpRight className="w-5 h-5" /> Add Money
//             </button>
//             <button
//               onClick={removeMoney}
//               className="bg-red-500 text-white py-3 rounded-xl flex items-center justify-center gap-2"
//             >
//               <ArrowDownLeft className="w-5 h-5" /> Remove Money
//             </button>
//           </div>
//         </div>

//         {/* Transaction History */}
//         <h2 className="text-2xl font-semibold mb-4 text-gray-800">Transaction History</h2>
//         <div className="bg-white p-6 rounded-2xl shadow-xl border">
//           {transactions.length === 0 ? (
//             <p className="text-center text-gray-500 py-6">No transactions yet.</p>
//           ) : (
//             transactions.map((tx) => (
//               <div
//                 key={tx.id}
//                 className="flex items-center justify-between py-4 border-b last:border-none"
//               >
//                 <div>
//                   <p className="font-semibold text-gray-800">
//                     {tx.type === "income"
//                       ? "Added"
//                       : tx.title === "Saved"
//                       ? "Saved"
//                       : "Spent"} ₹{tx.amount}
//                   </p>
//                   <p className="text-sm text-gray-500">{tx.date}</p>
//                 </div>
//                 {tx.type === "income" ? (
//                   <ArrowUpRight className="w-5 h-5 text-green-600" />
//                 ) : (
//                   <ArrowDownLeft className="w-5 h-5 text-red-600" />
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react";
import Sidebar from "./Sidebar";

export default function WalletPage() {
  const [walletBalance, setWalletBalance] = useState(0);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedWallet = JSON.parse(localStorage.getItem("walletBalance")) || 0;
    const savedTx = JSON.parse(localStorage.getItem("transactions")) || [];
    setWalletBalance(savedWallet);
    setTransactions(savedTx);
  }, []);

  const recalcBalance = () => {
    const goals = JSON.parse(localStorage.getItem("savingGoals")) || [];
    const totalSaved = goals.reduce((sum, g) => sum + (g.saved || 0), 0);
    setBalance(walletBalance - totalSaved);
  };

  useEffect(() => {
    recalcBalance();
    const handleStorage = () => {
      const savedWallet = JSON.parse(localStorage.getItem("walletBalance")) || 0;
      setWalletBalance(savedWallet);
      recalcBalance();
      const savedTx = JSON.parse(localStorage.getItem("transactions")) || [];
      setTransactions(savedTx);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [walletBalance]);

  const saveData = (newWalletBalance, newTxList) => {
    setWalletBalance(newWalletBalance);
    localStorage.setItem("walletBalance", JSON.stringify(newWalletBalance));

    setTransactions(newTxList);
    localStorage.setItem("transactions", JSON.stringify(newTxList));

    recalcBalance();
  };

  const getTransactionDate = () => {
    return date ? new Date(date).toLocaleString() : new Date().toLocaleString();
  };

  const addMoney = () => {
    if (!amount) return;
    const newWalletBalance = walletBalance + parseFloat(amount);
    const newTx = {
      id: Date.now(),
      type: "income",
      title: "Credited",
      amount: parseFloat(amount),
      date: getTransactionDate(),
    };
    saveData(newWalletBalance, [newTx, ...transactions]);
    setAmount("");
    setDate("");
  };

  const removeMoney = () => {
    if (!amount) return;
    const newWalletBalance = walletBalance - parseFloat(amount);
    const newTx = {
      id: Date.now(),
      type: "expense",
      title: "Debited",
      amount: parseFloat(amount),
      date: getTransactionDate(),
    };
    saveData(newWalletBalance, [newTx, ...transactions]);
    setAmount("");
    setDate("");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64">
        <Sidebar />
      </div>

      {/* Main content */}
   <div className="flex-1 p-5 md:p-10 bg-[#f5f6fa] mt-16 md:mt-0">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-3">
          <Wallet className="w-10 h-10 text-[#7E62E6]" /> Wallet
        </h1>

        {/* Balance Card */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border mb-10">
          <p className="text-gray-600">Current Balance</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">₹{balance.toLocaleString()}</h2>
        </div>

        {/* Add / Remove Money */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Manage Wallet</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Enter amount"
              className="px-4 py-3 border rounded-xl w-full"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="date"
              className="px-4 py-3 border rounded-xl w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <button
                onClick={addMoney}
                className="bg-[#7E62E6] text-white py-3 rounded-xl flex items-center justify-center gap-2 w-full"
              >
                <ArrowUpRight className="w-5 h-5" /> Add Money
              </button>
              <button
                onClick={removeMoney}
                className="bg-red-500 text-white py-3 rounded-xl flex items-center justify-center gap-2 w-full"
              >
                <ArrowDownLeft className="w-5 h-5" /> Remove Money
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Transaction History</h2>
        <div className="bg-white p-6 rounded-2xl shadow-xl border">
          {transactions.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No transactions yet.</p>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 border-b last:border-none gap-2"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {tx.type === "income"
                      ? "Added"
                      : tx.title === "Saved"
                      ? "Saved"
                      : "Spent"} ₹{tx.amount}
                  </p>
                  <p className="text-sm text-gray-500">{tx.date}</p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3">
                  {tx.type === "income" ? (
                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
