import { CheckCircledIcon } from "@radix-ui/react-icons";

export default function FormSuccess({ message }) {
  return (
    <>
      {message && (
        <div className="bg-emerald-500/15 rouded-md p-3 flex items-center gap-x-2 text-sm text-emerald-500">
          <CheckCircledIcon className="w-4 h-4" />
          <p>{message}</p>
        </div>
      )}
    </>
  );
}
