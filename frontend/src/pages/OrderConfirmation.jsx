import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOrder } from '../api'

export default function OrderConfirmation() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  useEffect(() => {
    getOrder(id).then((r) => setOrder(r.data))
  }, [id])
  if (!order)
    return <p style={{ padding: 40, textAlign: 'center' }}>Loading...</p>

  return (
    <div
      style={{
        maxWidth: 600,
        margin: '40px auto',
        background: '#fff',
        padding: 40,
        borderRadius: 4,
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
      <h1 style={{ fontSize: 24, color: '#388e3c', marginBottom: 8 }}>
        Order Placed Successfully!
      </h1>
      <p style={{ color: '#878787', marginBottom: 24 }}>
        Your order has been placed and is being processed.
      </p>
      <div
        style={{
          background: '#f1f3f6',
          padding: 16,
          borderRadius: 4,
          marginBottom: 24,
          textAlign: 'left',
        }}
      >
        <p style={{ fontSize: 13, color: '#878787', marginBottom: 4 }}>
          ORDER ID
        </p>
        <p style={{ fontSize: 14, fontWeight: 600, wordBreak: 'break-all' }}>
          {order.id}
        </p>
        <p
          style={{
            fontSize: 13,
            color: '#878787',
            marginTop: 12,
            marginBottom: 4,
          }}
        >
          TOTAL AMOUNT
        </p>
        <p style={{ fontSize: 18, fontWeight: 700 }}>
          ₹{Number(order.total_amount).toLocaleString('en-IN')}
        </p>
        <p
          style={{
            fontSize: 13,
            color: '#878787',
            marginTop: 12,
            marginBottom: 4,
          }}
        >
          STATUS
        </p>
        <p
          style={{
            fontSize: 14,
            color: '#388e3c',
            fontWeight: 600,
            textTransform: 'uppercase',
          }}
        >
          {order.status}
        </p>
      </div>
      <button
        onClick={() => navigate('/')}
        style={{
          padding: '12px 32px',
          background: '#2874f0',
          color: '#fff',
          border: 'none',
          fontSize: 15,
          borderRadius: 2,
          fontWeight: 600,
        }}
      >
        Continue Shopping
      </button>
    </div>
  )
}
