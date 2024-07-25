import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddContactSchema, EditContactSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { Plus, Pencil } from "lucide-react";
import InputPhoneNumber from "./input-phone";
import { addContact, updateContact } from "@/lib/fetchData";
import FormError from "../../form-error";
import FormSuccess from "../../form-success";
import { useState, useTransition } from "react";

const Modal = ({ userId, id, buttonText, title, label, onclick }) => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const schemaResolver =
    buttonText == "Editar" ? EditContactSchema : AddContactSchema;

  const form = useForm({
    resolver: zodResolver(schemaResolver),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      status: false,
    },
  });

  const onSubmit = (values) => {
    const { email, phone, name, status } = values;

    setError("");
    setSuccess("");

    if (buttonText == "Editar") {
      startTransition(() => {
        updateContact(userId, id, name, email, phone, status).then((data) => {
          if (data) {
            data.success ? setSuccess(data.success) : setError(data.erro);
          }
        });
      });
    } else {
      startTransition(() => {
        addContact(email, phone, name, userId, status).then((data) => {
          if (data) {
            data.success ? setSuccess(data.success) : setError(data.erro);
          }
        });
      });
    }

    onclick();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`w-[116px] flex items-center  ${
            buttonText == "Editar"
              ? "bg-white text-black"
              : "bg-blue-800 text-white"
          }`}
        >
          {buttonText}
          {buttonText == "Editar" ? (
            <Pencil className="h-4 w-4 ml-5" />
          ) : (
            <Plus className="h-5 w-5 ml-1 " />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{label}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="exemplo"
                        type="text"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="exemplo@gmail.com"
                        type="email"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone</FormLabel>
                    <FormControl>
                      <InputPhoneNumber disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <div className="flex gap-4 items-center">
                        <label className="flex items-center gap-2">
                          <Input
                            {...field}
                            type="radio"
                            name="opcao"
                            value={"1"}
                          />
                          Ativo
                        </label>
                        <label className="flex items-center gap-2">
                          <Input
                            {...field}
                            type="radio"
                            name="opcao"
                            value={"0"}
                          />
                          Inativo
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
            </div>
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
