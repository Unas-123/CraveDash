import { TiThSmallOutline } from "react-icons/ti";
import { MdOutlineFreeBreakfast } from "react-icons/md";
import { LuSoup } from "react-icons/lu";
import { GiNoodles } from "react-icons/gi";
import { MdOutlineFoodBank } from "react-icons/md";
import { FaPizzaSlice } from "react-icons/fa";
import { FaHamburger } from "react-icons/fa";
const Categories = [
    {
        id: 1,
        name: "All",
        icons: <TiThSmallOutline className="w-15 h-15 text-blue-600" />
    },
    {
        id: 2,
        name: "breakfast",
        icons: <MdOutlineFreeBreakfast className="w-15 h-15 text-blue-600" />
    },
    {
        id: 3,
        name: "soups",
        icons: <LuSoup className="w-15 h-15 text-blue-600" />
    },
    {
        id: 4,  
        name: "pasta",
        icons: <GiNoodles className="w-15 h-15 text-blue-600" />
    },
    {
        id: 5,  
        name: "main_course",
        icons: <MdOutlineFoodBank className="w-15 h-15 text-blue-600" />
    },
    {
        id: 6,
        name: "pizza",
        icons: <FaPizzaSlice className="w-15 h-15 text-blue-600" />
    },
    {
        id: 7,
        name: "burger", 
        icons: <FaHamburger className="w-15 h-15 text-blue-600" />
    }
]

export default Categories
