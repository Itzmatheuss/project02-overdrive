import "../styles/Company.css";
import InputMask from "react-input-mask";
//Icons
import { Link } from "react-router-dom";
import FirstPage from "@mui/icons-material/FirstPage";
import ArrowForward from "@mui/icons-material/NavigateNext";
import ArrowBack from "@mui/icons-material/NavigateBefore";
import ArrowUp from "@mui/icons-material/ArrowUpward";
import ArrowDown from "@mui/icons-material/ArrowDownward";
import SwapIcon from "@mui/icons-material/SwapVert";
import LastPage from "@mui/icons-material/LastPage";
import SearchIcon from "@mui/icons-material/Search";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import EmpresaService from "../service/EmpresaService.js";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

const Company = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    EmpresaService.listarTabela()
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar empresas:", error);
        Swal.fire({
          title: "Erro!",
          text: "Não foi possível carregar as empresas.",
          icon: "error",
        });
      });
  }, []);

  const handleDelete = (id) => {
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
        EmpresaService.deletar(id)
          .then(() => {
            Swal.fire({
              title: "Deletado!",
              text: "A empresa foi deletada com sucesso.",
              icon: "success",
            });
            setCompanies((prevCompanies) =>
              prevCompanies.filter((company) => company.id !== id)
            );
          })
          .catch((error) => {
            console.error("Erro ao deletar empresa:", error);
            Swal.fire({
              title: "Erro!",
              text: "Não foi possível deletar a empresa.",
              icon: "error",
            });
          });
      }
    });
  };

  const columns = useMemo(
    () => [
      {
        header: "ID",
        accessorKey: "id",
        size: 40,
      },
      {
        header: "Nome",
        accessorKey: "nomeFantasia",
        enableSorting: false,
      },
      {
        header: "CNPJ",
        accessorKey: "cnpj",
        enableSorting: false,
        cell: (info) => (
          <InputMask
            mask="99.999.999/9999-99"
            value={info.getValue()}
            readOnly
            className="mask-input"
          >
            {(inputProps) => <input {...inputProps} />}
          </InputMask>
        ),
      },

      {
        header: "Endereço",
        accessorKey: "cidade",
        enableSorting: false,
      },

      {
        header: "Telefone",
        accessorKey: "telefone",
        enableSorting: false,
      },
      {
        header: "Capital",
        accessorKey: "capital",
        cell: (info) => {
          return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(info.getValue());
        },
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Ações",
        size: 90,
        cell: ({ row }) => (
          <div className="action-buttons">
            <Link to={`/company/editcompany/${row.original.id}`}>
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
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data: companies,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="container_comp">
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
        <div className="tabela">
          <div className="add">
            <Link to="/signupcomp" className="link-style">
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
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span>
                        {header.column.getCanSort() && (
                          <span>
                            {header.column.getIsSorted() === "asc" && (
                              <ArrowUp style={{ fontSize: 20 }} />
                            )}
                            {header.column.getIsSorted() === "desc" && (
                              <ArrowDown style={{ fontSize: 20 }} />
                            )}
                            {header.column.getIsSorted() === false && (
                              <SwapIcon />
                            )}
                          </span>
                        )}
                      </span>
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

export default Company;
