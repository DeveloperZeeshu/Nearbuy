import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.ts'

import Home from './pages/Home.jsx'
import SearchPage from './pages/SearchPage.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import Shop from './pages/Shops.tsx'
import About from './pages/About.tsx'
import AppProvider from './context/AppContext.tsx'
import DashboardPage from './shop/pages/Dashboard.tsx'
import ShopLayout from './shop/ShopLayout.tsx'
import ManageProducts from './shop/pages/Products.tsx'
import EditProfile from './shop/pages/EditProfile.tsx'
import { useUserLoader } from './hooks/UserLoader.tsx'
import ErrorPage from './pages/ErrorPage.tsx'

function AppLoader() {
  useUserLoader()
  return null
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/searchPage',
        element: <SearchPage />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/shops',
        element: <Shop />
      },
      {
        path: '/search',
        element: <SearchPage />
      },
      {
        path: '/shop',
        element: <ShopLayout />,
        children: [
          {
            path: '/shop/dashboard',
            element: <DashboardPage />
          },
          {
            path: '/shop/products',
            element: <ManageProducts />
          },
          {
            path: '/shop/edit-profile',
            element: <EditProfile />
          }
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AppProvider>
        <AppLoader />
        <RouterProvider router={router} />
      </AppProvider>
    </Provider>
  </StrictMode>,
)

