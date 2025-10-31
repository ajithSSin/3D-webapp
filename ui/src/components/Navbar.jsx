import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-blue-900 text-white
                    p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">3D Model Viewer</h1>
      
      <div className="flex gap-4">
        <a href="/" 
          className="hover:text-blue-400">
            Home
        </a>
        <a href="/admin"
          className="hover:text-blue-400">
            Upload Files
        </a>
        <a href="/view"
          className='hover:text-blue-400' >
            View Files
          </a>
        
      </div>
    </nav>
  )
}

export default Navbar