import { auth, signOut } from "@/auth";
import { authRoutes } from "@/routes";

export default async function ContactPage() {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}

      <form
        action={async () => {
          "use server";

          await signOut({ redirectTo: authRoutes[0] });
        }}
      >
        <button>Sign out</button>
      </form>
    </div>
  );
}
