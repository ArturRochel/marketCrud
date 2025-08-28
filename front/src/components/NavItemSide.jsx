import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const NavItemSide = ({ item }) => {
  return (
    <div>
      <li key={item.label}>
        <Link
          to={item.href}
          className="group flex items-center justify-between rounded-lg p-3 text-slate-300 transition-all duration-200 hover:bg-slate-700/50 hover:text-white"
        >
          <div className="flex items-center space-x-3">
            <item.icon
              size={20}
              className="text-slate-400 transition-colors duration-200 group-hover:text-blue-400"
            />
            <span className="font-medium">{item.label}</span>
          </div>
          <ChevronRight
            size={16}
            className="text-slate-500 transition-all duration-200 group-hover:translate-x-1 group-hover:text-slate-300"
          />
        </Link>
      </li>
    </div>
  );
};

export default NavItemSide;
