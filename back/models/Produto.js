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
    vendaUnid: {
      type: Number,
      required: [true, "O preço de venda unitário é obrigatório."],
      min: [0, "O preço não pode ser negativo"],
      validate: {
        validator: Number.isFinite,
        message: "O preço deve ser um número válido.",
      },
    },
    vendaAtac: {
      type: Number,
      required: [true, "O preço de venda no atacado é obrigatório."],
      min: [0, "O preço não pode ser negativo"],
      validate: {
        validator: Number.isFinite,
        message: "O preço deve ser um número válido.",
      },
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    descricao: {
      type: String,
      required: false,
      trim: true,
    },
    variacoes: {
      type: [String],
      required: false,
      trim: true,
      default: [],
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
