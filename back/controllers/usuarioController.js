const Usuario = require("../models/Usuario");

const cadastrarUsuario = async (request, response) => {
  try {
    const { login, email, senha, telefone } = request.body;
    const usuarioCriado = await Usuario.create({
      login,
      email,
      senha,
      telefone,
    });

    return response.status(201).json(usuarioCriado);
  } catch (error) {
    console.log(`ErroCriarUsuario: ${error}`);
    return response.status(500).json({ message: "Erro ao criar usuário" });
  }
};

// Essa vai ser uma atribuição permitida apenas ao usuário mestre
const listarUsuarios = async (request, response) => {
  try {
    const usuarios = await Usuario.find({});

    if (usuarios.length === 0) {
      return response
        .status(200)
        .json({ message: "Nenhum usuário cadastrado" });
    } else {
      return response.status(200).json(usuarios);
    }
  } catch (error) {
    console.log(`ErroListagemUsuarios: ${error}`);
    return response
      .status(500)
      .json({ message: "Erro na listagem de usuários" });
  }
};
