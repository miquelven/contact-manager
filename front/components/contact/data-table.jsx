"use client";

import { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import Modal from "./modal";
import SearchBar from "./search-bar";
import ButtonCsv from "./button-csv";
import ImportModal from "./import-modal";
import EditDeleteExportMenu from "./edit-delete-export-menu";

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

function DataTableDemo({ id }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [createdAtFilter, setCreatedAtFilter] = useState("");
  const [updatedAtFilter, setUpdatedAtFilter] = useState("");

  const { data: contacts, loading, error, refetch } = useGetContacts(id);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const filteredData = useMemo(() => {
    if (contacts && Array.isArray(contacts)) {
      return contacts.filter((contact) => {
        // Filtra por nome, email e telefone
        const matchesSearch =
          contact.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          contact.email.toLowerCase().includes(filterValue.toLowerCase()) ||
          contact.phone.toLowerCase().includes(filterValue.toLowerCase());

        // Filtra por status
        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "active" && contact.status === 1) ||
          (statusFilter === "inactive" && contact.status === 0);

        // Filtra por data de criação
        const createdAtMatches =
          !createdAtFilter || contact.createdAt.startsWith(createdAtFilter);

        // Filtra por data de atualização
        const updatedAtMatches =
          !updatedAtFilter || contact.updatedAt.startsWith(updatedAtFilter);

        return (
          matchesSearch && matchesStatus && createdAtMatches && updatedAtMatches
        );
      });
    }
    return [];
  }, [contacts, filterValue, statusFilter, createdAtFilter, updatedAtFilter]);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {!loading && (
        <div>
          <div className="w-full ">
            <div className="flex items-center py-4">
              <SearchBar
                filterValue={filterValue}
                onFilterChange={setFilterValue}
              />
              <div className="flex w-full justify-end items-center gap-5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="self-end">
                      Data de criação <Calendar className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <input
                      type="date"
                      value={createdAtFilter}
                      placeholder="skdfksdjf"
                      className="p-2 w-[153px] block"
                      onChange={(e) => setCreatedAtFilter(e.target.value)}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="self-end">
                      Data de atualização <Calendar className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <input
                      type="date"
                      value={updatedAtFilter}
                      placeholder="skdfksdjf"
                      className="p-2 w-[153px] block"
                      onChange={(e) => setUpdatedAtFilter(e.target.value)}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="self-end">
                      Colunas <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      Status <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Button
                      className="block w-full"
                      variant="ghost"
                      onClick={() => setStatusFilter("all")}
                    >
                      Todos
                    </Button>
                    <Button
                      className="block w-full"
                      variant="ghost"
                      onClick={() => setStatusFilter("active")}
                    >
                      Ativos
                    </Button>
                    <Button
                      className="block w-full"
                      variant="ghost"
                      onClick={() => setStatusFilter("inactive")}
                    >
                      Inativos
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Modal
                      userId={id}
                      buttonText="Adicionar"
                      title="Adicionar Contato"
                      label="Adicione as informações sobre o contato."
                      onclick={handleClick}
                    />
                  </DropdownMenuTrigger>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <ImportModal onclick={handleClick} />
                  </DropdownMenuTrigger>
                </DropdownMenu>
              </div>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      ))}
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
                        className="h-24 text-center"
                      >
                        Não há contatos.
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

export default DataTableDemo;
