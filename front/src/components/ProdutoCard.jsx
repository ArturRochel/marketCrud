import { Package2, DollarSign, ShoppingCart } from "lucide-react";

const ProdutoCard = ({ produto }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  console.log(produto);

  const profit = produto.precoVenda - produto.precoCompra;
  const profitMargin = (profit / produto.precoVenda) * 100;

  return (
    <div className="h-86 w-full rounded-xl border border-slate-700/50 bg-slate-800 p-6 transition-all duration-300 hover:border-cyan-400/30 hover:shadow-xl hover:shadow-cyan-400/10">
      {/* Header com ícone e nome */}
      <div className="mb-4 flex items-start gap-3">
        <div className="rounded-lg bg-cyan-400/10 p-2">
          <Package2 className="h-5 w-5 text-cyan-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-cyan-400">
            {produto.nome}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-slate-300">
            {produto.descricao}
          </p>
        </div>
      </div>

      {/* Estoque */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-400">Estoque Disponível</span>
          <span
            className={`text-2xl font-bold ${produto.estoque > 50 ? "text-green-400" : produto.estoque > 10 ? "text-yellow-400" : "text-red-400"}`}
          >
            {produto.estoque}
          </span>
        </div>
        <div className="mt-1 text-xs text-slate-500">unidades</div>
      </div>

      {/* Preços */}
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-slate-700/50 p-3">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-300">Preço de Compra</span>
          </div>
          <span className="font-semibold text-white">
            {formatPrice(produto.precoCompra)}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 p-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Preço de Venda</span>
          </div>
          <span className="text-lg font-bold text-cyan-400">
            {formatPrice(produto.precoVenda)}
          </span>
        </div>

        {/* Margem de Lucro */}
        <div className="flex items-center justify-between border-t border-slate-700 pt-2">
          <span className="text-xs text-slate-400">Margem de Lucro</span>
          <div className="text-right">
            <div className="text-sm font-semibold text-green-400">{0.0}</div>
            <div className="text-xs text-green-400/70">{33}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutoCard;
