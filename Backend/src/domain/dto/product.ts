import { z } from "zod";

export const ProductDTO = z.object({
    categoryId: z.string(),
    image: z.string(),
    name: z.string(),
    price: z.number(),
    description: z.string(),
  
});
