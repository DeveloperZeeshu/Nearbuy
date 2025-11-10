import { createContext, useState } from "react";

export const AppContext = createContext(null)

const AppProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isProductFormOpen, setIsProductFormOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)

    const openProductForm = () => {
        setIsProductFormOpen(true)
    }

    const closeProductForm = () => {
        setIsProductFormOpen(false)
    }

    const openEditProductForm = (product) => {
        setEditingProduct(product);
        setIsProductFormOpen(true);
    };

    const openSidebar = () => {
        setIsSidebarOpen(true)
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false)
    }

    return <AppContext.Provider value={{
        isProductFormOpen,
        openProductForm,
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        openEditProductForm,
        editingProduct,
        closeProductForm
    }}>
        {children}
    </AppContext.Provider>
}

export default AppProvider

