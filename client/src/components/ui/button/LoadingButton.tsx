
const LoadingButton = ({
    bgColor = 'bg-black'
}) => {
    return (
        <button
            type="button"
            disabled
            className={`inline-flex ${bgColor} justify-center items-center gap-2 rounded-lg px-4 py-2.5 text-white cursor-not-allowed opacity-70`}
        >
            <div className="size-5 animate-spin rounded-full border-3 border-white border-t-transparent" />
            Processing…
        </button>

    )
}

export default LoadingButton

