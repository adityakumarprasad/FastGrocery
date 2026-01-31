'use client'
import React from 'react'
import { motion } from "motion/react"
import { ArrowRight, Bike, ShoppingBasket, Zap } from 'lucide-react'

type propType = {
  nextStep: (s: number) => void
}

function Welcome({ nextStep }: propType) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center p-6 bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-emerald-100 via-white to-orange-100 overflow-hidden relative'>

      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-10 right-10 w-32 h-32 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      {/* Header / Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className='flex items-center gap-3 relative z-10'
      >
        <div className="p-3 bg-white rounded-2xl shadow-lg border border-emerald-100">
          <ShoppingBasket className='w-8 h-8 text-emerald-600' />
        </div>
        <h1 className='text-4xl md:text-6xl font-black tracking-tight text-gray-800'>
          Fast<span className='text-emerald-600'>Grocery</span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className='mt-6 text-gray-600 text-lg md:text-xl max-w-lg font-medium relative z-10'
      >
        Superfast delivery of fresh produce and daily essentials.
        <span className="block text-emerald-700 font-semibold mt-1">From store to door in minutes.</span>
      </motion.p>

      {/* Hero Icons Animation */}
      <motion.div
        className='relative flex items-center justify-center gap-8 mt-12 mb-12 z-10'
      >
        {/* Floating Grocery Basket */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white"
          >
            <ShoppingBasket className='w-20 h-20 md:w-28 md:h-28 text-emerald-500' />
          </motion.div>
        </motion.div>

        {/* Speed Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="absolute z-20 bg-orange-500 text-white p-3 rounded-full shadow-lg border-4 border-white"
        >
          <Zap className="w-6 h-6 fill-current" />
        </motion.div>

        {/* Floating Delivery Bike */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1.5 }}
            className="bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white"
          >
            <Bike className='w-20 h-20 md:w-28 md:h-28 text-orange-500' />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Action Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='group relative inline-flex items-center gap-3 bg-gray-900 hover:bg-black text-white font-bold py-4 px-10 rounded-full shadow-xl shadow-emerald-500/20 transition-all duration-300 z-10'
        onClick={() => nextStep(2)}
      >
        Get Started
        <div className="bg-white/20 rounded-full p-1 group-hover:translate-x-1 transition-transform">
          <ArrowRight className="w-5 h-5" />
        </div>
      </motion.button>

    </div>
  )
}

export default Welcome