'use client'

import { registerFormSchema } from '@/lib/validations'
import { RegisterFormSchema } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { sendOtp } from '@/actions/otp.action'
import { Loader } from 'lucide-react'
import { useUserDetails } from '@/hooks/use-user-details'

interface RegisterFormProps {
  setIsVerifying: (isVerifying: boolean) => void
}

export default function RegisterForm({ setIsVerifying }: RegisterFormProps) {
  const registerFrom = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { nickName: '', role: '', phone: '', password: '' },
  })

  const { setUserDetails } = useUserDetails()
  const [isLoading, setIsLoading] = useState(false)

  const onRegisterFormSubmit = (values: RegisterFormSchema) => {
    const { nickName, phone, role, password } = values

    setIsLoading(true)

    sendOtp(phone, nickName)
      .then(({ status, message }) => {
        if (status === 200) {
          setIsVerifying(true)
          setUserDetails({ phone, nickName, role, password })
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
    <Form {...registerFrom}>
      <form onSubmit={registerFrom.handleSubmit(onRegisterFormSubmit)} className='space-y-4'>
        <FormField
          name='nickName'
          control={registerFrom.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base mb-1'>Nick name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter your nick name'
                  className='bg-transparent rounded-[8px] text-white-1 h-10 placeholder:text-gray-6'
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='phone'
          control={registerFrom.control}
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
          name='role'
          control={registerFrom.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base mb-1'>Role</FormLabel>
              <Select
                defaultValue={field.value}
                onValueChange={field.onChange}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger className='w-full rounded-[8px]'>
                    <SelectValue placeholder='Select your role' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='user' className='font-bold'>
                    User
                  </SelectItem>
                  <SelectItem value='architektor' className='font-bold'>
                    Architector
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name='password'
          control={registerFrom.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base mb-1'>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Enter your password'
                  className='bg-transparent rounded-[8px] text-white-1 h-10 placeholder:text-gray-6'
                  type='password'
                  autoComplete='new-password'
                  disabled={isLoading}
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
            'Register'
          )}
        </Button>

        <div className='flex justify-center items-center gap-x-2 mt-2'>
          <p>Already have an account?</p>
          <Link href={'/login'} className='text-primary font-semibold'>
            Login
          </Link>
        </div>
      </form>
    </Form>
  )
}
