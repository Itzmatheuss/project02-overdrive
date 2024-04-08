import "../styles/Users.css";
import { Link } from "react-router-dom";

//Icons
import FirstPage from "@mui/icons-material/FirstPage";
import ArrowForward from "@mui/icons-material/NavigateNext";
import ArrowBack from "@mui/icons-material/NavigateBefore";
import LastPage from "@mui/icons-material/LastPage";
import SearchIcon from "@mui/icons-material/Search";
import mData from "../MOCK_DATA_USER.json";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

const Users = () => {
  const handleDelete = () => {
    Swal.fire({
      title: "Tem certeza que deseja deletar ?",
      text: "Esta é uma ação irreversivel !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, Deletar!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deletado!",
          text: "Usúario deletado com sucesso.",
          icon: "success",
        });
      }
    });
  };

  const data = useMemo(() => mData, []);

  /** @type import('@tanstack/react-table').columnDef<any>*/
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      size: 60,
    },
    {
      header: "Nome",
      accessorKey: "name",
    },
    {
      header: "CPF",
      accessorKey: "cpf",
    },
    {
      header: "Nome de usuário",
      accessorKey: "username",
    },
    {
      header: "Status",
      accessorKey: "status",
      size: 80,
    },
    {
      header: "Empresa",
      accessorKey: "company",
    },
    {
      header: "Ações",
      size: 50,
      cell: (
        <div className="action-buttons">
          <Link to={`/users/edituser/1`}>
            <button type="button" className="btn-edit">
              <EditIcon />
            </button>
          </Link>
          <button type="button" className="btn-del" onClick={handleDelete}>
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
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
    <div className="container ">
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
      <div className="tabela table-responsive">
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
                  <td className="w-auto h-auto p-2" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
};

export default Users;
