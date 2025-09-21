import { Link } from "react-router-dom";
import { AuthContext } from "../../backend/AuthContext";
import { useContext } from "react";
import image from "../../assets/images/hero-image.jpg";

function Hero() {
  const { user } = useContext(AuthContext);

  return (
    <section className="w-full min-h-[90vh] flex justify-center items-center py-10 md:py-0">
      <div className="content w-[90%] flex flex-col md:flex-row justify-evenly items-center gap-8 mt-20 md:mt-16">
        {/* Left Content */}
        <div className="flex flex-col items-center justify-center gap-5 text-center left md:justify-start md:items-start md:text-left">
          <p className="title text-[2em] md:text-[4em] flex flex-col font-bold leading-tight">
            <span>Track Expenses,</span>
            <span className="text-[#10B981]">Save Smart,</span>
            <span>Live Free!</span>
          </p>
          <p className="subtitle text-[1em] md:text-lg w-[90%] md:w-[500px]">
            Seamlessly manage your expenses, uncover spending habits, and achieve financial clarity.
          </p>
          <Link
            to="expense-tracker-app"
            className="bg-[#10B981] py-2 px-6 rounded-xl text-white font-medium hover:bg-[#0e9d6f] transition"
          >
            Start Tracking Now
          </Link>
        </div>

        {/* Right Image */}
        <div className="right w-full md:w-[50%] flex justify-center">
          <div className="w-full md:w-[80%] rounded-2xl overflow-hidden shadow-lg">
            <img
              src={image}
              alt="Hero Expense Tracker"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
