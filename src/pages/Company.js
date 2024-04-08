import "../styles/Company.css";
//Icons
import { Link } from "react-router-dom";
import FirstPage from "@mui/icons-material/FirstPage";
import ArrowForward from "@mui/icons-material/NavigateNext";
import ArrowBack from "@mui/icons-material/NavigateBefore";
import LastPage from "@mui/icons-material/LastPage";
import SearchIcon from "@mui/icons-material/Search";
import mData from "../MOCK_DATA_COMPANY.json";
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

const Company = () => {
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
          text: "A empresa foi deletada com sucesso.",
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
      size: 40,
    },
    {
      header: "Nome",
      accessorKey: "name",
      size: 100,
    },
    {
      header: "CNPJ",
      accessorKey: "cnpj",
      size: 100,
    },

    {
      header: "Endereço",
      accessorKey: "address",
      size: 80,
    },

    {
      header: "Telefone",
      accessorKey: "phone",
      size: 100,
    },
    {
      header: "Capital",
      accessorKey: "money",
      size: 100,
    },
    {
      header: "Status",
      accessorKey: "status",
      size: 80,
    },
    {
      header: "Ações",
      size: 90,
      cell: (
        <div className="action-buttons">
          <Link to={`/company/editcompany/1`}>
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
          <Link to="/signupcomp">
            <button type="submit" className="btn-user">
              Adicionar Empresa
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

export default Company;
