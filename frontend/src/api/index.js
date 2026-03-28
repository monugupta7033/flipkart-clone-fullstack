import axios from 'axios'
const api = axios.create({
  baseURL: 'https://flipkart-backend-9xdm.onrender.com',
})
export const getProducts = (params) => api.get('/products', { params })
export const getProduct = (id) => api.get(`/products/${id}`)
export const getCategories = () => api.get('/categories')
export const getCart = () => api.get('/cart')
export const addToCart = (data) => api.post('/cart', data)
export const updateCartItem = (id, qty) =>
  api.put(`/cart/${id}?quantity=${qty}`)
export const removeCartItem = (id) => api.delete(`/cart/${id}`)
export const placeOrder = (data) => api.post('/orders', data)
export const getOrder = (id) => api.get(`/orders/${id}`)
