const { Router } = require("express");
const produtoController = require("../controllers/produtoController.js");
const estatisticasController = require("../controllers/estatisticasController");
const routes = Router();

// Rota para listar produtos
routes.get("/", produtoController.listarProdutos);

// Rota para buscar pelo nome
routes.get("/busca", produtoController.buscarProduto);

// Rota para adicionar produtos
routes.post("/", produtoController.adicionarProduto);

// Rota para atualizar produto
routes.put("/:nome", produtoController.atualizarProduto);

// Rota para excluir produto
routes.delete("/:nome", produtoController.deletarProduto);

// Rota para exibir estatísticas de produtos - Quantidade de produtos
routes.get("/estatisticas", estatisticasController.quantidadeProdutos);

module.exports = routes;
