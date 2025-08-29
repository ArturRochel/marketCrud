const CardDash = ({ item }) => {
  console.log(item);
  return (
    <div className="mt-6 rounded-lg border border-slate-700/50 bg-slate-800/50 p-6 backdrop-blur-sm transition-all duration-200 hover:bg-slate-700/50">
      <div className="mb-4 flex items-center justify-between">
        <item.icone className="text-blue-400" size={24} />
        <span
          className={
            "rounded bg-green-400/10 px-2 py-1 text-sm font-medium text-green-400"
          }
        >
          Artur Rochel
        </span>
      </div>
      <p className="mb-1 text-2xl font-bold text-white">{item.numero}</p>
      <p className="text-sm text-slate-400">{item.texto}</p>
    </div>
  );
};

export default CardDash;
