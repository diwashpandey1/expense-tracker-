import React from "react";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
   const currentYear = new Date().getFullYear();

   const navLinks = [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: "Tools", href: "/tools" },
      { label: "Start Tracking", href: "/expense-tracker-app" },
   ];

   const socialLinks = [
      { icon: <Facebook size={20} />, href: "https://facebook.com" },
      { icon: <Twitter size={20} />, href: "https://twitter.com" },
      { icon: <Instagram size={20} />, href: "https://instagram.com" },
      { icon: <Linkedin size={20} />, href: "https://linkedin.com" },
   ];

   return (
      <footer className="text-white bg-gray-900">
         <div className="px-6 py-12 mx-auto max-w-7xl">

            {/* App Description */}
            <div className="flex flex-col items-center mb-12 text-center">
               <h2 className="mb-2 text-3xl font-bold text-purple-500">
                  Expense Tracker
               </h2>
               <p className="max-w-2xl text-gray-400">
                  Seamlessly manage your expenses, track income & savings, set
                  goals, and get insights to make smarter financial decisions.
               </p>
            </div>

            {/* Navigation & Social */}
            <div className="flex flex-col items-center gap-6 mb-12 md:flex-row md:justify-between">
               
               {/* Navigation */}
               <div className="flex flex-wrap justify-center gap-6">
                  {navLinks.map((link, index) => (
                     <Link
                        key={index}
                        to={link.href}
                        className="font-medium text-gray-400 transition-colors duration-300 hover:text-purple-500"
                     >
                        {link.label}
                     </Link>
                  ))}
               </div>

               {/* Social Media */}
               <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                     <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 transition duration-300 hover:text-green-400 hover:drop-shadow-[0_0_10px_rgba(16,185,129,0.7)]"
                     >
                        {social.icon}
                     </a>
                  ))}
               </div>
            </div>

            {/* Footer Bottom */}
            <div className="pt-6 text-center border-t border-gray-700">
               <p className="text-sm text-gray-500">
                  &copy; {currentYear} Expense Tracker. All Rights Reserved.
               </p>
            </div>

         </div>
      </footer>
   );
}

export default Footer;