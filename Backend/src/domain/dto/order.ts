import { z } from "zod";

export const OrderDTO = z.object({
    items: z
        .object({
            product: z.object({
                _id: z.string(),
                name: z.string(),
                price: z.number(),
                image: z.string(),
                description: z.string(),
            }),
            quantity: z.number(),
        })
        .array(),
    ShippingAddress: z.object({
        name: z.string(),
        phoneNumber: z.string(),
        address: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
    })
});