"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export default function BackButton({ href, label }) {
  return (
    <Button variant="link" className="font-semibold w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
