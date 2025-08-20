import React from "react";

const LoginPage = () => {
  return (
    <div>
      <div className="welcome">
        <h1>Bem vindo ao MarketCRUD</h1>
        <p>Central de gerenciamento de estoque e compras</p>
      </div>

      <div className="bg-blue-300">
        <form action="">
          <label htmlFor="login">Login</label>
          <input type="text" name="login" placeholder="Digite o seu login" />

          <label htmlFor="senha">Senha</label>
          <input
            type="password"
            name="senha"
            id="senha"
            placeholder="Digite a sua senha"
          />

          <button>Logar</button>
          <a href="/">Esqueci a senha</a>
        </form>
      </div>

      <div>
        <p className="text-red-600 font-medium">
          Sistema desenvolvido por: Artur Rochel
        </p>
        <p className="text-gray-400">
          Todos os direitos reservados MarketCrud.ltda
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
