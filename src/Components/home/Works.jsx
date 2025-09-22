import { motion } from "framer-motion";

function Works() {
  // Step data
  const steps = [
    {
      id: 1,
      title: "Open Expense Tracker",
      desc: "Access your dashboard from anywhere and start managing your finances.",
    },
    {
      id: 2,
      title: "Track Expenses",
      desc: "Add daily expenses, categorize them, and monitor your spending habits.",
    },
    {
      id: 3,
      title: "Get Insights",
      desc: "Visualize your spending patterns and receive insights to save smarter.",
    },
  ];

  return (
    <section className="w-full py-16 flex justify-center items-center bg-[#ECFDF5]">
      <div className="w-[90%] flex flex-col items-center">
        <motion.h2
          className="text-black text-[2em] md:text-[2.2em] font-bold mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
        >
          How it Works
        </motion.h2>

        <div className="flex flex-col items-center justify-around w-full gap-12 md:flex-row">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center gap-5 md:w-[30%] text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: step.id * 0.2 }}
              viewport={{ once: false }}
            >
              <span className="w-16 h-16 md:w-20 md:h-20 bg-[#D1FAE5] rounded-full flex justify-center items-center text-green-600 font-bold text-lg md:text-xl shadow-md">
                {step.id}
              </span>
              <h3 className="text-[1.2em] md:text-[1.4em] font-semibold">{step.title}</h3>
              <p className="text-gray-600 text-[0.95em] md:text-[1em]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Works;
