import { motion } from "framer-motion";
import { 
  Wallet, PiggyBank, Target, Tags, BarChart3, Brain, 
  CloudUpload, Trophy, Calculator 
} from "lucide-react";

function Card({ icon, isAvailable, title, disc }) {
  return (
    <motion.div
      className="bg-white shadow-lg w-full sm:w-[350px] px-6 py-8 rounded-2xl flex flex-col items-center relative hover:shadow-2xl transition-shadow"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      viewport={{ once: false }}
    >
      {/* Icon wrapper */}
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-50">
        {icon}
      </div>

      {/* Coming soon badge with animation */}
      {!isAvailable && (
        <motion.p
          className="absolute right-2 top-2 text-[10px] px-3 py-1 rounded-full bg-red-200 text-gray-700 font-medium"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Coming soon...
        </motion.p>
      )}

      <h3 className="my-2 text-xl font-semibold text-center text-gray-700">
        {title}
      </h3>
      <p className="text-center text-gray-600">{disc}</p>
    </motion.div>
  );
}

function Features() {
  const cardsData = [
    { icon: <Wallet size={36} className="text-green-500"/>, isAvailable: true, title: "Expense Tracking", disc: "Record and manage your daily expenses effortlessly." },
    { icon: <PiggyBank size={36} className="text-green-500"/>, isAvailable: true, title: "Income & Savings", disc: "Track your earnings and savings to stay financially balanced." },
    { icon: <Target size={36} className="text-green-500"/>, isAvailable: true, title: "Goal Management", disc: "Set financial goals and monitor your progress toward achieving them." },
    { icon: <Tags size={36} className="text-green-500"/>, isAvailable: true, title: "Category Management", disc: "Organize your expenses into categories for better clarity." },
    { icon: <BarChart3 size={36} className="text-green-500"/>, isAvailable: true, title: "Real-time Overview", disc: "Get instant insights into your spending and saving habits." },
    { icon: <Calculator size={36} className="text-green-500"/>, isAvailable: true, title: "Financial Tools", disc: "Use calculators like SIP, interest, and currency exchange." },
    { icon: <Brain size={36} className="text-green-500"/>, isAvailable: false, title: "AI Smart Insights", disc: "Receive AI-powered budgeting tips and spending analysis." },
    { icon: <CloudUpload size={36} className="text-green-500"/>, isAvailable: false, title: "Cloud Backup", disc: "Securely back up your financial data and access it anywhere." },
    { icon: <Trophy size={36} className="text-green-500"/>, isAvailable: false, title: "Money Challenges", disc: "Gamify savings with fun challenges to stay motivated." },
  ];

  return (
    <section className="flex items-center justify-center w-full h-auto px-6 py-16 sm:px-10 lg:px-16 bg-gray-50" id="features">
      <div className="flex flex-col items-center justify-center w-full max-w-7xl">
        <motion.h1 
          className="mb-16 text-3xl font-bold text-gray-800 sm:text-4xl"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Features
        </motion.h1>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-10">
          {cardsData.map((card, index) => (
            <Card 
              key={index}
              isAvailable={card.isAvailable}
              icon={card.icon} 
              title={card.title} 
              disc={card.disc} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
