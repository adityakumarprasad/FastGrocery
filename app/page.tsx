import { auth } from '@/auth'
import EditRoleMobile from '@/components/EditRoleMobile'
import dbConnect from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import User from './models/user.model'
import Nav from '@/components/Nav'
import DeliveryBoyDashboard from '@/components/DeliveryBoyDashboard'
import AdminDashboard from '@/components/AdminDashboard'
import UserDashboard from '@/components/UserDashboard'

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
  const plainUser = JSON.parse(JSON.stringify(user))

  return (
    <div>
      <Nav user={plainUser} />
      {user.role == 'user' && <UserDashboard />}
      {user.role == 'admin' && <AdminDashboard />}
      {user.role == 'deliveryBoy' && <DeliveryBoyDashboard />}
    </div>
  )
}

export default home
