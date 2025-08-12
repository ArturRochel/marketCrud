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
    },
  },
  {
    timestamps: true,
    collection: "usuarios",
  }
);

// Parte de criptografia - FAZENDO
estruturaUsuario.pre("save", async function (next) {
  if (this.isModified("senha")) {
    console.log("senha modificada");
  } else {
    return next();
  }
  next();
});

module.exports = mongoose.model("Usuario", estruturaUsuario);
