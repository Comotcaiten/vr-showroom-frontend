import { z } from "zod";
class BrandValidation {
  // BASE
  base = z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters.")
      .max(50, "Name must be at most 50 characters.")
      .trim()
      .optional(),

    description: z
      .string()
      .max(500, "Description must be at most 500 characters.")
      .trim()
      .optional()
      .or(z.literal("")), // allow("")

    logoUrl: z
      .string()
      .max(255, "Logo URL must be at most 255 characters.")
      .trim()
      .optional()
      .or(z.literal("")), // allow("")
  });

  // CREATE (name required giống Joi.fork)
  create = this.base.extend({
    name: this.base.shape.name.unwrap(), // remove optional
  });

  // UPDATE (giữ optional như base)
  update = this.base;

  // PARAM ID
  id = z.string();
}

const brandValidation = new BrandValidation();

export default brandValidation;
