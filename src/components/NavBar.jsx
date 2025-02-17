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
                    <button className="p-4" onClick={handleClick}>
                        Logout
                    </button>
                </div>

            ) : (
                <div className="flex items-center space-x-4 p-4">
                    <Link to="/api/login"> Login </Link>
                    <Link to="/api/signup"> Signup </Link>
                </div>
            )}
    
      </header>
    
  );
}

export default NavBar;




