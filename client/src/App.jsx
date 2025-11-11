import './index.css'
import { Outlet } from 'react-router-dom'
import Header from './components/layout/Header/Header'
import Sidebar from './components/layout/Sidebar/Sidebar'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { isSidebarOpen } = useContext(AppContext)
  return (
    <>
      <Header />
      {isSidebarOpen && <Sidebar />}
      <Outlet />
      <Toaster />
    </>
  )
}

export default App


