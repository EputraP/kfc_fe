"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/app/(auth)/action";
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


export function SigninForm() {
  const [state, loginAction] = useActionState(login, undefined);
  return (
    <div className="w-full max-w-md">
      <form action={loginAction}>
        <Card>
          <CardHeader >
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
            <CardDescription>
              Enter your details to sign in to your account
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
            <SubmitButton label="Login"/>
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline ml-2" href="signup">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
