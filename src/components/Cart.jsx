import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, incrementQty, decrementQty } from '../redux/cartSlice'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'
import { IoTrashBin } from "react-icons/io5";

const Cart = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const { cart, darkMode } = useSelector(state => state.cart)

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleRemove = (item) => {
    dispatch(removeFromCart(item.id))
    toast.error(`${item.food_name} removed from cart`, {
      position: "bottom-right",
      autoClose: 1500,
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40"
            onClick={onClose}
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col`}
          >
            {/* Header */}
            <div className="p-6 border-b dark:border-gray-700 flex justify-between items-center sticky top-0 bg-white dark:bg-gray-900 z-10">
              <div>
                <h2 className="text-2xl font-bold dark:text-white">Your Cart</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-3xl dark:text-white hover:text-red-500 transition-colors"
              >
                ✕
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <AnimatePresence>
                {cart.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full py-20 text-center"
                  >
                    <div className="text-7xl mb-6">🛍️</div>
                    <h3 className="text-2xl font-semibold mb-2 dark:text-white">Your cart is empty</h3>
                    <p className="text-gray-500 dark:text-gray-400">Add some delicious food from the menu!</p>
                  </motion.div>
                ) : (
                  cart.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl"
                    >
                      {/* Image */}
                      <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                        <img 
                          src={item.food_image} 
                          alt={item.food_name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg dark:text-white line-clamp-2">{item.food_name}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-bold">Rs {item.price}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-4">
                          <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={() => dispatch(decrementQty(item.id))}
                            className="w-9 h-9 rounded-lg bg-white dark:bg-gray-700 border flex items-center justify-center text-xl font-bold hover:bg-gray-100 active:scale-95"
                          >
                            −
                          </motion.button>
                          <span className="w-8 text-center font-semibold dark:text-white text-lg">{item.quantity}</span>
                          <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={() => dispatch(incrementQty(item.id))}
                            className="w-9 h-9 rounded-lg bg-white dark:bg-gray-700 border flex items-center justify-center text-xl font-bold hover:bg-gray-100 active:scale-95"
                          >
                            +
                          </motion.button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <motion.button 
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemove(item)}
                        className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2 self-start transition-colors"
                        title="Remove item"
                      >
                        <IoTrashBin className="w-6 h-6" />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <motion.div 
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="p-6 border-t dark:border-gray-700 bg-white dark:bg-gray-900 sticky bottom-0"
              >
                <div className="flex justify-between items-center text-xl font-semibold mb-6 dark:text-white">
                  <span>Total Amount</span>
                  <span className="text-2xl">Rs {totalAmount}</span>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    toast.success("🎉 Order Placed Successfully!", {
                      position: "top-center",
                      autoClose: 3000,
                    })
                    onClose()
                  }}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-2xl text-lg transition-all shadow-lg"
                >
                  Proceed to Checkout
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Cart