'use client'

import { useState } from "react"
import AppLayout from "./components/AppLayout"
import { getCurrentLocation } from "./components/getCurrentLocation.js"
import { useRouter } from "next/navigation"

const Home = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState({
    query: '',
    radius: '5000',
    category: 'all categories',
    latitude: '',
    longitude: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAutoLocation = async () => {
    const { lat, lng } = await getCurrentLocation()
    setSearchQuery(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const confirmRes = confirm('Please provide you location to get shops nearby you')
    if (!confirmRes) return

    await handleAutoLocation()
    if (!searchQuery.latitude || !searchQuery.longitude) return

    const { query, category, radius, latitude, longitude } = searchQuery

    router.push(`/searchPage?query=${query}&category=${category}&radius=${radius}&lat=${latitude}&lng=${longitude}`)

    setSearchQuery({
      query: '',
      category: 'all categories',
      radius: '5000',
      latitude: '',
      longitude: ''
    })
  }

  return (
    <>
      <AppLayout varient="public">
        <main className="max-w-[142rem] flex justify-center items-center px-[2.4rem] text-center py-24 gap-[4rem] mx-auto my-auto flex-col">

          <div className="flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold mb-4">Find What You Need, Near You 🛒</h2>
            <p className="text-gray-500">Search across local shops to find items in stock now</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col shadow-lg p-[2rem] rounded-4xl lg:flex-row justify-center items-center gap-8 w-full">
            <label htmlFor="query" className="sr-only">Search</label>
            <input className="px-[2rem] py-[1rem] lg:min-w-[40rem] w-full border-2 border-[#808080cb] rounded-2xl" type="search" placeholder="Search for products…" id="query" name="query" onChange={handleChange} value={searchQuery.query} required />

            <label htmlFor="category" className="sr-only">Category</label>
            <select value={searchQuery.category} onChange={handleChange} id="category" name="category" className="border-2 border-[#808080b4] py-[.9rem] rounded-2xl px-[1rem]">
              <option value='all categories'>All Categories</option>
              <option value='groceries'>Groceries</option>
              <option value='electronics'>Electronics</option>
              <option value='clothing'>Clothing</option>
            </select>

            <label htmlFor="radius" className="sr-only">Radius</label>
            <select name="radius" onChange={handleChange} value={searchQuery.radius} id="radius" className="border-2 border-[#808080b4] py-[.9rem] rounded-2xl px-[.3rem]">
              <option value="5000">Within 5 km</option>
              <option value="10000">Within 10 km</option>
              <option value="25000">Within 25 km</option>
            </select>

            <input type="submit" className="cursor-pointer text-white bg-purple-600 hover:bg-purple-500 py-[1.3rem] text-3xl font-[500] px-[3rem] lg:px-[2.5rem] rounded-2xl " value='Search' />

          </form>
        </main>
      </AppLayout>
    </>
  )
}

export default Home

