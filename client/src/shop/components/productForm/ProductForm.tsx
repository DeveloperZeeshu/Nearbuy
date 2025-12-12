
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import Button from '../../../components/ui/button/Button'
import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import type { ProductTabDetails } from "../../../types/product.types";
import { handleAxiosError } from "../../../api/utils/handleAxiosError";
import { X } from 'lucide-react';
import LoadingButton from '../../../components/ui/button/LoadingButton';
import apiClient from '../../../api/apiClient';
import { addUpdateProductSchema, type AddUpdateProductForm } from '../../../validator/addUpdateProduct_validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { addProduct, deleteProduct, editProduct } from '../../../store/productsSlice';

interface ProductFormProps {
  product: ProductTabDetails | null
  mode: 'Add' | 'Edit'
}

export const ProductForm = ({ product, mode }: ProductFormProps) => {

  const { closeProductForm } = useAppContext()
  const { register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AddUpdateProductForm>({
    resolver: zodResolver(addUpdateProductSchema)
  })
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (product) {
      reset({
        productName: product.name,
        category: product.category,
        description: product.description,
        price: String(product.price),
      });
    } else {
      reset({
        productName: '',
        category: 'All Categories',
        description: '',
        price: '',
      });
    }
  }, [product, reset]);

  const handleDeleteProduct = useCallback(async (id: string | undefined) => {
    setLoading(true)

    if (!id) {
      toast.error('Something went wrong')
      setLoading(false)
      return
    }
    const confirmRes = confirm('Are you sure you want to delete this product?')
    if (!confirmRes) {
      setLoading(false)
      return
    }

    try {
      const res = await apiClient.delete(
        `/product/${id}`
      )
      if (res?.data?.success) {
        toast.success('Product deleted successfully')
        dispatch(deleteProduct(id))
        closeProductForm()
      } else {
        // console.log('Delete failed', res.data)
        toast.error('Failed to delete product')
      }
    } catch (err: unknown) {
      handleAxiosError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const submit: SubmitHandler<AddUpdateProductForm> = async (data) => {
    setLoading(true)

    const confirmRes = confirm(`Are you sure you want to ${mode} product?`)
    if (!confirmRes){
      setLoading(false)
      return
    }

    try {
      const payload = {
        name: data.productName,
        category: data.category,
        description: data.description,
        price: data.price,
      };

      if (product) {
        const res = await apiClient.put(
          `/product/${product._id}`,
          payload
        );

        if (res?.data?.success) {
          toast.success('Product updated successfully')
          dispatch(editProduct({
            _id: product._id,
            product: res.data.product
          }))
        } else {
          toast.error('Error updating product')
        }
      } else {

        const res = await apiClient.post(
          `/product/add`,
          payload
        );
        if (res?.data?.success) {
          toast.success('Product Added successfully')
          dispatch(addProduct(res.data.product))
        } else {
          toast.error('Error adding product')
        }
      }

      // console.log('Server response:', res.data);
      closeProductForm();
      reset();

    } catch (err) {
      // console.error('Error saving product:', err);
      handleAxiosError(err)
    } finally {
      setLoading(false)
    }
  };
  return (
    <div className='w-full flex justify-center'>
      <div className="z-60 fixed flex flex-col items-center justify-center bg-[white] top-40 rounded-lg p-4 shadow-xl">
        <p className="flex justify-end w-full"><X className="text-2xl cursor-pointer mb-1" onClick={closeProductForm} /></p>
        <form
          onSubmit={handleSubmit(submit)}
          className="min-w-[20rem] w-auto lg:w-110 gap-4 flex flex-col"
        >
          {/* Product Name + Category */}
          <div className="w-full">
            <Input
              label="Product name"
              type="text"
              placeholder="Enter full name of product"
              errors={errors.productName}
              {...register('productName')}
            />
          </div>

          <div className='flex w-full gap-4'>
            <div className='w-full'>
              <Input
                type="text"
                placeholder="Enter Price"
                label="Price"
                errors={errors.price}
                {...register('price')}
              />
            </div>
            <div className='w-full'>
              <Select
                label="Category"
                options={['All Categories', 'Groceries', 'Electronics', 'Clothing']}
                errors={errors.category}
                {...register('category')}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Input
              label="Description"
              type="text"
              placeholder="Enter Product Description"
              errors={errors.description}
              {...register('description')}
            />
          </div>

          {/* Price + Image */}
          <div className="flex w-full justify-center gap-4">
            {
              loading ?
                <LoadingButton /> :
                <Button type="submit" text={mode} />
            }
            {mode === 'Edit' &&
              (loading ?
                <LoadingButton bgColor='bg-red-600' /> :
                <button
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-500 rounded-md font-semibold text-white cursor-pointer active:scale-95"
                  onClick={() => handleDeleteProduct(product?._id)}
                >
                  Delete
                </button>)}
          </div>
        </form>

      </div>
    </div>
  )
}


