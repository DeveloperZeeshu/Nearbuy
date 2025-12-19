
import { Link, useNavigate } from 'react-router-dom'
import Input from '../ui/Input.js'
import Button from '../ui/button/Button.js'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { login } from '../../store/authSlice.js'
import { handleAxiosError } from '../../api/utils/handleAxiosError.js'
import { motion } from 'motion/react'
import { fromLeftVariants } from '../../animations/fromLeftVariants.js'
import { useState } from 'react'
import LoadingButton from '../ui/button/LoadingButton.js'
import apiClient from '../../api/apiClient.js'
import { loginValidationSchema, type LoginFormData } from '../../validator/auth_validator.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginValidationSchema)
    })
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit: SubmitHandler<LoginFormData> = async (data) => {
        setLoading(true)
        try {
            const res = await apiClient.post(`/login`, data)
            if (res?.status === 200) {
                toast.success('Logged In successfully.')
                const shop = res.data.shopInfo
                dispatch(login(shop))
                navigate('/shop/dashboard')
            }
        } catch (err: unknown) {
            handleAxiosError(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full max-w-118 lg:w-118'>
                <button
                    onClick={() => navigate('/')}
                    className='text-sm mb-2 text-blue-600 font-semibold hover:text-blue-500 flex gap-.5 items-center cursor-pointer'
                ><ArrowLeft size={18} />
                    Back to Home
                </button>
            </div>
            <motion.div
                variants={fromLeftVariants}
                initial='hidden'
                animate='show'
                className="shadow-sm flex flex-col items-center justify-center bg-white rounded-xl p-5 py-10 w-full max-w-118 lg:w-118">

                <div className="pb-13">
                    <h2 className="text-2xl font-bold text-center">Welcome Back</h2>
                    <p className="text-gray-500 text-sm mt-1 text-center">
                        Sign in to manage your shop on <span className="font-semibold text-black">NearBuy</span>
                    </p>
                </div>

                <form className="w-full flex flex-col space-y-6" onSubmit={handleSubmit(submit)}>
                    <div className='flex flex-col space-y-6'>
                        <Input
                            label='Email'
                            type="email"
                            placeholder="Enter your email e.g., xyz@gmail.com"
                            errors={errors.email}
                            {...register('email')}
                        />
                        <Input
                            label='Password'
                            type="password"
                            placeholder="Enter your password"
                            errors={errors.password}
                            {...register('password')}
                        />
                        <p className="cursor-pointer -mt-6 text-blue-600 text-right text-sm">Forgot Password?</p>
                    </div>
                    {
                        loading ?
                            <LoadingButton /> :
                            <Button
                                type="submit"
                            />
                    }
                </form>

                <p className='mt-4 text-sm text-center'>Don't have an account? <Link to='/register' className=" text-blue-600 cursor-pointer font-semibold hover:text-blue-500">Register now</Link></p>
            </motion.div>
        </div>
    )
}

export default SignIn
