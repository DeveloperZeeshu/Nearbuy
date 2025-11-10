import React, { useId } from "react"

const Input = React.forwardRef(({
    label = '',
    type = 'text',
    placeholder = '',
    errors,
    className,
    ...props
}, ref) => {
    const id = useId()
    return (
        <div>
            <label
                htmlFor={id}
                className="text-lg mb-6">
                {label}
            </label>

            <input
                type={type}
                id={id}
                className={`border-2 border-gray-400 text-lg rounded-lg p-2 w-full focus:outline-none ${className}`}
                placeholder={placeholder}
                ref={ref}
                {...props}
            />

            {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>
    )
})

export default Input
