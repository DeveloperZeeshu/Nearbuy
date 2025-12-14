import Container from "../components/container/Container.tsx"
import Select from '../components/ui/Select.tsx'
import Input from '../components/ui/Input.tsx'
import Button from "../components/ui/button/Button.tsx"
import { getCurrentLocation } from '../utils/getCurrentLocation.ts'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { fromLeftVariants } from "../animations/fromLeftVariants.ts"
import { fromRightVariants } from "../animations/fromRightVariants.ts"
import { ListCheck, MapPin, Store, Zap } from "lucide-react"
import { searchProductsSchema, type SearchProductFormData } from "../validator/search_validator.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import LoadingButton from "../components/ui/button/LoadingButton.tsx"

const Home = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
    } = useForm<SearchProductFormData>({
        resolver: zodResolver(searchProductsSchema)
    });
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<SearchProductFormData> = async (data) => {
        setLoading(true)
        const userRes = confirm('We use your location to show nearby shops. Do you want to enable it?')
        if (!userRes) {
            setLoading(false)
            return
        }

        const { lat, lng } = await getCurrentLocation()

        if (!lat || !lng)
            return

        navigate(
            `/search?query=${encodeURIComponent(data.query)}&category=${encodeURIComponent(
                data.category
            )}&radius=${data.radius}&lat=${lat}&lng=${lng}`
        );
        setLoading(false)
    };
    return (
        <Container>
            <div className="bg-linear-to-br from-slate-100 via-slate-200 to-slate-300 min-h-screen rounded-xl shadow-md p-3 lg:p-5">

                {/* HERO CARD */}
                <motion.div
                    variants={fromLeftVariants}
                    initial="hidden"
                    animate="show"
                    className="mx-auto"
                >
                    {/* TITLE */}
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-800">
                            Find What You Need, <span className="text-black">Near You</span> 🛒
                        </h1>

                        <p className="mt-1 text-sm text-slate-500 max-w-2xl mx-auto">
                            Search nearby local shops and check real-time product availability before stepping out.
                        </p>

                        {/* LOCATION PILL */}
                        <div className="mt-4 inline-flex items-center gap-2 text-sm bg-white/70 
          backdrop-blur px-4 py-1.5 rounded-full shadow-sm">
                            <MapPin size={18} className="text-slate-700" />
                            <span className="text-slate-700">
                                <span className="font-medium">Your location:</span> Jaipur
                            </span>
                        </div>
                    </div>

                    {/* SEARCH CARD */}
                    <motion.form
                        variants={fromRightVariants}
                        initial="hidden"
                        animate="show"
                        onSubmit={handleSubmit(onSubmit)}
                        className="mx-auto max-w-4xl bg-white/70 backdrop:blur-xl rounded-xl shadow-sm 
          p-4 lg:p-5 flex flex-col lg:flex-row gap-4"
                    >
                        {/* PRODUCT SEARCH */}
                        <div className="flex-1">
                            <Input
                                type="search"
                                placeholder="Search for products, brands, or shops..."
                                {...register("query")}
                            />
                        </div>

                        {/* CATEGORY */}
                        <div className="w-full lg:w-38">
                            <Select
                                options={["All Categories", "Groceries", "Electronics", "Clothing"]}
                                {...register("category")}
                            />
                        </div>

                        {/* RADIUS */}
                        <div className="w-full lg:w-36">
                            <label htmlFor="radius" aria-label="radius" />
                            <select
                                {...register("radius")}
                                defaultValue="5000"
                                id="radius"
                                className="w-full border-2 focus:border-black border-gray-300 
              rounded-md px-3 py-[.55rem] bg-gray-50"
                            >
                                <option value="5000">Within 5 km</option>
                                <option value="10000">Within 10 km</option>
                                <option value="25000">Within 25 km</option>
                            </select>
                        </div>

                        {/* SEARCH BUTTON */}
                        <div className="w-full lg:w-auto">
                            {loading ?
                                <LoadingButton /> :
                                <Button type="submit" text="Search Nearby" className="h-11 w-full" />
                            }
                        </div>
                    </motion.form>
                </motion.div>

                {/* TRUST STRIP */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 text-center text-sm">
                    {[
                        { icon: Store, text: "Verified Local Shops" },
                        { icon: ListCheck, text: "Live Stock Updates" },
                        { icon: MapPin, text: "GPS-Based Discovery" },
                        { icon: Zap, text: "Instant Search" },
                    ].map(({ icon: Icon, text }, i) => (
                        <div
                            key={i}
                            className="bg-white/70 backdrop:blur-xl rounded-xl shadow-sm p-4 flex flex-col items-center 
            gap-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <Icon className="text-slate-700" />
                            <p className="text-slate-600">{text}</p>
                        </div>
                    ))}
                </div>

            </div>
        </Container>
    );

}

export default Home

