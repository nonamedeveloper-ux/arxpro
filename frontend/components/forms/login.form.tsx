'use client'

import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { LoginFormSchema } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginFormSchema } from '@/lib/validations'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useState } from 'react'
import { login } from '@/actions/auth.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'

export default function LoginForm() {
  const loginForm = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { phone: '', password: '' },
  })

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const onLoginFormSubmit = ({ phone, password }: LoginFormSchema) => {
    setIsLoading(true)

    login(phone, password)
      .then(({ status, message }) => {
        if (status === 200) {
          toast.success(message)
          router.replace('/')
        } else {
          toast.error(message)
        }
      })
      .catch(err => {
        console.log(err)
        toast.error('Something went wrong')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onLoginFormSubmit)} className='space-y-4'>
        <FormField
          name='phone'
          control={loginForm.control}
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

        <FormField
          name='password'
          control={loginForm.control}
          render={({ field }) => (
            <FormItem>
              <div className='flex items-center justify-between mb-1'>
                <FormLabel className='text-base'>Password</FormLabel>
                <Link href={'/forgot-password'} className='text-primary text-base font-semibold'>
                  Forgot password?
                </Link>
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter your password'
                  className='bg-transparent rounded-[8px] text-white-1 h-10 placeholder:text-gray-6'
                  disabled={isLoading}
                  type='password'
                  autoComplete='current-password'
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
            'Login'
          )}
        </Button>

        <div className='flex justify-center items-center gap-x-2 mt-2'>
          <p>Don&apos;t have an account yet?</p>
          <Link href={'/register'} className='text-primary font-semibold'>
            Register
          </Link>
        </div>
      </form>
    </Form>
  )
}
