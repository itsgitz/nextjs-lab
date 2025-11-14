"use client";

import { authClient } from "@/lib/auth-client";
import { SignIn, signInSchema } from "@/lib/types/schema/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";

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

export default function SignInPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  // const [state, formAction, isPending] = useActionState(handleLogin, {});
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignIn>({ resolver: zodResolver(signInSchema) });
  const [serverError, setServerError] = useState<string | null>(null);

  console.log("Session on login page", session);
  // console.log("State", state);

  if (session) {
    redirect("/");
  }

  const handleLogin = async (data: SignIn) => {
    setServerError(null);

    try {
      const response = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (response.error) {
        console.error("Sign in error:", response.error.message);
        setServerError(
          response.error.message ??
            "Incorrect email or password. Please try again.",
        );
      }

      console.log("Login successful", response);
      router.push("/");
    } catch (error) {
      console.error(error);

      setServerError("An unexpected error occured. Please try again.");
    }
  };

  return (
    <>
      <div className="pt-12">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign in</h2>

          {serverError && (
            <div className="mb-4">
              <span className="text-red-500">{serverError}</span>
            </div>
          )}

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
              placeholder="you@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
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
              placeholder="********"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <SubmitButton />
          <div className="mt-4">
            Don&apos;t have an account?{" "}
            <Link href={"/signup"} className="text-zinc-800 underline">
              Sign up
            </Link>{" "}
          </div>
        </form>
      </div>
    </>
  );
}
