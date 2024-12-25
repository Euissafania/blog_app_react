import { Outlet } from "react-router-dom"

function HeaderBlog() {
  return (
    <>
       <div className='header bg-dark text-center py-2 shadow-lg'>
          <h1 className='text-white'>React & Laravel Blog App</h1>
        </div>
        <Outlet/> 
    </>
  )
}

export default HeaderBlog