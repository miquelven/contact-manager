import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { authRoutes } from "@/routes";

export default function LogoutButton() {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server";

        await signOut({ redirectTo: authRoutes[0] });
      }}
    >
      <Button variant="outline" className="bg-red-800 text-white w-full ">
        Sair
      </Button>
    </form>
  );
}
