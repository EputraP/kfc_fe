"use server";
import { z } from "zod";
import { createSession, deleteSession } from "../lib/session";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";

const loginSchema = z.object({
  username: z.string().trim(),
  password: z
    .string()
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
    const { username, password } = result.data;

    const payload = {
      'username': String(username),
      "password": String(password),
    };

   await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Explicitly serialize to JSON
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error("Failed to login");
      }
      const secretKey = "kfc_secret";
      const encodedKey = new TextEncoder().encode(secretKey);

      const data:{code:Int16Array,msg:string, data:{access_token:string, refresh_token:string}} = await response.json(); // Wait for the JSON to be parsed
      const { payload:payloadRefresToken } =  await jwtVerify(data.data.refresh_token, encodedKey, {
           algorithms: ["HS256"],
         });
      const { payload:payloadAccessToken } =  await jwtVerify(data.data.access_token, encodedKey, {
          algorithms: ["HS256"],
      });
    
      if (!payload) {
            return {
              errors: {
                username: ["Invalid username or password"],
              },
            };
      }
      
        if(payloadRefresToken.iss && payloadRefresToken.exp){
          let date = new Date(payloadRefresToken.exp * 1000);
          date.setHours(date.getHours() + 7);
          await createSession("refresh_token", data.data.refresh_token, date)
        }
        if(payloadAccessToken.iss && payloadAccessToken.exp){
          let date = new Date(payloadAccessToken.exp * 1000);
          date.setHours(date.getHours() + 7);
          await createSession("access_token", data.data.access_token, date);
        }
      
    }).catch((e:any) => {
      console.error(e);} );
      
    redirect("/dashboard");
}

export async function signup(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
    const { username, password } = result.data;

    const payload = {
      'username': String(username),
      "password": String(password),
    };

   await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), 
    }).then(async (response) => {
      if (!response.ok) {
        throw new Error("Failed to login");
      }
    }).catch((e:any) => {
      console.error(e);} );
      
    redirect("/login");
}


export async function logout() {
  await deleteSession();
  redirect("/login");
}