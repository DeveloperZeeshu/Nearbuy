
import { IoCloseOutline } from "react-icons/io5";
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import Button from '../../../components/ui/Button'
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import axios from 'axios'
import type { AppDispatch, RootState } from "../../../store/store";
import type { ProductTabDetails } from "../../../types/product.types";
import { fetchProducts } from "../../../store/productsSlice";
import { handleAxiosError } from "../../../utils/handleAxiosError";

interface FormData {
  productName: string
  category: string
  description: string
  price: number
}

interface ProductFormProps {
  product: ProductTabDetails | null
  mode: 'Add' | 'Edit'
  onSuccess: () => void
}

export const ProductForm = ({ product, mode }: ProductFormProps) => {
  const context = useContext(AppContext)
  if (!context)
    throw new Error('Context Error.')

  const dispatch = useDispatch<AppDispatch>()

  const { closeProductForm } = context
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  useEffect(() => {
    if (product) {
      reset({
        productName: product.name,
        category: product.category,
        description: product.description,
        price: product.price,
      });
    } else {
      reset({
        productName: '',
        category: 'All Categories',
        description: '',
        price: 0,
      });
    }
  }, [product, reset]);

  const handleDeleteProduct = async (id: string | undefined) => {
    if (!id) {
      toast.error('Something went wrong')
      return
    }
    const confirmRes = confirm('Are you sure you want to delete this product?')
    if (!confirmRes)
      return

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/product/${id}`,
        {
          headers: {
            "Content-Type": 'application/json',
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        }
      )
      if (res?.data?.success) {
        toast.success('Product deleted successfully')
        closeProductForm()
        dispatch(fetchProducts(accessToken))
      } else {
        // console.log('Delete failed', res.data)
        toast.error('Failed to delete product')
      }
    } catch (err: unknown) {
      handleAxiosError(err)
    }
  }

  const submit: SubmitHandler<FormData> = async (data) => {
    const confirmRes = confirm(`Are you sure you want to ${mode} product?`)
    if (!confirmRes)
      return

    try {
      const payload = {
        name: data.productName,
        category: data.category,
        description: data.description,
        price: Number(data.price),
      };

      let res;

      if (product) {

        res = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/product/${product._id}`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        toast.success('Product updated successfully!');
      } else {

        res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/product/add`,
          payload,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        toast.success('Product added successfully!');
      }

      // console.log('Server response:', res.data);
      closeProductForm();
      reset();
      dispatch(fetchProducts(accessToken))

    } catch (err) {
      // console.error('Error saving product:', err);
      toast.error('Something went wrong while saving product.');
    }
  };
  return (
    <>
      <div className="z-20 w-auto fixed flex flex-col items-center justify-center bg-[white] top-40 rounded-lg p-4 shadow-xl">
        <p className="flex justify-end w-full"><IoCloseOutline className="text-2xl cursor-pointer mb-1" onClick={closeProductForm} /></p>
        <form
          onSubmit={handleSubmit(submit)}
          className="min-w-[20rem] w-auto lg:w-110 gap-4 flex flex-col"
        >
          {/* Product Name + Category */}
          <div className="flex w-full gap-4">
            <div className="w-full">
              <Input
                label="Product name"
                type="text"
                placeholder="Enter full name of product"
                errors={errors.productName}
                {...register('productName', {
                  required: 'Product name is required',
                  minLength: { value: 2, message: 'Must be at least 2 characters' }
                })}
              />
            </div>

            <div>
              <Select
                label="Category"
                options={['All Categories', 'Groceries', 'Electronics', 'Clothing']}
                errors={errors.category}
                {...register('category', {
                  required: 'Category is required'
                })}
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
              {...register('description', {
                required: 'Description is required',
                minLength: { value: 10, message: 'Description must be at least 10 characters' }
              })}
            />
          </div>

          {/* Price + Image */}
          <div className="flex justify-between gap-4">
            <div>
              <Input
                type="text"
                placeholder="Enter Price"
                label="Price"
                errors={errors.price}
                {...register('price', {
                  required: 'Price is required',
                  validate: (value) => {
                    const num = parseFloat(String(value))
                    if (isNaN(num)) return 'Price must be a valid number'
                    if (num < 0) return 'Price cannot be negative'
                    return true
                  }
                })}
              />
            </div>

            <div className="flex items-end">
              {/* Image is handled separately, so no register */}
              {/* <Input
                type="file"
                label="Product Image"
                className="max-w-35"
                disabled
              /> */}
              <Button type="submit" text={mode} />
            </div>
          </div>
        </form>
        {mode === 'Edit' &&
          <button
            className="px-4 py-2.5 bg-red-600 hover:bg-red-500 rounded-lg font-semibold text-white cursor-pointer mt-5"
            onClick={() => handleDeleteProduct(product?._id)}>
            Delete Product
          </button>}
      </div>
    </>
  )
}


