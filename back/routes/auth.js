const { Router } = require("express");
const routes = Router();
const usuarioController = require("../controllers/usuarioController");

// Rota para login e autenticação
routes.post("/login", usuarioController.logar);

module.exports = routes;
