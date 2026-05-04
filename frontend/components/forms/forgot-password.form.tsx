'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { forgotPasswordFormSchema } from '@/lib/validations'
import { ForgotPasswordFormSchema } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { sendOtp } from '@/actions/otp.action'
import { useForgotPassword } from '@/hooks/use-forgot-password'

export default function ForgotPasswordForm() {
  const forgotPasswordForm = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: { phone: '' },
  })

  const [isLoading, setIsLoading] = useState(false)
  const { setPhone, setStep } = useForgotPassword()

  const onForgotPasswordFormSubmit = ({ phone }: ForgotPasswordFormSchema) => {
    setIsLoading(true)

    sendOtp(phone)
      .then(({ status, message }) => {
        if (status === 200) {
          setPhone(phone)
          setStep('second')
          toast.success(message)
        } else {
          toast.error(message)
        }
      })
      .catch((err: any) => {
        toast.error(`Error sending verification code: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Form {...forgotPasswordForm}>
      <form
        onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordFormSubmit)}
        className='space-y-6'
      >
        <FormField
          name='phone'
          control={forgotPasswordForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base mb-1'>Phone number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='+998XXXXXXXXX'
                  className='bg-transparent rounded-[8px] text-white-1 h-10 placeholder:text-gray-6'
                  disabled={isLoading}
                  type='tel'
                  autoComplete='tel'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type='submit'
          className='mt-2 w-full bg-primary text-white-1 rounded-[8px] h-10'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className='animate-spin' /> Loading...
            </>
          ) : (
            'Send'
          )}
        </Button>
      </form>
    </Form>
  )
}
