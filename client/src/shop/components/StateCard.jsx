
export const StatCard = ({ownerName}) => {

    return (
        <div className="bg-purple-50 text-lg p-5 rounded-lg">
            <h1 className="text-2xl font-bold mb-1">Welcome back, {ownerName}</h1>
            <p className="text-gray-600">Today's summary and quick actions</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="bg-white p-5 w-auto rounded-lg shadow-sm">
                    <p className="text-gray-500 pb-2">Today's Visitors</p>
                    <p className="text-xl font-bold">128</p>
                </div>
                <div className="bg-white p-5 w-auto rounded-lg shadow-sm">
                    <p className="text-gray-500 pb-2">New Orders</p>
                    <p className="text-xl font-bold">14</p>
                </div>
                <div className="bg-white p-5 w-auto rounded-lg shadow-sm">
                    <p className="text-gray-500 pb-2">Low Stock</p>
                    <p className="text-xl font-bold">3 Items</p>
                </div>
                <div className="bg-white p-5 w-auto rounded-lg shadow-sm">
                    <p className="text-gray-500 pb-2">Pending Messages</p>
                    <p className="text-xl font-bold">5</p>
                </div>
            </div>
        </div>
    )
}

export const QuickStats = () => {
    return (
        <div className="bg-gray-50 p-5 rounded-xl">
            <h3 className="font-bold mb-6">Quick Stats</h3>
            <div className="grid grid-cols-2 content-center gap-5">
                <div className="text-center px-2">
                    <p className="text-xl font-bold">156</p>
                    <p className="text-lg text-gray-500">Products</p>
                </div>
                <div className="text-center px-2">
                    <p className="text-xl font-bold">24</p>
                    <p className="text-lg text-gray-500">Orders Today</p>
                </div>
            </div>
        </div>
    )
}
