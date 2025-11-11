
import { IoCloseOutline } from "react-icons/io5";
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import Button from '../../../components/ui/Button'
import { useContext, useEffect } from "react";
import { AppContext } from "../../../context/AppContext";
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import axios from 'axios'

export const ProductForm = ({ product, mode }) => {
  const { closeProductForm } = useContext(AppContext)
  const accessToken = useSelector((state) => state.auth.accessToken)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

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
        category: '',
        description: '',
        price: '',
      });
    }
  }, [product, reset]);

  const submit = async (data) => {
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

      console.log('Server response:', res.data);
      closeProductForm();
      reset();

    } catch (err) {
      console.error('Error saving product:', err);
      toast.error('Something went wrong while saving product.');
    }
  };
  return (
    <>
      <div className="z-20 text-lg w-auto fixed flex flex-col items-center justify-center bg-[white] top-40 rounded-3xl p-4 shadow-xl">
        <p onClick={closeProductForm} className="flex justify-end w-full"><IoCloseOutline className="text-3xl cursor-pointer mb-1" /></p>
        <form
          onSubmit={handleSubmit(submit)}
          className="min-w-[20rem] w-auto lg:w-120 gap-4 flex flex-col"
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
          <div className="flex gap-4">
            <div>
              <Input
                type="text"
                placeholder="Enter Price"
                label="Price"
                errors={errors.price}
                {...register('price', {
                  required: 'Price is required',
                  validate: (value) => {
                    const num = parseFloat(value)
                    if (isNaN(num)) return 'Price must be a valid number'
                    if (num < 0) return 'Price cannot be negative'
                    return true
                  }
                })}
              />
            </div>

            <div className="flex items-end">
              {/* Image is handled separately, so no register */}
              <Input
                type="file"
                label="Product Image"
                className="max-w-35"
                disabled
              />
              <Button type="submit" text={mode} />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
