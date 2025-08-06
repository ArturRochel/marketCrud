const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const routes = require("./routes/produtos.js")
require("dotenv").config

const PORT = process.env.PORT || 3001
const app = express()


app.use(express.json())
app.use(cors())

const mongoUri = process.env.MONGODB_URI

mongoose.connect(mongoUri)
  .then(() => {
    console.log("Conexão com o MongoDB Atlas estabelecida com sucesso.")
    app.listen(PORT, () => {
     console.log(`server on: http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.log("Erro ao conectar ao MondoDB Atlas")
    process.exit(1)
  })

app.use("/api/produtos", routes)