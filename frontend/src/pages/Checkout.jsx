import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore'
import { placeOrder } from '../api'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, fetchCart } = useCartStore()
  const total = items.reduce(
    (sum, i) => sum + Number(i.product.price) * i.quantity,
    0,
  )
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })
  const [loading, setLoading] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async () => {
    if (
      !form.full_name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert('Please fill all fields')
      return
    }
    setLoading(true)
    const { data } = await placeOrder({ shipping_address: form })
    await fetchCart()
    navigate(`/order/${data.id}`)
  }

  const field = (label, name, placeholder) => (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          fontSize: 13,
          color: '#878787',
          display: 'block',
          marginBottom: 4,
        }}
      >
        {label}
      </label>
      <input
        name={name}
        value={form[name]}
        onChange={handle}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #ddd',
          borderRadius: 4,
          fontSize: 14,
        }}
      />
    </div>
  )

  return (
    <div
      style={{
        display: 'flex',
        gap: 24,
        padding: 24,
        maxWidth: 1000,
        margin: '0 auto',
      }}
    >
      <div
        style={{ flex: 1, background: '#fff', padding: 24, borderRadius: 4 }}
      >
        <h2
          style={{
            fontSize: 18,
            marginBottom: 24,
            borderBottom: '1px solid #f0f0f0',
            paddingBottom: 12,
          }}
        >
          Delivery Address
        </h2>
        {field('Full Name', 'full_name', 'Enter full name')}
        {field('Phone Number', 'phone', '10-digit mobile number')}
        {field('Address', 'address', 'House No, Building, Street')}
        {field('City', 'city', 'City')}
        {field('State', 'state', 'State')}
        {field('Pincode', 'pincode', '6-digit pincode')}
        <button
          onClick={submit}
          disabled={loading}
          style={{
            width: '100%',
            padding: 14,
            background: '#fb641b',
            color: '#fff',
            border: 'none',
            fontSize: 16,
            fontWeight: 600,
            borderRadius: 2,
            marginTop: 8,
          }}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
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
          ORDER SUMMARY
        </p>
        {items.map((i) => (
          <div
            key={i.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 8,
              fontSize: 13,
            }}
          >
            <span
              style={{
                maxWidth: 160,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {i.product.name} × {i.quantity}
            </span>
            <span>
              ₹{(Number(i.product.price) * i.quantity).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid #f0f0f0',
            paddingTop: 12,
            fontWeight: 700,
            fontSize: 16,
            marginTop: 8,
          }}
        >
          <span>Total</span>
          <span>₹{Number(total).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  )
}
