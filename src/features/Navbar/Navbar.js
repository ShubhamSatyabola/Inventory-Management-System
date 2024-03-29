import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { selectLoggedInUser , logoutUserAsync } from "../auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

export function Navbar(){

  const [showMenu, setShowMenu] = useState(false);
  
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();
  const handleMenuClick = () => {
    setShowMenu((prevState) => !prevState);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleClick = () => {
    dispatch(logoutUserAsync())
  };

  return (
    <div className="flex flex-col md:flex-row justify-between py-7 pb-24 px-4 md:px-14 text-lg items-center bg-blue-400">
      <div className="font-semibold w-full md:w-2/6 text-nowrap text-blue-900">
        <Link to="/" onClick={closeMenu}>
          Inventory Management System
        </Link>
      </div>
      <div
        className={`md:flex md:items-center md:space-x-5 ${
          showMenu
            ? "grid  justify-items-cen overflow-hidden fixed bg-slate-300 text-white h-52 w-2/3 rounded-lg shadow-lg right-0 top-10"
            : "hidden"
        }`}
      >
        <Link
          to="/generateQr"
          className="text-xl font-normal text-blue-900  px-4 py-2"
          onClick={closeMenu}
        >
          Generate QR Code
        </Link>
        <Link
          to="/scanQr"
          className="text-xl font-normal text-blue-900  px-4 py-2"
          onClick={closeMenu}
        >
          Scan QR Code
        </Link>
        {user ? (
          <button
            className="border bg-red-500 text-white py-2 px-3 rounded-md font-medium hover:bg-red-600"
            onClick={handleClick}
          >
            Logout
          </button>
        ) : (
          <div className="flex space-x-2">
            <Link to="/login" onClick={closeMenu}>
              <button className="border text-blue-900 py-2 px-4 rounded-md font-medium transition-all duration-500 ease-in-out hover:bg-blue-900 hover:text-white">
                Sign In
              </button>
            </Link>
            <Link to="/signup" onClick={closeMenu}>
              <button className="border bg-black-900 text-white py-2 px-3 rounded-md font-medium hover:bg-blue-800">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
      <div
        className="lg:hidden fixed right-3 top-9 cursor-pointer"
        onClick={handleMenuClick}
      >
        <IoMenu />
      </div>
    </div>
  );
};

