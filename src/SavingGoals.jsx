// import React, { useEffect, useState } from "react";
// import Sidebar from "./Sidebar";

// export default function SavingGoals() {
//   const [goals, setGoals] = useState([]);
//   const [title, setTitle] = useState("");
//   const [target, setTarget] = useState("");
//   const [saved, setSaved] = useState("");
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     const savedGoals = JSON.parse(localStorage.getItem("savingGoals")) || [];
//     setGoals(savedGoals);
//   }, []);

//   const saveToStorage = (updated) => {
//     setGoals(updated);
//     localStorage.setItem("savingGoals", JSON.stringify(updated));
//   };

//   const addOrUpdateGoal = (e) => {
//     e.preventDefault();

//     const savedAmount = parseFloat(saved);

//     // Update existing goal
//     if (editId) {
//       const updated = goals.map((g) =>
//         g.id === editId
//           ? { ...g, title, target: parseFloat(target), saved: savedAmount }
//           : g
//       );

//       saveToStorage(updated);
//       setEditId(null);
//     } else {
//       // Add new goal
//       const newGoal = {
//         id: Date.now(),
//         title,
//         target: parseFloat(target),
//         saved: savedAmount,
//       };

//       const updated = [...goals, newGoal];
//       saveToStorage(updated);
//     }

//     // Also push to "transactions"
//     const newSavingTransaction = {
//       id: Date.now(),
//       title: title,
//       amount: savedAmount,
//       category: "Savings",
//       type: "savings",
//       date: new Date().toISOString().split("T")[0],
//       month: new Date().getMonth(),
//     };

//     const existingTransactions =
//       JSON.parse(localStorage.getItem("transactions")) || [];

//     existingTransactions.push(newSavingTransaction);

//     localStorage.setItem(
//       "transactions",
//       JSON.stringify(existingTransactions)
//     );

//     // Clear form
//     setTitle("");
//     setTarget("");
//     setSaved("");
//   };

//   // START EDIT
//   const startEdit = (goal) => {
//     setEditId(goal.id);
//     setTitle(goal.title);
//     setTarget(goal.target);
//     setSaved(goal.saved);
//   };

//   // CANCEL EDIT
//   const cancelEdit = () => {
//     setEditId(null);
//     setTitle("");
//     setTarget("");
//     setSaved("");
//   };

//   // DELETE GOAL
//   const removeGoal = (id) => {
//     const updated = goals.filter((g) => g.id !== id);
//     saveToStorage(updated);
//   };

//   return (
//     <div className="flex">
//       <Sidebar />

//       <div className="w-full min-h-screen p-10 bg-[#f5f6fa]">
//         <h1 className="text-4xl font-bold mb-6 text-gray-800">Saving Goals</h1>

//         {/* Form */}
//         <form
//           onSubmit={addOrUpdateGoal}
//           className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-6 rounded-2xl shadow-lg"
//         >
//           <input
//             type="text"
//             placeholder="Goal Title"
//             className="px-4 py-2 rounded-xl border"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />

//           <input
//             type="number"
//             placeholder="Target Amount"
//             className="px-4 py-2 rounded-xl border"
//             value={target}
//             onChange={(e) => setTarget(e.target.value)}
//             required
//           />

//           <input
//             type="number"
//             placeholder="Amount Saved"
//             className="px-4 py-2 rounded-xl border"
//             value={saved}
//             onChange={(e) => setSaved(e.target.value)}
//             required
//           />

//           <div className="col-span-full flex gap-3">
//             <button className="bg-[#7E62E6] text-white py-3 px-6 rounded-xl w-full">
//               {editId ? "Update Goal" : "Add Goal"}
//             </button>

//             {editId && (
//               <button
//                 type="button"
//                 onClick={cancelEdit}
//                 className="bg-gray-300 text-gray-700 py-3 px-6 rounded-xl w-full"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>

//         {/* List */}
//         <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">
//           Your Saving Goals
//         </h2>

//         <div className="bg-white p-5 rounded-2xl shadow-lg border">
//           {goals.length === 0 ? (
//             <p className="text-gray-500 text-center py-6">
//               No saving goals added.
//             </p>
//           ) : (
//             goals.map((g) => (
//               <div
//                 key={g.id}
//                 className="flex justify-between items-center py-4 border-b last:border-none"
//               >
//                 <div>
//                   <p className="font-semibold text-lg">{g.title}</p>
//                   <p className="text-sm text-gray-500">
//                     Saved ₹{g.saved} / ₹{g.target}
//                   </p>
//                 </div>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => startEdit(g)}
//                     className="px-3 py-1.5 bg-blue-500 text-white rounded-lg"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => removeGoal(g.id)}
//                     className="px-3 py-1.5 bg-red-500 text-white rounded-lg"
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
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function SavingGoals() {
  const [goals, setGoals] = useState([]);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [saved, setSaved] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem("savingGoals")) || [];
    setGoals(savedGoals);
  }, []);

  const saveToStorage = (updated) => {
    setGoals(updated);
    localStorage.setItem("savingGoals", JSON.stringify(updated));
  };

  const addOrUpdateGoal = (e) => {
    e.preventDefault();
    const savedAmount = parseFloat(saved);

    if (editId) {
      const updated = goals.map((g) =>
        g.id === editId ? { ...g, title, target: parseFloat(target), saved: savedAmount } : g
      );
      saveToStorage(updated);
      setEditId(null);
    } else {
      const newGoal = {
        id: Date.now(),
        title,
        target: parseFloat(target),
        saved: savedAmount,
      };
      saveToStorage([...goals, newGoal]);
    }

    const newSavingTransaction = {
      id: Date.now(),
      title,
      amount: savedAmount,
      category: "Savings",
      type: "savings",
      date: new Date().toISOString().split("T")[0],
      month: new Date().getMonth(),
    };

    const existingTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    existingTransactions.push(newSavingTransaction);
    localStorage.setItem("transactions", JSON.stringify(existingTransactions));

    setTitle("");
    setTarget("");
    setSaved("");
  };

  const startEdit = (goal) => {
    setEditId(goal.id);
    setTitle(goal.title);
    setTarget(goal.target);
    setSaved(goal.saved);
  };

  const cancelEdit = () => {
    setEditId(null);
    setTitle("");
    setTarget("");
    setSaved("");
  };

  const removeGoal = (id) => {
    const updated = goals.filter((g) => g.id !== id);
    saveToStorage(updated);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-64">
        <Sidebar />
      </div>
<div className="flex-1 p-5 md:p-10 bg-[#f5f6fa] mt-16 md:mt-0">

        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Saving Goals</h1>

        {/* Form */}
        <form
          onSubmit={addOrUpdateGoal}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-6 rounded-2xl shadow-lg"
        >
          <input
            type="text"
            placeholder="Goal Title"
            className="px-4 py-2 rounded-xl border w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Target Amount"
            className="px-4 py-2 rounded-xl border w-full"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Amount Saved"
            className="px-4 py-2 rounded-xl border w-full"
            value={saved}
            onChange={(e) => setSaved(e.target.value)}
            required
          />

          <div className="col-span-full flex flex-col sm:flex-row gap-3">
            <button className="bg-[#7E62E6] text-white py-3 px-6 rounded-xl w-full">
              {editId ? "Update Goal" : "Add Goal"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-300 text-gray-700 py-3 px-6 rounded-xl w-full"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* List */}
        <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-800">Your Saving Goals</h2>
        <div className="bg-white p-5 rounded-2xl shadow-lg border">
          {goals.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No saving goals added.</p>
          ) : (
            goals.map((g) => (
              <div
                key={g.id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b last:border-none gap-3"
              >
                <div>
                  <p className="font-semibold text-lg">{g.title}</p>
                  <p className="text-sm text-gray-500">
                    Saved ₹{g.saved} / ₹{g.target}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(g)}
                    className="px-3 py-1.5 bg-blue-500 text-white rounded-lg"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeGoal(g.id)}
                    className="px-3 py-1.5 bg-red-500 text-white rounded-lg"
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
