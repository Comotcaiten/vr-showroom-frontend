"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import {useRouter} from 'next/navigation'

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
import * as z from "zod";

import usersValidation from "@/validations/user_validations";
import { useAuthStore } from "@/stores/useAuthStore";

const SignUpSchema = usersValidation.create;

type SignUpFormValue = z.infer<typeof SignUpSchema>;

export function SignUpForm() {

  const router = useRouter()
  const {signUp} = useAuthStore();

  const form = useForm<SignUpFormValue>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async(data: SignUpFormValue) => {
    const {name, email, password, confirmPassword} = data;
    await signUp(name, email, password, confirmPassword);

    router.push("/");
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
        <form
          id="form-signup"
          className={cn("flex flex-col gap-6")}
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
          <Button
            type="button"
            variant="destructive"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <FieldDescription className="text-center">
            Already have an account? <a href="/login">Login</a>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
}
