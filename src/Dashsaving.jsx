
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function Dashsaving() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savingGoals")) || [];
    setGoals(saved);
  }, []);

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white w-full max-w-4xl p-6 rounded-2xl shadow border border-black">

        <h2 className="text-xl font-semibold text-black mb-4">
          Saving Goals
        </h2>

        {goals.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No saving goals yet.</p>
            <Link
              to="/savinggoals"
              className="text-[#7E62E6] font-semibold mt-3 inline-block hover:underline"
            >
              Add your first goal →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {goals.map((g) => {
              const percent = Math.min((g.saved / g.target) * 100, 100).toFixed(0);

              return (
                <div
                  key={g.id}
                  className="flex flex-col gap-2 py-4 hover:bg-gray-50 transition px-2 rounded-lg"
                >
                  {/* Title + Icon */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-[16px] font-semibold text-gray-800">
                      {g.title}
                    </h3>

                    <Link 
                      to="/savinggoals"
                      className="p-1 rounded-full hover:bg-gray-200"
                    >
                      <ArrowUpRight className="w-5 h-5 text-gray-700" />
                    </Link>
                  </div>

                  {/* Amount */}
                  <div className="text-sm">
                    <span className="font-semibold text-gray-800">
                      ₹{g.saved.toLocaleString()}
                    </span>
                    <span className="text-gray-500"> / </span>
                    <span className="text-gray-500">
                      ₹{g.target.toLocaleString()}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2.5 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-[#7E62E6] rounded-full"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
