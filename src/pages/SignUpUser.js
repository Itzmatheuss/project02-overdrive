import "../styles/SignUpUser.css";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { userValidationSchema } from "../validation/UserValidation";

import validarCpf from "../hooks/Mask";

const SignUpUser = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userValidationSchema) });

  console.log({ errors });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleCpf = (e) => {
    let input = e.target;
    input.value = cpfMask(input.value);
  };

  const handlePhone = (e) => {
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
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "$1.$2.$3-$4");
  };

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <div className="container-user">
      <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <h2>Insira seus dados</h2>
        <div className="container-form">
          <label>
            <span>Nome:</span>
            <input
              className={errors?.name && "input-error"}
              type="text"
              placeholder="Nome"
              {...register("name")}
            />
            {errors?.name && (
              <p className="error-message">{errors?.name.message}</p>
            )}
          </label>
          <label>
            <span>Email:</span>
            <input
              className={errors?.email && "input-error"}
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors?.email && (
              <p className="error-message">{errors?.email.message}</p>
            )}
          </label>
          <label>
            <span>CPF:</span>
            <input
              className={errors?.cpf && "input-error"}
              placeholder="999.999.999-99"
              mask="000.000.000-00"
              maxLength={11}
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
              mask="(00)0000-0000"
              placeholder="(99)99999-9999"
              onKeyUp={handlePhone}
              maxLength={11}
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
          <button>Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpUser;
