import { Link } from "react-router-dom";
import { AuthContext } from "../../backend/AuthContext";
import { useContext } from "react";
import { motion } from "framer-motion";
import image from "../../assets/images/hero-image.png";

function Hero() {
  const { user } = useContext(AuthContext);

  return (
    <section className="w-full min-h-[90vh] flex justify-center items-center py-16 md:py-0">
      <div className="content w-[90%] flex flex-col md:flex-row justify-between items-center gap-12 mt-20 md:mt-16">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center gap-6 text-center left md:justify-start md:items-start md:text-left"
        >
          <p className="title text-[2.5em] md:text-[4em] flex flex-col font-extrabold leading-tight tracking-tight">
            <span>Track Expenses,</span>
            <span className="text-[#10B981]">Save Smart,</span>
            <span>Live Free!</span>
          </p>
          <p className="subtitle text-[1em] md:text-lg w-[90%] md:w-[520px] text-gray-600">
            Seamlessly manage your expenses, uncover spending habits, and achieve financial clarity with ease.
          </p>
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/expense-tracker-app"
              className="bg-[#10B981] py-3 px-8 rounded-2xl text-white font-semibold shadow-md hover:bg-[#0e9d6f] transition-all"
            >
              Start Tracking Now
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="right w-full md:w-[50%] flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 150 }}
            className="w-full md:w-[80%] rounded-3xl overflow-hidden drop-shadow-xl"
          >
            <img
              src={image}
              alt="Hero Expense Tracker"
              className="object-cover w-full h-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
