import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://localhost:7001/api",
});

class ErrorHandler {
  static handle(error) {
    let errorMessage = "";
    if (error.response) {
      if (Array.isArray(error.response.data)) {
        errorMessage = error.response.data
          .map((err) => `<p>${err.errorMessage}</p>`)
          .join("\n");

        throw new Error(errorMessage);
      } else if (error.response.data.errors) {
        // Verifica se há uma propriedade "errors" na resposta, indicando o segundo formato
        console.error("Erro de validação:", error.response.data.errors);
        throw new Error(
          "Ocorreram erros de validação. Verifique os dados fornecidos."
        );
      } else {
        console.error("Erro de resposta da API:", error.response.data);
        throw new Error(error.response.data || "Erro ao salvar usuário");
      }
    } else if (error.request) {
      console.error("Erro de requisição:", error.request);
      throw new Error("Erro na requisição. Verifique a conexão.");
    } else {
      console.error("Erro:", error.message);
      throw new Error(error.message || "Erro inesperado");
    }
  }
}

class UsuarioService {
  static async listarTodos() {
    try {
      const response = await axiosInstance.get("/usuario/all");
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }

  static async listarTabela() {
    try {
      const response = await axiosInstance.get("/usuario/front");
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }

  static async listarPorId(id) {
    try {
      const response = await axiosInstance.get(`/usuario/id?id=${id}`);
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }

  static async listarUltimo() {
    try {
      const response = await axiosInstance.get("/usuario/ultimo-user");
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }

  static async salvar(usuario) {
    try {
      const response = await axiosInstance.post("/usuario", usuario);
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }

  static async atualizar(usuario) {
    try {
      const response = await axiosInstance.put(
        `/usuario/${usuario.id}`,
        usuario
      );
      return response.data;
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }

  static async deletar(id) {
    try {
      const response = await axiosInstance.delete(`/usuario/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }
}

export default UsuarioService;
