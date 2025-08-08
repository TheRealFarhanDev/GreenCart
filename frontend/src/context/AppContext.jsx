import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { useEffect } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false)

    const [products, setProducts] = useState([])
    const [cartItems, setCartItems] = useState({})
    const [searchQuery, setSearchQuery] = useState("");

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
        if (cartData[itemId]) {
            cartData[itemId] -= 1;
            if (cartData[itemId] === 0) {
                delete cartData[itemId]
            }
            toast.success("Removed from cart")
            setCartItems(cartData);
        }

    }

    //get cart item count
    const getCartItemCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item];
        }
        return totalCount;
    }

    //get cart total
    const getCartTotal = () => {
        let total = 0;
        for (const item in cartItems) {
            const product = products.find((product) => product._id === item);
            if(cartItems[item] > 0){
                total += product.offerPrice * cartItems[item];
            }
        }
        return Math.floor(total * 100) / 100;
    }


    useEffect(() => {
        fecthProducts()
    }, [])

    const value = { navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, UpdateCartitem, RemoveFromCart, cartItems, searchQuery, setSearchQuery, getCartItemCount, getCartTotal }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = () => {
    return useContext(AppContext)
}