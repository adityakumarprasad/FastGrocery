import { auth } from '@/auth'
import EditRoleMobile from '@/components/EditRoleMobile'
import dbConnect from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import User from './models/user.model'
import Nav from '@/components/Nav'

const home = async () => {
  await dbConnect()
  const session = await auth()
  const user = await User.findById(session?.user.id)
  if (!user) {
    redirect('/login')
  }
  const inCompleteProfile = !user.mobile || !user.role || (!user.mobile && user.role == "user")
  if (inCompleteProfile) {
    return <EditRoleMobile />
  }

  return (
    <div>
      <Nav />
    </div>
  )
}

export default home
