import React from 'react'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar/>
       <Routes>
             <Route path ="/" element={<Login/>}/>
            <Route path ="/register" element={<Register/>}/>
            <Route path="/dashboard" element={<Dashboard />} />
           
        </Routes> 
    </div>
  )
}

export default App