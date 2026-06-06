import { z } from "zod";

class CategoryValidation {
  // BASE
  base = z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters.")
      .max(50, "Name must be at most 50 characters.")
      .trim()
      .optional(),

    description: z
      .string()
      .max(500, "Description must be at most 500 characters.")
      .trim()
      .optional()
      .or(z.literal("")), // allow("")

    categoryUrl: z
      .string()
      .max(255, "Category URL must be at most 255 characters.")
      .trim()
      .optional()
      .or(z.literal("")), // allow("")
  });

  // CREATE (name required giống Joi.fork)
  create = this.base.extend({
    name: this.base.shape.name.unwrap(),
  });

  // UPDATE (giữ optional như base)
  update = this.base;

  // PARAM ID
  id = z.object({
    id: z.string().min(1, "ID is required"),
  });
}
const categoryValidation =  new CategoryValidation();

export default categoryValidation;