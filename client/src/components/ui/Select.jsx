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
        <div className="flex flex-col">
            <label
                htmlFor={id}
                className="">
                {label}
            </label>

            <select
                id={id}
                className={`border border-gray-300 rounded-lg focus:outline-none px-3 py-2.5 cursor-pointer overflow-x-hidden ${className}`}
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
