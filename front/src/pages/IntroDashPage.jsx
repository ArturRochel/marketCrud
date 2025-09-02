import { icons, Package } from "lucide-react";
import CardDash from "../components/CardDash";
import { estatisticaProdutos } from "../services/produtoService";
import { useQuery } from "@tanstack/react-query";
import CadastroProduto from "../components/CadastroProduto.jsx";

const IntroDashPage = () => {
  const {
    data: quantidadeProdutos,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["quantidadeProdutos"],
    queryFn: estatisticaProdutos,
  });

  if (isLoading) {
    return <span>Carregando estatísticas...</span>;
  }

  if (isError) {
    return <span>Erro ao buscar estatísticas: {error.message}</span>;
  }

  const item = {
    icone: Package,
    texto: "Produtos Cadastrados",
    numero: quantidadeProdutos.totalProdutos,
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Introdução Dashboard</h1>
      <p>Estatísticas e informações sobre produtos</p>
      <div className="flex">
        <CardDash item={item} />
      </div>
      <CadastroProduto />
    </div>
  );
};

export default IntroDashPage;
