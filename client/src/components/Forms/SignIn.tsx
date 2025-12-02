
import { Link, useNavigate } from 'react-router-dom'
import Input from '../ui/Input.js'
import Button from '../ui/Button.js'
import { useForm, type SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { login } from '../../store/authSlice.js'
import { handleAxiosError } from '../../utils/handleAxiosError.js'
import { motion } from 'motion/react'
import { fromLeftVariants } from '../../animations/fromLeftVariants.js'
import { ArrowLeft } from 'lucide-react'

interface FormData {
    email: string
    password: string
}

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit: SubmitHandler<FormData> = async (data) => {
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/login`, data, { withCredentials: true })
            if (res?.data?.success) {
                toast.success('Logged In successfully.')
                const { accessToken, ownerName, email } = res.data
                dispatch(login({ accessToken, user: { ownerName, email } }))
                navigate('/shop/dashboard')
            }
        } catch (err: unknown) {
            handleAxiosError(err)
        }
    }

    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full max-w-118 lg:w-118'>
                <button
                    onClick={() => navigate('/')}
                    className='text-sm mb-2 text-indigo-600 font-semibold hover:text-indigo-500 flex gap-.5 items-center cursor-pointer'
                ><ArrowLeft size={18} />
                    Back to Home
                </button>
            </div>
            <motion.div
                variants={fromLeftVariants}
                initial='hidden'
                animate='show'
                className="shadow-lg flex flex-col items-center justify-center bg-white rounded-xl p-5 hover:shadow-xl w-full max-w-118 lg:w-118">

                <div className="pb-13">
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                    <p className="text-base text-gray-500">Sign in to your account</p>
                </div>

                <form className="w-full flex flex-col space-y-6" onSubmit={handleSubmit(submit)}>
                    <div className='flex flex-col space-y-6'>
                        <Input
                            label='Email'
                            type="email"
                            placeholder="Enter your email e.g., xyz@gmail.com"
                            errors={errors.email}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                        <Input
                            label='Password'
                            type="password"
                            placeholder="Enter your password"
                            errors={errors.password}
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long'
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                                    message: 'Password must contain uppercase, lowercase, number, and special character'
                                }
                            })}
                        />
                        <p className="cursor-pointer -mt-6 text-indigo-600 text-right text-sm">Forgot Password?</p>
                    </div>

                    <Button
                        type="submit"
                    />
                </form>

                <p className='mt-4 text-sm'>Don't have an account? <Link to='/register' className=" text-indigo-600 cursor-pointer font-semibold">Register now</Link></p>
            </motion.div>
        </div>
    )
}

export default SignIn
