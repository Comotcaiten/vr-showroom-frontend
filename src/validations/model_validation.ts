import { z } from "zod";

class ModelValidation {
  // CREATE (only file is required)
  create = z.object({
    name: z.string().min(1, "name is required"),
    file: z
      .any()
      .refine((val) => {
        // Handle File instance
        if (val instanceof File) return true;
        // Handle FileList (from file input)
        if (val instanceof FileList && val.length > 0) return true;
        // Handle array with File
        if (Array.isArray(val) && val.length > 0 && val[0] instanceof File) return true;
        return false;
      }, {
        message: "File is required",
      }),
  });

  // PARAM ID
  id = z.object({
    id: z.string().min(1, "ID is required"),
  });
}

const validation = new ModelValidation();
export default validation;