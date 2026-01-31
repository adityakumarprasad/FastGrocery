'use client';
import React, { use } from 'react'
import Welcome from '@/components/Welcome'
import RegisterForm from '@/components/registerForm';
import { useState } from 'react';
const page = () => {
  const [step, setStep] = useState(1);
  return (
    <div>
      {step === 1 ? <Welcome nextStep={setStep} /> : <RegisterForm previousStep={setStep} />}
    </div>
  )
}

export default page
