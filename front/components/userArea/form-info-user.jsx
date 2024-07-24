"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { EditUserLocationSchema } from "@/schemas"; // Certifique-se de que o caminho está correto
import { useEffect, useState } from "react";
import FormError from "../form-error";
import FormSuccess from "../form-success";

export default function FormInfoUser({ erroMessage, successMessage, onclick }) {
  const [erro, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm({
    resolver: zodResolver(EditUserLocationSchema),
    defaultValues: {
      cidade: "",
      rua: "",
      bairro: "",
      numero: "",
      cep: "",
    },
  });

  const fetchUserLocation = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) {
        throw new Error("Erro ao buscar o CEP");
      } else {
        setError("");
      }
      const data = await response.json();
      if (data.erro) {
        throw new Error("CEP não encontrado");
      }
      form.setValue("cidade", data.localidade);
      form.setValue("rua", data.logradouro);
      form.setValue("bairro", data.bairro);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleClick = (data) => {
    onclick(data);
  };

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  useEffect(() => {
    setSuccess(successMessage);
  }, [successMessage]);

  return (
    <Dialog onOpenChange={resetMessages}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full  bg-blue-800 text-white">
          Editar Informações
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Informações de Localização</DialogTitle>
          <DialogDescription>Preencha os campos abaixo</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleClick)} className="space-y-6">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CEP</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="remove-arrow"
                        onChange={(e) => {
                          if (e.target.value.length >= 9) return;
                          field.onChange(e);
                          if (e.target.value.length == 8)
                            fetchUserLocation(e.target.value);
                        }}
                        placeholder="12345-678"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cidade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Exemplo de cidade"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rua"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rua</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Exemplo de rua"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bairro"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bairro</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Exemplo de bairro"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          if (e.target.value.length >= 5) return;
                          field.onChange(e);
                        }}
                        placeholder="1234"
                        className="remove-arrow"
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {!success && <FormError message={erroMessage || erro} />}
            <FormSuccess message={success} />
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
