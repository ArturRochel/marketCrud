import { buscarProdutos } from "../services/produtoService";
import { useQuery } from "@tanstack/react-query";
import ProdutoCard from "../components/ProdutoCard";
const ProdutosPage = () => {
  // const {
  //   data: produtos,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["produtos"],
  //   queryFn: buscarProdutos,
  // });

  // if (isLoading) {
  //   return <span>Carregando produtos...</span>;
  // }

  // if (isError) {
  //   return <span>Erro ao buscar produtos: {error.message}</span>;
  // }

  const produtos = [
  {
    "id": 1,
    "nome": "Arroz Branco 5kg",
    "label": "Tipo 1 - Marca Premium",
    "precoCompra": 18.5,
    "vendaUnid": 25.9,
    "vendaAtac": 23.5
  },
  {
    "id": 2,
    "nome": "Feijão Carioca 1kg",
    "label": "Grãos selecionados",
    "precoCompra": 6.2,
    "vendaUnid": 8.9,
    "vendaAtac": 7.8
  },
  {
    "id": 3,
    "nome": "Açúcar Cristal 1kg",
    "label": "Alta pureza",
    "precoCompra": 3.5,
    "vendaUnid": 5.2,
    "vendaAtac": 4.6
  },
  {
    "id": 4,
    "nome": "Café Torrado 500g",
    "label": "Intensidade forte",
    "precoCompra": 9.8,
    "vendaUnid": 14.9,
    "vendaAtac": 13.2
  },
  {
    "id": 5,
    "nome": "Óleo de Soja 900ml",
    "label": "Refinado",
    "precoCompra": 5.9,
    "vendaUnid": 8.5,
    "vendaAtac": 7.6
  },
  {
    "id": 6,
    "nome": "Macarrão Espaguete 500g",
    "label": "Massa de sêmola",
    "precoCompra": 2.8,
    "vendaUnid": 4.5,
    "vendaAtac": 3.9
  }
]

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
