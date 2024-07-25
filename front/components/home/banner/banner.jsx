import { Button } from "@/components/ui/button";
import { ChevronsDown } from "lucide-react";
import Link from "next/link";

export default function Banner() {
  return (
    <main className="h-[calc(100vh-90px)] mb-80 flex justify-center items-center">
      <div className="flex flex-col items-center justify-center gap-10">
        <span className="text-lg font-semibold text-blue-600">
          PLATAFORMA DE GERENCIAMENTO DE CONTATOS
        </span>
        <h1 className="text-6xl font-bold px-80 text-center leading-[68px]">
          GERENCIE SEUS CONTATOS EM UM SÓ LUGAR
        </h1>
        <h2 className="text-lg px-60 text-center font-light">
          Gerencie seus contatos com facilidade usando o GC. Adicione, remova e
          edite contatos, importe e exporte, e filtre ou pesquise rapidamente.
          Integrado com suas ferramentas favoritas, o GC simplifica o processo
          em poucos minutos por dia, mantendo tudo organizado e acessível.
        </h2>
        <Button
          variant="outlined"
          className="bg-blue-800 text-white mt-10 py-6"
          asChild
        >
          <Link href="#table" className="text-sm flex gap-3 animate-bounce">
            Gerenciar os Contatos
            <ChevronsDown />
          </Link>
        </Button>
      </div>
    </main>
  );
}
