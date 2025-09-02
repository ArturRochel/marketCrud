import api from "./api";

// Função para buscar a lista de produtos
export const buscarProdutos = async () => {
  try {
    const response = await api.get("/produtos");
    return response.data;
  } catch (error) {
    console.error(`Buscar Dados: ${error}`);
    throw error;
  }
};

// Função para buscar estatísticas dos produtos
export const estatisticaProdutos = async () => {
  try {
    const { data } = await api.get("/produtos/estatisticas");
    return data;
  } catch (error) {
    console.log(`Erro ao pegar estatísticas: ${error}`);
    throw error;
  }
};

// Função para cadatrar um novo produto no banco de dados
export const cadastrarProduto = async (data) => {
  try {
    const response = await api.post("/produtos", data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao cadastrar produto: ${error}`);
    throw error;
  }
};
