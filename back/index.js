const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const routes = require("./routes/produtos.js")
require("dotenv").config

const PORT = 3001
const app = express()


app.use(express.json())
app.use(cors())
app.use(routes)



app.listen(PORT, () => {
  console.log(`server on: http://localhost:${PORT}`)
})