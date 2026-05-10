import { useNavigate } from 'react-router-dom'
import   logo from '../assets/logo.svg'

const Navbar = () => {

   const navigate = useNavigate()
  
  return (
    <div className='sm:px-15 px-4 py-2 flex justify-between items-center w-full  bg-white  border-b  border-gray-300'>
        <div>
             <img src={logo}  alt="" className='w-30' />                 
        </div>
        <div className='hidden sm:block'>
           <h1 className='bg-blue-600 text-white px-4 py-2 rounded-full cursor-pointer'
            onClick={()=> {localStorage.removeItem("token") , navigate("/login") , window.location.reload()} }
           >Logout</h1>
        </div>
    </div>
  )
}

export default Navbar