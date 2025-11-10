import React from "react"

const Button = React.forwardRef(({
    children,
    type = 'button',
    text = 'Submit',
    className = '',
    ...props
}, ref) => {
    return <button
        className={`cursor-pointer text-white bg-purple-600 hover:bg-purple-500 py-[.6rem] text-lg font-medium px-5 rounded-lg ${className}`}
        type={type}
        ref={ref}
        {...props}
    >
        {children || text}
    </button>
})

export default Button
