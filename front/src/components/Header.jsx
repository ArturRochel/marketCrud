import { Menu, X } from "lucide-react";
const Header = ({ isOpen, onToggle }) => {
  return (
    <header className="bg-slate-800 p-4 text-white shadow-md md:hidden">
      <div className="container mx-auto flex items-center gap-4">
        <button
          onClick={onToggle}
          className="rounded-lg border border-slate-700/50 bg-slate-800/80 p-2 text-white backdrop-blur-sm transition-all duration-200 hover:bg-slate-700/80 lg:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-xl font-bold">MarketCrud</h1>
      </div>
    </header>
  );
};

export default Header;
