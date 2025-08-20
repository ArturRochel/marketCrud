// Em pages/LoginPage.jsx

import React from "react";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-around bg-gray-100 dark:bg-gray-900">
      <div className="rounded-2xl border border-white/20 bg-white/80 p-8 text-center shadow-xl backdrop-blur-sm">
        <div className="mb-4 flex justify-center">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
            <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-red-400"></div>
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Bem-vindo ao MarketCrud!
        </h1>
        <p className="leading-relaxed text-gray-600">
          Plataforma de gerenciamento e organização para mercados e comércios.
        </p>
      </div>

      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <form className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="login"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Login
            </label>
            <input
              type="text"
              name="login"
              placeholder="Digite o seu login"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="senha"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Senha
            </label>
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Digite a sua senha"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
          <a
            href="/"
            className="self-end text-sm text-blue-600 hover:underline dark:text-blue-500"
          >
            Esqueci a senha
          </a>
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Logar
          </button>
        </form>
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-red-600">
          Sistema desenvolvido por: Artur Rochel
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Todos os direitos reservados MarketCrud.ltda
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
