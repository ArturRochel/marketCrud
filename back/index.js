const express = require("express");
const app = express();
const PORT = 3001;
let dbProdutos = [];

app.use(express.json());

app.get("/", (request, response) => {
  response.send(`Market Crud - On : http://localhost:${PORT}`);
});

app.get("/listarProdutos", (request, response) => {
  response.send(dbProdutos);
});

app.post("/novoProduto", (request, response) => {
  const { nome, precoCompra, precoVenda, descricao } = request.body;
  const momentoAtual = new Date();
  const data = momentoAtual.toLocaleDateString("pt-BR");
  const hora = momentoAtual.toLocaleTimeString("pt-BR");

  const novoProduto = {
    id: dbProdutos[dbProdutos.length - 1]
      ? dbProdutos[dbProdutos.length - 1].id + 1
      : 1,
    nome,
    precoCompra,
    precoVenda,
    descricao,
    dataAtualizacao: `${data} ${hora}`,
  };

  response.send(novoProduto);
  dbProdutos.push(novoProduto);
});

app.get("/buscarProduto/:id", (request, response) => {
  const idBusca = +request.params.id;
  const produtoBuscado = dbProdutos.find((produto) => {
    return produto.id === idBusca;
  });
  if (idBusca <= 0) {
    response.send("O id precisa ser positivo");
  } else if (!produtoBuscado) {
    response.send("Produto não encontrado no banco de dados");
  } else {
    response.send(produtoBuscado);
  }
});

//& UTILIZAR SLICE(INDEX, QUANTIDADE) PARA REMOVER O PRODUTO DA ARRAY

// app.delete("/excluirProduto/:id", (request, response) => {
//   const idBusca = +request.params.id;
//   const produtoBuscado = dbProdutos.findIndex((produto) => {
//     return produto.id === idBusca;
//   });

// })

app.listen(PORT, () => {
  console.log(`Server ON => http://localhost:${PORT}`);
});
