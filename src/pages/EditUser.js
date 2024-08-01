import "../styles/SignUpUser.css";
import { useState, useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { userValidationSchema } from "../hooks/UserValidation";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import UsuarioService from "../service/UsuarioService";
import EmpresaService from "../service/EmpresaService";

const EditUser = () => {
  const [empresas, setEmpresas] = useState([]);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const usuarioService = useMemo(() => new UsuarioService(), []);
  const companyService = useMemo(() => new EmpresaService(), []);
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userValidationSchema) });

  const status = watch("status");

  useEffect(() => {
    // Carrega a lista de empresas
    companyService.listarTodos().then((response) => {
      setEmpresas(response.data);
    });

    // Carrega o usuário se o ID estiver presente
    if (id) {
      usuarioService
        .listarPorId(id)
        .then((response) => {
          const userData = response.data;
          setUser(userData);

          // Atualiza os valores do formulário
          setValue("nome", userData.nome);
          setValue("username", userData.userName);
          setValue("cpf", cpfMask(userData.cpf));
          setValue("telefone", phoneMask(userData.telefone));
          setValue("status", userData.status);

          if (userData.status === 2) {
            setValue("empresaId", userData.empresaId || "");
          } else {
            setValue("empresaId", "");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar usuário:", error);
        });
    }
  }, [companyService, id, usuarioService]);

  const onSubmit = (data) => {
    console.log(data);
    data.cpf = data.cpf.replace(/\D/g, "");
    data.status = parseInt(data.status);
    data.id = id;
    if (data.empresaId === "") {
      data.empresaId = null;
    }

    usuarioService
      .atualizar(data)
      .then(() => {
        Swal.fire({
          title: "Usuário alterado com sucesso!",
          text: "",
          icon: "success",
        });
        navigate("/users");
      })
      .catch((error) => {
        console.error("Erro ao atualizar usuário:", error);
        Swal.fire({
          title: "Erro!",
          text: "Não foi possível alterar o usuário.",
          icon: "error",
        });
      });
  };

  const handleCpf = (e) => {
    let cpf = e.target.value;
    cpf = cpf.replace(/\D/g, "");
    e.target.value = cpfMask(cpf);
  };

  const handlePhone = (e) => {
    let phone = e.target.value;
    phone = phone.replace(/\D/g, "");
    e.target.value = phoneMask(phone);
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

  return (
    <div className="container-user">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Alterar seus dados</h2>
        <div className="container-form">
          <label>
            <span>Nome:</span>
            <input
              className={errors?.name && "input-error"}
              type="text"
              placeholder="Nome"
              {...register("nome")}
            />
            {errors?.nome && (
              <p className="error-message">{errors?.nome.message}</p>
            )}
          </label>
          <label>
            <span>Nome de Usuário:</span>
            <input
              className={errors?.username && "input-error"}
              type="text"
              placeholder="Nome de Usuário"
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
              <option value="0">Inativo</option>
              <option value="1">Pendente</option>
              <option value="2">Ativo</option>
            </select>
          </label>
          {status == "2" && (
            <label>
              <span>Empresa:</span>
              <select {...register("empresaId")}>
                <option disabled value="">
                  Selecione uma empresa
                </option>
                {empresas.map((empresa) => (
                  <option key={empresa.id} value={empresa.id}>
                    {empresa.nome}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
        <div className="submit-input">
          <button type="submit" className="btnUser">
            Alterar
          </button>
          <Link to="/users">
            <button type="button" className="btnUser">
              Voltar
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
