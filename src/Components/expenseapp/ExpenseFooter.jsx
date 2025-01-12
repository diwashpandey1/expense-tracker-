import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartBar,
  faBullseye,
  faUser,
  faCog,
} from "@fortawesome/free-solid-svg-icons";

function ExpenseFooter() {
  return (
    <footer className="h-[10vh] fixed bottom-0 w-full bg-white text-white flex justify-around items-center py-2 border-t-2 border-gray-300">
      <Link to="/expense-tracker-app/" className="flex flex-col gap-1 text-black items-center text-sm ">
        <FontAwesomeIcon icon={faHome} size="lg" color="#10b981" />
        <span className="font-semibold text-[1.1em]">Home</span>
      </Link>
      <Link to="/expense-tracker-app/insights" className="flex flex-col gap-1 text-black items-center text-sm ">
        <FontAwesomeIcon icon={faChartBar} size="lg" color="#10b981" />
        <span className="font-semibold text-[1.1em]">Insights</span>
      </Link>
      <Link to="/expense-tracker-app/goals" className="flex flex-col gap-1 text-black items-center text-sm ">
        <FontAwesomeIcon icon={faBullseye} size="lg" color="#10b981" />
        <span className="font-semibold text-[1.1em]">Goals</span>
      </Link>
      <Link to="/expense-tracker-app/profile" className="flex flex-col gap-1 text-black items-center text-sm ">
        <FontAwesomeIcon icon={faUser} size="lg" color="#10b981" />
        <span className="font-semibold text-[1.1em]">Profile</span>
      </Link>
      <Link to="/expense-tracker-app/setting" className="flex flex-col gap-1 text-black items-center text-sm ">
        <FontAwesomeIcon icon={faCog} size="lg" color="#10b981" />
        <span className="font-semibold text-[1.1em]">Settings</span>
      </Link>
    </footer>
  );
}

export default ExpenseFooter;
