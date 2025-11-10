import React, { useId } from "react"

const Select = React.forwardRef(({
    label = '',
    options,
    className = '',
    errors,
    ...props
}, ref) => {
    const id = useId()
    return (
        <div>
            <label
                htmlFor={id}
                className="pb-[.8rem]">
                {label}
            </label>

            <select
                id={id}
                className={`border-2 border-gray-400 text-lg rounded-lg focus:outline-none p-2 cursor-pointer overflow-x-hidden ${className}`}
                {...props}
                ref={ref}>
                {
                    options.map(option => (
                        <option
                            key={option}
                            value={option}>
                            {option}
                        </option>
                    ))
                }
            </select>
            {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>
    )
})

export default Select
