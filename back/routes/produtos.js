const { Router } = require("express");
const produtoController = require("../controllers/produtoController.js");
const routes = Router();

// Rota para listar produtos
routes.get("/", produtoController.listarProdutos);

// Rota para buscar pelo nome
routes.get("/busca", produtoController.buscarProduto);

// Rota para adicionar produtos
routes.post("/", produtoController.adicionarProduto);

// Rota para atualizar produto
routes.put("/editar/:nome", produtoController.atualizarProduto);

// Rota para excluir produto
routes.delete("/excluir/:nome", produtoController.deletarProduto);

module.exports = routes;
