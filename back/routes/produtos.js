const { Router, request, response } = require("express");
const Produto = require("../models/Produto.js");
const routes = Router();

// Rota para listar produtos
routes.get("/", async (request, response) => {
  try {
    const produtos = await Produto.find({});

    if (produtos.length === 0) {
      return response.status(200).json({ message: "Lista de produtos vazia" });
    } else {
      return response.status(200).json(produtos);
    }
  } catch (error) {
    console.log(`Erro listar produtos: ${error}`);
    return response.status(500).json({ message: "Erro no servidor" });
  }
});

// Rota para buscar pelo nome
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

// Rota para adicionar produtos
routes.post("/", async (request, response) => {
  try {
    const { nome, precoCompra, precoVenda, descricao, estoque } = request.body;
    const produtoCriado = await Produto.create({
      nome,
      precoCompra,
      precoVenda,
      descricao,
      estoque,
    });

    return response.status(201).json(produtoCriado);
  } catch (error) {
    console.log(`Erro criação: ${error}`);
    return response.status(500).json({ message: "Erro ao criar produto." });
  }
});

// Rota para atualizar produto
routes.put("/editar/:nome", async (request, response) => {
  try {
    const nomeParaBuscas = request.params.nome;
    const { nome, precoCompra, precoVenda, descricao } = request.body;

    // findOneAndUpdate(parâmetro de busca, corpo)
    const produtoEditado = await Produto.findOneAndUpdate(
      {
        nome: { $regex: "^" + nomeParaBuscas + "$", $options: "i" },
      },
      {
        nome,
        precoCompra,
        precoVenda,
        descricao,
      },
      {
        new: true,
      }
    );

    if (produtoEditado === null) {
      return response
        .status(404)
        .json({ message: `${nomeParaBuscas} não encontrado` });
    } else {
      return response.status(200).json(produtoEditado);
    }
  } catch (error) {
    console.log(`Erro na edição: ${error}`);
    return response.status(500).json({ message: "erro no servidor" });
  }
});

// Rota para excluir produto
routes.delete("/excluir/:nome", async (request, response) => {
  try {
    const nomeParaDeletar = request.params.nome;
    const produtoExcluido = await Produto.findOneAndDelete({
      nome: { $regex: "^" + nomeParaDeletar + "$", $options: "i" },
    });

    if (produtoExcluido === null) {
      return response
        .status(404)
        .json({ message: `${nomeParaDeletar} não encontrado!` });
    } else {
      return response.status(200).json(produtoExcluido);
    }
  } catch (error) {
    console.log(`Erro na deleção: ${error}`);
    return response
      .status(500)
      .json({ message: "Ocorreu um erro no servidor" });
  }
});

module.exports = routes;
