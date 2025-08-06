const { Router } = require("express");
const routes = Router();

let dbProdutos = []; 

routes.get("/", (request, response) => {
    return response.status(200).json("API de Produtos está online!");
});

routes.post("/", (request, response) => {
    const { nome, precoCompra, precoVenda, descricao } = request.body;
    const objetoData = new Date();
    const data = objetoData.toLocaleDateString("pt-BR");
    const hora = objetoData.toLocaleTimeString("pt-BR");

    const novoProduto = {
        id: dbProdutos.length ? dbProdutos[dbProdutos.length - 1].id + 1 : 1,
        nome,
        precoCompra,
        precoVenda,
        descricao,
        dataAtualizacao: `${data} ${hora}`
    };
    
    dbProdutos.push(novoProduto);

    return response.status(201).json(novoProduto);
});


routes.get("/", (request, response) => {
    return response.status(200).json(dbProdutos);
});


routes.get("/:id", (request, response) => {
    const idBusca = request.params.id;
    const produtoEncontrado = dbProdutos.find((produto) => produto.id == idBusca);

    if (produtoEncontrado) {
        return response.status(200).json(produtoEncontrado);
    } else {
        return response.status(404).json("Produto não encontrado!");
    }
});

routes.put("/:id", (request, response) => {
    const { nome, precoCompra, precoVenda, descricao } = request.body;
    const id = request.params.id;
    const indexProduto = dbProdutos.findIndex(produto => produto.id == id);
    const objetoData = new Date();
    const data = objetoData.toLocaleDateString("pt-BR");
    const hora = objetoData.toLocaleTimeString("pt-BR");

    if (indexProduto !== -1) {
        const atualizacao = {
            ...dbProdutos[indexProduto], 
            id: Number(id),
            nome: nome || dbProdutos[indexProduto].nome, 
            precoCompra: precoCompra || dbProdutos[indexProduto].precoCompra,
            precoVenda: precoVenda || dbProdutos[indexProduto].precoVenda,
            descricao: descricao || dbProdutos[indexProduto].descricao,
            dataAtualizacao: `${data} ${hora}`
        };
        dbProdutos[indexProduto] = atualizacao;
        return response.status(200).json(atualizacao);
    } else {
        return response.status(404).json("Produto não encontrado!");
    }
});


routes.delete("/:id", (request, response) => {
    const idDelete = request.params.id;
    const indexExclusao = dbProdutos.findIndex((produto) => produto.id == idDelete);

    if (indexExclusao !== -1) {
        const produtoExcluido = dbProdutos[indexExclusao]; 
        dbProdutos.splice(indexExclusao, 1);
        return response.status(200).json(produtoExcluido); 
    } else {
        return response.status(404).json("Produto não encontrado");
    }
});

module.exports = routes;