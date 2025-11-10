import Button from '../ui/Button'
import Input from '../ui/Input'
import Select from '../ui/Select'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import toast from 'react-hot-toast'
import { getCurrentLocation } from '../../utils/getCurrentLocation.js'

const ShopForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const navigate = useNavigate()

    const submit = async (data) => {
        const userRes = confirm('We use your location to show nearby shops. Do you want to enable it?')
        if (!userRes) return

        const { lat, lng } = await getCurrentLocation()

        if (!lat || !lng)
            return

        const finalData = { ...data, latitude: lat, longitude: lng }

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, finalData, { withCredentials: true })
            if (res.data.success) {
                toast.success('Registration successful.')
                navigate('/login')
            }
        } catch (err) {
            if (err.response) {
                console.log(err.response.data)
                toast.error(err.response.data.message)
            } else if (err.request) {
                console.log(err.request)
                toast.error(err.request.message)
            } else
                console.log(err.message)
        }
    }

    return (
        <div className="text-lg shadow-xl flex flex-col items-center justify-center bg-white rounded-xl p-7">

            <div className="pb-15">
                <h2 className="text-4xl pb-3 text-center">Register Shop</h2>
                <p className="text-base">Create your account to get started</p>
            </div>

            <form className="w-full flex flex-col space-y-6 max-w-4xl" onSubmit={handleSubmit(submit)}>
                {/* <div className="w-full"> */}
                <div className="w-full gap-0 lg:gap-5 flex flex-col lg:flex-row justify-center items-center">
                    <div className="w-full">
                        <Input
                            label='Shop Name'
                            type="text"
                            placeholder="Enter your shop name"
                            errors={errors.shopName}
                            {...register('shopName', {
                                required: 'Shop name is required'
                            })}
                        />
                    </div>

                    <div className="w-full">
                        <Input
                            label='Owner Name'
                            type="text"
                            placeholder="Enter the owner name"
                            errors={errors.ownerName}
                            {...register('ownerName', {
                                required: 'Owner name is required'
                            })}
                        />
                    </div>
                </div>

                <div className="w-full gap-0 lg:gap-5 flex flex-col lg:flex-row justify-center items-center">
                    <div className="w-full">
                        <Input
                            label='Email'
                            placeholder="Enter your email e.g., xyz@gmail.com"
                            type="email"
                            errors={errors.email}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                    </div>
                    <div className="w-full">
                        <Input
                            label='Phone'
                            placeholder="Enter your phone"
                            type="text"
                            errors={errors.phone}
                            {...register('phone', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Phone number must be exactly 10 digits'
                                }
                            })}
                        />
                    </div>
                </div>

                <div className="w-full gap-0 lg:gap-5 flex flex-col lg:flex-row justify-center items-center">
                    <div className="w-full">
                        <Input
                            type="text"
                            label='Address'
                            placeholder="Shop no., street"
                            errors={errors.address}
                            {...register('address', {
                                required: 'Address is required'
                            })}
                        />
                    </div>

                    <div className="w-full flex space-x-5">
                        <div>
                            <Select
                                label='City'
                                options={['Jaipur']}
                                errors={errors.city}
                                {...register('city', {
                                    required: 'City is required'
                                })}
                            />
                        </div>
                        <div>
                            <Select
                                label='State'
                                options={['Rajasthan']}
                                errors={errors.state}
                                {...register('state', {
                                    required: 'State is required'
                                })}
                            />
                        </div>
                        <div>
                            <Input
                                type='text'
                                label='Zip code'
                                placeholder="e.g., 302001"
                                errors={errors.zipcode}
                                {...register('zipcode', {
                                    required: 'Zipcode is required',
                                    pattern: {
                                        value: /^[1-9][0-9]{5}$/,
                                        message: 'Zipcode must be a valid 6-digit number'
                                    }
                                })}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col gap-0 lg:gap-5 lg:flex-row justify-center">
                    <div className="w-full">
                        <Input
                            label='Enter Password'
                            type="password"
                            placeholder="Enter your password"
                            errors={errors.password}
                            {...register('password', {
                                required: 'Enter a password',
                                minLength: {
                                    value: 8,
                                    message: 'Password must be atleast 8 characters long'
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                                    message: 'Password must contain uppercase, lowercase, number, and special character'
                                }
                            })}
                        />
                    </div>

                    <div className="w-full">
                        <Input
                            label='Confirm Password'
                            type="password"
                            placeholder="Confirm your password"
                            errors={errors.confirmPassword}
                            {...register('confirmPassword', {
                                required: 'Confirm your password',
                                validate: (value) =>
                                    value === watch('password') || "Password didn't match"
                            })}
                        />
                    </div>
                </div>
                {/* </div> */}

                <Button
                    type="submit"
                />
            </form>

            <p className='mt-4'>Already registered? <Link to='/login' className="text-blue-600 cursor-pointer">Login</Link></p>
        </div>
    )
}

export default ShopForm

