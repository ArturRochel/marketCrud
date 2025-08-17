require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routesProdutos = require("./routes/produtos.js");
const routesUsuarios = require("./routes/usuarios.js");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());

const mongoUri = process.env.MONGODB_URI;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("Conexão com o MongoDB Atlas estabelecida com sucesso.");
    app.listen(PORT, () => {
      console.log(`server on: http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`${error}`);
    process.exit(1);
  });

app.use("/api/produtos", routesProdutos);
app.use("/api/usuarios", routesUsuarios);
