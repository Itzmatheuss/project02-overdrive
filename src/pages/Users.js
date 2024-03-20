import "../styles/Users.css";
//Icons
import FirstPage from "@mui/icons-material/FirstPage";
import ArrowForward from "@mui/icons-material/NavigateNext";
import ArrowBack from "@mui/icons-material/NavigateBefore";
import LastPage from "@mui/icons-material/LastPage";
import SearchIcon from "@mui/icons-material/Search";
import mData from "../MOCK_DATA_USER.json";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import UsersActions from "../actions/UsersActions";

const Users = () => {
  const data = useMemo(() => mData, []);

  /** @type import('@tanstack/react-table').columnDef<any>*/
  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      size: 50,
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
      size: 90,
      renderCell: (params) => <UsersActions {...{ params }} />,
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

export default Users;
