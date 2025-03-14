"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signup } from "@/app/(auth)/action";
import {SubmitButton} from "@/components/auth/ui/button";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/auth/ui/card";

import { Label } from "@/components/auth/ui/label";
import { Input } from "@/components/auth/ui/input";

export function SignupForm() {
  const [state, signUpAction] = useActionState(signup, undefined);

  return (
    <div className="w-full max-w-md">
      <form action={signUpAction}>
        <Card>
          <CardHeader >
            <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent >
            <div className="flex items-center justify-around mb-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
              />
              {state?.errors?.username && (
                <p className="text-red-500">{state.errors.username}</p>
              )}
            </div>
            <div className="flex items-center justify-around mt-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
             {state?.errors?.password && (
                <p className="text-red-500">{state.errors.password}</p>
              )}
            </div>
          </CardContent>
          <CardFooter >
              <SubmitButton label="Sign Up" />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Have an account?
          <Link className="underline ml-2" href="login">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
