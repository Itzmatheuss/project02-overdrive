import "../styles/Company.css";
//Icons
import FirstPage from "@mui/icons-material/FirstPage";
import ArrowForward from "@mui/icons-material/NavigateNext";
import ArrowBack from "@mui/icons-material/NavigateBefore";
import LastPage from "@mui/icons-material/LastPage";
import SearchIcon from "@mui/icons-material/Search";
import mData from "../MOCK_DATA_COMPANY.json";

import CompanyActions from "../actions/CompanyActions";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

const Company = () => {
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
      header: "Data de abertura",
      accessorKey: "date",
      size: 100,
    },
    {
      header: "Nome Fantasia",
      accessorKey: "fantasy_name",
    },
    {
      header: "Atividades Econômicas",
      accessorKey: "cnae",
    },
    {
      header: "Natureza Jurídica",
      accessorKey: "nature",
      size: 100,
    },
    {
      header: "Endereço",
      accessorKey: "address",
      size: 100,
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
      renderCell: (params) => <CompanyActions {...{ params }} />,
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
      <div className="container-users">
        <table className="table" width={table.getTotalSize()}>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="tr">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="th" width={header.getSize()}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`resizer ${
                        header.column.getIsResizing() ? "isResizing" : ""
                      }`}
                    ></div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="tr">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="td"
                    width={cell.column.getSize()}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
  );
};

export default Company;
