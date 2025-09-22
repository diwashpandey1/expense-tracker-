import { Link, useLocation } from "react-router-dom";
import Logo from "/src/assets/images/logo.png";
import { useContext, useState } from "react";
import { auth } from "../../backend/Firebase";
import { AuthContext } from "../../backend/AuthContext";
import { signOut } from "firebase/auth";
import optionalPP from "../../assets/images/profile.webp";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

function Header() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);
  const hideDropdown = () => setIsDropdownVisible(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsDropdownVisible(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/tools", label: "Tools" },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 lg:px-16 h-[10vh]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="w-10 sm:w-12" />
          <span className="text-lg font-semibold sm:text-xl whitespace-nowrap">
            Expense-Tracker
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="items-center hidden gap-6 md:flex">
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
                    isActive
                      ? "text-green-600 font-semibold"
                      : "text-gray-700 hover:text-gray-900"
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
                onClick={toggleDropdown}
              >
                <img
                  src={user.photoURL || optionalPP}
                  alt="Profile"
                  className="object-cover w-8 h-8 border rounded-full"
                />
                <AnimatePresence>
                  {isDropdownVisible && (
                    <motion.div
                      className="absolute top-[110%] right-0 w-40 sm:w-48 bg-white border rounded-lg shadow-md z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to="/profile"
                        className="block w-full px-4 py-2 text-center text-gray-700 hover:bg-gray-100"
                        onClick={hideDropdown}
                      >
                        Profile
                      </Link>
                      <button
                        className="block w-full px-4 py-2 text-center text-gray-700 hover:bg-gray-100"
                        onClick={hideDropdown}
                      >
                        Settings
                      </button>
                      <button
                        className="block w-full px-4 py-2 text-center text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        Log Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-white transition bg-green-500 rounded-lg hover:bg-green-600"
              >
                Log In
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            className="bg-white border-t shadow-md md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-3 px-4 py-4">
              {navItems.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="font-medium text-gray-700 hover:text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="font-medium text-gray-700 hover:text-gray-900"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="font-medium text-left text-gray-700 hover:text-gray-900"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 text-center text-white bg-green-500 rounded-lg hover:bg-green-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Log In
                </Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
