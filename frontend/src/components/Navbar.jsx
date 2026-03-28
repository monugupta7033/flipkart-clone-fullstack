import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { useEffect } from 'react'

export default function Navbar() {
  const navigate = useNavigate()
  const { items, fetchCart } = useCartStore()
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <nav
      style={{
        background: '#2874f0',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <span
        onClick={() => navigate('/')}
        style={{
          color: '#fff',
          fontSize: 22,
          fontWeight: 700,
          cursor: 'pointer',
          fontStyle: 'italic',
        }}
      >
        Flipkart
      </span>
      <span style={{ color: '#ffe500', fontSize: 11 }}>
        Explore <b>Plus</b>
      </span>
      <div style={{ flex: 1, maxWidth: 500 }}>
        <input
          placeholder="Search for products, brands and more"
          style={{
            width: '100%',
            padding: '8px 16px',
            borderRadius: 2,
            border: 'none',
            fontSize: 14,
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') navigate(`/?search=${e.target.value}`)
          }}
        />
      </div>
      <button
        onClick={() => navigate('/cart')}
        style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontSize: 15,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        🛒 Cart{' '}
        {count > 0 && (
          <span
            style={{
              background: '#ff6161',
              borderRadius: '50%',
              padding: '2px 6px',
              fontSize: 12,
            }}
          >
            {count}
          </span>
        )}
      </button>
    </nav>
  )
}
