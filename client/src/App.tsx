import './index.css'
import { Outlet } from 'react-router-dom'
import Header from './components/layout/Header/Header'
import Sidebar from './components/layout/Sidebar/Sidebar'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const context = useContext(AppContext)
  if (!context)
    throw new Error('Context Error.')

  const { isSidebarOpen, closeSidebar } = context

  return (
    <>
      <Header />

      {
        isSidebarOpen && (
          <div
            className={`fixed inset-0 bg-black/30 z-20 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={closeSidebar}
          />
        )
      }

      <aside className={`fixed top-0 left-0 h-screen w-64 transform z-30 bg-white transition-transform duration-300 rounded-r-xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </aside>

      <main className={isSidebarOpen ? 'pointer-events-none' : ''}>
        <Outlet />
      </main>
      <Toaster />
    </>
  )
}

export default App


