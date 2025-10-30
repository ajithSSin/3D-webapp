import React from 'react'
// import Dashboard from '../components/Dashboard'
import UploadForm from '../components/UploadForm'
import Navbar from '../components/Navbar'
import FrontEnd from '../components/FrontEnd'
// Navbar

const Admin = () => {
  return (
    // <div>Admin</div>
    <>
    {/* <Dashboard/> */}
    <div >
      <Navbar/>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gray-800'>
        <UploadForm/>
      </div>
    </div>    
    </>
  )
}

export default Admin