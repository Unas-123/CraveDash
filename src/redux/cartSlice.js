import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
  darkMode: false,
  input: "",
  cate: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.input = action.payload
    },
    setCate: (state, action) => {
      state.cate = action.payload
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
    },
    addToCart: (state, action) => {
      const existing = state.cart.find(item => item.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.cart.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload)
    },
    incrementQty: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload)
      if (item) item.quantity += 1
    },
    decrementQty: (state, action) => {
      const item = state.cart.find(item => item.id === action.payload)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.cart = state.cart.filter(i => i.id !== action.payload)
        }
      }
    },
    loadCartFromStorage: (state, action) => {
      state.cart = action.payload
    }
  }
})

export const { 
  setInput, 
  setCate, 
  toggleDarkMode, 
  addToCart, 
  removeFromCart, 
  incrementQty, 
  decrementQty,
  loadCartFromStorage 
} = cartSlice.actions

export default cartSlice.reducer