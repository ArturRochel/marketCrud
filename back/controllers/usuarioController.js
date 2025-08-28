require("dotenv").config();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Função de login
const logar = async (request, response) => {
  try {
    const { login, senha } = request.body;
    const loginBuscado = await Usuario.findOne({
      login: { $regex: "^" + login + "$", $options: "i" },
    });

    if (loginBuscado !== null) {
      const senhaHash = loginBuscado.senha;
      const comparacao = await bcrypt.compare(senha, senhaHash);

      if (comparacao) {
        const chaveAPI = process.env.JWT_SECRET;
        const token = jwt.sign({ id: loginBuscado._id }, chaveAPI, {
          expiresIn: "2h",
        });

        const usuario = loginBuscado.toJSON();

        delete usuario.senha;
        delete usuario.__v;

        return response.status(200).json({ token, usuario });
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
  } catch (error) {
    console.log(`ErroLogin: ${error}`);
    return response.status(500).json({ message: "Erro ao executar o login" });
  }
};

// Função para cadastrar usuário
const cadastrarUsuario = async (request, response) => {
  try {
    const { login, email, telefone, senha, nome, sobrenome } = request.body;
    const usuarioExistente = await Usuario.findOne({
      $or: [
        { login: { $regex: `^${login}$`, $options: "i" } },
        { email: { $regex: `^${email}$`, $options: "i" } },
      ],
    });

    if (usuarioExistente === null) {
      const usuarioCriado = await Usuario.create({
        login,
        email,
        telefone,
        senha,
        nome,
        sobrenome,
      });

      const chaveAPI = process.env.JWT_SECRET;
      const token = jwt.sign({ id: usuarioCriado._id }, chaveAPI, {
        expiresIn: "2h",
      });

      const usuario = usuarioCriado.toJSON();

      delete usuario.senha;
      delete usuario.__v;

      return response.status(201).json({ token, usuario });
    } else {
      return response.status(409).json({ message: "Usuário já cadastrado" });
    }
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

    const usuario = await Usuario.findOne({
      login: { $regex: `^${loginBuscado}$`, $options: `i` },
    });

    if (!usuario) {
      return response
        .status(404)
        .json({ message: `${loginBuscado} não encontrado` });
    }

    const permissoes = [
      "login",
      "telefone",
      "email",
      "senha",
      "nome",
      "sobrenome",
    ];

    permissoes.forEach((chave) => {
      const valor = request.body[chave];
      if (valor !== undefined) {
        usuario[chave] = valor;
      }
    });

    const usuarioAtualizado = await usuario.save();

    const usuarioObj = usuarioAtualizado.toJSON();
    delete usuarioObj.senha;
    delete usuarioObj.__v;

    return response.status(200).json(usuarioObj);
  } catch (error) {
    console.log(`ErroAtualizarUsuario: ${error}`);
    return response
      .status(500)
      .json({ message: "Erro ao atualizar o usuario" });
  }
};

const usuarioController = {
  logar,
  cadastrarUsuario,
  listarUsuarios,
  deletarUsuario,
  atualizarUsuario,
};

module.exports = usuarioController;
