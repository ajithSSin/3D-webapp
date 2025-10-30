// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import {createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Admin from './pages/Admin'
import View from './components/View'

const router=createBrowserRouter(
  [
    {
      path:'/',element:<Navigate to='/Home' replace/>
    },
    {
      path:'/Home',element:<Home/>
    },
    {
      path:'/admin',element:<Admin/>
    },
    {
      path:'/view',element:<View/>
    }
  ]
)

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>    
    <RouterProvider router={router} />
    </>
  )
}

export default App
