import "../styles/Users.css";
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";

// Icons
import FirstPage from "@mui/icons-material/FirstPage";
import ArrowForward from "@mui/icons-material/NavigateNext";
import ArrowBack from "@mui/icons-material/NavigateBefore";
import LastPage from "@mui/icons-material/LastPage";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import UsuarioService from "../service/UsuarioService.js";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const usuarioService = useMemo(() => new UsuarioService(), []);

  useEffect(() => {
    usuarioService
      .listarTabela()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [usuarioService]);

  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Tem certeza que deseja deletar ?",
      text: "Esta é uma ação irreversível!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sim, Deletar!",
    }).then((result) => {
      if (result.isConfirmed) {
        usuarioService
          .deletar(id)
          .then(() => {
            Swal.fire({
              title: "Deletado!",
              text: "O colaborador foi deletada com sucesso.",
              icon: "success",
            });
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
          })
          .catch((error) => {
            console.error("Erro ao deletar colaborador:", error);
            Swal.fire({
              title: "Erro!",
              text: "Não foi possível deletar a colaborador.",
              icon: "error",
            });
          });
      }
    });
  };

  const columns = useMemo(
    () => [
      { header: "ID", accessorKey: "id", size: 60 },
      { header: "Nome", accessorKey: "nome" },
      {
        header: "CPF",
        accessorKey: "cpf",
        cell: (info) => (
          <InputMask
            mask="999.999.999-99"
            value={info.getValue()}
            readOnly
            className="mask-input"
          >
            {(inputProps) => <input {...inputProps} />}
          </InputMask>
        ),
      },
      { header: "Nome de usuário", accessorKey: "userName" },
      { header: "Status", accessorKey: "status", size: 80 },
      {
        header: "Empresa",
        accessorFn: (row) => row.empresa?.nomeFantasia || "",
      },
      {
        header: "Ações",
        size: 50,
        cell: ({ row }) => (
          <div className="action-buttons">
            <Link to={`/users/edituser/${row.original.id}`}>
              <button type="button" className="btn-edit">
                <EditIcon />
              </button>
            </Link>
            <button
              type="button"
              className="btn-del"
              onClick={() => handleDelete(row.original.id)}
            >
              <DeleteIcon />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="container_users">
      <div className="container">
        <div className="search">
          <input
            className="search-input"
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            placeholder="Busca"
          />
          <span>
            <SearchIcon />
          </span>
        </div>
        <div className="tabela">
          <div className="add">
            <Link to="/signupuser">
              <button type="submit" className="btn-user">
                Adicionar Pessoa
              </button>
            </Link>
          </div>
          <table className="table table-hover table-bordered">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      data-th={cell.column.id}
                      className="w-auto h-auto p-2"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="btn-container">
            <button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.setPageIndex(0)}
            >
              <FirstPage />
            </button>
            <button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
            >
              <ArrowForward />
            </button>
            <button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
            >
              <ArrowBack />
            </button>
            <button
              disabled={!table.getCanNextPage()}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            >
              <LastPage />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
