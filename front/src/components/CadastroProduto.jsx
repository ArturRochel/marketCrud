import { Package, Plus, Minus } from "lucide-react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { cadastrarProduto } from "../services/produtoService";
import toast from "react-hot-toast";

const ProductRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      variacoes: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variacoes",
  });

  const addVariacao = () => {
    append({ value: "" });
  };

  const onSubmit = async (data) => {
    try {
      const arraySimples = data.variacoes.map((variacao) => variacao.value);
      const novoDado = {
        ...data,
        variacoes: arraySimples,
      };
      const responseData = await cadastrarProduto(novoDado);
      console.log(responseData);
      reset();
      toast.success("Novo produto cadastrado");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao cadastrar produto");
      throw error;
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-slate-700 bg-slate-800/80 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600">
            <Package className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-white">
            Cadastrar Produto
          </h1>
          <p className="text-sm text-slate-400">
            Preencha as informações do produto
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Nome
              </label>
              <input
                {...register("nome", {
                  required: "O nome do produto é obrigatório",
                })}
                type="text"
                name="nome"
                placeholder="Nome do produto"
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Label
              </label>
              <input
                {...register("label", {
                  required: "A label do produto é obrigatória.",
                })}
                type="text"
                name="label"
                placeholder="Label do produto"
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Descrição
            </label>
            <textarea
              {...register("descricao", {
                required: "A descrição do produto é obrigatória.",
              })}
              name="descricao"
              rows={3}
              placeholder="Descrição detalhada do produto"
              className="w-full resize-none rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Preço Compra
              </label>
              <input
                {...register("precoCompra", {
                  required: "O preço que o produto foi comprado é obrigatório.",
                  valueAsNumber: true,
                })}
                type="number"
                step="0.01"
                name="precoCompra"
                placeholder="0,00"
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Venda Unid.
              </label>
              <input
                {...register("vendaUnid", {
                  required: "O preço da venda no varejo é obrigatório",
                  valueAsNumber: true,
                })}
                type="number"
                step="0.01"
                name="vendaUnid"
                placeholder="0,00"
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Venda Atac.
              </label>
              <input
                {...register("vendaAtac", {
                  required: "O preço da venda no atacado é obrigatório",
                  valueAsNumber: true,
                })}
                type="number"
                step="0.01"
                name="vendaAtac"
                placeholder="0,00"
                className="w-full rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Variações
            </label>
            <div className="space-y-2">
              {fields.map((variacao, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    {...register(`variacoes.${index}.value`)}
                    type="text"
                    placeholder="Digite uma variação"
                    className="flex-1 rounded-lg border border-slate-600 bg-slate-700/50 px-4 py-3 text-white placeholder-slate-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  {fields.length > 1 && (
                    <button
                      onClick={() => remove(index)}
                      type="button"
                      className="rounded-lg bg-red-600 px-3 py-3 text-white transition-colors hover:bg-red-700"
                    >
                      <Minus className="h-4 w-4" />
                      Remover Variação
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addVariacao}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-600 px-4 py-3 text-sm text-white transition-colors hover:bg-slate-500"
              >
                <Plus className="h-4 w-4" />
                Adicionar Variação
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full transform rounded-lg bg-blue-600 px-4 py-4 font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 focus:outline-none"
          >
            Cadastrar Produto
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductRegistrationForm;
