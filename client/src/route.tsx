import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import React, { Suspense } from "react";
import Loader from "./components/ui/Loader";
import AppProvider from "./context/AppContext";
import DashboardSkeleton from "./shop/pages/dashboard/DashboardSkeleton";
import ProductsSkeleton from "./shop/pages/manageProducts/ProductsSkeleton";
import ShopFormSkeleton from "./shop/pages/edit-profile/ShopFormSkeleton";
import Container from "./components/container/Container";
import SearchPageSkeleton from "./pages/SearchPage/SearchPageSkeleton";

const Home = React.lazy(() => import('./pages/Home'))
const ErrorPage = React.lazy(() => import('./pages/ErrorPage'))
const Register = React.lazy(() => import('./pages/Register'))
const Login = React.lazy(() => import('./pages/Login'))
const About = React.lazy(() => import('./pages/About'))
const Shops = React.lazy(() => import('./pages/Shops'))
const SearchPage = React.lazy(() => import('./pages/SearchPage/SearchPage'))

const ShopLayout = React.lazy(() => import('./shop/ShopLayout'))
const DashboardPage = React.lazy(() => import('./shop/pages/dashboard/Dashboard'))
const ManageProducts = React.lazy(() => import('./shop/pages/manageProducts/Products'))
const EditProfile = React.lazy(() => import('./shop/pages/edit-profile/EditProfile'))

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
                    <Suspense fallback={<Container><SearchPageSkeleton /></Container>}>
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
                    <Suspense fallback={<Container><DashboardSkeleton /></Container>}>
                        <ShopLayout />
                    </Suspense>
                ),

                children: [
                    {
                        path: 'dashboard',
                        element: (
                            <Suspense fallback={<Container><DashboardSkeleton /></Container>}>
                                <DashboardPage />
                            </Suspense>
                        )
                    },
                    {
                        path: 'products',
                        element: (
                            <Suspense fallback={<Container><ProductsSkeleton /></Container>}>
                                <ManageProducts />
                            </Suspense>
                        )
                    },
                    {
                        path: 'edit-profile',
                        element: (
                            <Suspense fallback={<Container><ShopFormSkeleton /></Container>}>
                                <EditProfile />
                            </Suspense>
                        )
                    }
                ]
            }
        ]
    }
])
