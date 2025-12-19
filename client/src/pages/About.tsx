import { useNavigate } from 'react-router-dom'
import Container from '../components/container/Container'
import Button from '../components/ui/button/Button'
import { MapPin, Search, Store } from 'lucide-react'

const About = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <div
                className='w-full min-h-screen flex flex-col gap-6 p-3 lg:p-5 mx-auto'>

                <div>
                    <h1 className='text-3xl font-bold text-gray-800 text-center'>
                        About <span className='text-black'>NearBuy</span>
                    </h1>

                    <p className='text-gray-500 mt-1 text-sm text-center'>
                        Your smart way to discover nearby products instantly.
                    </p>
                </div>

                <div className='space-y-3 text-gray-700 leading-relaxed'>
                    <p>
                        <span className='font-semibold'>NearBuy</span> helps users find nearby shops with
                        real-time product availability, prices, and distance — all in one simple search.
                        With instant Google Maps redirection, reaching the right store becomes effortless.
                    </p>

                    <p>
                        Shop owners can register their stores, list and manage products, track availability,
                        and connect with nearby customers through a clean and easy-to-use dashboard.
                    </p>

                    <p>
                        Our mission is to <span className='font-semibold'>support local businesses</span> and
                        make offline shopping faster, smarter, and more accessible for everyone.
                    </p>
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4'>
                    <div className='p-4 flex flex-col justify-center items-center rounded-lg bg-white/70 backdrop:blur-xl text-center shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 duration-300'>
                        <Search />
                        <p className='font-semibold mt-2'>Smart Search</p>
                        <p className='text-sm text-gray-600'>Find products nearby instantly</p>
                    </div>
                    <div className='p-4 flex flex-col justify-center items-center rounded-lg bg-white/70 backdrop:blur-xl text-center shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 duration-300'>
                        <MapPin />
                        <p className='font-semibold mt-2'>Live Distance</p>
                        <p className='text-sm text-gray-600'>View shop distance in real-time</p>
                    </div>
                    <div className='p-4 flex flex-col justify-center items-center rounded-lg bg-white/70 backdrop:blur-xl text-center shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 duration-300'>
                        <Store />
                        <p className='font-semibold mt-2'>For Local Shops</p>
                        <p className='text-sm text-gray-600'>Powerful shop management dashboard</p>
                    </div>
                </div>

                <p className='text-center mt-6 font-semibold text-lg'>
                    Start searching for nearby products with NearBuy
                </p>

                <div className='w-full flex items-center justify-center'>
                    <Button
                        text='Search Products'
                        onClick={() => navigate('/')}
                    />
                </div>

            </div>

        </Container>
    )
}

export default About
