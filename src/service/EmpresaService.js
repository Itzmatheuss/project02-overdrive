import axios from "axios";

export const axiosIntance = axios.create({
  baseURL: "https://localhost:7001/api",
});

export default class EmpresaService {
  listarTodos() {
    return axiosIntance.get("/empresa/all");
  }
  listarTabela() {
    return axiosIntance.get("/empresa/front");
  }
  listarPorId(id) {
    return axiosIntance.get(`/empresa/id?id=${id}`);
  }
  salvar(empresa) {
    return axiosIntance.post("/empresa", empresa);
  }
  atualizar(empresa) {
    return axiosIntance.put(`/empresa/${empresa.id}`, empresa);
  }
  deletar(id) {
    return axiosIntance.delete(`/empresa/${id}`);
  }
}
