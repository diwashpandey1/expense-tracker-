import React from "react";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import Member_1 from "/src/assets/images/member_1.jpg";
import Member_2 from "/src/assets/images/member_2.jpg";
import Member_3 from "/src/assets/images/member_3.jpg";
import { Link } from "react-router-dom";
import { label } from "framer-motion/client";

function Footer() {
  const currentYear = new Date().getFullYear();

  const team_members = [
    {
      name: "Diwash Pandey",
      role: "Project Lead",
      image: Member_1 || "https://placehold.co/100x100/4f46e5/ffffff?text=DP",
    },
    {
      name: "Bishal Ghimire",
      role: "Documentation Managing",
      image: Member_2 || "https://placehold.co/100x100/db2777/ffffff?text=BG",
    },
    {
      name: "Aashish Poudel",
      role: "Presentation",
      image: Member_3 || "https://placehold.co/100x100/ea580c/ffffff?text=AP",
    },
  ];

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Tools", href: "/tools" },
    {label: "Start Tracking", href: "/expense-tracker-app"}
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
          <h2 className="mb-2 text-3xl font-bold text-purple-500">Expense Tracker</h2>
          <p className="max-w-2xl text-gray-400">
            Seamlessly manage your expenses, track income & savings, set goals, and get insights to make smarter financial decisions.
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

        {/* Team Members */}
        <div className="grid grid-cols-1 gap-8 mb-12 sm:grid-cols-3">
          {team_members.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 transition-transform duration-300 bg-gray-800 rounded-lg hover:scale-105"
            >
              <img
                src={member.image}
                alt={member.name}
                className="object-cover w-20 h-20 mb-4 rounded-full ring-2 ring-purple-500"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold text-white">{member.name}</h3>
              <p className="text-sm text-green-400">{member.role}</p>
            </div>
          ))}
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
