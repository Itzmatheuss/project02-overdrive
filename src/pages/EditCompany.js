import "../styles/SignUpComp.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { companyValidationSchema } from "../hooks/CompanyValidation";
import { useMask } from "../hooks/Masks";
import Swal from "sweetalert2";

const EditComp = () => {
  const {
    register,
    setValue,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(companyValidationSchema) });

  const navigate = useNavigate();
  const { maskCnae, phoneMask, maskCep, maskCurrency, maskCnpj } = useMask();

  const checkCEP = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    e.target.value = value;

    const cep = e.target.value.replace(/\D/g, "");
    //console.log(cep);
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.erro) {
            document.getElementById("cep").value = "";
            setFocus("cep");
            setValue("address", data.logradouro);
            setValue("neighborhood", data.bairro);
            setValue("city", data.localidade);
            setValue("uf", "NN");
          } else {
            // register({ name: 'address', value: data.logradouro });
            setValue("address", data.logradouro);
            setValue("neighborhood", data.bairro);
            setValue("city", data.localidade);
            setValue("uf", data.uf);
            setFocus("addressNumber");
          }
        });
    }
    let input = e.target;
    input.value = maskCep(input.value);
  };
  // 60.701.190/0001-04
  const valCnpj = (e) => {
    let cnpj = e.target.value;
    cnpj = cnpj.replace(/\D/g, "");
    e.target.value = cnpj;

    let input = e.target;
    input.value = maskCnpj(input.value);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleFormSubmit = (formData) => {
    onSubmit(formData);
    Swal.fire({
      title: "Empresa alterada com sucesso!",
      text: "",
      icon: "success",
    });
    navigate("/company");
  };

  const handlePhone = (e) => {
    let phone = e.target.value;
    phone = phone.replace(/\D/g, "");
    e.target.value = phone;

    let input = e.target;
    input.value = phoneMask(input.value);
  };

  const mascaraMoeda = (e) => {
    const onlyDigits = e.target.value
      .split("")
      .filter((s) => /\d/.test(s))
      .join("")
      .padStart(3, "0");
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2);
    e.target.value = maskCurrency(digitsFloat);
  };

  const handleCnae = (e) => {
    let cnae = e.target.value;
    cnae = cnae.replace(/\D/g, "");
    e.target.value = cnae;

    let input = e.target;
    input.value = maskCnae(input.value);
  };

  return (
    <div className="container-caixa">
      <div className="container-company">
        <form className="formc" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="container-formc">
            <h2>Dados da Empresa</h2>
            <div className="input-box">
              <label>
                <span>Nome:</span>
                <input
                  className={errors?.companyname && "input-error"}
                  type="text"
                  defaultValue="Overdrive Ltda"
                  placeholder="Nome"
                  {...register("companyname", { required: true })}
                />
                {errors?.companyname && (
                  <p className="error-messagec">
                    {errors?.companyname.message}
                  </p>
                )}
              </label>
            </div>
            <div className="input-box">
              <label>
                <span>Nome Fantasia</span>
                <input
                  className={errors?.fantasyname && "input-error"}
                  type="text"
                  defaultValue="OverDrive"
                  placeholder="Nome Fantasia"
                  {...register("fantasyname", { required: true })}
                />
                {errors?.fantasyname && (
                  <p className="error-messagec">
                    {errors?.fantasyname.message}
                  </p>
                )}
              </label>
            </div>
            <div className="input-box-date">
              <label>
                <span>Data de abertura:</span>
                <input
                  className={errors?.dataAbertura && "input-error"}
                  type="date"
                  value="2024-04-01"
                  {...register("dataAbertura", { required: true })}
                />
                {errors?.dataAbertura && (
                  <p className="error-messagec">
                    {errors?.dataAbertura.message}
                  </p>
                )}
              </label>
            </div>
            <div className="input-box">
              <label>
                <span>CNPJ:</span>
                <input
                  className={errors?.cnpj && "input-error"}
                  mask="00. 000. 000/0001-00"
                  name="cnpj"
                  id="cnpj"
                  defaultValue="60.701.190/0001-04"
                  placeholder="CNPJ"
                  onKeyUp={valCnpj}
                  maxLength={18}
                  {...register("cnpj", { required: true })}
                />
                {errors?.cnpj && (
                  <p className="error-messagec">{errors?.cnpj.message}</p>
                )}
              </label>
            </div>
            <div className="input-box">
              <label>
                <span>Atividade Econômica (CNAE):</span>
                <input
                  className={errors?.atividadeEco && "input-error"}
                  mask="0000-0"
                  defaultValue="0001-1"
                  onKeyUp={handleCnae}
                  placeholder="CNAE"
                  {...register("atividadeEco", { required: true })}
                />
                {errors?.atividadeEco && (
                  <p className="error-messagec">
                    {errors?.atividadeEco.message}
                  </p>
                )}
              </label>
            </div>
            <div className="input-box">
              <label>
                <span>Natureza Jurídica:</span>
                <input
                  className={errors?.nj && "input-error"}
                  type="text"
                  defaultValue="Desenvolvimento"
                  placeholder="Natureza Jurídica"
                  {...register("nj", { required: true })}
                />
                {errors?.nj && (
                  <p className="error-messagec">{errors?.nj.message}</p>
                )}
              </label>
            </div>
            <div className="input-box">
              <label>
                <span>Digite seu CEP:</span>
                <input
                  className={errors?.cep && "input-error"}
                  mask="00000-000"
                  placeholder="CEP"
                  defaultValue="13836-068"
                  maxLength={9}
                  onKeyUp={checkCEP}
                  {...register("cep", { required: true })}
                />
                {errors?.cep && (
                  <p className="error-messagec">{errors?.cep.message}</p>
                )}
              </label>
            </div>
            <div className="input-box">
              <label>
                <span>Cidade:</span>
                <input
                  className={errors?.city && "input-error"}
                  type="text"
                  disabled
                  defaultValue="Araras"
                  placeholder="Cidade"
                  {...register("city", { required: true })}
                />
                {errors?.city && (
                  <p className="error-messagec">{errors?.city.message}</p>
                )}
              </label>
            </div>
            <div className="input-box">
              <label>
                <span>Rua:</span>
                <input
                  className={errors?.address && "input-error"}
                  type="text"
                  disabled
                  defaultValue="Rodolpho Tognasca"
                  placeholder="Rua"
                  {...register("address", { required: true })}
                />
                {errors?.address && (
                  <p className="error-messagec">{errors?.address.message}</p>
                )}
              </label>
            </div>
            <div className="input-box">
              <label>
                <span>Bairro:</span>
                <input
                  className={errors?.neighborhood && "input-error"}
                  type="text"
                  disabled
                  defaultValue="Jardim da Colina"
                  placeholder="Bairro"
                  {...register("neighborhood", { required: true })}
                />
                {errors?.neighborhood && (
                  <p className="error-messagec">
                    {errors?.neighborhood.message}
                  </p>
                )}
              </label>
            </div>
            <div className="input-box">
              <label>
                <span>Número:</span>
                <input
                  className={errors?.addressNumber && "input-error"}
                  type="text"
                  defaultValue={211}
                  placeholder="Número"
                  {...register("addressNumber", { required: true })}
                />
                {errors?.addressNumber && (
                  <p className="error-messagec">
                    {errors?.addressNumber.message}
                  </p>
                )}
              </label>
            </div>
            <div className="input-box-select">
              <label>
                <span>Estado:</span>
                <select
                  {...register("uf")}
                  className={
                    (errors?.uf ? "input-error " : "") +
                    "form-control shadow-none"
                  }
                  disabled
                  defaultValue="SP"
                  required
                  data-input
                >
                  <option value="NN">Estado</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>

                {errors?.uf && (
                  <p className="error-messagec">{errors?.uf.message}</p>
                )}
              </label>
            </div>
            <div className="input-box">
              <label>
                <span>Complemento (Opcional):</span>
                <input type="text" placeholder="Complemento" />
              </label>
            </div>
            <div className="input-box">
              <label>
                <span>Telefone:</span>
                <input
                  className={errors?.phone && "input-error"}
                  onKeyUp={handlePhone}
                  placeholder="(99)9999-9999"
                  defaultValue="(19)99842-1025"
                  {...register("phone", { required: true })}
                />
                {errors?.phone && (
                  <p className="error-messagec">{errors?.phone.message}</p>
                )}
              </label>
            </div>
            <div className="input-box">
              <label>
                <span>Capital:</span>
                <input
                  className={errors?.capital && "input-error"}
                  type="text"
                  onInput={mascaraMoeda}
                  defaultValue="R$ 1.000.000"
                  placeholder="Capital R$"
                  {...register("capital", { required: true })}
                />
                {errors?.capital && (
                  <p className="error-messagec">{errors?.capital.message}</p>
                )}
              </label>
            </div>
            <div className="input-box-select">
              <label>
                <span>Status:</span>
                <select {...register("status")}>
                  <option value="0">Inativo</option>
                  <option value="1">Ativo</option>
                  <option value="2">Pendente</option>
                </select>
              </label>
            </div>
            <div className="submit-input">
              <button type="submit" className="btCadastro">
                Cadastrar
              </button>
              <Link to="/company">
                <button type="submit" className="btCadastro">
                  Voltar
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditComp;
