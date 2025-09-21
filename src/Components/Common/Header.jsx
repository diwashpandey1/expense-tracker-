import {Link, useLocation} from "react-router-dom";
import Logo from "/src/assets/images/logo.png";
import {useContext, useState} from "react";
import {auth, googleProvider} from "../../backend/Firebase"; 
import {AuthContext} from "../../backend/AuthContext";
import { signOut } from 'firebase/auth';
import optionalPP from "../../assets/images/profile.webp";
import { motion } from "framer-motion";

function Header() {
   const [isDropdownVisible, setIsDropdownVisible] = useState(false);
   const {user} = useContext(AuthContext);
   const location = useLocation();

   const toggleDropdown = () => {
      setIsDropdownVisible((prev) => !prev);
   };

   const hideDropdown = () => {
      setIsDropdownVisible(false);
   };

   const handleLogout = async () => {
      try {
         await signOut(auth);
      } catch (error) {
         console.error("Error logging out:", error);
      }
   };

   // Navigation items
   const navItems = [
      { to: "/", label: "Home" },
      { to: "/tools", label: "Tools" },
      { to: "/blog", label: "Blog" },
   ];

   return (
      <header className="h-[10vh] w-full bg-white shadow-md flex justify-between items-center px-4 sm:px-8 lg:px-16 fixed z-50">
         {/* Logo */}
         <Link to="/" className="items-center hidden gap-2 md:flex">
            {Logo && <img className="w-9 sm:w-10" src={Logo} alt="Logo" />}
            <p className="text-[1em] sm:text-[1.2em] font-semibold whitespace-nowrap">Expense-Tracker</p>
         </Link>

         {/* Navigation */}
         <nav className="flex items-center justify-between w-full gap-4 text-sm md:w-auto sm:gap-6 md:gap-8 sm:text-base">
            {navItems.map(({ to, label }) => {
               const isActive = location.pathname === to;
               return (
                  <motion.div
                     key={to}
                     className="relative flex flex-col items-center"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                  >
                     <Link
                        to={to}
                        className={`transition-colors ${
                           isActive ? "text-green-600 font-semibold" : "text-gray-700 hover:text-gray-900"
                        }`}
                     >
                        {label}
                     </Link>
                     {isActive && (
                        <motion.div
                           layoutId="activeNav"
                           className="absolute -bottom-1 left-0 right-0 mx-auto h-[3px] w-6 rounded-full bg-green-600"
                        />
                     )}
                  </motion.div>
               );
            })}

            {/* User Dropdown */}
            <div className="relative flex items-center" onMouseLeave={hideDropdown}>
               {user ? (
                  <div
                     className="flex items-center gap-2 cursor-pointer"
                     onMouseEnter={() => setIsDropdownVisible(true)}
                     onClick={toggleDropdown}>
                     <img
                        src={user.photoURL || optionalPP}
                        alt="Profile"
                        className="object-cover w-8 h-8 border rounded-full"
                     />
                     {isDropdownVisible && (
                        <div className="absolute top-[110%] right-0 w-40 sm:w-48 bg-white border rounded-lg shadow-md z-50">
                           <Link
                              to="/profile"
                              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 sm:text-base"
                              onClick={hideDropdown}>
                              Profile
                           </Link>
                           <button
                              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 sm:text-base"
                              onClick={hideDropdown}>
                              Settings
                           </button>
                           <button
                              className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 sm:text-base"
                              onClick={handleLogout}>
                              Log Out
                           </button>
                        </div>
                     )}
                  </div>
               ) : (
                  <div>
                     <Link 
                        to="/login" 
                        className="px-3 py-2 text-sm text-white transition-all bg-green-500 rounded-lg sm:px-4 hover:bg-green-600 sm:text-base">
                        Log In
                     </Link>
                  </div>
               )}
            </div>
         </nav>
      </header>
   );
}

export default Header;
