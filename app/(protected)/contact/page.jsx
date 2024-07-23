import { auth, signOut } from "@/auth";
import Header from "@/components/auth/header";
import DataTableDemo from "@/components/contact/data-table";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { authRoutes } from "@/routes";

export default async function ContactPage() {
  const session = await auth();

  return (
    <div className="h-screen w-full flex justify-center">
      <Card className=" w-[300px] shadow-md sm:w-[1200px]">
        <CardHeader>
          <Header title="Tabela de Contatos" />
        </CardHeader>
        <CardContent>
          {session.user.id && <DataTableDemo id={session.user.id} />}
        </CardContent>
      </Card>

      {/* <form
        action={async () => {
          "use server";

          await signOut({ redirectTo: authRoutes[0] });
        }}
      >
        <button>Sign out</button>
      </form> */}
    </div>
  );
}
