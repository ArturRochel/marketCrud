import api from "./api";

export const buscarProdutos = async () => {
  try {
    const response = await api.get("/produtos");
    return response.data;
  } catch (error) {
    console.error(`Buscar Dados: ${error}`);
    throw error;
  }
};

export const estatisticaProdutos = async () => {
  try {
    const { data } = await api.get("/produtos/estatisticas");
    return data;
  } catch (error) {
    console.log(`Erro ao pegar estatísticas: ${error}`);
    throw error;
  }
};
