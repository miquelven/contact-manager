import Header from "@/components/auth/header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { auth } from "@/auth";
import InfoUserArea from "@/components/userArea/info-user-area";

export default async function EditUserPage() {
  const session = await auth();

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-[500px] mx-auto flex justify-center items-center">
        <Card className="w-[300px] shadow-md sm:w-full">
          <CardHeader>
            <Header title="Suas Informações" />
          </CardHeader>
          <CardContent>
            <InfoUserArea data={session.user} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
