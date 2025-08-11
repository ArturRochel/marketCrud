const Produto = require("../models/Produto.js");

// Listar produtos com paginação
const listarProdutos = async (request, response) => {
  const page = parseInt(request.query.page) || 1;
  const limit = parseInt(request.query.limit) || 10;
  try {
    const produtos = await Produto.find({})
      .skip((page - 1) * limit)
      .limit(limit);
    return response.status(200).json(produtos);
  } catch (error) {
    console.log(`ErroListagem: ${error}`);
    return response
      .status(500)
      .json({ message: "erro na listagem de produtos" });
  }
};

const buscarProduto = async (request, response) => {
  try {
    const { nome } = request.query;
    const produtosBuscados = await Produto.find({
      nome: { $regex: nome, $options: "i" },
    });

    if (produtosBuscados.length === 0) {
      return response
        .status(404)
        .json({ message: "Nenhum produto encontrado" });
    } else {
      return response.status(200).json(produtosBuscados);
    }
  } catch (error) {
    console.log(`ErroBusca: ${error}`);
    return response.status(500).json({ message: "Erro na busca de produtos" });
  }
};

const adicionarProduto = async (request, response) => {
  try {
    const { nome, precoCompra, precoVenda, descricao } = request.body;
    const produtoAdicionado = await Produto.create({
      nome,
      precoCompra,
      precoVenda,
      descricao,
    });

    return response.status(201).json(produtoAdicionado);
  } catch (error) {
    console.log(`ErroAdicao: ${error}`);
    return response.status(500).json({ message: "Erro ao adicionar produto" });
  }
};

const deletarProduto = async (request, response) => {
  try {
    const nomeProduto = request.params.nome;
    const produtoExcluido = await Produto.findOneAndDelete({
      nome: { $regex: "^" + nomeProduto + "$", $options: "i" },
    });

    if (produtoExcluido != null) {
      return response.status(200).json(produtoExcluido);
    } else {
      return response.status(404).json({ message: "Produto não encontrado" });
    }
  } catch (error) {
    console.log(`ErroExclusão: ${error}`);
    return response.status(500).json({ message: "Erro exclusão" });
  }
};

const atualizarProduto = async (request, response) => {
  try {
    const nomeBuscado = request.params.nome;
    const { nome, precoCompra, precoVenda, descricao } = request.body;
    const produtoEditado = await Produto.findOneAndUpdate(
      {
        nome: { $regex: "^" + nomeBuscado + "$", $options: "i" },
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

    if (produtoEditado !== null) {
      return response.status(200).json(produtoEditado);
    } else {
      return response
        .status(404)
        .json({ message: `${nomeBuscado} não encontrado` });
    }
  } catch (error) {
    console.log(`ErroEdição: ${error}`);
    return response.status(500).json({ message: "Erro na edição de produto" });
  }
};

const produtoController = {
  listarProdutos,
  buscarProduto,
  adicionarProduto,
  deletarProduto,
  atualizarProduto,
};

module.exports = produtoController;
