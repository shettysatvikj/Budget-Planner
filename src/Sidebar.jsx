import React, { useState } from "react";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Goal,
  HandCoins,
  ChartSpline,
  LogOut,
  Settings,
  MessageCircleQuestionMark,
  Menu,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard" },
    { name: "Transactions", icon: <ArrowLeftRight size={20} />, path: "/transactions" },
    { name: "Wallet", icon: <Wallet size={20} />, path: "/wallet" },
    { name: "Goals", icon: <Goal size={20} />, path: "/savinggoals" },
    { name: "Budget", icon: <HandCoins size={20} />, path: "/budget" },
    { name: "Analytics", icon: <ChartSpline size={20} />, path: "/analytics" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
    { name: "Help", icon: <MessageCircleQuestionMark size={20} />, path: "/help" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden fixed top-0 left-0 w-full  bg-white shadow-sm z-40 flex items-center justify-between px-4 py-3">
        <h1 className="text-xl font-semibold">Finsync</h1>
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE SIDEBAR (Slide-in) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 p-5 transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="text-2xl font-semibold mb-8">Finsync</h1>

        <ul className="flex flex-col gap-4 text-sm font-medium">
          {menuItems.map((item, i) => (
            <li
              key={i}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
                location.pathname === item.path
                  ? "bg-[#7e62e6] text-white"
                  : "hover:bg-[#7e62e63a]"
              }`}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>

        <p
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 mt-10 rounded-lg cursor-pointer text-red-600 
          hover:bg-red-200 transition"
        >
          <LogOut size={20} /> Logout
        </p>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex fixed  left-0 top-0 h-screen w-[15%] bg-[#ada7b438] p-5 flex-col justify-between">
        {/* Logo */}
        <div>
          <div className="flex gap-4 items-center">
            <img
              className="rounded-full h-13"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEUAAAD////m5ub39/cwMDCbm5v4+Pj7+/v09PQdHR0EBAQiIiI3NzcgICDx8fEVFRVISEhDQ0MQEBCAgIAsLCxNTU08PDzp6enh4eGMjIzOzs5paWmXl5fZ2dnFxcW0tLSlpaW+vr5fX1+vr6+hoaF1dXVUVFRHFAopAAAEZ0lEQVR4nO3bi3KbOhAGYBEcJASYS2wndi49Tpq+/yN2V2AXp/I500F4dej/zSTEl2n1Z3UB4SgFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAj7ePdjTw9NjIR/0lu5UMmoFJPNwr4JBVQlTfJp5NSKJ+1an+TiHv+r6Qc6Dc8L50cxNI5cwekiJ1swufZEz7LBlTq28wBv0kHVGo9a8C1dDxlVTNjPp1sldw0OiS06mXGiPeSC8U5o3qdLeCreAV7m9mWjI10tJMHf/smB3+QDvbL/t7Df+lxfPG912svHeu/eIen3GVCePfeEkYzsqbbxj6yJltnnoBvKpLpP4Cjr4JmQQF9lxw6eZduVjidr4vK7SfN4OALeCfdqoD2ifacz7TSzQrFXtmCe5FuWEDebVTh/aSg/PsatXSzAtoUHvVyVsLp4vlVFOUqgM1mtRk/ltrB91l5x9tULxHVMMRusNbpem10en4isin3ODlhpteavs4J09hmpMm7wVmapSYdrrToREh8C/+r7Zfm/vHeU5qYLDPna8ljZBVUvFUxCmVM6o1xpXwci7uooZ7aP/UY01LRu9wNXqd/kFCnxkWkbnq+1BL6PMK/sWp1qiE12NVQu0Kmad/uLBtS0xOaXurfrQ2PP0cn/fv5pe9cQatsngvfMrz04PopNd4YriE1lWqT0oEjGg5h9PADPZnxm4dwlDIzmebXDb/0qrqC/sGusDYvpGONvbkhSAFdDbnpnMcYbWixc0+nfSbtcrvxSu+k6vJR00H3L5d5ZStlC1VsVBHVeDQ8mrjpa64Ll47bnvWldPWhwXaOcpqRKGGmdUZHo937HqzKqYh1V9R5V0mHuvDcL2tDQmordbx1yimo5fStj0AP1hy9H7L90zQe++C05B9Upeq6UFTHguoY06Rq1Qdn6juomzu4SG6izIYxyTH4QeJy0/qQurnUrfackAevpXSckOpYuwp20WSkhtwlPNpcd+x7aT9V8jhMeY4dJ+RVws2zPFg5PL9skneV9wktVbAqOtXVMV0zt/4V7+LQ/3TtpOdDdUNC1VXWdrmqq1w61thqVzbbptzRod2Rst1um+2uLMumWbV0bOhrOLZNW/aahr+39LChjpDTSXfBdeuqorKUOJpFMYIb7TPjX/fvqgXdRlPWO7iO0s0K6C/YwvdpY1qyp/Fs4Wv+SOhyeLfwX6VbFYz1f5pdR7VYT/PDe5byKd2sUOyVzbbFLBR0MnP05MuMdMMC+vQuFD+kmxVO4T2Z+S7drICufHBtMUs99VFfDVfSzQrJt9gv6WTGewPxsKA+ysvhb58NNtFcl4fy9iVhdDfHJrNmFE/H8Pctwb2PKxjhzbEAPkYJI7w5FsLjOeCSTmbGdqeAy7nqvXT+sye9pO3DMXs6Pf1c4iwzKDjg24IDWr5MlP9DyHkdl/QpfK/6fsF99C+BAgIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8z/wEFVkyf8qBDt4AAAAASUVORK5CYII="
              alt=""
              width={50}
            />
            <h1 className="text-2xl font-semibold">Finsync</h1>
          </div>

          {/* Menu */}
          <ul className="flex flex-col gap-4 text-sm font-medium mt-10 ml-2">
            {menuItems.map((item, i) => (
              <li
                key={i}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${
                  location.pathname === item.path
                    ? "bg-[#7e62e6] text-white"
                    : "hover:bg-[#7e62e63a]"
                }`}
              >
                {item.icon}
                {item.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <p
          className="flex items-center mt-5  gap-2 px-3 py-2 rounded-full cursor-pointer 
            hover:bg-[#ff5151]/30 text-red-600 transition"
          onClick={handleLogout}
        >
          <LogOut size={20} /> Logout
        </p>
      </div>

      {/* MOBILE BOTTOM NAVBAR */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-xl flex justify-around py-2 z-40">
        {menuItems.slice(0, 5).map((item, i) => (
          <button
            key={i}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center text-xs ${
              location.pathname === item.path ? "text-[#7e62e6]" : "text-gray-500"
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
