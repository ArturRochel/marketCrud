import LogoArtur from "../assets/arturDev-logo.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { useState } from "react";
import toast from "react-hot-toast";

const CadastroPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const responseData = await registerUser(data);
      console.log(responseData);
    } catch (error) {
      toast.error(error.message);
      reset();
      console.error(`Erro no cadastro de usuário: ${error}`);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="w-full max-w-xs justify-self-center rounded-2xl bg-gray-200 p-4 text-center shadow-lg">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Bem-vindo ao{" "}
            <span className="mb-6 text-3xl font-bold text-blue-600">
              MarketCrud
            </span>
          </h1>
          <p className="text-sm leading-relaxed text-gray-600">
            Plataforma de gerenciamento e organização para mercados e comércios.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-xl">
          <div className="mb-4 text-center">
            <h2 className="mb-2 text-xl font-medium text-white">
              Cadastrar Usuário
            </h2>
            <p className="text-sm text-gray-400">
              Crie sua conta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-meidum mb-1 block text-xs text-white">
                  Nome
                </label>
                <input
                  {...register("nome", {
                    required: "O nome é obrigatório",
                  })}
                  type="text"
                  name="nome"
                  placeholder="Digite seu nome"
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  required
                />
                {errors.nome && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.nome.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-white">
                  Sobrenome
                </label>
                <input
                  {...register("sobrenome", {
                    required: "O sobrenome é obrigatório",
                  })}
                  type="text"
                  name="sobrenome"
                  placeholder="Digite seu sobrenome"
                  className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  required
                />
                {errors.sobrenome && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.sobrenome.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Login
              </label>
              <input
                {...register("login", {
                  required: "O login é obrigatório",
                })}
                type="text"
                name="login"
                placeholder="Digite seu login"
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                required
              />
              {errors.login && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.login.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Email
              </label>
              <input
                {...register("email", {
                  required: "O email é obrigatório",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Por favor, insira um endereço de e-mail válido",
                  },
                })}
                type="email"
                name="email"
                placeholder="Digite seu email"
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                required
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Telefone
              </label>
              <input
                {...register("telefone", {
                  required: "O telefone é obrigatório",
                  pattern: {
                    value: /^\(?\d{2}\)?\s?9\d{4}-?\d{4}$/,
                    message:
                      "Formato de telefone inválido. Ex: (84) 9XXXX-XXXX",
                  },
                })}
                type="tel"
                name="telefone"
                placeholder="(84) 91234-5678"
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                required
              />
              {errors.telefone && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.telefone.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Senha
              </label>
              <input
                {...register("senha", {
                  required: "A senha é obrigatório",
                  minLength: {
                    value: 8,
                    message: "A senha precisa ter no mínimo 8 caracteres",
                  },
                })}
                type="password"
                name="senha"
                placeholder="Digite sua senha"
                className="w-full rounded-lg border border-slate-600 bg-slate-700 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                required
              />
              {errors.senha && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.senha.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`focus:... w-full rounded-lg px-4 py-3 font-medium text-white transition-colors duration-200 ${
                isLoading
                  ? "cursor-not-allowed bg-blue-400"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Cadastrar
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              onClick={() => navigate("/")}
              className="text-sm text-blue-400 transition-colors hover:text-blue-300"
            >
              Já possui conta? Faça login
            </a>
          </div>
        </div>

        <div className="flex w-full max-w-70 flex-col gap-1 justify-self-center rounded-2xl border border-slate-700 bg-slate-800 p-4 text-center shadow-2xl">
          <p className="mt-1 mb-2 text-xs text-gray-500 dark:text-gray-400">
            Sistema desenvolvido por:
          </p>

          <a
            href="https://br.linkedin.com/in/artur-rochel-950361184"
            className="w-full max-w-xs justify-center justify-self-center align-middle"
          >
            <img
              src={LogoArtur}
              alt="Logo Artur.Dev"
              className="w-full max-w-40 justify-self-center"
            />
          </a>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Todos os direitos reservados MarketCrud.ltda
          </p>
        </div>
      </div>
    </div>
  );
};

export default CadastroPage;
