import { verificationFormSchema } from '@/lib/validations'
import { VerificationFormSchema } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { Button } from '../ui/button'
import { sendOtp, verifyOtp } from '@/actions/otp.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader } from 'lucide-react'
import { register } from '@/actions/auth.action'
import { useUserDetails } from '@/hooks/use-user-details'
import { useForgotPassword } from '@/hooks/use-forgot-password'

export default function VerificationForm() {
  const verificationForm = useForm<VerificationFormSchema>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: { code: '' },
  })

  const [isLoading, setIsLoading] = useState(false)
  const { userDetails } = useUserDetails()
  const { email, step, setStep } = useForgotPassword()
  const router = useRouter()

  const onVerificationFormSubmit = (values: VerificationFormSchema) => {
    setIsLoading(true)

    if (userDetails?.email) {
      verifyOtp(userDetails.email, values.code)
        .then(({ status, message }) => {
          if (status === 200) {
            register({
              email: userDetails.email,
              password: userDetails.password!,
              nickName: userDetails.nickName,
              role: userDetails.role,
              phone: userDetails.phone,
            })
              .then(({ status, message }) => {
                if (status === 201) {
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
          } else {
            setIsLoading(false)
            toast.error(message)
          }
        })
        .catch(error => {
          setIsLoading(false)
          console.log(error)
          toast.error('Something went wrong')
        })
    }

    if (step === 'second') {
      verifyOtp(email, values.code)
        .then(({ status, message }) => {
          if (status === 200) {
            setStep('last')
            toast.success(message)
          } else {
            toast.error(message)
          }
        })
        .catch(error => {
          console.log(error)
          toast.error('Something went wrong')
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const onResend = () => {
    setIsLoading(true)

    const userEmail = userDetails?.email ? userDetails.email : email

    sendOtp(userEmail)
      .then(({ status, message }) => {
        if (status === 200) {
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
    <Form {...verificationForm}>
      <form
        onSubmit={verificationForm.handleSubmit(onVerificationFormSubmit)}
        className='space-y-4'
      >
        <FormField
          name='code'
          control={verificationForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-base mb-1'>Verification code</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  {...field}
                  disabled={isLoading}
                >
                  <InputOTPGroup>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot key={index} index={index} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
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
            'Verify'
          )}
        </Button>

        <div className='flex justify-center items-center gap-x-2'>
          <p>Haven&apos;t you received verification code yet?</p>
          <Button
            type='button'
            variant={'ghost'}
            className='text-primary font-semibold hover:bg-transparent hover:text-primary text-base'
            disabled={isLoading}
            onClick={onResend}
          >
            Resend
          </Button>
        </div>
      </form>
    </Form>
  )
}
