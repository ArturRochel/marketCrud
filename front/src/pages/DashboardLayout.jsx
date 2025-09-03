import { useState } from "react";
import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex h-screen bg-slate-900 text-white">
      <Sidebar isOpen={isOpen} onToggle={onToggle} />
      <div
        className={`${isOpen ? "translate-x-64" : "translate-x-0"} flex flex-1 flex-col overflow-hidden transition-transform duration-300 ease-in-out`}
      >
        <Header isOpen={isOpen} onToggle={onToggle} />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
