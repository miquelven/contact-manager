import * as z from "zod";

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, {
      message: "Mínimo de 6 caracteres é necessário",
    })
    .max(100, {
      message: "Máximo de 100 caracteres permitido",
    })
    .regex(/[a-z]/, {
      message: "A senha deve conter pelo menos uma letra minúscula",
    })
    .regex(/[A-Z]/, {
      message: "A senha deve conter pelo menos uma letra maiúscula",
    })
    .regex(/\d/, {
      message: "A senha deve conter pelo menos um número",
    })
    .regex(/[@$!%*?&#]/, {
      message: "A senha deve conter pelo menos um caractere especial",
    }),
});

export const ResetSchema = z.object({
  email: z
    .string()
    .email({
      message: "É necessário um email válido",
    })
    .min(1, {
      message: "O email é obrigatório",
    }),
});

export const LoginSchema = z.object({
  email: z
    .string()
    .email({
      message: "É necessário um email válido",
    })
    .min(1, {
      message: "O email é obrigatório",
    }),
  password: z
    .string()
    .min(1, {
      message: "A senha é obrigatória",
    })
    .max(100, {
      message: "Máximo de 100 caracteres permitido",
    }),
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .email({
      message: "É necessário um email válido",
    })
    .min(1, {
      message: "O email é obrigatório",
    }),
  password: z
    .string()
    .min(6, {
      message: "Mínimo de 6 caracteres é necessário",
    })
    .max(100, {
      message: "Máximo de 100 caracteres permitido",
    })
    .regex(/[a-z]/, {
      message: "A senha deve conter pelo menos uma letra minúscula",
    })
    .regex(/[A-Z]/, {
      message: "A senha deve conter pelo menos uma letra maiúscula",
    })
    .regex(/\d/, {
      message: "A senha deve conter pelo menos um número",
    })
    .regex(/[@$!%*?&#]/, {
      message: "A senha deve conter pelo menos um caractere especial",
    }),
  name: z
    .string()
    .min(1, {
      message: "O nome é obrigatório",
    })
    .max(100, {
      message: "Máximo de 100 caracteres permitido",
    }),
});
