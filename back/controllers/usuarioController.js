require("dotenv").config();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Função de login
const logar = async (request, response) => {
  const { login, senha } = request.body;
  const buscarLogin = await Usuario.findOne({
    login: { $regex: "^" + login + "$", $options: "i" },
  });

  if (buscarLogin !== null) {
    const senhaHash = buscarLogin.senha;
    const comparacao = await bcrypt.compare(senha, senhaHash);
    if (comparacao) {
      const chave = process.env.JWT_SECRET;
      const token = jwt.sign({ id: buscarLogin._id }, chave, {
        expiresIn: "2h",
      });
      return response.status(200).json(token);
    } else {
      return response
        .status(401)
        .json({ message: "Não foi possível efetuar o login" });
    }
  } else {
    return response
      .status(401)
      .json({ message: "Não foi possível efetuar o login" });
  }
};

// Função para cadastrar usuário
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

// Função para deletar usuario
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

// Função para atualizar usuario
const atualizarUsuario = async (request, response) => {
  try {
    const loginBuscado = request.params.login;
    const permissoes = [
      "login",
      "telefone",
      "email",
      "senha",
      "nome",
      "sobrenome",
    ];
    const dadosAtualizados = {};

    permissoes.forEach((chave) => {
      const valor = request.body[chave];
      if (valor !== undefined) {
        dadosAtualizados[chave] = valor;
      }
    });

    const usuarioAtualizado = await Usuario.findOneAndUpdate(
      {
        login: { $regex: "^" + loginBuscado + "$", $options: "i" },
      },
      dadosAtualizados,
      { new: true }
    );
    if (usuarioAtualizado != null) {
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
      .json({ message: "Erro ao atualizar o usuario" });
  }
};
