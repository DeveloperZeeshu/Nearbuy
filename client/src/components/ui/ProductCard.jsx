import Button from './Button'

export const ProductCard = ({ prodInfo }) => {
    const { name, price, image, description, shopName, distance = 5000, address, phone, lat, lng } = prodInfo

    return (
        <>
            <div className="bg-white rounded-lg p-4 shadow-lg transition-all duration-300 transform hover:-translate-y-2 w-full lg:w-auto h-auto text-lg">
                <img src={image || `https://placehold.co/400x300?text=${name}`} alt={name} className="w-full h-50 object-cover rounded-lg mb-5" loading="lazy"/>

                <h3 className="font-bold mb-2 text-left">{name || 'Honey'}</h3>

                <p className="text-gray-600 text-[1rem] mb-6 text-left">{description || 'Organic pure honey'}</p>

                <div className="flex justify-between items-center">
                    <span className="font-semibold">₹{price || 100}</span>
                    <span className=" bg-green-100 text-green-800 py-1 px-2 rounded text-[1rem]">In Stock</span>
                </div>

                <div className="mt-5 border-t border-gray-100 text-left">
                        <p className="font-medium mb-2">{shopName}</p>
                        <p className="mb-3 text-[1rem]">{address || 'A-17, Jaipur'}</p>
                        <p className="text-[1rem]">📞+91 {phone || '4234234444'}</p>
                        <p className=" text-gray-500 mt-6 text-sm">{Math.floor(distance / 1000)} km away</p>
                    </div>
                <div className="flex mt-5 pt-6 border-t justify-between border-gray-100 items-center space-x-6">
                    <Button 
                    text='💬Message'
                    />
                    <a href={`https://www.google.com/maps?q=${lat},${lng}`} target="_blank" className="text-white px-4 py-2 cursor-pointer rounded-lg bg-[#007BFF] hover:bg-[#007bffd8]">📍Direction</a>
                </div>
            </div>
        </>
    )
}

