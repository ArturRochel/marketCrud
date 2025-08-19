const apiIndex = {
  status: "success",
  message: "Bem-vindo à API do MarketCrud!",
  version: "1.0.0",
  data: {
    produtos: [
      {
        descricao: "Listar todos os produtos (com paginação)",
        metodo: "GET",
        endpoint: "/api/produtos?page=1&limit=10",
      },
      {
        descricao: "Buscar um produto pelo nome",
        metodo: "GET",
        endpoint: "/api/produtos/busca?nome={nome_do_produto}",
      },
      {
        descricao: "Adicionar um novo produto",
        metodo: "POST",
        endpoint: "/api/produtos",
      },
      {
        descricao: "Atualizar um produto existente",
        metodo: "PUT",
        endpoint: "/api/produtos/editar/{nome_do_produto}",
      },
      {
        descricao: "Excluir um produto",
        metodo: "DELETE",
        endpoint: "/api/produtos/excluir/{nome_do_produto}",
      },
    ],
    usuarios: [
      {
        descricao: "Cadastrar um novo usuário",
        metodo: "POST",
        endpoint: "/api/usuarios/usuarios", // O caminho completo é a junção do index.js com usuarios.js
      },
      {
        descricao: "Atualizar um usuário pelo login",
        metodo: "PUT",
        endpoint: "/api/usuarios/usuarios/{login}",
      },
      {
        descricao: "Deletar um usuário pelo login",
        metodo: "DELETE",
        endpoint: "/api/usuarios/usuarios/{login}",
      },
    ],
    autenticacao: [
      {
        descricao: "Login de usuário para obter token JWT",
        metodo: "POST",
        endpoint: "/api/usuarios/login",
      },
    ],
  },
};

module.exports = apiIndex;
