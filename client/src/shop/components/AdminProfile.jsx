

export const AdminProfile = ({ shop }) => {
    const { address, city, shopName, state, phone } = shop

    return (
        <>
            <div className="bg-gray-50 text-lg w-auto flex flex-col gap-5 p-6 rounded-xl">
                <div className="flex items-center space-x-9 mb-4">
                    <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/65d096e3-647b-4285-9f7e-99639b28c344.png" alt="Shop logo" className="w-23 h-23 rounded-full object-cover" loading="lazy" />
                    <div>
                        <h2 className="text-xl font-bold">{shopName || 'Kanak medical'}</h2>
                        <p className="text-gray-500">Local Store</p>
                    </div>
                </div>
                <div className="space-y-6 max-w-152">
                    <p className="flex gap-6">
                        <span>location_on:</span>
                        <span className="material-icons">{`${address}, ${city}, ${state}`}</span>
                    </p>
                    <p className="flex gap-6 items-center">
                        <span>mobile_no:</span>
                        <span className="material-icons">{`+91 ${phone}`}</span>
                    </p>
                </div>
            </div>
        </>
    )
}

