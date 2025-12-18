import Button from '../ui/button/Button.js'
import Input from '../ui/Input.js'
import Select from '../ui/Select.js'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getCurrentLocation } from '../../utils/getCurrentLocation.js'
import { useEffect, useState } from 'react'
import { handleAxiosError } from '../../api/utils/handleAxiosError.js'
import type { ShopInfo } from '../../types/shop.types.js'
import { motion } from 'motion/react'
import { fromLeftVariants } from '../../animations/fromLeftVariants.js'
import LoadingButton from '../ui/button/LoadingButton.js'
import apiClient from '../../api/apiClient.js'
import { registerValidationSchema, updateProfileSchema, type RegisterFormData, type UpdateProfileFormData } from '../../validator/auth_validator.js'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { updateProfile } from '../../store/authSlice.js'

interface ShopInfoProps {
    shopInfo?: ShopInfo | null
}

const ShopForm = ({ shopInfo }: ShopInfoProps) => {
    const isUpdate = !!shopInfo
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<RegisterFormData | UpdateProfileFormData>({
        resolver: zodResolver(
            isUpdate ? updateProfileSchema : registerValidationSchema
        )
    })
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(() => {
        if (shopInfo) {
            reset({
                shopName: shopInfo.shopName,
                ownerName: shopInfo.ownerName,
                email: shopInfo.email,
                address: shopInfo.address,
                phone: shopInfo.phone,
                city: shopInfo.city,
                state: shopInfo.state,
                zipcode: shopInfo.zipcode
            })
        }
    }, [shopInfo, reset])

    const submit: SubmitHandler<RegisterFormData | UpdateProfileFormData> = async (data) => {
        setLoading(true)
        const userRes = confirm('We use your location to show nearby shops. Do you want to enable it?')
        if (!userRes) {
            setLoading(false)
            return
        }

        const { lat, lng } = await getCurrentLocation()

        if (!lat || !lng)
            return

        const finalData = { ...data, latitude: lat, longitude: lng }

        try {
            let res
            if (shopInfo) {
                res = await apiClient.put(`/shop/updateShop`, finalData)
                if (res.status === 200) {
                    toast.success('Profile updated successfully.')
                    dispatch(updateProfile(res.data.updatedShop))
                }
            } else {
                res = await apiClient.post(`/register`, finalData)
                if (res.status === 201) {
                    toast.success('Registration successful.')
                    navigate('/login')
                }
            }
        } catch (err: unknown) {
            handleAxiosError(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full flex flex-col items-center'>
            {/* <div className='w-full md:w-xl lg:w-4xl'>
                <button
                    onClick={() => navigate(shopInfo ? '/shop/dashboard' : '/')}
                    className='text-sm mb-2 text-blue-600 font-semibold hover:text-blue-500 flex gap-.5 items-center cursor-pointer'
                ><ArrowLeft size={18} />
                    Back to Home
                </button>
            </div> */}
            <motion.div
                variants={fromLeftVariants}
                initial='hidden'
                animate='show'
                className="shadow-sm w-full flex flex-col items-center justify-center bg-white rounded-xl p-5 py-10 max-w-xl lg:max-w-4xl">

                <div className="pb-15">
                    <h2 className="text-2xl font-bold text-center">{shopInfo ? 'Edit Shop Profile' : 'Register Your Shop'}</h2>
                    <p className="text-sm text-gray-500 mt-1 text-center">
                        {shopInfo
                            ? 'Update your business details below'
                            : 'List your shop on NearBuy and start reaching nearby customers'}
                    </p>
                </div>

                <form
                    className="w-full flex flex-col space-y-5"
                    onSubmit={handleSubmit(submit)}>
                    {/* <div className="w-full"> */}
                    <div className="w-full gap-0 lg:gap-5 flex flex-col lg:flex-row justify-center items-center">
                        <div className="w-full">
                            <Input
                                label='Shop Name'
                                type="text"
                                placeholder="Enter your shop name"
                                errors={errors.shopName}
                                {...register('shopName')}
                            />
                        </div>

                        <div className="w-full mt-5 lg:mt-0">
                            <Input
                                label='Owner Name'
                                type="text"
                                placeholder="Enter the owner name"
                                errors={errors.ownerName}
                                {...register('ownerName')}
                            />
                        </div>
                    </div>

                    <div className="w-full gap-0 lg:gap-5 flex flex-col lg:flex-row justify-center items-center">
                        <div className="w-full">
                            <Input
                                label='Email'
                                placeholder="Enter your email e.g., xyz@gmail.com"
                                type="email"
                                disabled={!!shopInfo}
                                errors={errors.email}
                                {...register('email')}
                            />
                        </div>
                        <div className="w-full mt-5 lg:mt-0">
                            <Input
                                label='Phone'
                                placeholder="Enter your phone"
                                type="text"
                                errors={errors.phone}
                                {...register('phone')}
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
                                {...register('address')}
                            />
                        </div>

                        <div className="w-full flex mt-5 lg:mt-0 space-x-4">
                            <div>
                                <Select
                                    label='City'
                                    options={['Jaipur']}
                                    errors={errors.city}
                                    {...register('city')}
                                />
                            </div>
                            <div>
                                <Select
                                    label='State'
                                    options={['Rajasthan']}
                                    errors={errors.state}
                                    {...register('state')}
                                />
                            </div>
                            <div>
                                <Input
                                    type='text'
                                    label='ZipCode'
                                    placeholder="e.g., 302001"
                                    errors={errors.zipcode}
                                    {...register('zipcode')}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-0 lg:gap-5 lg:flex-row justify-center">
                        <div className="w-full mb-2">
                            <Input
                                label='Enter Password'
                                type="password"
                                placeholder="Enter your password"
                                errors={errors.password}
                                {...register('password')}
                            />
                        </div>

                        {
                            !isUpdate &&
                            (<div className="w-full mt-5 lg:mt-0">
                                <Input
                                    label='Confirm Password'
                                    type="password"
                                    placeholder="Confirm your password"
                                    errors={errors.confirmPassword}
                                    {...register('confirmPassword')}
                                />
                            </div>)}
                    </div>

                    {
                        loading ?
                            <LoadingButton /> :
                            <Button
                                type="submit"
                            />
                    }
                </form>
                {
                    !shopInfo &&
                    <p className='mt-4 text-sm text-center'>Already registered? <Link to='/login' className="text-blue-600 cursor-pointer font-semibold hover:text-blue-500">Login</Link></p>}
            </motion.div>
        </div>
    )
}

export default ShopForm

