import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import React, { Suspense } from "react";
import Loader from "./components/ui/Loader";
import AppProvider from "./context/AppContext";

const Home = React.lazy(() => import('./pages/Home'))
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'))
const Register = React.lazy(() => import('./pages/Register'))
const Login = React.lazy(() => import('./pages/Login'))
const About = React.lazy(() => import('./pages/About'))
const Shops = React.lazy(() => import('./pages/Shops'))
const SearchPage = React.lazy(() => import('./pages/SearchPage'))

const ShopLayout = React.lazy(() => import('./shop/ShopLayout'))
const DashboardPage = React.lazy(() => import('./shop/pages/Dashboard'))
const ManageProducts = React.lazy(() => import('./shop/pages/Products'))
const EditProfile = React.lazy(() => import('./shop/pages/EditProfile'))

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <AppProvider>
                <App />
            </AppProvider>
        ),

        errorElement: (
            <Suspense fallback={<Loader />}>
                <ErrorPage />
            </Suspense>
        ),

        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<Loader />}>
                        <Home />
                    </Suspense>
                )
            },
            {
                path: 'search',
                element: (
                    <Suspense fallback={<Loader />}>
                        <SearchPage />
                    </Suspense>
                )
            },
            {
                path: 'register',
                element: (
                    <Suspense fallback={<Loader />}>
                        <Register />
                    </Suspense>
                )
            },
            {
                path: 'login',
                element: (
                    <Suspense fallback={<Loader />}>
                        <Login />
                    </Suspense>
                )
            },
            {
                path: 'about',
                element: (
                    <Suspense fallback={<Loader />}>
                        <About />
                    </Suspense>
                )
            },
            {
                path: 'shops',
                element: (
                    <Suspense fallback={<Loader />}>
                        <Shops />
                    </Suspense>
                )
            },
            {
                path: 'shop',
                element: (
                    <Suspense fallback={<Loader />}>
                        <ShopLayout />
                    </Suspense>
                ),

                children: [
                    {
                        path: 'dashboard',
                        element: (
                            <Suspense fallback={<Loader />}>
                                <DashboardPage />
                            </Suspense>
                        )
                    },
                    {
                        path: 'products',
                        element: (
                            <Suspense fallback={<Loader />}>
                                <ManageProducts />
                            </Suspense>
                        )
                    },
                    {
                        path: 'edit-profile',
                        element: (
                            <Suspense fallback={<Loader />}>
                                <EditProfile />
                            </Suspense>
                        )
                    }
                ]
            }
        ]
    }
])
