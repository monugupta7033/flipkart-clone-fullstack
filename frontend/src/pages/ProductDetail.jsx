import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProduct } from '../api'
import { useCartStore } from '../store/cartStore'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [imgIndex, setImgIndex] = useState(0)
  const addItem = useCartStore((s) => s.addItem)

  useEffect(() => {
    getProduct(id).then((r) => setProduct(r.data))
  }, [id])
  if (!product)
    return <p style={{ padding: 40, textAlign: 'center' }}>Loading...</p>

  return (
    <div
      style={{
        background: '#fff',
        maxWidth: 1100,
        margin: '16px auto',
        padding: 32,
        borderRadius: 4,
        display: 'flex',
        gap: 32,
      }}
    >
      <div style={{ width: 380, flexShrink: 0 }}>
        <img
          src={product.images[imgIndex]}
          alt={product.name}
          style={{
            width: '100%',
            height: 350,
            objectFit: 'contain',
            border: '1px solid #f0f0f0',
            borderRadius: 4,
          }}
        />
        <div
          style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}
        >
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setImgIndex(i)}
              style={{
                width: 64,
                height: 64,
                objectFit: 'contain',
                cursor: 'pointer',
                border: i === imgIndex ? '2px solid #2874f0' : '1px solid #ddd',
                borderRadius: 4,
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button
            onClick={() => {
              addItem(product.id, 1)
              navigate('/cart')
            }}
            style={{
              flex: 1,
              padding: 14,
              background: '#ff9f00',
              border: 'none',
              fontWeight: 700,
              fontSize: 15,
              borderRadius: 2,
            }}
          >
            🛒 Add to Cart
          </button>
          <button
            onClick={() => {
              addItem(product.id, 1)
              navigate('/checkout')
            }}
            style={{
              flex: 1,
              padding: 14,
              background: '#fb641b',
              border: 'none',
              color: '#fff',
              fontWeight: 700,
              fontSize: 15,
              borderRadius: 2,
            }}
          >
            ⚡ Buy Now
          </button>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <h1 style={{ fontSize: 20, fontWeight: 400, marginBottom: 8 }}>
          {product.name}
        </h1>
        <p style={{ color: '#388e3c', fontSize: 14, marginBottom: 12 }}>
          ★ {product.rating} Rating
        </p>
        <p style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          ₹{Number(product.price).toLocaleString('en-IN')}
        </p>
        <p
          style={{
            color: product.stock > 0 ? '#388e3c' : '#ff6161',
            marginBottom: 16,
            fontWeight: 600,
          }}
        >
          {product.stock > 0
            ? `In Stock (${product.stock} left)`
            : 'Out of Stock'}
        </p>
        <p style={{ color: '#444', lineHeight: 1.7, marginBottom: 24 }}>
          {product.description}
        </p>
        <h3
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginBottom: 12,
            borderBottom: '1px solid #f0f0f0',
            paddingBottom: 8,
          }}
        >
          Specifications
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {Object.entries(product.specifications || {}).map(([k, v]) => (
              <tr key={k} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td
                  style={{
                    padding: '10px 0',
                    color: '#878787',
                    width: 180,
                    fontSize: 14,
                  }}
                >
                  {k}
                </td>
                <td style={{ padding: '10px 0', fontSize: 14 }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
