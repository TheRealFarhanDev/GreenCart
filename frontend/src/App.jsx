import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Home from "./pages/Home"
import { Toaster } from "react-hot-toast"
import Footer from "./components/Footer"
import { useAppContext } from "./context/AppContext"
import Login from "./components/Login"
import AllProducts from "./pages/AllProducts"
import ProductCategory from "./pages/ProductCategory.jsx"
import ProductDetails from "./pages/ProductDetails.jsx"
import Cart from "./pages/Cart.jsx"
import AddAddresses from "./pages/AddAddresses.jsx"
import MyOrders from "./pages/MyOrders.jsx"
import SellerLogin from "./components/seller/SellerLogin.jsx"
import SellerLayout from "./pages/seller/SellerLayout.jsx"
import AddProduct from "./pages/seller/AddProduct.jsx"
import ProductList from "./pages/seller/ProductList.jsx"
import Orders from "./pages/seller/Orders.jsx"

function App() {
  const isSellerPath = useLocation().pathname.includes("seller")
  const { showUserLogin, isSeller } = useAppContext();
  return (
    <>
      <div className="text-default min-h-screen text-gray-700 ">
        {isSellerPath ? null : <Navbar />}
        {showUserLogin ? <Login /> : null}

        <Toaster />
        <div className={isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/products/:category" element={<ProductCategory />} />
            <Route path="/products/:category/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-address" element={<AddAddresses />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />} />
            {/* Seller Routes */}
            <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
              <Route index element={isSeller ? <AddProduct /> : null} />
              <Route path="products" element={<ProductList />} />
              <Route path="orders" element={<Orders />} />
            </Route>

          </Routes>
        </div>
        {!isSellerPath && <Footer />}
      </div >

    </>
  )
}

export default App
