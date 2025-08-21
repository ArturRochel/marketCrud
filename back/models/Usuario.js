const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const estruturaUsuario = new mongoose.Schema(
  {
    login: {
      type: String,
      required: [true, "O login é obrigatório."],
      trim: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      index: true,
      match: [/.+\@.+\..+/, "Por favor, insira um email válido"],
    },
    telefone: {
      type: String,
      trim: true,
    },
    senha: {
      type: String,
      required: [true, "A senha é obrigatória."],
      trim: true,
      minlength: [8, "A senha deve ter no mínimo 8 caracteres"],
    },
    nome: {
      type: String,
      required: [true, "O nome é obrigatório"],
      trim: true,
    },
    sobrenome: {
      type: String,
      required: [true, "O sobrenome é obrigatório"],
      trim: true,
    },
  },
  {
    timestamps: true,
    collection: "usuarios",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

estruturaUsuario.virtual("nomeCompleto").get(function () {
  return this.nome + " " + this.sobrenome;
});
// Estrutura de criptografia com bcrypt
estruturaUsuario.pre("save", async function (next) {
  if (!this.isModified("senha")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10); // Gera um tempero para modificação da senha
    this.senha = await bcrypt.hash(this.senha, salt); // Modifica a senha gerando um hash único
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Usuario", estruturaUsuario);
