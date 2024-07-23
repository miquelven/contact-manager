"use client";

import { useRouter } from "next/navigation";

export default function LoginButton({ children }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };
  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
}
