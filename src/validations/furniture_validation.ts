import { z } from "zod";

class FurnitureValidation {
  // SUB-SCHEMA (dimensions)
  dimensionsSchema = z.object({
    width: z.number().min(0, "Width must be >= 0").optional(),
    height: z.number().min(0, "Height must be >= 0").optional(),
    depth: z.number().min(0, "Depth must be >= 0").optional(),
  });

  // BASE
  base = z.object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters.")
      .max(100, "Name must be at most 100 characters.")
      .optional(),

    description: z
      .string()
      .trim()
      .max(1000, "Description must be at most 1000 characters.")
      .optional()
      .or(z.literal("")), // allow("")

    categoryId: z.string().optional(),

    brandId: z.string().optional(),

    price: z
      .number()
      .min(0, "Price must be >= 0")
      .optional(),

    quantity: z
      .number()
      .min(0, "Quantity must be >= 0")
      .optional(),

    dimensions: this.dimensionsSchema.optional(),

    modelId: z.string().optional().or(z.literal("")), // allow("")

    thumbnailUrl: z
      .string()
      .trim()
      .max(255, "Thumbnail URL must be at most 255 characters.")
      .optional()
      .or(z.literal("")), // allow("")
  });

  // CREATE (required fields giống Joi.fork)
  create = this.base.extend({
    name: this.base.shape.name.unwrap(),
    categoryId: this.base.shape.categoryId.unwrap(),
    brandId: this.base.shape.brandId.unwrap(),
    price: this.base.shape.price.unwrap(),
  });

  // UPDATE
  update = this.base;

  // PARAM ID
  id = z.object({
    id: z.string().min(1, "ID is required"),
  });
}
const validation = new FurnitureValidation()
export default validation;