import z from 'zod'

export const addUpdateProductSchema = z.object({
    productName: z
        .string()
        .trim()
        .min(3, 'Product name must be at least 3 characters long')
        .max(50, 'Product name must be less than 50 characters'),

    category: z
        .string()
        .trim()
        .min(1, 'Please select category'),

    price: z
        .string()
        .trim()
        .regex(/^\d+(\.\d{1,2})?$/, 'Price must be a valid number')
        .refine((val) => Number(val) > 0, {
            message: 'Price must be greater than 0',
        }),

    description: z
        .string()
        .trim()
        .min(10, 'Description must be atleast 10 characters long')
        .max(150, 'Description must be less than 150 characters')
})

export type AddUpdateProductForm = z.infer<typeof addUpdateProductSchema>

