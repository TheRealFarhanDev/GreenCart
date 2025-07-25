import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/navbar"
import Home from "./pages/Home"

function App() {
  const isSellerPath = useLocation().pathname.includes("seller")
  return (
    <>
      {isSellerPath ? null : <Navbar />}
      <div className={isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  )
}

export default App
