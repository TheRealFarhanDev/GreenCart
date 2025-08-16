import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"
import { useAppContext } from "../context/AppContext"
import toast from "react-hot-toast"

const Navbar = () => {
    const [open, setOpen] = useState(false)
    const { user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartItemCount, axios } = useAppContext();

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/user/logout');
            if (data.success) {
                toast.success(data.message);
                setUser(null);
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products")
        }
    }, [searchQuery, navigate])

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative z-20 transition-all">

            <NavLink to='/' onClick={() => setOpen(false)}>
                <img src={assets.logo} alt="Logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/seller" className='px-4 py-1.5 border-primary hover:bg-primary/30 hover:rounded-lg transition duration-300 rounded-full border-1' >Seller Dashboard</NavLink>
                <NavLink
                    to="/"
                    className="relative px-2 py-1 group"
                >
                    Home
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </NavLink>

                <NavLink
                    to="/products"
                    className="relative px-2 py-1 group"
                >
                    All Products
                    <span className="absolute right-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                </NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(e) => setSearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt="search_icon" />
                </div>

                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart_icon" className="w-6 opacity-80" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartItemCount()}</button>
                </div>

                {!user ? (
                    <button onClick={() => setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                        Login
                    </button>
                ) : (
                    <div className="relative group">
                        <img src={assets.profile_icon} className="w-10 cursor-pointer" alt="user profile picture" />
                        <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
                            <li className="nav-li" onClick={() => navigate("/orders")}>My Orders</li>
                            <li onClick={logout} className="nav-li">Logout</li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-8 sm:hidden">
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="cart_icon" className="w-6 opacity-80" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartItemCount()}</button>
                </div>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="cursor-pointer">
                    {/* Menu Icon SVG */}
                    <img src={assets.menu_icon} alt="menu_icon" />
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to="/home" onClick={() => setOpen(false)}>Home</NavLink>
                <NavLink to="/products" onClick={() => setOpen(false)}>All Products</NavLink>

                {user && <NavLink to="/orders" onClick={() => setOpen(false)}>My Orders</NavLink>}

                <NavLink to="/seller" onClick={() => setOpen(false)}>Seller Dashboard</NavLink>

                {!user ? (
                    <button onClick={() => {
                        setOpen(false);
                        setShowUserLogin(true);
                    }} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                        Login
                    </button>
                ) : (
                    <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                        Logout
                    </button>
                )}


            </div>

        </nav>
    )
}

export default Navbar
