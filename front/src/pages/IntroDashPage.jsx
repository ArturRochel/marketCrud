import { icons, Package } from "lucide-react";
import CardDash from "../components/CardDash";

const IntroDashPage = () => {
  const cards = [
    {
      icone: Package,
      texto: "Produtos Cadastrados",
      numero: 1132,
    },
  ];

  const item = {
    icone: Package,
    texto: "Produtos Cadastrados",
    numero: 1223,
  };
  return (
    <div>
      <h1 className="text-2xl font-bold">Introdução Dashboard</h1>
      <p>Estatísticas e informações sobre produtos</p>
      <div className="flex">
        <CardDash item={item} />
      </div>
    </div>
  );
};

export default IntroDashPage;
