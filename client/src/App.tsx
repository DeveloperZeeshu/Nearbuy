import './index.css'
import { Outlet } from 'react-router-dom'
import Header from './components/layout/Header/Header'
import Sidebar from './components/layout/Sidebar/Sidebar'
import { useAppContext } from './context/AppContext'
import { Toaster } from 'react-hot-toast'
import Footer from './components/layout/Footer/Footer'
import { useEffect } from 'react'
import { useUserLoader } from './hooks/UserLoader'

const App = () => {

  const { isSidebarOpen, closeSidebar } = useAppContext()

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }

    return () => document.body.classList.remove('overflow-hidden')
  }, [isSidebarOpen])

  useUserLoader()

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      {
        isSidebarOpen && (
          <div
            className={`fixed inset-0 bg-black/30 z-20 transition-opacity ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={closeSidebar}
          />
        )
      }

      <aside className={`fixed top-0 left-0 h-screen w-74 transform z-30 bg-white transition-transform duration-300 rounded-r-xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar />
      </aside>

      <main className={isSidebarOpen ? 'pointer-events-none flex-1' : 'flex-1'}>
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </div>
  )
}

export default App


