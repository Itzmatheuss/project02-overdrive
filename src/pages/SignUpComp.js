import "../styles/SignUpComp.css";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";

import { yupResolver } from "@hookform/resolvers/yup";
import { companyValidationSchema } from "../hooks/CompanyValidation";

const SignUpComp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(companyValidationSchema) });

  console.log({ errors });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container-company">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Dados da Empresa</h2>
        <div className="container-form">
          <div>
            <label>
              <span>Nome:</span>
              <input
                className={errors?.name && "input-error"}
                type="text"
                placeholder="Nome"
                {...register("name", { required: true })}
              />
              {errors?.name && (
                <p className="error-message">{errors?.name.message}</p>
              )}
            </label>
            <label>
              <span>Nome Fantasia</span>
              <input
                className={errors?.name && "input-error"}
                type="text"
                placeholder="Nome Fantasia"
                {...register("fantasyname", { required: true })}
              />
              {errors?.fantasyname && (
                <p className="error-message">{errors?.fantasyname.message}</p>
              )}
            </label>
          </div>
          <div>
            <label>
              <span>Data de abertura:</span>
              <input
                className={errors?.date && "input-error"}
                type="date"
                {...register("abertura", { required: true })}
              />
              {errors?.abertura && (
                <p className="error-message">{errors?.abertura.message}</p>
              )}
            </label>
            <label>
              <span>CNPJ:</span>
              <IMaskInput
                className={errors?.cnpj && "input-error"}
                mask="00. 000. 000/0001-00"
                placeholder="CNPJ"
                {...register("cnpj", { required: true })}
              />
              {errors?.cnpj && (
                <p className="error-message">{errors?.cnpj.message}</p>
              )}
            </label>
          </div>
          <div>
            <label>
              <span>Atividade Econômica (CNAE):</span>
              <IMaskInput
                className={errors?.atividadeeco && "input-error"}
                mask="0000-0"
                placeholder="CNAE"
                {...register("atividadeeco", { required: true })}
              />
              {errors?.atividadeeco && (
                <p className="error-message">{errors?.atividade.message}</p>
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
              {errors?.nj && (
                <p className="error-message">{errors?.nj.message}</p>
              )}
            </label>
          </div>
          <label>
            <span>Digite seu CEP:</span>
            <IMaskInput
              className={errors?.endereco && "input-error"}
              mask="00000-000"
              placeholder="CEP"
              {...register("cep", { required: true })}
            />
            {errors?.cep && (
              <p className="error-message">{errors?.cep.message}</p>
            )}
          </label>
          <label>
            <span>Cidade:</span>
            <input
              className={errors?.cidade && "input-error"}
              type="text"
              placeholder="Cidade"
              {...register("cidade", { required: true })}
            />
            {errors?.cidade && (
              <p className="error-message">{errors?.cidade.message}</p>
            )}
          </label>
          <label>
            <span>Rua:</span>
            <input
              className={errors?.rua && "input-error"}
              type="text"
              placeholder="Rua"
              {...register("rua", { required: true })}
            />
            {errors?.rua && (
              <p className="error-message">{errors?.rua.message}</p>
            )}
          </label>
          <label>
            <span>Bairro:</span>
            <input
              className={errors?.bairro && "input-error"}
              type="text"
              placeholder="Bairro"
              {...register("bairro", { required: true })}
            />
            {errors?.bairro && (
              <p className="error-message">{errors?.bairro.message}</p>
            )}
          </label>
          <label>
            <span>Número:</span>
            <input
              className={errors?.numero && "input-error"}
              type="text"
              placeholder="Número"
              {...register("numero", { required: true })}
            />
            {errors?.numero && (
              <p className="error-message">{errors?.numero.message}</p>
            )}
          </label>
          <label>
            <span>Telefone:</span>
            <IMaskInput
              className={errors?.telefone && "input-error"}
              mask="(00)0000-0000"
              placeholder="Telefone"
              {...register("telefone", { required: true })}
            />
            {errors?.telefone && (
              <p className="error-message">{errors?.telefone.message}</p>
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
            {errors?.privacyTerms && (
              <p className="error-message-privacy">
                {errors?.privacyTerms.message}
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

export default SignUpComp;
