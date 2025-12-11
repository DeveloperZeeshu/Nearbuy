import { X } from "lucide-react"
import React, { useId } from "react"
import type { FieldError } from "react-hook-form"

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    options?: string[]
    className?: string
    errors?: FieldError
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({
    label = '',
    options,
    className = '',
    errors,
    ...props
}, ref) => {
    const id = useId()
    return (
        <div className="flex flex-col">
            <label
                htmlFor={id}
                className="">
                {label}
            </label>

            <select
                id={id}
                className={`border-2 focus:border-black border-gray-300 rounded-md px-3 py-[.55rem] cursor-pointer overflow-x-hidden ${className}`}
                {...props}
                ref={ref}>
                {
                    options?.map(option => (
                        <option
                            key={option}
                            value={option}>
                            {option}
                        </option>
                    ))
                }
            </select>

            {errors && (
                <div className="mt-1 flex items-center gap-1 rounded-sm border border-red-300/40 bg-red-100/40 px-2 py-1 text-sm text-red-700 backdrop-blur-sm shadow-sm">
                    <X size={17} color="#fd0808" /> <span>{errors.message}</span>
                </div>
            )}
        </div>
    )
})

export default Select


