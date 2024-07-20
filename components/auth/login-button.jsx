"use client";

import { useRouter } from "next/navigation";

export default function LoginButton({ children, mode = "redirect", asChild }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };

  if (mode == "modal") {
    return <span>TODO: Implement modal </span>;
  }

  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
}
