"use client";

import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
} from "@/components/ui/field";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { FormFieldController } from "@/components/forms/form-field-controller";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import usersValidation from "@/validations/user_validations";
import { useAuth } from "@/context/auth-context";

const SignUpSchema = usersValidation.create;

export function SignupForm() {

  const router = useRouter();
  
  const { refreshUser } = useAuth();

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  async function onSubmit(data: z.infer<typeof SignUpSchema>) {
    try {
      console.log(`${process.env.NEXT_PUBLIC_API_URL}/users/login`)
      const res = await fetch(
        `http://localhost:5000/api/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data), // dùng data từ form
          credentials: "include",     // để nhận cookie
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Register failed");
        return;
      }

      await refreshUser();

      toast.success("Register successful");

      router.push("/");
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
        </CardTitle>
        <CardDescription className="flex items-center justify-center">
          Fill in the form below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-signup" className={cn("flex flex-col gap-6")} onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <FormFieldController
              control={form.control}
              name="name"
              id="form-signup-name"
              label="Name"
              placeholder="John"
            />
            <FormFieldController
              control={form.control}
              name="email"
              id="form-signup-email"
              label="Email"
              placeholder="john12@gmail.com"
            />
            <FormFieldController
              control={form.control}
              name="password"
              id="form-signup-password"
              label="Password"
              placeholder="John1234567890"
              helperText="Must be at least 8 characters long."
              type="password"
            />
            <FormFieldController
              control={form.control}
              name="confirmPassword"
              id="form-signup-confirmPassword"
              label="Confirm Password"
              placeholder="John1234567890"
              helperText="Please confirm your password"
              type="password"
            />
          </FieldGroup>

        </form>
      </CardContent>

      <CardFooter className="">
        <Field orientation="vertical">
          <Button type="submit" form="form-signup">
            Submit
          </Button>
          <Button type="button" variant="destructive" onClick={() => form.reset()}>
            Reset
          </Button>
          <FieldDescription className="text-center">
            Already have an account? <a href="/login">Login</a>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  )
}
