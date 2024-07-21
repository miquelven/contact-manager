import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

export default function FormError({ message }) {
  return (
    <>
      {message && (
        <div className="bg-destructive/15 rouded-md p-3 flex items-center gap-x-2 text-sm text-destructive">
          <ExclamationTriangleIcon className="w-4 h-4" />
          <p>{message}</p>
        </div>
      )}
    </>
  );
}
