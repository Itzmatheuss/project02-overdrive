import "../styles/SignUpUser.css";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { userValidationSchema } from "../hooks/UserValidation";
import { Link } from "react-router-dom";
import ModelS from "../components/ModelS";
import ModelE from "../components/ModelE";

const SignUpUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userValidationSchema) });

  console.log({ errors });

  const onSubmit = (data) => {
    data.preventDefault();
    console.log(data);
  };

  const handleCpf = (e) => {
    let cpf = e.target.value;
    cpf = cpf.replace(/\D/g, "");
    e.target.value = cpf;

    let input = e.target;
    input.value = cpfMask(input.value);
  };

  const handlePhone = (e) => {
    let phone = e.target.value;
    phone = phone.replace(/\D/g, "");
    e.target.value = phone;

    let input = e.target;
    input.value = phoneMask(input.value);
  };

  const phoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  };

  const cpfMask = (cpf) => {
    if (!cpf) return "";
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
    return cpf;
  };

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <div className="container-user">
      <ModelE />
      <ModelS />
      <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <h2>Alterar seus dados</h2>
        <div className="container-form">
          <label>
            <span>Nome:</span>
            <input
              className={errors?.name && "input-error"}
              type="text"
              placeholder="Nome"
              defaultValue="Matheusinho Santos"
              {...register("name")}
            />
            {errors?.name && (
              <p className="error-message">{errors?.name.message}</p>
            )}
          </label>
          <label>
            <span>Nome de Usúario:</span>
            <input
              className={errors?.username && "input-error"}
              type="text"
              defaultValue="Itzmatheuss"
              placeholder="Nome de usúario"
              {...register("username")}
            />
            {errors?.username && (
              <p className="error-message">{errors?.username.message}</p>
            )}
          </label>
          <label>
            <span>CPF:</span>
            <input
              className={errors?.cpf && "input-error"}
              placeholder="999.999.999-99"
              maxLength={14}
              defaultValue="476.410.278-14"
              onKeyUp={handleCpf}
              {...register("cpf")}
            />
            {errors?.cpf && (
              <p className="error-message">{errors?.cpf.message}</p>
            )}
          </label>
          <label>
            <span>Telefone:</span>
            <input
              className={errors?.telefone && "input-error"}
              placeholder="(99)99999-9999"
              onKeyUp={handlePhone}
              defaultValue="(19)99437-7841"
              maxLength={15}
              {...register("telefone")}
            />
            {errors?.telefone && (
              <p className="error-message">{errors?.telefone.message}</p>
            )}
          </label>
          <label>
            <span>Status:</span>
            <select {...register("status")}>
              <option value="2">Pendente</option>
            </select>
          </label>
          <div className="checkbox">
            <input
              type="checkbox"
              name="privacy-policy"
              {...register("privacyTerms")}
              className={errors?.privacy && "input-error"}
            />
            <label>Concordo com os termos de privacidade.</label>
            {errors?.privacyTerms && (
              <p className="error-message-privacy">
                {errors.privacyTerms.message}
              </p>
            )}
          </div>
        </div>
        <div className="submit-input">
          <button className="btnUser">Alterar</button>
          <Link to="/users">
            <button type="submit" className="btnUser">
              Voltar
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpUser;
