import api from "./api";

export const loginUser = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    let errorMessage = "Ocorreu um erro inesperado. Tente novamente.";

    if (error.response) {
      errorMessage = error.response.data.message || "Login ou senha inválidos.";
    } else if (error.request) {
      errorMessage = "Não foi possível conectar ao servidor.";
    }

    // Lança um novo erro contendo apenas a mensagem amigável
    throw new Error(errorMessage);
  }
};

// AuthService é a função que vai realizar o login de fato, ela vai até a API levando as informações de login e senha
// A api irá até o banco de dados verificar se as credenciais são válidas, se forem válidas o JWT irá gerar um token para esse usuário
// A partir desse retorno nós vamos ter o token e os dados do usuários
// Na parte de LoginPage esses dados serão setados no useUserStore
