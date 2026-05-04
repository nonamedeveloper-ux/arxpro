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

export type ContactFormSchema = z.infer<typeof contactFormSchema>
export type LoginFormSchema = z.infer<typeof loginFormSchema>
export type RegisterFormSchema = z.infer<typeof registerFormSchema>
export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>
export type VerificationFormSchema = z.infer<typeof verificationFormSchema>
export type RecoveryPasswordFormSchema = z.infer<typeof recoveryPasswordFormSchema>

export type Step = 'first' | 'second' | 'last'

export interface Response<T> {
  status: number
  message: string
  data: T
}

export interface User {
  id?: string
  phone?: string
  role: string
  nickName?: string
  email: string
  firstName?: string
  lastName?: string
  password?: string
  profileImageId?: string
}
