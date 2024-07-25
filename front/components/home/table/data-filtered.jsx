"use client";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Modal from "./modal";
import ImportModal from "./import-modal";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Calendar } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "./search-bar";

export default function DataFiltered({
  id,
  handleClick,
  onclick,
  contacts,
  table,
}) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [createdAtFilter, setCreatedAtFilter] = useState("");
  const [updatedAtFilter, setUpdatedAtFilter] = useState("");
  const [filterValue, setFilterValue] = useState("");

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
    console.log("Hello");
    return [];
  }, [contacts, filterValue, statusFilter, createdAtFilter, updatedAtFilter]);

  useEffect(() => {
    onclick(filteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onclick(filteredData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredData]);

  return (
    <div className="flex items-center py-4">
      <SearchBar filterValue={filterValue} onFilterChange={setFilterValue} />
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
            <Button variant="outline" className="self-end ">
              Data de atualização <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <input
              type="date"
              value={updatedAtFilter}
              placeholder="skdfksdjf"
              className="p-2 w-[153px] block "
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
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
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
            <ImportModal onclick={handleClick} userId={id} />
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </div>
  );
}
