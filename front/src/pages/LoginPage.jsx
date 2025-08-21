import { useNavigate } from "react-router-dom";
import LogoArtur from "../assets/arturDev-logo.png";
import { useForm } from "react-hook-form";
import { loginUser } from "../services/authService";
import useUserStore from "../stores/useUserStore";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const onSubmit = async (data) => {
    try {
      const responseData = await loginUser(data);
      console.log(`Login bem-sucedido: ${responseData}`);
      setUser(responseData);
      navigate("/dashboard");
    } catch (error) {
      console.error(`Erro no login: ${error}`);
      throw error;
    }
  };
  return (
    <div className="flex flex-col items-center gap-8 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-800 py-16">
      {/* Boas vindas */}
      <div className="w-full max-w-xs rounded-2xl border border-white/20 bg-white/80 p-6 text-center shadow-xl backdrop-blur-sm">
        {/* <div className="mb-2 flex justify-center">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
            <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-red-400"></div>
          </div>
        </div> */}
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          Bem-vindo ao{" "}
          <span className="mb-6 text-3xl font-bold text-blue-600">
            MarketCrud
          </span>
        </h1>
        <p className="leading-relaxed text-gray-600">
          Plataforma de gerenciamento e organização para mercados e comércios.
        </p>
      </div>

      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-xl font-semibold text-white">
            Faça seu login
          </h2>
          <p className="text-gray-800 dark:text-gray-400">
            Acesse sua conta para continuar
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="login"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Login
            </label>
            <input
              {...register("login", {
                required: "O campo de login é obrigatório",
              })}
              type="text"
              name="login"
              placeholder="Digite o seu login"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
            {errors.login && (
              <p className="mt-1 text-xs text-red-500">
                {errors.login.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="senha"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Senha
            </label>
            <input
              {...register("senha", {
                required: "A senha é obrigatória",
                minLength: {
                  value: 8,
                  message: "A senha precisa ter no mínimo 8 caracteres",
                },
              })}
              type="password"
              name="senha"
              id="senha"
              placeholder="Digite a sua senha"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
            {errors.senha && (
              <p className="mt-1 text-xs text-red-500">
                {errors.senha.message}
              </p>
            )}
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

      <div className="flex w-full max-w-70 flex-col gap-1 rounded-2xl border border-slate-700 bg-slate-800 p-4 text-center shadow-2xl">
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
  );
};

export default LoginPage;
