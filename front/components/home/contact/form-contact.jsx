import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { useToast } from "@/components/ui/use-toast";

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.string().email("O email não é válido."),
  message: z.string().min(1, "A mensagem é obrigatória."),
});

export default function FormContact() {
  const { toast } = useToast();

  const sendEmail = (data) => {
    const templateParams = {
      message: data.message,
      email: data.email,
    };

    emailjs.send(
      "service_j9fygzm",
      "template_el44meo",
      templateParams,
      "W7PLvOdvqRzXPUDr1"
    );
  };

  const onSubmit = (values) => {
    if (values !== null) {
      sendEmail(values);
      toast({
        title: "Email enviado!",
      });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-[400px]">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-3"
        >
          Nome
        </label>
        <Input id="name" {...register("name")} className="mt-1 block w-full" />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mt-10 mb-3"
        >
          Email
        </label>
        <Input
          id="email"
          {...register("email")}
          className="mt-1 block w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mt-10 mb-3"
        >
          Mensagem
        </label>
        <Textarea
          id="message"
          {...register("message")}
          className="mt-1 block w-full"
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>
      <div>
        <Button
          type="submit"
          className="w-full bg-blue-800 text-white max-sm:mt-7"
        >
          Enviar
        </Button>
      </div>
    </form>
  );
}
