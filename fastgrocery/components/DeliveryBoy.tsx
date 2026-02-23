import React from 'react'
// #region agent log
typeof globalThis.window === 'undefined' && fetch('http://127.0.0.1:7242/ingest/cb28530e-047b-49f8-9942-5ffa21983a6b', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'DeliveryBoy.tsx:5', message: 'DeliveryBoy server render', data: { hasWindow: false, env: 'server' }, timestamp: Date.now(), hypothesisId: 'H1' }) }).catch(() => { });
// #endregion
import DeliveryBoyDashboard from './DeliveryBoyDashboard'
import { auth } from '@/auth'
import dbConnect from '@/lib/db'
import Order from '@/app/models/order.model'

async function DeliveryBoy() {
  await dbConnect()
  const session = await auth()
  const deliveryBoyId = session?.user?.id
  const orders = await Order.find({
    assignedDeliveryBoy: deliveryBoyId,
    deliveryOtpVerification: true
  })

  const today = new Date().toDateString()
  const todayOrders = orders.filter((o) => new Date(o.deliveredAt).toDateString() === today).length
  const todaysEarning = todayOrders * 40

  return (
    <>
      <DeliveryBoyDashboard earning={todaysEarning} />
    </>
  )
}

export default DeliveryBoy
