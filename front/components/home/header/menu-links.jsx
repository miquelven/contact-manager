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
    <ul className="flex gap-5">
      {links.map((link) => (
        <li key={link.id}>
          <Button variant="link" asChild>
            <Link href={link.ref}>
              <span className="font-medium text-black/80 hover:text-black">
                {link.label}
              </span>
            </Link>
          </Button>
        </li>
      ))}
    </ul>
  );
}
