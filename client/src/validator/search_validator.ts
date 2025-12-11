import z from 'zod'

export const searchProductsSchema = z.object({
    query: z
        .string()
        .trim()
        .min(3, 'Enter product name'),

    category: z
        .string()
        .trim()
        .min(1, 'Select category'),

    radius: z
        .string()
        .trim()
        .min(1, 'Select radius')
})

export type SearchProductFormData = z.infer<typeof searchProductsSchema>
