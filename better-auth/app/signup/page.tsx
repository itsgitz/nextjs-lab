"use client";

import Form from "next/form";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createSignUp, type SignUpState } from "./actions";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full bg-zinc-800 text-white font-bold py-2 px-4 rounded-lg hover:bg-zinc-700 transition duration-200"
      disabled={pending}
    >
      {pending ? "Signing up ..." : "Submit"}
    </button>
  );
}

export default function SignUp() {
  const [state, formAction] = useActionState<SignUpState, FormData>(
    createSignUp,
    {},
  );

  return (
    <div className="pt-12">
      <Form
        action={formAction}
        className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign up</h2>
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
          {state?.errors?.email && (
            <p className="text-red-500">{state.errors.email[0]}</p>
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
            name="password"
            placeholder="********"
          />
          {state?.errors?.password && (
            <p className="text-red-500">{state.errors.password[0]}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Name
          </label>
          <input
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            name="name"
            placeholder="e.g: Anggit M Ginanjar"
          />
          {state?.errors?.name && (
            <p className="text-red-500">{state.errors.name[0]}</p>
          )}
        </div>
        <SubmitButton />

        <div className="mt-4">
          Have an account?{" "}
          <Link href={"/signin"} className="text-zinc-800 underline">
            Sign in
          </Link>{" "}
        </div>
      </Form>
    </div>
  );
}
