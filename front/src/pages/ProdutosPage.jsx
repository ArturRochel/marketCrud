import { buscarProdutos } from "../services/produtoService";
import { useQuery } from "@tanstack/react-query";
import ProdutoCard from "../components/ProdutoCard";
const ProdutosPage = () => {
  const {
    data: produtos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["produtos"],
    queryFn: buscarProdutos,
  });

  if (isLoading) {
    return <span>Carregando produtos...</span>;
  }

  if (isError) {
    return <span>Erro ao buscar produtos: {error.message}</span>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Produtos</h1>
      <p>Aqui terá uma barra de pesquisa</p>
      <p>
        Aqui terá a listagem de todos os produtos cadastrados no banco de dados
      </p>

      <div className="mt-3.5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {produtos?.map((produto, index) => (
          <ProdutoCard key={index} produto={produto} />
        ))}
      </div>
    </div>
  );
};

export default ProdutosPage;
