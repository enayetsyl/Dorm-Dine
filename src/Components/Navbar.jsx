import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
// import { IoMdNotifications } from 'react-icons/io';

import logo from '../assets/titleIcon.png';
import useAuth from '../hooks/useAuth';

const Navbar = () => {

  const { pathname } = useLocation();

  const [active, setActive] = useState(pathname);
  const [accountActive, setAccountActive] = useState(false);
  const [open, setIsOpen] = useState(false);
  // const [userLoggedIn, setUserLoggedIn] = useState(false);
  const {user, logOut} = useAuth();

  const navData = [
    {
      text: 'Home',
      link: '/',
    },
    {
      text: 'Meals',
      link: '/meals',
    },
    {
      text: 'Upcoming Meals',
      link: '/upcoming-meals',
    },
    {
      text: 'Contact Us',
      link: '/contact',
    },
  ];

  const subMenuIndicator = (type) => {
    if (type === 'user') {
      setIsOpen(false);
      setAccountActive(() => !accountActive);
    } else {
      setAccountActive(false);
      setIsOpen(() => !open);
    }
  };
  return (
    <div className="bg-five shadow w-full text-4xl relative py-3 font-[poppins] z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* nav */}
          {/* logo */}
          <div className="flex justify-center items-center gap-5">
            <img src={logo} alt="" className="max-w-[100px]" />
            <h1 className='font-primary text-black font-bold text-4xl hidden md:block'>DormDine</h1>
          </div>
          <div className="flex flex-row-reverse lg:flex-row items-center justify-center md:gap-x-12">
            {/* desktop navigation */}
            <div className="hidden lg:flex items-center">
              <ul className="flex gap-x-6 text-base uppercase">
                {navData.map((item, i) => (
                  <Link
                    to={item.link}
                    onClick={() => setActive(item.link)}
                    className={`${active === item.link && 'font-bold'}`}
                    key={i}
                  >
                    <li>{item.text}</li>
                  </Link>
                ))}
              </ul>
            </div>
            {/* hamburger menu */}
            <div className="flex items-center relative lg:hidden">
              <div
                className="cursor-pointer"
                onClick={() => subMenuIndicator('hamburger')}
              >
                {open ? <FaTimes /> : <GiHamburgerMenu />}
              </div>
              {/* mobile navigation */}
              {open && (
                <div className="w-[150px] absolute top-[122%] right-0 text-base bg-five black-shadow p-3">
                  <ul className="flex flex-col gap-y-3">
                    {navData.map((item, i) => (
                      <li key={i}>
                        <Link to={item.link} className="hover:text-one">
                          {item.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* cart */}
            <div className="flex justify-end items-center gap-x-6">
              {/* <Link
                to="/dashboard"
                className="text-xl flex gap-1 items-center hover:text-sky-700 duration-500"
              >
                <IoMdNotifications size={25} />
              </Link> */}

              {user ? (
                <div className="text-xl flex gap-1 items-center hover:text-one duration-500 relative">
                  <img
                    src=""
                    alt=""
                    width={25}
                    height={25}
                    className="object-cover rounded-full cursor-pointer"
                    onClick={() => subMenuIndicator('user')}
                  />
                  {accountActive && (
                    <div className="w-[150px] absolute top-[122%] right-0 text-base bg-white black-shadow p-3">
                      <ul className="flex flex-col gap-y-3">
                        <li>UserName</li>
                        <li>
                          <Link to="/dashboard" className="hover:text-blue-500">
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <button 
                          onClick={logOut}
                          className="text-sm bg-black text-white py-2 px-6 rounded-full">
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
               <Link to='/login'>
                <button className="bg-black text-white !text-sm uppercase font-bold py-3 px-12 hover:translate-y-2 duration-500 rounded cursor-pointer">
                  Join Us
                </button>
               </Link>
              )}
              <Link
                to="/cart"
                className="text-xl flex gap-1 items-center hover:text-sky-700 duration-500 whitespace-nowrap"
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

