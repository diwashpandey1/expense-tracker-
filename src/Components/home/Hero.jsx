import {Link} from "react-router-dom";

function Hero() {

  return (
    <section className="w-full h-[90vh] flex justify-center items-center py-10 md:py-0">
      <div className="content w-[90%] flex justify-evenly items-center">
        <div className="left flex flex-col gap-[20px] justify-center items-center md:justify-start md:items-start">
          <p className="title text-[2em] md:text-[4em]  flex flex-col font-bold items-center md:items-start">
            <span>Track Expenses,</span>
            <span className="text-[#10B981]">Save Smart,</span>
            <span>Live Free!</span>
          </p>
          <p className="subtitle text-[1em] text-center md:text-left w-[80%] md:w-[500px]">
            Seamlessly manage your expenses, uncover spending habits, and achieve financial clarity.
          </p>
          <Link to="/expense-tracker-app" className="bg-[#10B981] py-1 px-3 rounded-[10px] text-white">Start Tracking Now</Link>
        </div>
        <div className="right hidden md:block">
          <div className="w-[200px] h-[450px] bg-black"></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
