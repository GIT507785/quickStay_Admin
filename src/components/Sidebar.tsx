import { LayoutDashboard, ListTodoIcon, Plus } from "lucide-react"
import { NavLink } from "react-router-dom"


const Sidebar = () => {

     const sidearItems = [
         {name:"Dashboard"  , icon:<LayoutDashboard/> , path:"/"},
        {name:"Add Room" , icon: <Plus/> , path:"/add-room" },
        {name:"List Rooms" , icon:<ListTodoIcon/> , path:"/list-room" },
     ]

  return (
    <div>
        <div className="sm:h-[120vh] max:sm:pb-100 w-20 sm:w-50  bg-white border-gray-300 border-r ">
             {sidearItems.map((item , index)=>{
              return(
                  <div  key={index}  className="p-3  sm:ml-5">
                         <NavLink to={item.path}
                          className={({isActive})=> isActive ? "flex gap-2 px-4 py-2 bg-blue-300 rounded-lg cursor-pointer" : "flex gap-2 mt-2 cursor-pointer rounded  bg-gray-100 px-4 py-2"}>
                            <p> {item.icon}</p>
                         
                    <p className="hidden sm:block">{item.name}</p>
                </NavLink>
                     </div>
              )
             })}
        </div>
    </div>
  )
}

export default Sidebar