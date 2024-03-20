import "../styles/SignUpUser.css";

import { useForm } from "react-hook-form";

const EditUser = () => {
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
    <div className="container">
      <form className="form">
        <h2>Altere seus dados</h2>
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
            <span>Email:</span>
            <input
              className={errors?.email && "input-error"}
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors?.email?.type === "required" && (
              <p className="error-message">O email é obrigatório.</p>
            )}
          </label>
          <label>
            <span>CPF:</span>
            <input
              className={errors?.cpf && "input-error"}
              type="text"
              placeholder="CPF"
              {...register("cpf", { required: true })}
            />
            {errors?.cpf?.type === "required" && (
              <p className="error-message">O cpf é obrigatório.</p>
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

export default EditUser;
