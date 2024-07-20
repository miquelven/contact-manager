import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-blue-300 to-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-4xl  font-semibold text-white drop-shadow-md sm:text-6xl",
            font.className
          )}
        >
          📂 Contact Manager
        </h1>
        <p className="text-white text-lg">O seu gerenciador de contatos</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Entrar
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
