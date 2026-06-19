import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import { food_items } from '../food'

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

// Load cart from localStorage
const savedCart = localStorage.getItem('cart')
if (savedCart) {
  store.dispatch({
    type: 'cart/loadCartFromStorage',
    payload: JSON.parse(savedCart)
  })
}

// Save cart to localStorage whenever it changes
store.subscribe(() => {
  const state = store.getState()
  localStorage.setItem('cart', JSON.stringify(state.cart.cart))
})

// Initialize categories
store.dispatch({ 
  type: 'cart/setCate', 
  payload: food_items 
})

export default store