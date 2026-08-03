// day

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-400">
      <Navbar/>
        <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
