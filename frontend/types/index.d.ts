import {
  contactFormSchema,
  forgotPasswordFormSchema,
  loginFormSchema,
  recoveryPasswordFormSchema,
  registerFormSchema,
  verificationFormSchema,
} from '@/lib/validations'
import { ReactNode } from 'react'
import z from 'zod'

interface ChildProps {
  children: ReactNode
}

type ContactFormSchema = z.infer<typeof contactFormSchema>
type LoginFormSchema = z.infer<typeof loginFormSchema>
type RegisterFormSchema = z.infer<typeof registerFormSchema>
type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>
type VerificationFormSchema = z.infer<typeof verificationFormSchema>
type RecoveryPasswordFormSchema = z.infer<typeof recoveryPasswordFormSchema>

type Step = 'first' | 'second' | 'last'

interface Response<T> {
  status: number
  message: string
  data: T
}

interface User {
  id?: string
  phone: string
  role: string
  nickName?: string
  email?: string
  firstName?: string
  lastName?: string
  password?: string
  profileImageId?: string
}
