import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import './App.css'
import RegisterPage from './pages/RegisterPage'
import UserInfoPage from './pages/UserInfoPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <div className="">

          <Routes>
            <Route path='/' element={<RegisterPage />} />
            <Route path='/user/:userId' element={<UserInfoPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
