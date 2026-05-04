import z from 'zod'

export const contactFormSchema = z.object({
  firstName: z
    .string('First name is required')
    .min(3, 'First name must be at least 3 characters')
    .max(32, 'First name must be less than 32 characters'),
  lastName: z
    .string('Last name is required')
    .min(3, 'Last name must be at least 3 characters')
    .max(32, 'Last name must be less than 32 characters'),
  email: z.string().email('Invalid email address'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be less than 500 characters'),
})

export const loginFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'Password must be less than 16 characters'),
})

export const registerFormSchema = z.object({
  nickName: z
    .string('Nick name is required')
    .min(3, 'Nick name must be at least 3 characters')
    .max(50, 'Nick name must be less than 50 characters'),
  role: z.string('Role is required').min(4, 'Role is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  password: z
    .string('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'Password must be less than 16 characters'),
})

export const forgotPasswordFormSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export const verificationFormSchema = z.object({
  code: z.string('Verification code is required').length(6, 'Verification code must be 6 characters'),
})

export const recoveryPasswordFormSchema = z
  .object({
    newPassword: z
      .string('New password is required')
      .min(6, 'New password must be at least 6 characters')
      .max(16, 'New password must be less than 16 characters'),
    confirmedPassword: z
      .string('Confirm password is required')
      .min(6, 'Confirm password must be at least 6 characters')
      .max(16, 'Confirm password must be less than 16 characters'),
  })
  .refine(data => data.newPassword === data.confirmedPassword, {
    path: ['confirmedPassword'],
    message: 'Confirm password must be equal to new password',
  })
