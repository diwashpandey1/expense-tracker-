import {Link} from "react-router-dom";
import Logo from "/src/assets/images/logo.png";

function Header() {
   return (
      <header className="h-[10vh] w-full bg-white shadow-md flex justify-between items-center px-6 sm:px-10 lg:px-16 fixed">
         <Link to="/" className="block items-end sm:flex hidden">
            <img className="w-10" src={Logo} alt="Logo" />
            <p className="text-[1.2em] mb-[2px]">Expense-Tracker</p>
         </Link>

         <nav className="flex sm:w-auto w-full items-center justify-between gap-0 sm:gap-8 lg:gap-12">
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
            <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white transition-all">
               Login
            </button>
         </nav>
      </header>
   );
}

export default Header;
