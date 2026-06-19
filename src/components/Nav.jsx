import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdFastfood } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { RiShoppingBag3Line } from "react-icons/ri";
import { BsSunFill, BsMoonFill } from "react-icons/bs";
import { setInput, toggleDarkMode } from "../redux/cartSlice";
import { food_items } from "../food";
import Cart from "./Cart";

const Nav = () => {
  const dispatch = useDispatch();
  const { input, darkMode, cart } = useSelector((state) => state.cart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (input.trim() === "") {
      dispatch({ type: "cart/setCate", payload: food_items });
    } else {
      const newlist = food_items.filter((item) =>
        item.food_name.toLowerCase().includes(input.toLowerCase()),
      );
      dispatch({ type: "cart/setCate", payload: newlist });
    }
  }, [input, dispatch]);

  return (
    <>
      <div
        className={`w-full py-4 flex justify-between items-center px-4 md:px-8 shadow-md transition-colors ${darkMode ? "bg-gray-900 text-white" : "bg-white"}`}
      >
        <div
          className={`flex items-center gap-3 ${darkMode ? "text-white" : "text-gray-900"}`}
        >
          <div
            className={`w-12 h-12 flex justify-center items-center rounded-2xl shadow-lg bg-linear-to-br from-blue-500 to-purple-600`}
          >
            <MdFastfood className="w-7 h-7 text-white" />
          </div>
          <div className="font-bold text-2xl tracking-tight">
            Crave<span className="text-blue-500">Dash</span>
          </div>
        </div>

        <form
          className={`w-full max-w-md mx-4 md:mx-8 h-12 rounded-2xl shadow-md flex items-center px-5 gap-3 ${darkMode ? "bg-gray-800" : "bg-white"}`}
          onSubmit={(e) => e.preventDefault()}
        >
          <FaSearch
            className={`w-5 h-5 ${darkMode ? "text-blue-400" : "text-blue-500"}`}
          />
          <input
            type="text"
            placeholder="Search food..."
            className={`outline-none w-full bg-transparent text-lg ${darkMode ? "text-white" : "text-gray-700"}`}
            value={input}
            onChange={(e) => dispatch(setInput(e.target.value))}
          />
        </form>

        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(toggleDarkMode())}
            className={`w-12 h-12 flex justify-center items-center rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}
          >
            {darkMode ? (
              <BsSunFill className="w-6 h-6 text-yellow-400" />
            ) : (
              <BsMoonFill className="w-6 h-6 text-gray-700" />
            )}
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className={`w-12 h-12 flex justify-center items-center rounded-xl shadow-lg relative ${darkMode ? "bg-gray-800" : "bg-white"}`}
          >
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
            <RiShoppingBag3Line
              className={`w-7 h-7 ${darkMode ? "text-blue-400" : "text-blue-500"}`}
            />
          </button>
        </div>
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Nav;
