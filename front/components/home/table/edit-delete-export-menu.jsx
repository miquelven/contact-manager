import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ArrowRightFromLine, MoreHorizontal, Trash2 } from "lucide-react";
import Modal from "./modal";
import { Button } from "../../ui/button";
import { deleteContact } from "@/lib/fetchData";

import React from "react";
import { parse } from "json2csv";

const ExportCSVButton = ({ data, contactId }) => {
  const contact = data.filter((d) => d.id == contactId);
  const { id, userId, name, email, phone, status, createdAt, updatedAt } =
    contact[0];

  const handleDownloadCSV = () => {
    const dataContact = {
      id,
      userId,
      name,
      email,
      phone,
      status,
      createdAt,
      updatedAt,
    };

    const fields = [
      "id",
      "userId",
      "name",
      "email",
      "phone",
      "status",
      "createdAt",
      "updatedAt",
    ];
    const opts = { fields };

    try {
      const csv = parse(dataContact, opts);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "dados.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Error generating CSV:", err);
    }
  };

  return (
    <Button
      onClick={handleDownloadCSV}
      variant="outline"
      className="w-[116px]  flex items-center gap-3"
    >
      Exportar
      <ArrowRightFromLine className="w-4 h-4" />
    </Button>
  );
};

export default function EditDeleteExportMenu({
  userId,
  id,
  onclick,
  contacts,
}) {
  const handleDeleteContact = () => {
    deleteContact(userId, id);
    onclick();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[120px]">
        <Modal
          userId={userId}
          id={id}
          buttonText="Editar"
          title="Editar Contato"
          label="Edite as informações do contato. Preencha ao menos um campo."
          onclick={() => onclick()}
        />
        <Button
          onClick={() => handleDeleteContact(userId, id)}
          variant="outline"
          className="w-[116px]  flex items-center gap-3"
        >
          Apagar
          <Trash2 className="w-4 h-4" />
        </Button>
        <ExportCSVButton data={contacts} contactId={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
