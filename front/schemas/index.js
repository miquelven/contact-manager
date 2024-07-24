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

export const AddContactSchema = z.object({
  email: z
    .string()
    .email({
      message: "É necessário um email válido",
    })
    .min(1, {
      message: "O email é obrigatório",
    }),

  name: z
    .string()
    .min(4, {
      message: "O nome é obrigatório e deve ter no mínimo 4 caracteres",
    })
    .max(100, {
      message: "Máximo de 100 caracteres permitido",
    }),
  phone: z.string().min(10, {
    message: "Número de telefone inválido",
  }),
  status: z
    .any()
    .refine(
      (value) => value !== undefined && value !== null && value !== false,
      {
        message: "O status é obrigatório",
      }
    ),
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EditContactSchema = z.object({
  email: z
    .string()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: "O email é obrigatório",
    })
    .refine((val) => !val || emailRegex.test(val), {
      message: "É necessário um email válido",
    }),
  name: z
    .string()
    .optional()
    .refine((val) => !val || (val.length >= 4 && val.length <= 100), {
      message: "O nome é obrigatório e deve ter entre 4 e 100 caracteres",
    }),

  phone: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: "Número de telefone inválido",
    }),
  status: z.any().optional(),
});

export const EditUserLocationSchema = z.object({
  cidade: z.string().optional(),
  rua: z.string().optional(),
  bairro: z.string().optional(),
  numero: z.string().optional(),
  cep: z.string().optional(),
});
