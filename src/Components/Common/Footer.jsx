import Profile from "/src/assets/images/me-footer.jpg";

function Footer() {
   const currentYear = new Date().getFullYear();

   return (
      <footer className="w-[100%] h-auto py-5 md:h-[50vh] flex justify-around items-center flex-col bg-white">
         <div className="w-[90%] flex flex-col justify-center items-center gap-5">
            <div className="w-[100px] h-[100px] rounded-full bg-black border-2 border-solid border-black">
               <img className="w-[100%] rounded-full" src={Profile} alt="Profile Picture" />
            </div>
            <h2 className="text-[1.6em] font-semibold text-center">👋 hey, i am diwash pandey.</h2>
            <p className="text-gray-600 text-[0.8em] sm:text-[1em] text-center">
               I developed SmartExpense Tracker as a solo side project to
               simplify <br /> managing daily expenses. No fancy setups, no big <br />
               teams—just me, turning weekend coding <br /> sessions into a practical <br />
               solution for financial <br /> clarity.
            </p>
         </div>
         <p>&copy; Diwash Pandey {currentYear}</p>
      </footer>
   );
}

export default Footer;
