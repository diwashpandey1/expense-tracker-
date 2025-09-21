import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, BarChart3, Target, Settings } from "lucide-react";

function ExpenseFooter() {
  const location = useLocation();

  // Define footer nav items
  const navItems = [
    { to: "/expense-tracker-app/", icon: Home, label: "Home" },
    { to: "/expense-tracker-app/insights", icon: BarChart3, label: "Insights" },
    { to: "/expense-tracker-app/goals", icon: Target, label: "Goals" },
    { to: "/expense-tracker-app/setting", icon: Settings, label: "Settings" },
  ];

  return (
    <footer className="h-[10vh] fixed bottom-0 w-full bg-white flex justify-around items-center py-2 border-t-2 border-gray-300">
      {navItems.map(({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to;

        return (
          <motion.div
            key={to}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center"
          >
            <Link
              to={to}
              className={`flex flex-col gap-1 items-center text-sm transition ${
                isActive ? "text-[#10b981]" : "text-gray-600"
              }`}
            >
              <Icon size={24} strokeWidth={2.2} />
              <span className={`font-semibold text-[1.05em]`}>
                {label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="h-[3px] w-8 bg-[#10b981] rounded-full mt-1"
                />
              )}
            </Link>
          </motion.div>
        );
      })}
    </footer>
  );
}

export default ExpenseFooter;
