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
        className={`cursor-pointer text-white text-sm bg-black hover:bg-gray-800 active:scale-95 transition py-3 font-semibold px-4 rounded-md ${className} flex justify-center items-center`}
        type={type}
        ref={ref}
        {...props}
    >
        {children || text}
    </button>
})

export default Button
