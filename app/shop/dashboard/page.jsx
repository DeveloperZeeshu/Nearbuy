'use client'

import { AppContext } from "@/app/context/AppContext"
import { AdminProfile } from "../components/AdminProfile"
import { QuickStats, StatCard } from "../components/StatCard"
import { Products } from "../products/page"
import { useContext } from "react"

const DashboardPage = () => {
    const { user, loading } = useContext(AppContext)

    if(loading)
        return <div>Loading...</div>

    return (
        <>
            <main className="w-auto px-10 pt-9 pb-24 gap-16 mx-auto">
                <div className="w-full rounded-3xl flex flex-col gap-9 shadow-xl px-0 lg:p-9">
                    <StatCard ownerName={user.ownerName} />

                    <div className="flex flex-col lg:flex-row gap-9">
                        {/* Left Side */}
                        <div className="flex-1 space-y-9">
                            <AdminProfile shopName={user.shopName} />
                            <QuickStats />
                        </div>

                        <div className="text-2xl flex flex-col gap-9">
                            <Products shopId={user.id}/>
                            <div className="grid md:grid-cols-2 gap-9">
                                <div className="bg-white border border-gray-300 rounded-xl p-6">
                                    <h3 className="font-bold mb-9">Recent Orders</h3>
                                </div>
                                <div className="bg-white border border-gray-300 rounded-xl p-6">
                                    <h3 className="font-bold mb-9">Quick Actions</h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        <button className="bg-gray-100 text-2xl font-semibold hover:bg-gray-200 px-[3.5rem] p-6 rounded-xl text-center">
                                            <span className="material-icons"></span>
                                            Update Hours
                                        </button>
                                        <button className="bg-gray-100 text-2xl font-semibold hover:bg-gray-200 px-[3.5rem] p-6 rounded-xl text-center">
                                            <span className="material-icons"></span>
                                            View Analytics
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default DashboardPage
