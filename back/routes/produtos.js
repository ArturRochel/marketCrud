const express = require("express");
const router = express.Router();

const Produto = require("../models/Produto");

router.get("/", async (req, res) => {
  try {
    const produtos = await Produto.find(); //* Busca todos os produtos no banco de dados
    res.status(200).json(produtos);
    console.log(produtos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//* Exemplo de rota para criar produto
router.post("/", async (req, res) => {
  const produto = new Produto({
    nome: req.body.nome,
    descricao: req.body.descricao,
    preco: req.body.preco,
    estoque: req.body.estoque,
  });
  try {
    const novoProduto = await produto.save();
    res.status(200).json(novoProduto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
