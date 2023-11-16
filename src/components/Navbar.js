import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu, AiOutlineInfoCircle } from 'react-icons/ai';
import isate from "../images/isate2024-logo.png"
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    
    <div className='bg-[#FFF] flex justify-between items-center h-20 mt-auto px-4 text-black'>
        <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
        </div>
        <div className='md:hidden pt-2'>
            <Link to="/importantinfo"><AiOutlineInfoCircle className='text-black' size={25}/></Link>
        </div>
      <ul className={nav ? 'fixed left-0 top-20 w-[60%] h-full bg-[#EDF1F4] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <h3 className='w-full font-bold text-[#000] pt-10 '>Emily Bieber</h3>
        <p className='font-bold text-[grey]'>UX Designer</p>
          <li className='p-4'><Link to="/" className='no-underline text-black'>Home</Link></li>
          <li className='p-4'><Link to="/map" className='no-underline text-black'>Map</Link></li>
          <li className='p-4'><Link to="/announcement" className='no-underline text-black'>Announcement</Link></li>
          <li className='p-4 '><Link to="/connect" className='no-underline text-black'>Connect</Link></li>
          <li className='p-4'><Link to="/help" className='no-underline text-black'>Help</Link></li>
      </ul>
      
      <div className='hidden md:flex ml-10'>
        <Link to="/">
          <img className='object-fit h-12 w-36' src={isate} alt="istate" />
        </Link>
      </div>
      <ul className='hidden md:flex mr-20 pt-3'>
        <li className='p-4' href="/"><Link to="/" className='no-underline text-black'>Home</Link></li>
        <li className='p-4'><Link to="/map" className='no-underline text-black'>Map</Link></li>
        <li className='p-4'><Link to="/announcement" className='no-underline text-black'>Announcement</Link></li>
        <li className='p-4'><Link to="/connect" className='no-underline text-black'>Connect</Link></li>
        <li className='p-4'><Link to="/help" className='no-underline text-black'>Help</Link></li>
        <li className='p-4'><Link to="/importantinfo" className='no-underline text-black'><AiOutlineInfoCircle size={25}/></Link></li>
      </ul>
    </div>
  );
};

export default Navbar;