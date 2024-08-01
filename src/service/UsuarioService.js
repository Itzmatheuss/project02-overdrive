import axios from "axios";

export const axiosIntance = axios.create({
  baseURL: "https://localhost:7001/api",
});

export default class UsuarioService {
  listarTodos() {
    return axiosIntance.get("/usuario/all");
  }
  listarTabela() {
    return axiosIntance.get("/usuario/front");
  }
  listarPorId(id) {
    return axiosIntance.get(`/usuario/id?id=${id}`);
  }
  salvar(usuario) {
    return axiosIntance.post("/usuario", usuario);
  }
  atualizar(usuario) {
    return axiosIntance.put(`/usuario/${usuario.id}`, usuario);
  }
  deletar(id) {
    return axiosIntance.delete(`/usuario/${id}`);
  }
}
