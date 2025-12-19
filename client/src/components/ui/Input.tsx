import { X } from "lucide-react"
import React, { useId } from "react"
import type { FieldError } from "react-hook-form"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    type?: string
    placeholder?: string
    errors?: FieldError
    className?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
    label = '',
    type = 'text',
    placeholder = '',
    errors,
    className,
    ...props
}, ref) => {
    const id = useId()
    return (
        <div className="w-full">
            {label && (
                <>
                    <label
                        htmlFor={id}
                        className=" mb-6">
                        {label}
                    </label>
                </>
            )}

            <input
                type={type}
                id={id}
                className={`border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black bg-gray-50 py-[.55rem] px-4 w-full ${className}`}
                placeholder={placeholder}
                ref={ref}
                {...props}
            />

            {errors && (
                <div className="mt-1 flex items-center gap-1 rounded-sm border border-red-300/40 bg-red-100/40 px-2 py-1 text-sm text-red-700 backdrop-blur-sm shadow-sm">
                  <X size={17} color="#fd0808" /> <span>{errors.message}</span>
                </div>
            )}

        </div>
    )
})

export default Input
