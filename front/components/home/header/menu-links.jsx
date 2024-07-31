import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MenuLinks() {
  const links = [
    {
      id: 0,
      label: "Sobre",
      ref: "#about",
    },
    {
      id: 1,
      label: "Tabela",
      ref: "#table",
    },
    {
      id: 2,
      label: "Funcionalidades",
      ref: "#features",
    },
    {
      id: 3,
      label: "Contatos",
      ref: "#contact",
    },
  ];

  return (
    <ul className="flex gap-5 max-sm:gap-0">
      {links.map((link) => (
        <li key={link.id}>
          <Button variant="link" asChild>
            <Link href={link.ref}>
              <span className="transition-all duration-300 font-medium text-black hover:text-blue-600 max-sm:text-xs">
                {link.label}
              </span>
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
