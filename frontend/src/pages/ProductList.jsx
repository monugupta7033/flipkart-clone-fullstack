import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getProducts, getCategories } from '../api'
import { useCartStore } from '../store/cartStore'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const search = searchParams.get('search') || ''

  useEffect(() => {
    getCategories().then((r) => setCategories(r.data))
  }, [])
  useEffect(() => {
    getProducts({
      search: search || undefined,
      category: category || undefined,
    }).then((r) => setProducts(r.data))
  }, [search, category])

  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        padding: 16,
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      <aside
        style={{
          width: 200,
          background: '#fff',
          padding: 16,
          borderRadius: 4,
          height: 'fit-content',
        }}
      >
        <p
          style={{
            fontWeight: 600,
            marginBottom: 12,
            fontSize: 13,
            color: '#878787',
          }}
        >
          CATEGORY
        </p>
        <div
          onClick={() => setCategory('')}
          style={{
            padding: '8px 0',
            cursor: 'pointer',
            fontWeight: !category ? 600 : 400,
            color: !category ? '#2874f0' : '#212121',
            fontSize: 14,
          }}
        >
          All
        </div>
        {categories.map((c) => (
          <div
            key={c.id}
            onClick={() => setCategory(c.id)}
            style={{
              padding: '8px 0',
              cursor: 'pointer',
              fontWeight: category == c.id ? 600 : 400,
              color: category == c.id ? '#2874f0' : '#212121',
              fontSize: 14,
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            {c.name}
          </div>
        ))}
      </aside>

      <main style={{ flex: 1 }}>
        {search && (
          <p style={{ marginBottom: 12, fontSize: 14, color: '#878787' }}>
            Showing results for "<b>{search}</b>"
          </p>
        )}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 12,
          }}
        >
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                background: '#fff',
                borderRadius: 4,
                padding: 16,
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  '0 4px 16px rgba(0,0,0,0.15)')
              }
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              <div onClick={() => navigate(`/product/${p.id}`)}>
                <img
                  src={p.images?.[0]}
                  alt={p.name}
                  style={{ width: '100%', height: 180, objectFit: 'contain' }}
                />
                <p
                  style={{
                    fontSize: 13,
                    margin: '8px 0 4px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {p.name}
                </p>
                <p style={{ fontWeight: 700, fontSize: 16 }}>
                  ₹{Number(p.price).toLocaleString('en-IN')}
                </p>
                <p style={{ fontSize: 12, color: '#388e3c' }}>
                  ★ {p.rating} • Free delivery
                </p>
              </div>
              <button
                onClick={() => addItem(p.id, 1)}
                style={{
                  marginTop: 8,
                  width: '100%',
                  padding: '8px 0',
                  background: '#ff9f00',
                  border: 'none',
                  borderRadius: 2,
                  fontWeight: 600,
                  fontSize: 13,
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
