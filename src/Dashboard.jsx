import {
  Bar,
  BarChart,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import RecentTransactions from "./RecentTransactions";
import Dashsaving from "./Dashsaving";
import Moneyflow from "./Moneyflow";
import Budget from "./Budget";

export default function Dashboard() {

  // -------- BUDGET DONUT CHART DATA ----------
  const budgetData = [
    { name: "Cafe & Restaurants", value: 400 },
    { name: "Entertainment", value: 200 },
    { name: "Investments", value: 650 },
    { name: "Food & Groceries", value: 300 },
    { name: "Health & Beauty", value: 250 },
    { name: "Traveling", value: 150 },
  ];
  const COLORS = ["#845ef7", "#5f3dc4", "#9775fa", "#b197fc", "#d0bfff", "#e5dbff"];

  


  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ============== MONEY FLOW ============== */}
 <Moneyflow/>

      {/* ============== BUDGET ============== */}
     <Budget/>
      {/* ============== RECENT TRANSACTIONS ============== */}
      <RecentTransactions/>

      {/* ============== SAVING GOALS ============== */}
<Dashsaving/>
    </div>
  );
}
