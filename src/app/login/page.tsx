import LoginForm from '@/components/Forms/LoginForm'
import React from 'react'

export default function LoginPage() {
  return (
    <section className='border border-gray-700/10 shadow-md flex flex-col justify-center items-center p-4 rounded-xl'>
      <LoginForm />
    </section>
  )
}
