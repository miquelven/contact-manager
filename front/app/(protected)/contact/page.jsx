import { auth } from "@/auth";
import Header from "@/components/auth/header";
import TableData from "@/components/contact/data-table";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { authRoutes } from "@/routes";

export default async function ContactPage() {
  const session = await auth();

  return (
    <div className="h-screen w-full flex justify-center">
      <Card className=" w-[300px] shadow-md sm:w-[1200px]">
        <CardHeader>
          <Header title="Tabela de Contatos" />
        </CardHeader>
        <CardContent>
          {session.user.id && <TableData id={session.user.id} />}
        </CardContent>
      </Card>
    </div>
  );
}
