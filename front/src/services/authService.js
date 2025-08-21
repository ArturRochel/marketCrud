import api from "./api";

export const loginUser = async (data) => {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (error) {
    console.error(`Erro ao tentar logar: ${error}`);
    throw error;
  }
};
