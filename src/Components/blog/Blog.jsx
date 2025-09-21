import {motion} from "framer-motion";
import {Calendar, ArrowRight} from "lucide-react";
// Make sure your JSON file has the new 'image' and 'tags' fields
import BlogData from "./BlogData.json";

function Blog() {
   const cardVariants = {
      hidden: {opacity: 0, y: 40},
      visible: (i) => ({
         opacity: 1,
         y: 0,
         transition: {
            duration: 0.5,
            delay: i * 0.15,
         },
      }),
   };

   return (
      <section className="w-full min-h-screen py-16 bg-gray-50">
         {/* Hero Section */}
         {/* Hero Section */}
         <div className="w-full bg-slate-900">
            <div className="container flex flex-col items-center px-4 py-16 mx-auto text-center lg:flex-row lg:text-left lg:py-24">
               {/* Left Side: Text Content */}
               <div className="lg:w-1/2">
                  <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                     From My <span className="text-sky-400">Desk</span>
                  </h1>
                  <p className="max-w-xl mx-auto mt-4 text-lg text-slate-300 lg:mx-0">
                     Dive into project journeys, development insights, and
                     practical guides on mastering your finances.
                  </p>
               </div>

               {/* Right Side: SVG Illustration */}
               <div className="flex justify-center w-full mt-10 lg:w-1/2 lg:mt-0">
                  {/* This is an inline SVG for easy use. You can also save it as a file. */}
                  <svg
                     className="w-auto h-64 text-white"
                     viewBox="0 0 200 187"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none">
                     <path
                        fill="currentColor"
                        fillOpacity="0.1"
                        d="M199.5 72.5c0 48.3-66.5 114-100 114S0 120.8 0 72.5 66.5.5 100 .5s99.5 23.7 99.5 72z"
                     />
                     <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M136 78a36 36 0 10-72 0 36 36 0 0072 0z"
                     />
                     <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M124.8 110.1A36.2 36.2 0 01100 114a36.2 36.2 0 01-24.8-5.9M113.6 78.4l-13.2 13.2-6-6"
                     />
                     <path
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        d="M164 42h1m-16 16h1m-20-8h1m-4 17h1m-14-23h1"
                     />
                     <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M176 110a12 12 0 11-24 0 12 12 0 0124 0z"
                     />
                     <path
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        d="M164 110h12"
                     />
                     <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M51 138a12 12 0 11-24 0 12 12 0 0124 0z"
                     />
                     <path
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        d="M39 138h12"
                     />
                  </svg>
               </div>
            </div>
         </div>

         {/* Blog Grid */}
         <div className="container px-4 mx-auto mt-16 lg:mt-24">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
               {BlogData.map((card, index) => (
                  <motion.div
                     key={index}
                     custom={index}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{once: true}}
                     variants={cardVariants}
                     className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-200 shadow-sm group rounded-2xl hover:shadow-xl">
                     {/* Image Container */}
                     <div className="overflow-hidden">
                        <img
                           src={card.image}
                           alt={card.title}
                           className="object-cover w-full h-48 transition-transform duration-500 ease-in-out group-hover:scale-105"
                        />
                     </div>

                     <div className="flex flex-col flex-grow p-6">
                        {/* Date and Tags */}
                        <div className="flex items-center justify-between mb-4">
                           <div className="flex items-center text-sm text-gray-500">
                              <Calendar size={16} className="mr-2" />
                              {card.date}
                           </div>
                           <div className="flex flex-wrap gap-2">
                              {card.tags.map((tag, tagIndex) => (
                                 <span
                                    key={tagIndex}
                                    className="px-2 py-1 text-xs font-medium rounded-full text-sky-700 bg-sky-100">
                                    {tag}
                                 </span>
                              ))}
                           </div>
                        </div>

                        {/* Title */}
                        <h2 className="mb-3 text-xl font-bold text-gray-900">
                           {card.title}
                        </h2>

                        {/* Description */}
                        <p className="flex-grow text-sm leading-relaxed text-gray-600">
                           {card.disc}
                        </p>

                        {/* Link */}
                        <motion.a
                           href={card.link}
                           target="_blank"
                           rel="noopener noreferrer"
                           className="flex items-center mt-6 font-semibold text-sky-600 group">
                           Read Blog
                           <ArrowRight
                              size={18}
                              className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                           />
                        </motion.a>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
   );
}

export default Blog;
