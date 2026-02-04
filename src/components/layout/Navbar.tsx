import  {  useState } from "react";
import { IoMenu, IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { NavLink} from "react-router-dom";
export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const cartItems = useSelector((state: any) => state.cart.cart);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
      <nav className="fixed border-b border-gray-200 top-0 w-full left-0 bg-white z-50 text-black h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between h-full items-center">
            <span className="text-xl text-black font-bold">Assignment 1</span>
            <div className="hidden md:flex space-x-6 items-center">
              <NavLink
                to="/"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  [
                    isActive
                      ? "text-blue-500 font-medium"
                      : "text-black font-medium",
                  ].join(" ")
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  [
                    isActive
                      ? "text-blue-500 font-medium "
                      : "text-black font-medium ",
                  ].join(" ")
                }
              >
                About
              </NavLink>
              <NavLink
                to="/shop"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  [
                    isActive
                      ? "text-blue-500 font-medium "
                      : "text-black font-medium ",
                  ].join(" ")
                }
              >
                Shop
              </NavLink>
                <NavLink
                  to="/cart"
                  onClick={toggleSidebar}
                  className={({ isActive }) =>
                    [
                      isActive
                        ? "text-blue-500 font-medium "
                        : "text-black font-medium ",
                    ].join(" ")
                  }
                >
                  Cart
                  <div className="flex items-center">
                    {cartItems.length > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                  </div>
                </NavLink>
            </div>

            <button
              onClick={toggleSidebar}
              className="md:hidden text-2xl focus:outline-none p-2"
            >
              <IoMenu />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={toggleSidebar}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden sm:hidden ${isSidebarOpen ? "translate-x-1" : "-translate-x-full"
          }`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold">Menu</span>
            <button
              onClick={toggleSidebar}
              className="text-2xl hover:text-red-500 transition-colors"
            >
              <IoClose />
            </button>
          </div>
          <div className="flex flex-col space-y-6">
            <NavLink
              to="/"
              onClick={toggleSidebar}
              className={({ isActive }) =>
                [
                  isActive
                    ? "text-blue-500 font-medium"
                    : "text-black font-medium",
                ].join(" ")
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              onClick={toggleSidebar}
              className={({ isActive }) =>
                [
                  isActive
                    ? "text-blue-500 font-medium "
                    : "text-black font-medium ",
                ].join(" ")
              }
            >
              About
            </NavLink>
            <NavLink
              to="/shop"
              onClick={toggleSidebar}
              className={({ isActive }) =>
                [
                  isActive
                    ? "text-blue-500 font-medium "
                    : "text-black font-medium ",
                ].join(" ")
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/cart"
              onClick={toggleSidebar}
              className={({ isActive }) =>
                [
                  isActive
                    ? "text-blue-500 font-medium "
                    : "text-black font-medium ",
                ].join(" ")
              }
            >
              Cart
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}