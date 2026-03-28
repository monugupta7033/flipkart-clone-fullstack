import { create } from 'zustand'
import { getCart, addToCart, updateCartItem, removeCartItem } from '../api'

export const useCartStore = create((set, get) => ({
  items: [],
  loading: false,

  fetchCart: async () => {
    set({ loading: true })
    const { data } = await getCart()
    set({ items: data, loading: false })
  },

  addItem: async (productId, quantity = 1) => {
    await addToCart({ product_id: productId, quantity })
    const { data } = await getCart()
    set({ items: data })
  },

  updateItem: async (itemId, quantity) => {
    await updateCartItem(itemId, quantity)
    const { data } = await getCart()
    set({ items: data })
  },

  removeItem: async (itemId) => {
    await removeCartItem(itemId)
    const { data } = await getCart()
    set({ items: data })
  },

  getTotal: () => {
    return get().items.reduce(
      (sum, i) => sum + Number(i.product.price) * i.quantity,
      0,
    )
  },

  getCount: () => {
    return get().items.reduce((sum, i) => sum + i.quantity, 0)
  },
}))
