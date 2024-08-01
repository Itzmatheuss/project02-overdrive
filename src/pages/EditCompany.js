import "../styles/SignUpComp.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { companyValidationSchema } from "../hooks/CompanyValidation";
import { useMask } from "../hooks/Masks";
import { useEffect, useState, useMemo } from "react";
import Swal from "sweetalert2";

import EmpresaService from "../service/EmpresaService";

const EditComp = () => {
  const [empresas, setEmpresas] = useState([]);
  const { id } = useParams();
  const empresaService = useMemo(() => new EmpresaService(), []);

  const navigate = useNavigate();
  const { maskCnae, phoneMask, maskCep, maskCurrency, maskCnpj } = useMask();

  const {
    register,
    setValue,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(companyValidationSchema) });

  useEffect(() => {
    if (id) {
      empresaService
        .listarPorId(id)
        .then((response) => {
          const companyData = response.data;

          console.log("Received company data:", companyData);

          // Verificar se a data é válida
          const dataCadastro = new Date(companyData.dataCadastro);
          if (!isNaN(dataCadastro)) {
            const formattedDate = dataCadastro.toISOString().split("T")[0];
            setValue("dataCadastro", formattedDate);
          } else {
            console.error(
              "Invalid date format received:",
              companyData.dataCadastro
            );
          }

          setValue("nome", companyData.nome);
          setValue("nomeFantasia", companyData.nomeFantasia);
          setValue("cnpj", maskCnpj(companyData.cnpj));
          setValue("cnae", maskCnae(companyData.cnae));
          setValue("naturezaJuridica", companyData.naturezaJuridica);
          setValue("cep", maskCep(companyData.cep));
          setValue("cidade", companyData.cidade);
          setValue("rua", companyData.rua);
          setValue("bairro", companyData.bairro);
          setValue("numero", companyData.numero);
          setValue("estado", companyData.estado);
          setValue("complemento", companyData.complemento);
          setValue("telefone", phoneMask(companyData.telefone));
          setValue("capital", companyData.capital);
          setValue("status", companyData.status);
        })
        .catch((error) => {
          console.error("Error fetching company data:", error);
        });
    }
  }, [empresaService, id, maskCnpj, maskCnae, maskCep, phoneMask]);

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
            Swal.fire({ title: "CEP não encontrado!", icon: "error" });
            document.getElementById("cep").value = "";
            setFocus("cep");
            setValue("rua", data.logradouro);
            setValue("bairro", data.bairro);
            setValue("cidade", data.localidade);
            setValue("estado", "NN");
          } else {
            // register({ name: 'rua', value: data.logradouro });
            setValue("rua", data.logradouro);
            setValue("bairro", data.bairro);
            setValue("cidade", data.localidade);
            setValue("estado", data.uf);
            setFocus("numero");
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
    data.cnpj = data.cnpj.replace(/\D/g, "");
    data.cep = data.cep.replace(/\D/g, "");
    data.status = parseInt(data.status);
    data.id = id;
    empresaService
      .atualizar(data)
      .then(() => {
        Swal.fire({
          title: "Empresa cadastrada com sucesso!",
          text: "",
          icon: "success",
        });
        navigate("/company");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar empresa:", error);
        Swal.fire({
          title: "Erro!",
          text: "Não foi possível cadastrar a empresa.",
          icon: "error",
        });
      });
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
        <form className="formc" onSubmit={handleSubmit(onSubmit)}>
          <div className="container-formc">
            <h2>Dados da Empresa</h2>
            <div className="input-caixa">
              <label>
                <span>Nome:</span>
                <input
                  className={errors?.nome && "input-error"}
                  type="text"
                  defaultValue="Overdrive Ltda"
                  placeholder="Nome"
                  {...register("nome", { required: true })}
                />
                {errors?.nome && (
                  <p className="error-messagec">{errors?.nome.message}</p>
                )}
              </label>
            </div>
            <div className="input-caixa">
              <label>
                <span>Nome Fantasia</span>
                <input
                  className={errors?.nomeFantasia && "input-error"}
                  type="text"
                  defaultValue="OverDrive"
                  placeholder="Nome Fantasia"
                  {...register("nomeFantasia", { required: true })}
                />
                {errors?.nomeFantasia && (
                  <p className="error-messagec">
                    {errors?.nomeFantasia.message}
                  </p>
                )}
              </label>
            </div>
            <div className="input-caixa-date">
              <label>
                <span>Data de abertura:</span>
                <input
                  className={errors?.dataCadastro && "input-error"}
                  type="date"
                  value="2024-04-01"
                  {...register("dataCadastro", { required: true })}
                />
                {errors?.dataCadastro && (
                  <p className="error-messagec">
                    {errors?.dataCadastro.message}
                  </p>
                )}
              </label>
            </div>
            <div className="input-caixa">
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
            <div className="input-caixa">
              <label>
                <span>Atividade Econômica (CNAE):</span>
                <input
                  className={errors?.cnae && "input-error"}
                  mask="0000-0"
                  defaultValue="0001-1"
                  onKeyUp={handleCnae}
                  placeholder="CNAE"
                  {...register("cnae", { required: true })}
                />
                {errors?.cnae && (
                  <p className="error-messagec">{errors?.cnae.message}</p>
                )}
              </label>
            </div>
            <div className="input-caixa">
              <label>
                <span>Natureza Jurídica:</span>
                <input
                  className={errors?.naturezaJuridica && "input-error"}
                  type="text"
                  defaultValue="Desenvolvimento"
                  placeholder="Natureza Jurídica"
                  {...register("naturezaJuridica", { required: true })}
                />
                {errors?.naturezaJuridica && (
                  <p className="error-messagec">
                    {errors?.naturezaJuridica.message}
                  </p>
                )}
              </label>
            </div>
            <div className="input-caixa">
              <label>
                <span>Digite seu CEP:</span>
                <input
                  className={errors?.cep && "input-error"}
                  id="cep"
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
            <div className="input-caixa">
              <label>
                <span>Cidade:</span>
                <input
                  className={errors?.cidade && "input-error"}
                  type="text"
                  disabled
                  defaultValue="Araras"
                  placeholder="Cidade"
                  {...register("cidade", { required: true })}
                />
                {errors?.cidade && (
                  <p className="error-messagec">{errors?.cidade.message}</p>
                )}
              </label>
            </div>
            <div className="input-caixa">
              <label>
                <span>Rua:</span>
                <input
                  className={errors?.rua && "input-error"}
                  type="text"
                  disabled
                  defaultValue="Rodolpho Tognasca"
                  placeholder="Rua"
                  {...register("rua", { required: true })}
                />
                {errors?.rua && (
                  <p className="error-messagec">{errors?.rua.message}</p>
                )}
              </label>
            </div>
            <div className="input-caixa">
              <label>
                <span>Bairro:</span>
                <input
                  className={errors?.bairro && "input-error"}
                  type="text"
                  disabled
                  defaultValue="Jardim da Colina"
                  placeholder="Bairro"
                  {...register("bairro", { required: true })}
                />
                {errors?.bairro && (
                  <p className="error-messagec">{errors?.bairro.message}</p>
                )}
              </label>
            </div>
            <div className="input-caixa">
              <label>
                <span>Número:</span>
                <input
                  className={errors?.numero && "input-error"}
                  type="text"
                  defaultValue={211}
                  placeholder="Número"
                  {...register("numero", { required: true })}
                />
                {errors?.numero && (
                  <p className="error-messagec">{errors?.numero.message}</p>
                )}
              </label>
            </div>
            <div className="input-caixa-select">
              <label>
                <span>Estado:</span>
                <select
                  {...register("estado")}
                  className={
                    (errors?.estado ? "input-error " : "") +
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

                {errors?.estado && (
                  <p className="error-messagec">{errors?.estado.message}</p>
                )}
              </label>
            </div>
            <div className="input-caixa">
              <label>
                <span>Complemento (Opcional):</span>
                <input
                  type="text"
                  placeholder="Complemento"
                  {...register("complemento")}
                />
              </label>
            </div>
            <div className="input-caixa">
              <label>
                <span>Telefone:</span>
                <input
                  className={errors?.telefone && "input-error"}
                  onKeyUp={handlePhone}
                  placeholder="(99)9999-9999"
                  defaultValue="(19)99842-1025"
                  {...register("telefone", { required: true })}
                />
                {errors?.telefone && (
                  <p className="error-messagec">{errors?.telefone.message}</p>
                )}
              </label>
            </div>
            <div className="input-caixa">
              <label>
                <span>Capital:</span>
                <input
                  className={errors?.capital && "input-error"}
                  type="text"
                  onInput={mascaraMoeda}
                  placeholder="Capital R$"
                  {...register("capital", { required: true })}
                />
                {errors?.capital && (
                  <p className="error-messagec">{errors?.capital.message}</p>
                )}
              </label>
            </div>
            <div className="input-caixa-select">
              <label>
                <span>Status:</span>
                <select {...register("status")}>
                  <option value="0">Inativo</option>
                  <option value="1">Pendente</option>
                  <option value="2">Ativo</option>
                </select>
              </label>
            </div>
            <div className="submit-input">
              <button type="submit" className="btCadastro">
                Atualizar
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
