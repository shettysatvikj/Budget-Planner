
// import React, { useState, useEffect } from "react";

// import Sidebar from "./Sidebar";

// export default function Transactions() {
//   const [transactions, setTransactions] = useState([]);
//   const [title, setTitle] = useState("");
//   const [amount, setAmount] = useState("");
//   const [category, setCategory] = useState("");
//   const [date, setDate] = useState("");
//   const [method, setMethod] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     const savedTx = JSON.parse(localStorage.getItem("transactions")) || [];
//     setTransactions(savedTx);
//   }, []);

//   const handleAddOrUpdate = (e) => {
//     e.preventDefault();

//     if (!title || !amount || !category || !date || !method) {
//       setErrorMessage("Please fill all the details.");
//       return;
//     }

//     let savedBalance = JSON.parse(localStorage.getItem("walletBalance")) || 0;

//     if (editId !== null) {
//       // Adjust balance based on difference
//       const oldTx = transactions.find((tx) => tx.id === editId);
//       const balanceDiff = parseFloat(amount) - oldTx.amount;
//       savedBalance -= balanceDiff; // subtract because expense

//       const updated = transactions.map((tx) =>
//         tx.id === editId
//           ? {
//   ...tx,
//   title,
//   amount: parseFloat(amount),
//   category,
//   date,
//   method,
//   type: "expense",  // always mark as expense
// }

//           : tx
//       );

//       setTransactions(updated);
//       localStorage.setItem("transactions", JSON.stringify(updated));
//       localStorage.setItem("walletBalance", JSON.stringify(savedBalance));

//       // Clear form
//       setEditId(null);
//       setTitle("");
//       setAmount("");
//       setCategory("");
//       setDate("");
//       setMethod("");
//       setErrorMessage("");
//       return;
//     }

//     // Add new transaction
//  const newTx = {
//   id: Date.now(),
//   title,
//   amount: parseFloat(amount),
//   category,
//   date,
//   method,
//   type: "expense",   // 🚀 IMPORTANT
// };


//     const updated = [...transactions, newTx];
//     setTransactions(updated);
//     localStorage.setItem("transactions", JSON.stringify(updated));

//     // Subtract from wallet
//     savedBalance -= parseFloat(amount);
//     localStorage.setItem("walletBalance", JSON.stringify(savedBalance));

//     setTitle("");
//     setAmount("");
//     setCategory("");
//     setDate("");
//     setMethod("");
//     setErrorMessage("");
//   };

//   const handleRemove = (id) => {
//     const txToRemove = transactions.find((tx) => tx.id === id);
//     const filtered = transactions.filter((tx) => tx.id !== id);

//     // Refund wallet
//     let savedBalance = JSON.parse(localStorage.getItem("walletBalance")) || 0;
//     savedBalance += txToRemove.amount;
//     localStorage.setItem("walletBalance", JSON.stringify(savedBalance));

//     setTransactions(filtered);
//     localStorage.setItem("transactions", JSON.stringify(filtered));
//   };

//   const handleEdit = (tx) => {
//     setEditId(tx.id);
//     setTitle(tx.title);
//     setAmount(tx.amount);
//     setCategory(tx.category);
//     setDate(tx.date);
//     setMethod(tx.method);
//   };

//   return (
//     <div className="flex">
//       <Sidebar />

//       <div className="w-full min-h-screen p-10 bg-[#f5f6fa]">
//         <h1 className="text-4xl font-bold mb-6 text-gray-800">
//           {editId ? "Edit Transaction" : "Add Transaction"}
//         </h1>

//         {/* ERROR MESSAGE */}
//         {errorMessage && (
//           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5 rounded-lg">
//             {errorMessage}
//           </div>
//         )}

//         {/* FORM */}
//         <form
//           onSubmit={handleAddOrUpdate}
//           className="grid grid-cols-1 sm:grid-cols-5 gap-4 bg-white p-6 rounded-2xl shadow-lg"
//         >
//           <div className="flex flex-col gap-1">
//             <label className="font-medium text-gray-700">Title</label>
//             <input
//               type="text"
//               className="px-4 py-2 rounded-xl border focus:ring-2 focus:ring-[#7E62E6]"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="font-medium text-gray-700">Amount</label>
//             <input
//               type="number"
//               className="px-4 py-2 rounded-xl border focus:ring-2 focus:ring-[#7E62E6]"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="font-medium text-gray-700">Category</label>
//             <input
//               type="text"
//               className="px-4 py-2 rounded-xl border focus:ring-2 focus:ring-[#7E62E6]"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="font-medium text-gray-700">Date</label>
//             <input
//               type="date"
//               className="px-4 py-2 rounded-xl border focus:ring-2 focus:ring-[#7E62E6]"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </div>

//           <div className="flex flex-col gap-1">
//             <label className="font-medium text-gray-700">Payment Method</label>
//             <input
//               type="text"
//               className="px-4 py-2 rounded-xl border focus:ring-2 focus:ring-[#7E62E6]"
//               value={method}
//               onChange={(e) => setMethod(e.target.value)}
//             />
//           </div>

//           <button className="col-span-full bg-[#7E62E6] rounded-xl text-white font-semibold py-3 mt-2 hover:opacity-90 transition">
//             {editId ? "Update Transaction" : "Add Transaction"}
//           </button>
//         </form>

//         {/* TRANSACTIONS LIST */}
//         <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">
//           Your Transactions
//         </h2>

//         <div className="bg-white p-5 rounded-2xl shadow-lg border divide-y">
//           {transactions.length === 0 ? (
//             <p className="text-gray-500 text-center py-6">
//               No transactions available.
//             </p>
//           ) : (
//             transactions.map((tx) => (
//               <div
//                 key={tx.id}
//                 className="py-4 flex justify-between items-center hover:bg-gray-50 px-2 rounded-lg transition-all"
//               >
//                 <div>
//                   <p className="text-lg font-semibold text-gray-800">
//                     {tx.title}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     {new Date(tx.date).toLocaleDateString()} • {tx.category} •{" "}
//                     {tx.method}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-3">
//                   <p className="font-bold text-gray-800 text-lg">₹{tx.amount}</p>

//                   <button
//                     onClick={() => handleEdit(tx)}
//                     className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => handleRemove(tx.id)}
//                     className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [method, setMethod] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedTx = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(savedTx);
  }, []);

  const handleAddOrUpdate = (e) => {
    e.preventDefault();

    if (!title || !amount || !category || !date || !method) {
      setErrorMessage("Please fill all the details.");
      return;
    }

    let savedBalance = JSON.parse(localStorage.getItem("walletBalance")) || 0;

    if (editId !== null) {
      const oldTx = transactions.find((tx) => tx.id === editId);
      const balanceDiff = parseFloat(amount) - oldTx.amount;
      savedBalance -= balanceDiff;

      const updated = transactions.map((tx) =>
        tx.id === editId
          ? { ...tx, title, amount: parseFloat(amount), category, date, method, type: "expense" }
          : tx
      );

      setTransactions(updated);
      localStorage.setItem("transactions", JSON.stringify(updated));
      localStorage.setItem("walletBalance", JSON.stringify(savedBalance));

      setEditId(null);
      setTitle("");
      setAmount("");
      setCategory("");
      setDate("");
      setMethod("");
      setErrorMessage("");
      return;
    }

    const newTx = {
      id: Date.now(),
      title,
      amount: parseFloat(amount),
      category,
      date,
      method,
      type: "expense",
    };

    const updated = [...transactions, newTx];
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));

    savedBalance -= parseFloat(amount);
    localStorage.setItem("walletBalance", JSON.stringify(savedBalance));

    setTitle("");
    setAmount("");
    setCategory("");
    setDate("");
    setMethod("");
    setErrorMessage("");
  };

  const handleRemove = (id) => {
    const txToRemove = transactions.find((tx) => tx.id === id);
    const filtered = transactions.filter((tx) => tx.id !== id);

    let savedBalance = JSON.parse(localStorage.getItem("walletBalance")) || 0;
    savedBalance += txToRemove.amount;
    localStorage.setItem("walletBalance", JSON.stringify(savedBalance));

    setTransactions(filtered);
    localStorage.setItem("transactions", JSON.stringify(filtered));
  };

  const handleEdit = (tx) => {
    setEditId(tx.id);
    setTitle(tx.title);
    setAmount(tx.amount);
    setCategory(tx.category);
    setDate(tx.date);
    setMethod(tx.method);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <div className="w-full md:w-64">
        <Sidebar />
      </div>

      {/* Main Content */}
<div className="flex-1 p-5 md:p-10 bg-[#f5f6fa] mt-16 md:mt-0">


        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 z-10">
          {editId ? "Edit Transaction" : "Add Transaction"}
        </h1>

        {errorMessage && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5 rounded-lg">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleAddOrUpdate}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-white p-6 rounded-2xl shadow-lg"
        >
          <div className="flex flex-col gap-1 col-span-1">
            <label className="font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="px-4 py-2 rounded-xl border focus:ring-2 focus:ring-[#7E62E6]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 col-span-1">
            <label className="font-medium text-gray-700">Amount</label>
            <input
              type="number"
              className="px-4 py-2 rounded-xl border focus:ring-2 focus:ring-[#7E62E6]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 col-span-1">
            <label className="font-medium text-gray-700">Category</label>
            <input
              type="text"
              className="px-4 py-2 rounded-xl border focus:ring-2 focus:ring-[#7E62E6]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 col-span-1">
            <label className="font-medium text-gray-700">Date</label>
            <input
              type="date"
              className="px-4 py-2 rounded-xl border focus:ring-2 focus:ring-[#7E62E6]"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 col-span-1">
            <label className="font-medium text-gray-700">Payment Method</label>
            <input
              type="text"
              className="px-4 py-2 rounded-xl border focus:ring-2 focus:ring-[#7E62E6]"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            />
          </div>

          <button className="col-span-full bg-[#7E62E6] rounded-xl text-white font-semibold py-3 mt-2 hover:opacity-90 transition">
            {editId ? "Update Transaction" : "Add Transaction"}
          </button>
        </form>

        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">
          Your Transactions
        </h2>

        <div className="bg-white p-5 rounded-2xl shadow-lg border divide-y">
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-6">
              No transactions available.
            </p>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:bg-gray-50 px-2 rounded-lg transition-all gap-3"
              >
                <div>
                  <p className="text-lg font-semibold text-gray-800">{tx.title}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(tx.date).toLocaleDateString()} • {tx.category} • {tx.method}
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                  <p className="font-bold text-gray-800 text-lg">₹{tx.amount}</p>
                  <button
                    onClick={() => handleEdit(tx)}
                    className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemove(tx.id)}
                    className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
