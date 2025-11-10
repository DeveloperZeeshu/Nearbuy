import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'

import Home from './pages/Home.jsx'
import SearchPage from './pages/SearchPage.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Shop from './pages/Shop.jsx'
import About from './pages/About.jsx'
import AppProvider from './context/AppContext.jsx'
import DashboardPage from './shop/pages/Dashboard.jsx'
import ShopLayout from './shop/ShopLayout.jsx'
import ManageProducts from './shop/pages/Products.jsx'
import EditProfile from './shop/pages/EditProfile.jsx'
import { UserLoader } from './components/UserLoader.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppProvider>
        <UserLoader />
        <RouterProvider router={router} />
      </AppProvider>
    </Provider>
  </StrictMode>,
)
