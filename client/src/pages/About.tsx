import { useNavigate } from 'react-router-dom'
import Container from '../components/container/Container'
import Button from '../components/ui/Button'

const About = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <div className='flex flex-col gap-4 px-3'>
                <h1 className='text-2xl font-bold'>About Nearbuy</h1>

                <p>NearBuy helps users find nearby shops with real-time product availability, prices, and distance — all in one search. With instant Google Maps redirection, customers can quickly reach the right store.</p>

                <p>Shop owners can register, list and manage their products, and connect with nearby customers through a simple dashboard.</p>

                <p>NearBuy is built to support local businesses and make offline shopping faster and smarter.</p>

                <p className='text-center mt-8 font-semibold'>Start searching for nearby products with NearBuy.</p>
                <div className='text-center'>
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