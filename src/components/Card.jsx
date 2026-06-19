import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/cartSlice'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { LuLeafyGreen } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";

const Card = ({ id, name, image, price, type }) => {
  const dispatch = useDispatch()
  const { darkMode } = useSelector(state => state.cart)

  const handleAddToCart = () => {
    dispatch(addToCart({ id, food_name: name, food_image: image, price, food_type: type }))
    
    toast.success(`${name} added to cart! 🍔`, {
      position: "top-right",
      autoClose: 1500,
    })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ duration: 0.3 }}
      className={`group rounded-3xl shadow-xl overflow-hidden transition-all flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
    >
      <div className='relative h-52 overflow-hidden'>
        <img 
          src={image} 
          alt={name} 
          className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110' 
        />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${type === "veg" ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {type}
        </div>
      </div>

      <div className='p-5 flex flex-col flex-1'>
        <div className={`text-xl font-semibold mb-3 line-clamp-2 min-h-14 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {name}
        </div>
        
        <div className='mt-auto flex justify-between items-center'>
          <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            Rs {price}
          </div>
          
          {type === "veg" ? (
            <div className='flex items-center gap-1.5 text-green-500 font-medium'>
              <LuLeafyGreen className="w-5 h-5" />
            </div>
          ) : (
            <div className='flex items-center gap-1.5 text-red-500 font-medium'>
              <GiChickenOven className="w-5 h-5" />
            </div>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          className={`mt-5 w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 active:scale-95 ${darkMode 
            ? 'bg-blue-600 hover:bg-blue-500 text-white' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Add to Cart
        </button>
      </div>
    </motion.div> 
  )
}

export default Card