import { z } from "zod";
class UsersValidation {
  // BASE (giống Joi base)
  base = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters long.")
      .regex(/^[a-zA-Z0-9_]+$/, "Don't contain special character.")
      .optional(),

    email: z
      .email("Please enter a valid email.")
      .trim()
      .max(255)
      .optional(),

    password: z
      .string()
      .min(8, "Be at least 8 characters long")
      .regex(/[a-zA-Z]/, "Contain at least one letter.")
      .regex(/[0-9]/, "Contain at least one number.")
      .regex(/[^a-zA-Z0-9]/, "Contain at least one special character.")
      .optional(),

    confirmPassword: z.string().optional(),

    role: z.enum(["user", "admin"]).optional(),

    _delete: z.boolean().optional(),
  });

  // CREATE (giống fork required)
  create = this.base
    .extend({
      name: this.base.shape.name.unwrap(),
      email: this.base.shape.email.unwrap(),
      password: this.base.shape.password.unwrap(),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  // UPDATE (giữ optional như base)
  update = this.base;

  // LOGIN
  login = z.object({
    email: z.email("Please enter a valid email.").trim(),
    password: z.string().min(8, "Password is required"),
  });
}

const usersValidation = new UsersValidation();

export default usersValidation;