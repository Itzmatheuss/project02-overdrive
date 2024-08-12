import "../styles/SignUpUser.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { userValidationSchema } from "../hooks/UserValidation";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UsuarioService from "../service/UsuarioService";

const SignUpUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userValidationSchema) });

  const onSubmit = async (data) => {
    data.cpf = data.cpf.replace(/\D/g, "");
    data.empresaId = null; // Definindo empresaId como null diretamente
    data.status = parseInt(data.status);

    try {
      await UsuarioService.salvar(data);

      Swal.fire({
        title: "Usuário cadastrado com sucesso!",
        icon: "success",
        showCancelButton: true,
        confirmButtonText: "Ativar usuário",
        cancelButtonText: "Voltar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const ultimoUsuario = await UsuarioService.listarUltimo();
          if (ultimoUsuario && ultimoUsuario.id) {
            navigate(`/users/edituser/${ultimoUsuario.id}`);
          }
        } else {
          navigate("/users");
        }
      });
    } catch (error) {
      const errorMessage =
        error.message || "Erro inesperado ao cadastrar o usuário.";
      Swal.fire({
        title: "Erro!",
        html: errorMessage,
        icon: "error",
      });
    }
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
        <h2>Insira seus dados</h2>
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
              <option value="1">Pendente</option>
            </select>
          </label>
        </div>
        <div className="submit-input">
          <button className="btnUser">Cadastrar</button>
          <Link to="/">
            <button type="button" className="btnUser">
              Voltar
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpUser;
