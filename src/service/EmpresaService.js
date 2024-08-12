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
        console.log(errorMessage);

        throw new Error(errorMessage);
      } else if (error.response.data.errors) {
        // Verifica se a resposta tem uma propriedade "errors", indicando o segundo formato
        console.error("Erro de validação:", error.response.data.errors);
        throw new Error(
          "Ocorreram erros de validação. Verifique os dados fornecidos."
        );
      } else {
        console.error("Erro de resposta da API:", error.response.data);
        throw new Error(error.response.data || "Erro desconhecido");
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
export default class EmpresaService {
  static async listarTodos() {
    try {
      const response = await axiosInstance.get("/empresa/all");
      return { success: true, data: response.data };
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }

  static async listarTabela() {
    try {
      const response = await axiosInstance.get("/empresa/front");
      return { success: true, data: response.data };
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }

  static async listarPorId(id) {
    try {
      const response = await axiosInstance.get(`/empresa/id?id=${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }

  static async listarStatus(status) {
    try {
      const response = await axiosInstance.get(
        `/empresa/status?status=${status}`
      );
      return { success: true, data: response.data };
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }

  static async salvar(empresa) {
    try {
      const response = await axiosInstance.post("/empresa", empresa);
      return { success: true, data: response.data };
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }

  static async atualizar(empresa) {
    try {
      const response = await axiosInstance.put(
        `/empresa/${empresa.id}`,
        empresa
      );
      return { success: true, data: response.data };
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }

  static async deletar(id) {
    try {
      const response = await axiosInstance.delete(`/empresa/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      ErrorHandler.handle(error);
      throw error;
    }
  }
}
