const Usuario = require("../models/Usuario");

// Rota para cadastrar usuário
const cadastrarUsuario = async (request, response) => {
  try {
    const { login, email, telefone, senha, nome, sobrenome } = request.body;
    const usuarioCriado = await Usuario.create({
      login,
      email,
      telefone,
      senha,
      nome,
      sobrenome,
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

// Rota para deletar usuario
const deletarUsuario = async (request, response) => {
  try {
    const loginBuscado = request.params.login;
    const usuarioDeletado = await Usuario.findOneAndDelete({
      login: { $regex: "^" + loginBuscado + "$", $options: "i" },
    });
    if (usuarioDeletado !== null) {
      return response.status(200).json(usuarioDeletado);
    } else {
      return response
        .status(404)
        .json({ message: `${loginBuscado} não encontrado` });
    }
  } catch (error) {
    console.log(`ErroDeletarUsuario: ${error}`);
    return response.status(500).json({ message: "Erro ao deletar usuário" });
  }
};

// Rota para atualizar usuario - TERMINAR
const atualizarUsuario = async (request, response) => {
  try {
    const loginBuscado = request.params.login;
    const { login, telefone, email, senha, nome, sobrenome } = request.body;
    const dados = {};
    const permissoes = [
      "login",
      "telefone",
      "email",
      "senha",
      "nome",
      "sobrenome",
    ];

    permissoes.forEach((item) => {
      const informacao = request.body[item];
      if (informacao != undefined) {
        dados.item = informacao;
      }
    });

    const usuarioAtualizado = await Usuario.findOneAndUpdate(
      {
        login: { $regex: "^" + loginBuscado + "$", $options: "i" },
      },
      dados,
      {
        new: true,
      }
    );

    if (usuarioAtualizado !== null) {
      return response.status(200).json(usuarioAtualizado);
    } else {
      return response
        .status(404)
        .json({ message: `${loginBuscado} não encontrado` });
    }
  } catch (error) {
    console.log(`ErroAtualizarUsuario: ${error}`);
    return response
      .status(500)
      .json({ message: "Erro ao atualizar o usuário." });
  }
};
