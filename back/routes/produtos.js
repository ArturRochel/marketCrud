const { Router } = require("express");
const Produto = require("../models/Produto.js");
const routes = Router();

let dbProdutos = [];

routes.get("/", (request, response) => {
  return response.status(200).json("API de Produtos está online!");
});

routes.post("/", (request, response) => {
  const { nome, precoCompra, precoVenda, descricao } = request.body;
  const objetoData = new Date();
  const data = objetoData.toLocaleDateString("pt-BR");
  const hora = objetoData.toLocaleTimeString("pt-BR");

  const novoProduto = {
    id: dbProdutos.length ? dbProdutos[dbProdutos.length - 1].id + 1 : 1,
    nome,
    precoCompra,
    precoVenda,
    descricao,
    dataAtualizacao: `${data} ${hora}`,
  };

  dbProdutos.push(novoProduto);

  return response.status(201).json(novoProduto);
});

routes.get("/", (request, response) => {
  return response.status(200).json(dbProdutos);
});

routes.get("/busca", async (request, response) => {
  try {
    const { nome } = request.query;
    const produtosEncontrados = await Produto.find({
      nome: { $regex: nome, $options: "i" },
    });

    if (produtosEncontrados.length === 0) {
      return response
        .status(404)
        .json({ message: "Nenhum produto encontrado." });
    } else {
      return response.status(200).json(produtosEncontrados);
    }
  } catch (error) {
    return response.status(500).json({ error: "Ocorreu um erro na busca" });
  }
});

routes.put("/:id", (request, response) => {
  const { nome, precoCompra, precoVenda, descricao } = request.body;
  const id = request.params.id;
  const indexProduto = dbProdutos.findIndex((produto) => produto.id == id);
  const objetoData = new Date();
  const data = objetoData.toLocaleDateString("pt-BR");
  const hora = objetoData.toLocaleTimeString("pt-BR");

  if (indexProduto !== -1) {
    const atualizacao = {
      ...dbProdutos[indexProduto],
      id: Number(id),
      nome: nome || dbProdutos[indexProduto].nome,
      precoCompra: precoCompra || dbProdutos[indexProduto].precoCompra,
      precoVenda: precoVenda || dbProdutos[indexProduto].precoVenda,
      descricao: descricao || dbProdutos[indexProduto].descricao,
      dataAtualizacao: `${data} ${hora}`,
    };
    dbProdutos[indexProduto] = atualizacao;
    return response.status(200).json(atualizacao);
  } else {
    return response.status(404).json("Produto não encontrado!");
  }
});

routes.delete("/excluir", async (request, response) => {
  try {
    const { nome } = request.query;
    const produtoExcluido = await Produto.find({
      nome: { $regex: "^" + nome + "$", $options: "i" },
    });

    if (!produtoExcluido) {
      return response.status(404).json({ message: "Produto não encontrado" });
    } else {
      return response.status(201).json(produtoExcluido);
    }
  } catch (error) {
    response.status(500).json({ message: "Erro na exclusão do produto" });
  }
});

module.exports = routes;
