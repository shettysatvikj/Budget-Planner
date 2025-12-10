       import { Routes, Route } from "react-router-dom";

// Pages
import Login from "./Login";
import Signup from "./Signup";
import Landingpage from "./Landingpage";
import Transactions from "./Transactions";
import SavingGoals from "./SavingGoals";
import WalletPage from "./WalletPage";
import Analytics from "./Analytics";
import Help from "./Help";
import BudgetPage from "./BudgetPage";
import SettingsPage from "./SettingsPage";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#f5f6fa]">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Landingpage />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/savinggoals" element={<SavingGoals />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/help" element={<Help />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </div>
  );
}
