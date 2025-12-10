
// import { useEffect, useState } from "react";
// import { ArrowRight } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function RecentTransactions() {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("transactions")) || [];
//     setTransactions(saved);
//   }, []);

//   return (
//     <div className="bg-white p-5 rounded-2xl border shadow-sm lg:col-span-2">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Recent transactions</h2>

//         <Link
//           to="/transactions"
//           className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-700 transition"
//         >
//           See all <ArrowRight size={16} />
//         </Link>
//       </div>

//       {/* Table */}
//       <table className="w-full text-left text-sm">
//         <thead>
//           <tr className="text-gray-500">
//             <th className="pb-2">DATE</th>
//             <th>AMOUNT</th>
//             <th>PAYMENT NAME</th>
//             <th>METHOD</th>
//             <th>CATEGORY</th>
//           </tr>
//         </thead>

//         <tbody>
//           {transactions.length === 0 ? (
//             <tr>
//               <td colSpan="5" className="text-center py-4 text-gray-500">
//                 No recent transactions
//               </td>
//             </tr>
//           ) : (
//             transactions
//               .slice(-5) // last 5 transactions
//               .reverse()
//               .map((t, i) => (
//                 <tr key={i} className="border-t">
//                   <td className="py-3">{t.date}</td>
//                   <td className="font-medium">₹{t.amount}</td>
//                   <td className="py-3">{t.title}</td>
//                   <td>{t.method}</td>
//                   <td>{t.category}</td>
//                 </tr>
//               ))
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(saved);
  }, []);

  const recent = transactions.slice(-5).reverse();

  return (
    <div className="bg-white p-5 rounded-2xl border shadow-sm lg:col-span-2">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent transactions</h2>

        <Link
          to="/transactions"
          className="text-sm text-gray-500 flex items-center gap-1 hover:text-gray-700 transition"
        >
          See all <ArrowRight size={16} />
        </Link>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-gray-500">
              <th className="pb-2">DATE</th>
              <th>AMOUNT</th>
              <th>PAYMENT NAME</th>
              <th>METHOD</th>
              <th>CATEGORY</th>
            </tr>
          </thead>

          <tbody>
            {recent.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No recent transactions
                </td>
              </tr>
            ) : (
              recent.map((t, i) => (
                <tr key={i} className="border-t">
                  <td className="py-3">{t.date}</td>
                  <td className="font-medium">₹{t.amount}</td>
                  <td className="py-3">{t.title}</td>
                  <td>{t.method}</td>
                  <td>{t.category}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {recent.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No recent transactions
          </div>
        ) : (
          recent.map((t, i) => (
            <div
              key={i}
              className="border rounded-xl p-4 shadow-sm bg-gray-50"
            >
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">{t.date}</span>
                <span className="font-semibold">₹{t.amount}</span>
              </div>

              <p className="mt-2 font-medium">{t.title}</p>

              <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-4">
                <p><span className="font-semibold">Method:</span> {t.method}</p>
                <p><span className="font-semibold">Category:</span> {t.category}</p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
