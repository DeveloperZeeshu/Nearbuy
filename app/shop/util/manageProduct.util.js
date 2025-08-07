export const handleDeactivateProduct = async (item) => {
    const confirmRes = confirm(`Are you sure you want to deactivate ${item.name}?`)
    if (!confirmRes) return

    try {
        const res = await axios.post(`/api/deactivateProd`, { id: item.id })
        if (res.status === 200) toast.success('Item deactivated successfully')

        await fetchProducts()

    } catch (err) {
        console.log(err)
        toast.error(`Something went wrong while deactivating product! ${err.message}`)
    }
}

export const reactivateProd = async (item) => {
    const confirmRes = confirm(`Are you sure you want restock ${item.name}?`)
    if (!confirmRes) return

    try {
        const res = await axios.post('/api/reactivateProd', { id: item.id })
        if (res.status === 200) {
            toast.success('Product reactivate successfully')

            await fetchProducts()
        }
    }
    catch (err) {
        console.log(err)
        toast.error("Error reactivating product")
    }
}

export const handleEditProd = (item) => {
    handleEditProduct(item)
}

