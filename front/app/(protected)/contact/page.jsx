import { auth, signOut } from "@/auth";
import Header from "@/components/auth/header";
import DataTableDemo from "@/components/contact/data-table";
import { authRoutes } from "@/routes";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const capitalizeFirstLetter = (name) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export default async function ContactPage() {
  const session = await auth();

  return (
    <div className="flex flex-col justify-center h-full w-full  gap-10">
      <Card className="w-[300px] shadow-md  flex justify-center  flex-col sm:w-[400px]">
        <CardHeader className="p-3 grid grid-cols-2 items-center">
          <span className="font-light text-xs   max-w-fit ">
            Bem-Vindo:{" "}
            <span className="font-medium text-base block">
              {capitalizeFirstLetter(session.user.name)}
            </span>
          </span>
          <form
            className="text-end"
            action={async () => {
              "use server";

              await signOut({ redirectTo: authRoutes[0] });
            }}
          >
            <Button variant="outline" className="bg-red-800 text-white ">
              Sair
            </Button>
          </form>
        </CardHeader>
        <CardContent className="p-3 pt-0 mt-5 ">
          <Button
            className=" bg-blue-800 text-white w-2/3 hover:bg-transparent hover:text-black"
            asChild
          >
            <Link href="/contact/edit-user" className="text-sm">
              Informações
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="min-h-[600px] h-[600px] mt-10">
        <Card className="w-[300px] shadow-md sm:w-full py-10 ">
          <CardHeader>
            <Header title="Tabela de Contatos" />
          </CardHeader>
          <CardContent>
            {session.user.id && <DataTableDemo id={session.user.id} />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
