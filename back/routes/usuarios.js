const { Router } = require("express");
const usuarioController = require("../controllers/usuarioController.js");
const routes = Router();

// Rota para cadastrar usuário
routes.post("/usuarios", usuarioController.cadastrarUsuario);

// Rota para listar usuarios - Apenas usuários ADMIN ou MESTRE podem fazer isso
routes.get("/usuarios", usuarioController.listarUsuarios);

// Rota para deletar usuarios
routes.delete("/usuarios/:login", usuarioController.deletarUsuario);

// Rota para login
routes.post("/login", usuarioController.logar);

// Rota para atualizar usuario
routes.put("/usuarios/:login", usuarioController.atualizarUsuario);
