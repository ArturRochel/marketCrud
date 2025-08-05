const mongoose = require("mongoose");

const estruturaProduto = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  descricao: {
    type: String,
    required: false,
    trim: true,
  },
  preco: {
    type: Number,
    required: true,
    min: 0,
  },
  estoque: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  dataCadastro: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Produto", estruturaProduto);
