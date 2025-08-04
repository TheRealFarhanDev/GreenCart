import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const currency = import.meta.Vite_CURRENCY;
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false)

    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})

    //fetch all product
    const fecthProducts = async () => {
        setProducts(dummyProducts);
    }

    //Add Product to Cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
        toast.success("Added to cart")
    }

    // Updarte Cart Item Quatity
    const UpdateCartitem = (itemId, quatity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quatity;
        setCartItems(cartData);
        toast.success("Cart Updated")
    }

    //remove product from cart
    const RemoveFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            cartData[itemId]-=1;
            if(cartData[itemId]===0){
                delete cartData[itemId]
            }
            toast.success("Removed from cart")
            setCartItems(cartData);
        }

    }

    useEffect(() => {
        fecthProducts()
    }, [])

    const value = { navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, UpdateCartitem, RemoveFromCart, cartItems }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}