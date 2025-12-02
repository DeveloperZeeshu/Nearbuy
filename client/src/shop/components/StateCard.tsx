import { motion } from "motion/react"
import { fromLeftVariants } from "../../animations/fromLeftVariants"
import { containerVariants } from "../../animations/containerVariants"
import { fromTopVariants } from "../../animations/fromTopVariants"

interface StatCartProps {
    ownerName?: string
}

interface StatCardItemsType {
    title: string
    data: string
}

const StatCartItems: StatCardItemsType[] = [
    { title: "Today's Visitors", data: '128' },
    { title: "New Orders", data: '14' },
    { title: "Low Stock", data: '3 Items' },
    { title: "Pending Messages", data: '5' }
]

export const StatCard = ({ ownerName }: StatCartProps) => {

    return (
        <div
            className="bg-purple-50 p-4 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold">Welcome back, {ownerName}</h1>
            <p className="text-gray-600">Today's summary and quick actions</p>

            <motion.div
                variants={containerVariants}
                initial='hidden'
                animate='show'
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                {
                    StatCartItems.map(item => (
                        <motion.div
                            key={item.title}
                            variants={fromTopVariants}
                            className="bg-white p-4 w-auto rounded-lg shadow-sm">
                            <p className="text-gray-400 pb-1">{item.title}</p>
                            <p className="text-lg font-semibold">{item.data}</p>
                        </motion.div>
                    ))
                }
            </motion.div>
        </div>
    )
}

export const QuickStats = () => {
    return (
        <motion.div
            variants={fromLeftVariants}
            initial='hidden'
            animate='show'
            className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="font-bold mb-6">Quick Stats</h3>
            <div className="grid grid-cols-2 content-center gap-5">
                <div className="text-center px-2">
                    <p className="text-lg font-semibold">156</p>
                    <p className=" text-gray-500">Products</p>
                </div>
                <div className="text-center px-2">
                    <p className="text-lg font-semibold">24</p>
                    <p className=" text-gray-500">Orders Today</p>
                </div>
            </div>
        </motion.div>
    )
}
