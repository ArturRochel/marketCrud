import { Package, User } from "lucide-react";
import NavItemSide from "./NavItemSide";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, onToggle }) => {
  const menuItems = [
    {
      icon: Package,
      label: "Produtos",
      href: "/dashboard/produtos",
    },
    {
      icon: User,
      label: "Perfil",
      href: "/dashboard/perfil",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full border-r border-slate-700/50 bg-slate-800/95 backdrop-blur-lg transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:relative lg:translate-x-0"} w-64 lg:w-62`}
      >
        {/* Header */}
        <div className="border-b border-slate-700/50 p-6">
          <Link
            className="border-b border-slate-700/50"
            to="/dashboard"
            onClick={onToggle}
          >
            <h2 className="text-xl font-bold text-white">
              Market<span className="text-blue-400">Crud</span>
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Plataforma de gerenciamento
            </p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <NavItemSide item={item} key={index} onToggle={onToggle} />
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-700/50 p-4">
          <div className="rounded-lg bg-slate-700/50 p-3">
            <p className="text-center text-xs text-slate-400">
              Sistema desenvolvido por
            </p>
            <p className="mt-1 text-center text-sm font-medium text-white">
              Artur.dev
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
