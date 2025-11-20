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
        <div className="w-full">
            {label && (
                <label
                htmlFor={id}
                className=" mb-6">
                {label}
            </label>
            )}

            <input
                type={type}
                id={id}
                className={`border border-gray-300 rounded-lg py-2.5 px-4 w-full focus:outline-none ${className}`}
                placeholder={placeholder}
                ref={ref}
                {...props}
            />

            {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>
    )
})

export default Input
