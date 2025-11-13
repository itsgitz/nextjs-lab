"use server";

import { auth } from "@/lib/auth";
import { signUpSchema } from "@/lib/types/schema/sign-up";
import { redirect } from "next/navigation";

export type SignUpState = {
  success?: boolean;
  errors?: Record<string, string[] | undefined>;
  message?: string;
};

export async function createSignUp(state: SignUpState, formData: FormData) {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  };

  const validated = signUpSchema.safeParse(rawData);
  if (!validated.success) {
    console.error("validation error", validated.error.flatten().fieldErrors);
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
      message: "Validation failed.",
    };
  }

  try {
    console.log("validated data", validated.data);

    const { email, password, name } = validated.data;

    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
      asResponse: true,
    });
    console.log("response", response);
    redirect("/");
  } catch (error) {
    console.error(error);

    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }

    return {
      success: false,
      message: "Invalid credentials.",
    };
  }
}
