import React from "react";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout.js';

function NavBar() {


    const { user } = useAuthContext();
    const { logout } = useLogout();

    const handleClick = () => logout();

  return (
    
      <header className="flex shadow sticky top-0 z-50 h-16 w-full bg-teal-900 text-white items-center justify-between"> 
        <nav className="px-4 lg:px-6">
          <ul className="flex list-none">
            <li>
              <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Home
              </Link>
            </li>
          </ul>
        </nav>

        <span className="text-center text-2xl font-semibold">The Diary App</span>


        {user ? (
                <div>
                    <span>{ user.email }</span>
                    <button onClick={handleClick}>
                        Logout
                    </button>
                </div>

            ) : (
                <div className="flex items-center space-x-4">
                    <Link to="/api/login"> Login </Link>
                    <Link to="/api/signup"> Signup </Link>
                </div>
            )}
    
      </header>
    
  );
}

export default NavBar;





{/* <>
            <header className="shadow sticky z-50 top-0">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to="/" className="flex items-center">
                        <img
                            src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
                            className="mr-3 h-12"
                            alt="Logo"
                        />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link
                            to="#"
                            className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Log in
                        </Link>
                        <Link
                            to="#"
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                        >
                            Get started
                        </Link>
                    </div>
                    <div
                        className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <NavLink
                                    className={({isActive}) =>
                                        `block py-2 pr-4 
                                        pl-3 duration-200 ${isActive? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                    }
                                    
                                >
                                    Home
                                </NavLink>
                            </li>
                            
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
        </> */}