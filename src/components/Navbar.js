import React, { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import "../styles/navbar.css";
import isate2024Logo from "../images/isate2024-logo.png";
import QRCodeGenerator from "../screens/QrCodeGenerator";
import { useParams } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [showImportantInfo, setShowImportantInfo] = useState(false);
  const loggedInUserID = localStorage.getItem("loggedInUserID");
  const [userData, setUserData] = useState(null);
  const { userid } = useParams();

  const { user, logout } = UserAuth();

  const handleNav = () => {
    setNav(!nav);
    setShowImportantInfo(false);
  };

  const handleImportantInfoClick = () => {
    setShowImportantInfo(true);
    setNav(false);
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#FFF] flex justify-between items-center h-20 mt-auto px-4 text-black z-100">
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <img src={isate2024Logo} alt="Logo" className="w-1/2 md:hidden" />
      <div className="md:hidden pt-2">
        <Link to="/importantinfo">
          <AiOutlineInfoCircle
            className="text-black"
            size={25}
            onClick={handleImportantInfoClick}
          />
        </Link>
      </div>
      <ul
        className={
          nav
            ? "fixed left-0 top-20 w-[70%] h-full bg-[#EDF1F4] ease-in-out duration-500 z-20"
            : "ease-in-out fixed left-[-100%] z-20"
        }
      >
        <h3 className="w-full font-bold text-[#000] mt-10 ml-12 mb-2.5">
          {user?.displayName}
        </h3>
        {user ? (
          <button
            className="text-white bg-[#4B558A] font-medium rounded-md text-sm px-5 py-2.5 mx-5 hover:bg-[#3A426C] hover:drop-shadow-xl"
            onClick={handleSignOut}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleNav}
            className="text-white bg-[#4B558A] font-medium rounded-md text-sm px-5 py-2.5 mx-5 hover:bg-[#3A426C] hover:drop-shadow-xl"
          >
            <Link
              to="/signin"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Login
            </Link>
          </button>
        )}
        <li className="m-14">
          <Link to="/" className="no-underline text-black hover:underline" onClick={handleNav}>
            Home
          </Link>
        </li>
        <li className="m-14">
          <Link
            to="/map"
            className="no-underline text-black hover:underline"
            onClick={handleNav}
          >
            Map
          </Link>
        </li>
        <li className="m-14">
          <Link
            to="/announcement"
            className="no-underline text-black hover:underline"
            onClick={handleNav}
          >
            Announcement
          </Link>
        </li>
        <li className="m-14">
          <Link
            to="/connect"
            className="no-underline text-black hover:underline"
            onClick={handleNav}
          >
            Connect
          </Link>
        </li>
        <li className="m-14">
          <Link
            to="/help"
            className="no-underline text-black hover:underline"
            onClick={handleNav}
          >
            Help
          </Link>
        </li>
      </ul>

      <div className="hidden md:flex ml-10">
        <h4 className="w-full font-bold text-[#000] mt-2 mr-3">
          {user?.displayName}
        </h4>
        {user ? (
          <button
            className="text-white bg-[#4B558A] font-medium rounded-md text-sm px-5 py-2.5 mx-5 hover:bg-[#3A426C] hover:drop-shadow-xl"
            onClick={handleSignOut}
          >
            Logout
          </button>
        ) : (
          <button className="text-white bg-[#4B558A] font-medium rounded-md text-sm px-5 py-2.5 mx-5 hover:bg-[#3A426C] hover:drop-shadow-xl">
            <Link
              to="/signin"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Login
            </Link>
          </button>
        )}
      </div>

      <ul className="hidden md:flex mr-20 pt-3">
        <li className="p-4" href="/">
          <Link to="/" className="no-underline text-black hover:underline">
            Home
          </Link>
        </li>
        <li className="p-4">
          <Link to="/map" className="no-underline text-black hover:underline">
            Map
          </Link>
        </li>
        <li className="p-4">
          <Link to="/announcement" className="no-underline text-black hover:underline">
            Announcement
          </Link>
        </li>
        <li className="p-4">
          <Link to="/connect" className="no-underline text-black hover:underline">
            Connect
          </Link>
        </li>
        <li className="p-4">
          <Link to="/help" className="no-underline text-black hover:underline">
            Help
          </Link>
        </li>
        <li className="p-4">
          <Link to="/importantinfo" className="no-underline text-black hover:underline">
            <span class="changeColor">
            <AiOutlineInfoCircle size="80px"
              onMouseOver={({target})=>target.style.color="white"}
              onMouseOut={({target})=>target.style.color="black"}
            />
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
