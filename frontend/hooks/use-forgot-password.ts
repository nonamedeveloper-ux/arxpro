import { Step } from '@/types'
import { create } from 'zustand'

type ForgotPasswordStore = {
  phone: string
  step: Step
  setPhone: (phone: string) => void
  setStep: (step: Step) => void
}

export const useForgotPassword = create<ForgotPasswordStore>(set => ({
  phone: '',
  step: 'first',
  setPhone: phone => set({ phone }),
  setStep: step => set({ step }),
}))
