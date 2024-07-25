"use client";

import { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetContacts from "@/hooks/useGetContacts";
import { formatDate } from "@/lib/utils";
import EditDeleteExportMenu from "./edit-delete-export-menu";
import Image from "next/image";
import tubeSpinner from "../../../public/tube-spinner.svg";
import DataFiltered from "./data-filtered";

const columns = [
  {
    accessorKey: "Nome",
    header: () => <div>Nome</div>,
    cell: ({ row }) => <div className="lowercase">{row.original.name}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.original.email}</div>,
  },
  {
    accessorKey: "Telefone",
    header: () => <div>Telefone</div>,
    cell: ({ row }) => <div className="capitalize">{row.original.phone}</div>,
  },
  {
    accessorKey: "Data de criação",
    header: () => <div>Data de criação</div>,
    cell: ({ row }) => (
      <div className="capitalize">{formatDate(row.original.createdAt)}</div>
    ),
  },
  {
    accessorKey: "Última Atualização",
    header: () => <div>Última Atualização</div>,
    cell: ({ row }) => (
      <div className="capitalize">{formatDate(row.original.updatedAt)}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.status == 0 ? (
          <span className="text-red-400 font-medium">Inativo</span>
        ) : (
          <span className="text-green-400 font-medium">Ativo</span>
        )}
      </div>
    ),
  },
];

function TableData({ id }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [loadingValue, setLoadingValue] = useState(false);

  const { data: contacts, loading, error, refetch } = useGetContacts(id);

  useEffect(() => {
    if (loading == false) {
      setTimeout(() => {
        setLoadingValue(loading);
      }, [1000]);
    } else {
      setLoadingValue(loading);
    }
  }, [loading]);

  const handleUpdateFilteredData = (value) => {
    setFilteredData(value);
  };

  const handleClick = async () => {
    setTimeout(async () => {
      await refetch();
    }, 2000);
  };

  const table = useReactTable({
    data: filteredData || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (loadingValue)
    return (
      <div className="h-[200px] w-full flex justify-center items-center">
        <Image src={tubeSpinner} width={60} height={60} alt="Loading icon" />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {!loadingValue && (
        <div>
          <div className="w-full ">
            <DataFiltered
              id={id}
              handleClick={handleClick}
              onclick={handleUpdateFilteredData}
              table={table}
              contacts={contacts}
            />
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-black/10 shadow shadow-black/15">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder ? null : (
                            <span className="text-medium text-black">
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </span>
                          )}
                        </TableHead>
                      ))}
                      {/* add new column */}
                      <TableHead></TableHead>
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                        <TableCell>
                          <EditDeleteExportMenu
                            id={row.original.id}
                            userId={id}
                            onclick={handleClick}
                            contacts={contacts}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-36  text-center"
                      >
                        <span className="text-lg">Adicione Contatos</span>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TableData;
