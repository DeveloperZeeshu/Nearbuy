import z from 'zod'

//Login form validator schema
export const loginValidationSchema = z.object({
    email: z
        .email('Please enter a valid email')
        .trim()
        .toLowerCase()
        .max(100, 'Email must be less than 100 characters'),

    password: z
        .string()
        .trim()
        .min(8, 'Password must be at least 8 characters long')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
            "Password must contain uppercase, lowercase, number, and special character"
        )
})

export type LoginFormData = z.infer<typeof loginValidationSchema>


//Registration form validation schema
export const registerValidationSchema = loginValidationSchema.extend({
    shopName: z
        .string()
        .trim()
        .min(4, 'Shop name must be at least 4 characters long')
        .max(50, 'Shop name must be less than 50 characters long'),

    ownerName: z
        .string()
        .trim()
        .min(4, 'Owner name must be at least 4 characters long')
        .max(50, 'Owner name must be less than 50 characters long'),

    confirmPassword: z
        .string()
        .trim()
        .min(8, 'Confirm password is required'),

    phone: z
        .string()
        .trim()
        .regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),

    address: z
        .string()
        .trim()
        .min(6, 'Address must be at least 4 characters long')
        .max(100, 'Address must be less than 100 characters long'),

    city: z
        .string()
        .trim()
        .min(1, 'Please select a city'),

    state: z
        .string()
        .trim()
        .min(1, 'Please select a state'),

    zipcode: z
        .string()
        .trim()
        .regex(/^\d{6}$/, 'Zipcode must be exactly 6 digits'),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password do not match',
        path: ['confirmPassword']
    })

export type RegisterFormData = z.infer<typeof registerValidationSchema>

export const updateProfileSchema = z.object({
    shopName: registerValidationSchema.shape.shopName,
    ownerName: registerValidationSchema.shape.ownerName,
    email: loginValidationSchema.shape.email,      
    phone: registerValidationSchema.shape.phone,
    address: registerValidationSchema.shape.address,
    city: registerValidationSchema.shape.city,
    state: registerValidationSchema.shape.state,
    zipcode: registerValidationSchema.shape.zipcode,

    password: loginValidationSchema.shape.password,
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;