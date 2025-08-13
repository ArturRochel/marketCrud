const mongoose = require("mongoose");

const estruturaProduto = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, "O nome do produto é obrigatório."],
      trim: true,
      unique: true,
      index: true,
    },
    precoCompra: {
      type: Number,
      required: [true, "O preço de compra é obrigatório."],
      min: [0, "O preço não pode ser negativo"],
      validate: {
        validator: Number.isFinite,
        message: "O preço deve ser um número válido.",
      },
    },
    precoVenda: {
      type: Number,
      required: [true, "O preço de venda é obrigatório."],
      min: [0, "O preço não pode ser negativo"],
      validate: {
        validator: Number.isFinite,
        message: "O preço deve ser um número válido.",
      },
    },
    descricao: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "produtos",
  }
);

estruturaProduto.virtual("lucroUnitario").get(function () {
  return this.precoVenda - this.precoCompra;
});

module.exports = mongoose.model("Produto", estruturaProduto);
