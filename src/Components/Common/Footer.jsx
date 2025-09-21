import React from 'react';

import Member_1 from "/src/assets/images/member_1.jpg";
import Member_2 from "/src/assets/images/member_2.jpg";
import Member_3 from "/src/assets/images/member_3.jpg";

function Footer() {
   const currentYear = new Date().getFullYear();

   // Team members data array
   const team_members = [
      {
         name: "Diwash Pandey",
         role_1: "Full Stack Developer",
         role_2: "Project Lead",
         // Using placeholder images for demonstration
         image: Member_1 || "https://placehold.co/200x200/4f46e5/ffffff?text=DP"
      },
      {
         name: "Bishal Ghimire",
         role_1: "Front-End Developer",
         role_2: "Designer",
         image: Member_2 || "https://placehold.co/200x200/db2777/ffffff?text=BG"
      },
      {
         name: "Aashish Poudel",
         role_1: "Website Tester",
         role_2: "Documentation Specialist",
         image: Member_3 || "https://placehold.co/200x200/ea580c/ffffff?text=AP"
      }
   ];

   return (
      // Main footer container with background, padding, and text color
      <footer className="text-white bg-gray-900">
         <div className="px-6 py-12 mx-auto max-w-7xl">
            {/* Section title */}
            <h2 className="mb-12 text-3xl font-bold text-center text-white">
               Meet Our Team
            </h2>

            {/* Grid container for team members. It's responsive: 1 column on small screens, 3 on larger screens. */}
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
               {team_members.map((member, index) => (
                  <div 
                     key={index} 
                     className="flex flex-col items-center p-8 transition-colors duration-300 transform border-2 border-gray-700 rounded-xl hover:border-purple-500 group"
                  >
                     {/* Team member image with styling */}
                     <img 
                        className="object-cover w-32 h-32 transition-all duration-300 rounded-full ring-4 ring-gray-700 group-hover:ring-purple-500" 
                        src={member.image} 
                        alt={`${member.name} - ${member.role}`} 
                        loading="lazy"
                        onError={(e) => e.target.src = "https://placehold.co/200x200/4f46e5/ffffff?text=" + member.name.split(" ")[0].charAt(0) + member.name.split(" ")[1].charAt(0)}
                     />
                     
                     {/* Team member name */}
                     <h3 className="mt-4 text-2xl font-semibold text-white capitalize">
                        {member.name}
                     </h3>
                     
                     {/* Team member role */}
                     <p className="mt-1 text-purple-400 capitalize">
                        {member.role_1}
                     </p>
                     {/* <p className='opacity-20'>&</p> */}
                     <p className="mt-1 text-pink-400 capitalize">
                        {member.role_2}
                     </p>
                  </div>
               ))}
            </div>

            {/* Footer bottom section with copyright info */}
            <div className="pt-6 mt-16 text-center border-t-2 border-gray-700">
               <p className="text-sm text-gray-400">
                  &copy; Expense Tracker {currentYear}. All Rights Reserved.
               </p>
            </div>
         </div>
      </footer>
   );
}

export default Footer;