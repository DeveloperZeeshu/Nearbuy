'use client'

export const StatCard = ({ownerName}) => {

    return (
        <div className="bg-purple-50 p-7 rounded-lg">
            <h1 className="text-[2.5rem] font-bold mb-4">Welcome back, {ownerName}</h1>
            <p className="text-gray-600 text-[1.65rem]">Today's summary and quick actions</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-7">
                <div className="bg-white p-5 w-auto rounded-lg shadow-sm">
                    <p className="text-gray-500 pb-2 text-[1.5rem]">Today's Visitors</p>
                    <p className="text-3xl font-bold">128</p>
                </div>
                <div className="bg-white p-5 w-auto rounded-lg shadow-sm">
                    <p className="text-gray-500 pb-2 text-[1.5rem]">New Orders</p>
                    <p className="text-3xl font-bold">14</p>
                </div>
                <div className="bg-white p-5 w-auto rounded-lg shadow-sm">
                    <p className="text-gray-500 pb-2 text-[1.5rem]">Low Stock</p>
                    <p className="text-3xl font-bold">3 Items</p>
                </div>
                <div className="bg-white p-5 w-auto rounded-lg shadow-sm">
                    <p className="text-gray-500 pb-2 text-[1.5rem]">Pending Messages</p>
                    <p className="text-3xl font-bold">5</p>
                </div>
            </div>
        </div>
    )
}

export const QuickStats = () => {
    return (
        <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="font-bold mb-9">Quick Stats</h3>
            <div className="grid grid-cols-2 content-center gap-5">
                <div className="text-center px-[4.5rem]">
                    <p className="text-3xl font-bold">156</p>
                    <p className="text-2xl text-gray-500">Products</p>
                </div>
                <div className="text-center px-[4.5rem]">
                    <p className="text-3xl font-bold">24</p>
                    <p className="text-2xl text-gray-500">Orders Today</p>
                </div>
            </div>
        </div>
    )
}
