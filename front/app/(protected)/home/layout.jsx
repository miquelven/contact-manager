import { Toaster } from "@/components/ui/toaster";

export default function ContactLayout({ children }) {
  return (
    <div className=" w-full  bg-blue-50 min-h-screen">
      {children}
      <Toaster />
    </div>
  );
}
