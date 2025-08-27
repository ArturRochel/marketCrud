import React from "react";

const Header = () => {
  return (
    <header className="bg-slate-800 p-4 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Lado Esquerdo: Título */}
        <h1 className="text-xl font-bold">MarketCrud</h1>

        {/* Lado Direito: Botão de Menu para Mobile */}
        <div className="md:hidden">
          {/* Por enquanto, é só um botão com texto. 
              Depois, podemos trocar por um ícone de verdade. */}
          <button className="rounded-md p-2 hover:bg-slate-700">Menu</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
