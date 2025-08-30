const Produto = require("../models/Produto.js");

const quantidadeProdutos = async (request, response) => {
  try {
    const totalProdutos = await Produto.countDocuments();
    return response.status(200).json({ totalProdutos: totalProdutos });
  } catch (error) {
    console.log(`Erro contarProdutos: ${error}`);
    return response.status(500).json({ message: "Erro ao contar os produtos" });
  }
};

const estatisticasController = {
  quantidadeProdutos,
};

module.exports = estatisticasController;
