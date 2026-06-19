import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Nav from '../components/Nav'
import Categories from '../category' 
import Card from '../components/Card'
import { setCate } from '../redux/cartSlice'
import { food_items } from '../food'

const Home = () => {
  const { cate, darkMode } = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const filter = (category) => {
    if (category === "All") {
      dispatch(setCate(food_items))
    } else {
      const newList = food_items.filter((item) => item.food_category === category)
      dispatch(setCate(newList))
    }
  }

  return (
    <div className={`w-full min-h-screen transition-colors ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-100'}`}>
      <Nav />
      
      {/* Categories */}
      <div className='w-full flex flex-wrap justify-center items-center gap-4 md:gap-6 mt-8 px-4'>
        {Categories.map((item) => (
          <div 
            key={item.id}
            className={`w-28 h-28 md:w-32 md:h-32 flex flex-col justify-center items-center gap-3 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600'}`}
            onClick={() => filter(item.name)}
          >
            <div className="text-4xl md:text-5xl transition-transform hover:scale-110">
              {item.icons}
            </div>
            <p className="font-semibold capitalize text-sm md:text-base tracking-wide">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Food Grid */}
      <div className='w-full px-4 md:px-8 pt-8 pb-12'>
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-3xl font-bold mb-8 px-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Popular Dishes
            <span className="text-blue-500">.</span>
          </h2>
          
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
            {cate.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                name={item.food_name}
                image={item.food_image}
                price={item.price}
                type={item.food_type}
              />
            ))}
          </div>

          {cate.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-400">No dishes found 😕</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home