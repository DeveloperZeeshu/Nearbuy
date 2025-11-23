import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text?: string
    type?: 'button' | 'submit' | 'reset'
    className?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    children,
    type = 'button',
    text = 'Submit',
    className = '',
    ...props
}, ref) => {
    return <button
        className={`cursor-pointer text-white text-sm bg-black hover:bg-gray-800 py-3 font-medium px-4 rounded-lg ${className}`}
        type={type}
        ref={ref}
        {...props}
    >
        {children || text}
    </button>
})

export default Button
