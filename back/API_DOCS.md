# Documentação da API - MarketCrud

Esta é a documentação para a API REST do sistema MarketCrud. Todos os endpoints estão prefixados com `/api`.

## Autenticação

Endpoints relacionados ao processo de login e criação de conta.

### 1. Cadastrar Novo Usuário

Cria um novo usuário no sistema e retorna um token de autenticação para login automático.

- **Método:** `POST`
- **Endpoint:** `/api/usuarios`

---

#### Corpo da Requisição (Request Body)

| Campo       | Tipo   | Obrigatório | Descrição                         |
| :---------- | :----- | :---------- | :-------------------------------- |
| `nome`      | String | Sim         | Primeiro nome do usuário.         |
| `sobrenome` | String | Sim         | Sobrenome do usuário.             |
| `login`     | String | Sim         | Nome de usuário único para login. |
| `email`     | String | Sim         | E-mail único do usuário.          |
| `telefone`  | String | Não         | Telefone de contato (opcional).   |
| `senha`     | String | Sim         | Senha com no mínimo 8 caracteres. |

---

#### Resposta de Sucesso (`201 Created`)

Retorna um objeto contendo o token JWT e os dados do usuário recém-criado (sem a senha).

**Exemplo:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "login": "arturrochel",
    "email": "artur@email.com",
    "telefone": "84912345678",
    "nome": "Artur",
    "sobrenome": "Rochel",
    "_id": "65d4c8a9f6b9b3e1a3f1c1e1",
    "createdAt": "2024-02-20T17:49:29.983Z",
    "updatedAt": "2024-02-20T17:49:29.983Z",
    "nomeCompleto": "Artur Rochel"
  }
}
```

---

#### Respostas de Erro

- **`409 Conflict`**: O `login` ou `email` enviado já existe no banco de dados.
  ```json
  {
    "message": "Usuário já cadastrado"
  }
  ```
- **`500 Internal Server Error`**: Um erro inesperado ocorreu no servidor.
  ```json
  {
    "message": "Erro ao criar usuário"
  }
  ```

### 2. Realizar Login

Autentica um usuário existente e retorna um token de acesso.

- **Método:** `POST`
- **Endpoint:** `/api/auth/login` _(Assumindo que `logar` está no `routes/auth.js`)_

---

#### Corpo da Requisição (Request Body)

| Campo   | Tipo   | Obrigatório | Descrição         |
| :------ | :----- | :---------- | :---------------- |
| `login` | String | Sim         | Login do usuário. |
| `senha` | String | Sim         | Senha do usuário. |

---

#### Resposta de Sucesso (`200 OK`)

Retorna um objeto contendo o token JWT e os dados do usuário (sem a senha).

**Exemplo:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "login": "arturrochel",
    "email": "artur@email.com",
    "nome": "Artur",
    "nomeCompleto": "Artur Rochel"
    // ...outros dados do usuário
  }
}
```

---

#### Respostas de Erro

- **`401 Unauthorized`**: Login ou senha incorretos.
  ```json
  {
    "message": "Não foi possível efetuar o login"
  }
  ```
- **`500 Internal Server Error`**: Um erro inesperado ocorreu no servidor.
  ```json
  {
    "message": "Erro ao executar o login"
  }
  ```

## Usuários

Endpoints para gerenciamento de usuários. **(Requer autenticação)**

### 1. Listar todos os Usuários

Retorna uma lista com todos os usuários cadastrados no sistema.

- **Método:** `GET`
- **Endpoint:** `/api/usuarios`

---

#### Resposta de Sucesso (`200 OK`)

Retorna um array de objetos de usuário.

```json
[
  {
    "_id": "65d4c8a9f6b9b3e1a3f1c1e1",
    "login": "arturrochel"
    // ...demais dados
  },
  {
    "_id": "65d4c9b3f6b9b3e1a3f1c1e4",
    "login": "outroUsuario"
    // ...demais dados
  }
]
```

---

#### Respostas de Erro

- **`500 Internal Server Error`**: Um erro inesperado ocorreu no servidor.
  ```json
  {
    "message": "Erro na listagem de usuários"
  }
  ```

### 2. Atualizar um Usuário

Atualiza as informações de um usuário específico, identificado pelo seu login.

- **Método:** `PUT` ou `PATCH`
- **Endpoint:** `/api/usuarios/:login`

---

#### Parâmetros de URL

| Parâmetro | Tipo   | Descrição                            |
| :-------- | :----- | :----------------------------------- |
| `login`   | String | O login do usuário a ser atualizado. |

---

#### Corpo da Requisição (Request Body)

Um objeto contendo qualquer um dos campos permitidos para atualização.

```json
{
  "nome": "Artur Atualizado",
  "telefone": "84987654321"
}
```

---

#### Resposta de Sucesso (`200 OK`)

Retorna o objeto completo do usuário com os dados atualizados.

---

#### Respostas de Erro

- **`404 Not Found`**: O usuário com o `login` especificado não foi encontrado.
- **`500 Internal Server Error`**: Um erro inesperado ocorreu no servidor.

### 3. Deletar um Usuário

Remove um usuário do sistema, identificado pelo seu login.

- **Método:** `DELETE`
- **Endpoint:** `/api/usuarios/:login`

---

#### Parâmetros de URL

| Parâmetro | Tipo   | Descrição                          |
| :-------- | :----- | :--------------------------------- |
| `login`   | String | O login do usuário a ser deletado. |

---

#### Resposta de Sucesso (`200 OK`)

Retorna o objeto do usuário que foi deletado.

---

#### Respostas de Erro

- **`404 Not Found`**: O usuário com o `login` especificado não foi encontrado.
- **`500 Internal Server Error`**: Um erro inesperado ocorreu no servidor.

## Produtos

Endpoints para o gerenciamento completo (CRUD) de produtos no sistema.

### 1. Adicionar um Novo Produto

Cria um novo produto no banco de dados.

- **Método:** `POST`
- **Endpoint:** `/api/produtos`

---

#### Corpo da Requisição (Request Body)

| Campo         | Tipo   | Obrigatório | Descrição                      |
| :------------ | :----- | :---------- | :----------------------------- |
| `nome`        | String | Sim         | Nome único do produto.         |
| `precoCompra` | Number | Sim         | Custo de aquisição do produto. |
| `precoVenda`  | Number | Sim         | Preço de venda ao consumidor.  |
| `descricao`   | String | Não         | Descrição opcional do produto. |

---

#### Resposta de Sucesso (`201 Created`)

Retorna o objeto completo do produto recém-criado.

**Exemplo:**

```json
{
  "_id": "65d4e1a4b9c1d3a4e5f6g7h8",
  "nome": "Café Especial 250g",
  "precoCompra": 15.5,
  "precoVenda": 25.0,
  "descricao": "Café de grãos arábica, torra média.",
  "createdAt": "2024-02-20T20:00:04.482Z",
  "updatedAt": "2024-02-20T20:00:04.482Z"
}
```

---

#### Respostas de Erro

- **`500 Internal Server Error`**: Um erro inesperado ocorreu, como falha de validação do Mongoose (ex: nome duplicado).
  ```json
  {
    "message": "Erro ao adicionar produto"
  }
  ```

### 2. Listar Todos os Produtos (com Paginação)

Retorna uma lista de produtos do banco de dados. Suporta paginação para controlar a quantidade de resultados.

- **Método:** `GET`
- **Endpoint:** `/api/produtos`

---

#### Parâmetros de Query (Query Params)

| Parâmetro | Tipo   | Obrigatório | Padrão | Descrição                           |
| :-------- | :----- | :---------- | :----- | :---------------------------------- |
| `page`    | Number | Não         | 1      | O número da página a ser retornada. |
| `limit`   | Number | Não         | 10     | O número de itens por página.       |

**Exemplo de URL:** `/api/produtos?page=2&limit=20`

---

#### Resposta de Sucesso (`200 OK`)

Retorna um array com os objetos dos produtos encontrados. O array pode estar vazio se não houver produtos.

```json
[
  {
    "_id": "65d4e1a4b9c1d3a4e5f6g7h8",
    "nome": "Café Especial 250g",
    "precoCompra": 15.5,
    "precoVenda": 25.0,
    "descricao": "Café de grãos arábica, torra média."
  }
]
```

---

#### Respostas de Erro

- **`500 Internal Server Error`**: Erro ao buscar os produtos no servidor.

### 3. Buscar Produto por Nome

Busca por produtos cujo nome contenha o termo pesquisado. A busca não diferencia maiúsculas de minúsculas.

- **Método:** `GET`
- **Endpoint:** `/api/produtos/buscar` _(Nota: Confirme este caminho no seu arquivo de rotas)_

---

#### Parâmetros de Query (Query Params)

| Parâmetro | Tipo   | Obrigatório | Descrição                                 |
| :-------- | :----- | :---------- | :---------------------------------------- |
| `nome`    | String | Sim         | O termo a ser buscado no nome do produto. |

**Exemplo de URL:** `/api/produtos/buscar?nome=café`

---

#### Resposta de Sucesso (`200 OK`)

Retorna um array com os objetos dos produtos encontrados.

---

#### Respostas de Erro

- **`404 Not Found`**: Nenhum produto foi encontrado com o termo pesquisado.
- **`500 Internal Server Error`**: Erro ao buscar os produtos no servidor.

### 4. Atualizar um Produto

Atualiza as informações de um produto específico, identificado pelo seu nome.

- **Método:** `PATCH` (ou `PUT`)
- **Endpoint:** `/api/produtos/:nome`

---

#### Parâmetros de URL

| Parâmetro | Tipo   | Descrição                           |
| :-------- | :----- | :---------------------------------- |
| `nome`    | String | O nome do produto a ser atualizado. |

---

#### Corpo da Requisição (Request Body)

Um objeto contendo qualquer um dos campos do produto a serem atualizados.

```json
{
  "precoVenda": 26.5,
  "descricao": "Nova descrição do café."
}
```

---

#### Resposta de Sucesso (`200 OK`)

Retorna o objeto completo do produto com os dados atualizados.

---

#### Respostas de Erro

- **`404 Not Found`**: O produto com o `nome` especificado não foi encontrado.
- **`500 Internal Server Error`**: Erro na edição do produto.

### 5. Deletar um Produto

Remove um produto do sistema, identificado pelo seu nome.

- **Método:** `DELETE`
- **Endpoint:** `/api/produtos/:nome`

---

#### Parâmetros de URL

| Parâmetro | Tipo   | Descrição                         |
| :-------- | :----- | :-------------------------------- |
| `nome`    | String | O nome do produto a ser deletado. |

---

#### Resposta de Sucesso (`200 OK`)

Retorna o objeto do produto que foi deletado.

---

#### Respostas de Erro

- **`404 Not Found`**: O produto com o `nome` especificado não foi encontrado.
- **`500 Internal Server Error`**: Erro na exclusão do produto.
