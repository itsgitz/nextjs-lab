import z from "zod";

export const signUpSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
  name: z.string().min(6),
});

export type SignUp = z.infer<typeof signUpSchema>;
