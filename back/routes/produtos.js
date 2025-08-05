const {Router} =  require("express")
const routes = Router()

let dbProdutos = []

routes.get("/", (request, response) => {
  return response.status(200).json("Market Crud - On server")
})

// Listar os produtos armazenados
routes.get("/listarProdutos", (request, response) => {
  return response.status(200).json(dbProdutos)
})

// Adicionar novo produto
routes.post("/novoProduto", (request, response) => {
  const {nome, precoCompra, precoVenda, descricao} = request.body
  const objetoData = new Date()
  const data = objetoData.toLocaleDateString("pt-BR")
  const hora = objetoData.toLocaleTimeString("pt-BR")

  const novoProduto = {
    id: dbProdutos.length ? dbProdutos[dbProdutos.length-1].id + 1 : 1,
    nome,
    precoCompra,
    precoVenda,
    descricao,
    dataAtualizacao: `${data} ${hora}`
  }

  return response.status(201).json(novoProduto)
  dbProdutos.push(novoProduto)
})

// Buscar produto pelo id
routes.get("/buscarProduto/:id", (request, response) => {
  const idBusca = request.params.id
  const index = dbProdutos.findIndex((produto) => produto.id == idBusca)
  if(index != -1) {
    return response.status(200).json(dbProdutos[index])
  } else {
    return response.status(404).json("Produto não encontrado!")
  }
})

//Deletar produto pelo id
routes.delete("/excluirProduto/:id", (request, response) => {
  const idDelete = request.params.id
  const indexExclusao = dbProdutos.findIndex((produto) => {
   return produto.id == idDelete
  })

  if(indexExclusao != -1) {
    return response.status(200).json(dbProdutos[indexExclusao])
    dbProdutos.splice(indexExclusao, 1)
  } else {
    return response.status(404).json("Produto não encontrado")
  }
})

// Atualizar usuário
routes.put("/atualizar/:id", (request, response) => {
  const {nome, precoCompra, precoVenda, descricao} = request.body
  const id = request.params.id
  const indexProduto = dbProdutos.findIndex(produto => produto.id == id)
  const objetoData = new Date()
  const data = objetoData.toLocaleDateString("pt-BR")
  const hora = objetoData.toLocaleTimeString("pt-BR")

  const atualizacao = {
      id: dbProdutos[indexProduto].id,
      nome,
      precoCompra,
      precoVenda,
      descricao,
      dataAtualizacao: `${data} ${hora}`
  }

  if(indexProduto != -1) {
    dbProdutos[indexProduto] = atualizacao
    return response.status(200).json(atualizacao)
  } else {
    return response.status(404).json("Produto não encontrado!")
  }
})

module.exports = routes