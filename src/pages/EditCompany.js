import "../styles/SignUpComp.css";
import { useForm } from "react-hook-form";

const EditCompany = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log({ errors });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container-company">
      <form className="form">
        <h2>Alterar Dados</h2>
        <div className="container-form">
          <label>
            <span>Nome:</span>
            <input
              className={errors?.name && "input-error"}
              type="text"
              placeholder="Nome"
              {...register("name", { required: true })}
            />
            {errors?.name?.type === "required" && (
              <p className="error-message">O nome é obrigatório.</p>
            )}
          </label>
          <label>
            <span>Nome Fantasia</span>
            <input
              className={errors?.name && "input-error"}
              type="text"
              placeholder="Nome"
              {...register("name", { required: true })}
            />
            {errors?.name?.type === "required" && (
              <p className="error-message">O nome fantasia é obrigatório.</p>
            )}
          </label>
          <label>
            <span>Data de abertura:</span>
            <input
              className={errors?.date && "input-error"}
              type="date"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors?.email?.type === "required" && (
              <p className="error-message">A data de abertura é obrigatória.</p>
            )}
          </label>
          <label>
            <span>CNPJ:</span>
            <input
              className={errors?.cnpj && "input-error"}
              type="text"
              placeholder="CNPJ"
              {...register("cnpj", { required: true })}
            />
            {errors?.cnpj?.type === "required" && (
              <p className="error-message">O cnpj é obrigatório.</p>
            )}
          </label>
          <label>
            <span>Atividade Econômica (CNAE):</span>
            <input
              className={errors?.atividadeeco && "input-error"}
              type="text"
              placeholder="CNAE"
              {...register("atividadeeco", { required: true })}
            />
            {errors?.atividadeeco?.type === "required" && (
              <p className="error-message">
                A atividade econômica é obrigatória.
              </p>
            )}
          </label>
          <label>
            <span>Natureza Jurídica:</span>
            <input
              className={errors?.nj && "input-error"}
              type="text"
              placeholder="Natureza Jurídica"
              {...register("nj", { required: true })}
            />
            {errors?.nj?.type === "required" && (
              <p className="error-message">
                A natureza jurídica é obrigatória.
              </p>
            )}
          </label>
          <label>
            <span>Endereço:</span>
            <input
              className={errors?.endereco && "input-error"}
              type="text"
              placeholder="Endereço"
              {...register("endereco", { required: true })}
            />
            {errors?.endereco?.type === "required" && (
              <p className="error-message">O endereço é obrigatório.</p>
            )}
          </label>
          <label>
            <span>Telefone:</span>
            <input
              className={errors?.telefone && "input-error"}
              type="text"
              placeholder="Telefone"
              {...register("telefone", { required: true })}
            />
            {errors?.telefone?.type === "required" && (
              <p className="error-message">O telefone é obrigatório.</p>
            )}
          </label>
          <label>
            <span>Status:</span>
            <select {...register("status")}>
              <option value="0">Inativo</option>
              <option value="1">Ativo</option>
              <option value="2">Pendente</option>
            </select>
          </label>
          <div className="checkbox">
            <input
              type="checkbox"
              name="privacy-policy"
              {...register("privacyTerms", { required: true })}
              className={errors?.privacy && "input-error"}
            />
            <label>Concordo com os termos de privacidade.</label>
            {errors?.privacyTerms?.type === "required" && (
              <p className="error-message-privacy">
                É necessario concordar com os termos para se cadastrar.
              </p>
            )}
          </div>
        </div>
        <div className="submit-input">
          <button onClick={handleSubmit(onSubmit)}>Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default EditCompany;
