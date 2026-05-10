import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const Home = () => {
  return (
    <div className="bg-gray-50">
        <Navbar/>
        <div className="flex flex-1 px-4 overflow-y-auto">
        <Sidebar/>
        <Outlet/>
        </div>
    </div>
  )
}

export default Home