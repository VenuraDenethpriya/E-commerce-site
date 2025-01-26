import { z } from "zod";

export const CategoryDTO = z.object({
    name: z.string(),
});