import Container from "../components/container/Container"
import Select from '../components/ui/Select'
import Input from '../components/ui/Input'
import Button from "../components/ui/Button"
import { getCurrentLocation } from '../utils/getCurrentLocation.js'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate()

    const onSubmit = async (data) => {
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
            <div className="flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-1">Find What You Need, Near You 🛒</h2>

                <p className="text-gray-500">Search across local shops to find items in stock now</p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col shadow-lg p-4 rounded-xl lg:flex-row justify-center items-center gap-4"
            >
                {/* 🔍 Search Input */}
                <Input
                    type="search"
                    placeholder="Search for products…"
                    {...register('query', {
                        required: true
                    })}
                />

                {/* 📂 Category */}
                <Select
                    options={['All Categories', 'Groceries', 'Electronics', 'Clothing']}
                    {...register('category', {
                        required: true
                    })}
                />

                {/* 📏 Radius */}
                <select
                    {...register('radius', {
                        required: true
                    })}
                    defaultValue="5000"
                    className="border-2 border-gray-400 text-lg rounded-lg p-2"
                >
                    <option value="5000">Within 5 km</option>
                    <option value="10000">Within 10 km</option>
                    <option value="25000">Within 25 km</option>
                </select>

                <Button type="submit" text='Search' />
            </form>
        </Container>
    )
}

export default Home

