import Container from "../components/container/Container.tsx"
import Select from '../components/ui/Select.tsx'
import Input from '../components/ui/Input.tsx'
import Button from "../components/ui/Button.tsx"
import { getCurrentLocation } from '../utils/getCurrentLocation.ts'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { fromLeftVariants } from "../animations/fromLeftVariants.ts"
import { fromRightVariants } from "../animations/fromRightVariants.ts"

interface FormData {
    query: string
    category: string
    radius: number
}

const Home = () => {
    const { register, handleSubmit } = useForm<FormData>();
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const userRes = confirm('We use your location to show nearby shops. Do you want to enable it?')
        if (!userRes) return

        const { lat, lng } = await getCurrentLocation()

        if (!lat || !lng)
            return

        navigate(
            `/search?query=${encodeURIComponent(data.query)}&category=${encodeURIComponent(
                data.category
            )}&radius=${data.radius}&lat=${lat}&lng=${lng}`
        );
    };
    return (
        <Container>
            <div>
                <motion.div
                    variants={fromLeftVariants}
                    initial='hidden'
                    animate='show'
                    className="flex flex-col justify-center items-center mb-5 px-3 bg-purple-50 rounded-xl py-5 lg:py-7 shadow-lg">
                    <h2 className="text-2xl text-center font-bold">Find What You Need, Near You 🛒</h2>

                    <p className="text-gray-500 text-center">Search across local shops to find items in stock now</p>
                </motion.div>

                <motion.form
                    variants={fromRightVariants}
                    initial='hidden'
                    animate='show'
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col shadow-lg p-4 rounded-xl lg:flex-row justify-center items-center gap-4 bg-white hover:shadow-xl"
                >

                    <Input
                        type="search"
                        placeholder="Search for products…"
                        {...register('query', {
                            required: true
                        })}
                    />

                    <Select
                        options={['All Categories', 'Groceries', 'Electronics', 'Clothing']}
                        {...register('category', {
                            required: true
                        })}
                    />

                    <select
                        {...register('radius', {
                            required: true
                        })}
                        defaultValue="5000"
                        className="border-2 focus:border-indigo-600 border-gray-300 rounded-lg px-3 py-2.5"
                    >
                        <option value="5000">Within 5 km</option>
                        <option value="10000">Within 10 km</option>
                        <option value="25000">Within 25 km</option>
                    </select>

                    <Button type="submit" text='Search' />
                </motion.form>
            </div>

        </Container>
    )
}

export default Home

