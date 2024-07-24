"use client";

import { updateLocation } from "@/lib/fetchData";
import FormInfoUser from "./form-info-user";
import FormLocation from "./form-location";
import { useEffect, useState } from "react";
import useGetLocation from "@/hooks/useGetLocation";
import { Button } from "../ui/button";
import Link from "next/link";

export default function InfoUserArea({ data }) {
  const [erroMessage, setErroMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const { data: dataLocation, refetch } = useGetLocation(data.id);

  const handleClick = (dataL) => {
    const dl = {
      id: data.id,
      city: dataL.cidade,
      street: dataL.rua,
      neighborhood: dataL.bairro,
      number: dataL.numero,
      zipCode: dataL.cep,
    };
    updateLocation(dl).then((data) => {
      data?.erro
        ? setErroMessage(data?.erro)
        : setSuccessMessage(data?.success);
    });

    setTimeout(async () => {
      await refetch();
    }, 2000);
  };

  useEffect(() => {}, [dataLocation]);

  return (
    <div className="mt-5">
      <ul className="flex flex-col gap-4">
        <li className="flex items-center gap-3">
          <h4 className="font-medium text-lg">Nome:</h4>
          <span>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</span>
        </li>
        <li className="flex items-center gap-3">
          <h4 className="font-medium text-lg">Email:</h4>
          <span>{data.email}</span>
        </li>
      </ul>
      <div className="mt-10">
        <h3 className="mb-5 text-xl font-bold">Localização</h3>
        <FormLocation data={dataLocation} />
      </div>
      <div className="flex items-center justify-center gap-32 mt-7">
        <Button
          className="self-end bg-red-800 text-white w-full"
          asChild
          variant="outline"
        >
          <Link href="/contact">Voltar</Link>
        </Button>
        <FormInfoUser
          successMessage={successMessage}
          erroMessage={erroMessage}
          onclick={handleClick}
        />
      </div>
    </div>
  );
}
