import { Link } from "react-router-dom";
import Profile from "/src/assets/images/me-footer.jpg";
import Logo from "/src/assets/images/logo.png";
import { useState } from "react";

function Header() {
   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
   const [isLoggedin, setIsLoggedIn] = useState(true);

   const toggleDropdown = () => {
      setIsDropdownVisible((prev) => !prev);
   };

   const hideDropdown = () => {
      setIsDropdownVisible(false);
   };

   const handleLogout = () => {
      setIsLoggedIn(false);
      hideDropdown();
   };

   return (
      <header className="h-[10vh] w-full bg-white shadow-md flex justify-between items-center px-6 sm:px-10 lg:px-16 fixed z-50">
         {/* Logo */}
         <Link to="/" className="hidden md:flex items-center gap-2">
            {Logo && <img className="w-10" src={Logo} alt="Logo" />}
            <p className="text-[1.2em] font-semibold">Expense-Tracker</p>
         </Link>

         {/* Navigation */}
         <nav className="flex justify-between items-center gap-8 md:gap-none w-full md:w-auto">
            <Link
               to="/"
               className="text-gray-700 hover:text-gray-900 transition-colors">
               Home
            </Link>
            <Link
               to="/tools"
               className="text-gray-700 hover:text-gray-900 transition-colors">
               Tools
            </Link>
            <Link
               to="/blog"
               className="text-gray-700 hover:text-gray-900 transition-colors">
               Blog
            </Link>

            {/* User Dropdown */}
            <div className="relative" onMouseLeave={hideDropdown}>
               {isLoggedin ? (
                  <div
                     className="flex items-center gap-2 cursor-pointer"
                     onMouseEnter={() => setIsDropdownVisible(true)}>
                     <img
                        src={Profile}
                        alt="Profile"
                        className="w-8 h-8 rounded-full border"
                     />
                     {isDropdownVisible && (
                        <div className="absolute top-[100%] right-0 w-48 bg-white border rounded-lg shadow-md z-50">
                           <button
                              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                              onClick={hideDropdown}>
                              Profile
                           </button>
                           <button
                              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                              onClick={hideDropdown}>
                              Settings
                           </button>
                           <button
                              className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                              onClick={handleLogout}>
                              Log Out
                           </button>
                        </div>
                     )}
                  </div>
               ) : (
                  <div>
                     <button
                        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white transition-all"
                        onClick={toggleDropdown}
                        onMouseEnter={() => setIsDropdownVisible(true)}>
                        Login/Sign Up
                     </button>
                     {isDropdownVisible && (
                        <div className="absolute right-0 w-48 bg-white border rounded-lg shadow-md z-50">
                           <Link
                              to="/login"
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                              onClick={hideDropdown}>
                              Log In
                           </Link>
                           <Link
                              to="/signup"
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                              onClick={hideDropdown}>
                              Sign Up
                           </Link>
                        </div>
                     )}
                  </div>
               )}
            </div>
         </nav>
      </header>
   );
}

export default Header;
