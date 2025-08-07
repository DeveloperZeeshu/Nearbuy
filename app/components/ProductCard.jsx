export const ProductCard = ({ prodInfo }) => {
    const { name, price, id, image, description, shopName, distance, address, phone, lat, lng } = prodInfo

    return (
        <>
            <li id={id} className="bg-white rounded-2xl p-[1.6rem] shadow-lg transition-all duration-300 transform hover:translate-y-[-.5rem] w-full lg:w-auto h-auto">
                <img src={image || `https://placehold.co/400x300?text=${name}`} alt={name} className="w-full h-75 object-cover rounded-2xl mb-5" loading="lazy"/>

                <h3 className="font-bold mb-3 text-left">{name}</h3>

                <p className="text-gray-600 text-[1.7rem] mb-9 text-left">{description}</p>

                <div className="flex justify-between items-center">
                    <span className="font-semibold">₹{price}</span>
                    <span className="text-[1.5rem] bg-green-100 text-green-800 px-3 py-2 rounded">In Stock</span>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 text-left">
                        <p className="text-[1.6rem] font-medium mb-2">{shopName}</p>
                        <p className="text-[1.5rem] mb-3">{address}</p>
                        <p className="text-[1.6rem]">📞+91 {phone}</p>
                        <p className=" text-gray-500 text-[1.4rem] mt-6">{Math.floor(distance / 1000)} km away</p>
                    </div>
                <div className="flex mt-6 pt-6 border-t justify-between border-gray-100 items-center space-x-6">
                    <button className="text-white px-[1.5rem] py-4 cursor-pointer rounded-[.8rem] bg-purple-600 hover:bg-purple-500">💬Message</button>

                    <a href={`https://www.google.com/maps?q=${lat},${lng}`} target="_blank" className="text-white px-[1.5rem] py-4 cursor-pointer rounded-[.8rem] bg-[#007BFF] hover:bg-[#007bffd8]">📍Direction</a>
                </div>
            </li>
        </>
    )
}

