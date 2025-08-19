const { Router } = require("express");
const usuarioController = require("../controllers/usuarioController.js");
const routes = Router();

// Rota para cadastrar usuário
routes.post("/", usuarioController.cadastrarUsuario);

// Rota para listar usuarios - Apenas usuários ADMIN ou MESTRE podem fazer isso
routes.get("/", usuarioController.listarUsuarios);

// Rota para deletar usuarios
routes.delete("/:login", usuarioController.deletarUsuario);

// Rota para atualizar usuario
routes.put("/:login", usuarioController.atualizarUsuario);

module.exports = routes;
