import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'

export default function Cart() {
  const { items, fetchCart, updateItem, removeItem } = useCartStore()
  const total = items.reduce(
    (sum, i) => sum + Number(i.product.price) * i.quantity,
    0,
  )
  const navigate = useNavigate()

  useEffect(() => {
    fetchCart()
  }, [])

  if (!items.length)
    return (
      <div style={{ textAlign: 'center', padding: 80 }}>
        <p style={{ fontSize: 22, marginBottom: 8 }}>Your cart is empty!</p>
        <p style={{ color: '#878787', marginBottom: 24 }}>
          Add items to it now.
        </p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '12px 32px',
            background: '#2874f0',
            color: '#fff',
            border: 'none',
            fontSize: 15,
            borderRadius: 2,
          }}
        >
          Shop Now
        </button>
      </div>
    )

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        padding: 16,
        maxWidth: 1100,
        margin: '0 auto',
      }}
    >
      <div style={{ flex: 1 }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              background: '#fff',
              padding: 20,
              marginBottom: 8,
              borderRadius: 4,
              display: 'flex',
              gap: 20,
              alignItems: 'center',
            }}
          >
            <img
              src={item.product.images?.[0]}
              style={{ width: 80, height: 80, objectFit: 'contain' }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, marginBottom: 4 }}>
                {item.product.name}
              </p>
              <p style={{ fontSize: 18, fontWeight: 700 }}>
                ₹{Number(item.product.price).toLocaleString('en-IN')}
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 12,
                }}
              >
                <button
                  onClick={() => updateItem(item.id, item.quantity - 1)}
                  style={{
                    width: 28,
                    height: 28,
                    border: '1px solid #ddd',
                    background: '#fff',
                    fontSize: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  −
                </button>
                <span style={{ minWidth: 24, textAlign: 'center' }}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateItem(item.id, item.quantity + 1)}
                  style={{
                    width: 28,
                    height: 28,
                    border: '1px solid #ddd',
                    background: '#fff',
                    fontSize: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  +
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    marginLeft: 16,
                    color: '#878787',
                    background: 'none',
                    border: 'none',
                    fontSize: 13,
                  }}
                >
                  REMOVE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          width: 280,
          height: 'fit-content',
          background: '#fff',
          padding: 20,
          borderRadius: 4,
        }}
      >
        <p
          style={{
            color: '#878787',
            fontSize: 13,
            fontWeight: 600,
            borderBottom: '1px solid #f0f0f0',
            paddingBottom: 12,
            marginBottom: 12,
          }}
        >
          PRICE DETAILS
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 12,
            fontSize: 14,
          }}
        >
          <span>Price ({items.length} items)</span>
          <span>₹{Number(total).toLocaleString('en-IN')}</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 12,
            fontSize: 14,
          }}
        >
          <span>Delivery Charges</span>
          <span style={{ color: '#388e3c' }}>Free</span>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid #f0f0f0',
            paddingTop: 12,
            fontWeight: 700,
            fontSize: 17,
          }}
        >
          <span>Total Amount</span>
          <span>₹{Number(total).toLocaleString('en-IN')}</span>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          style={{
            width: '100%',
            marginTop: 20,
            padding: 14,
            background: '#fb641b',
            color: '#fff',
            border: 'none',
            fontSize: 16,
            fontWeight: 600,
            borderRadius: 2,
          }}
        >
          Place Order
        </button>
      </div>
    </div>
  )
}
