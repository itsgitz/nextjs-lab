"use client";

import { authClient } from "@/lib/auth-client";
import { signInSchema } from "@/lib/types/schema/sign-in";
import Form from "next/form";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

type SignInState = {
  error?: string;
};

const handleLogin = async (
  state: SignInState,
  formData: FormData,
): Promise<SignInState> => {
  "use client";

  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // const validated = signInSchema.safeParse(rawData)
  // if (!validated.success) {
  //   return {
  //     error:
  //   }
  // }

  try {
    const response = await authClient.signIn.email({
      email: rawData.email,
      password: rawData.password,
    });

    if (response.error) {
      return { error: response.error.message };
    }

    console.log("Login response", response);

    return {};
  } catch (error) {
    console.error(error);

    return { error: "Login failed. Please try again." };
  }
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full bg-zinc-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-zinc-700 transition duration-200"
      disabled={pending}
    >
      {pending ? "Signing in ..." : "Submit"}
    </button>
  );
}

export default function SignIn() {
  const { data: session } = authClient.useSession();
  const [state, formAction, isPending] = useActionState(handleLogin, {});

  console.log("Session on login page", session);

  if (session) {
    redirect("/");
  }

  return (
    <>
      <div className="pt-12">
        <Form
          action={formAction}
          className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign in</h2>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              name="email"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="password"
              name="password"
              placeholder="********"
            />
          </div>
          <SubmitButton />
          <div className="mt-4">
            Don&apos;t have an account?{" "}
            <Link href={"/signup"} className="text-zinc-800 underline">
              Sign up now
            </Link>{" "}
          </div>
        </Form>
      </div>
    </>
  );
}
