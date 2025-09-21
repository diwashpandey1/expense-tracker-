import Footer from "../Components/Common/Footer";
import Header from "../Components/Common/Header";
import ToolsCardContainer from "../Components/tools/ToolsCardContainer";
import SimpleInterestCalculator from "../Components/tools/SimpleInterestCalculator";
import SIPCalculator from "../Components/tools/SIPCalculator";
import CurrencyExchange from "../Components/tools/CurrencyExchange";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route here

function ToolsPage() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ToolsCardContainer />} />
        <Route path="interestCalculator" element={<SimpleInterestCalculator />} />
        <Route path="SIPCalculator" element={<SIPCalculator />} />
        <Route path="CurrencyExchange" element={<CurrencyExchange />} />
      </Routes>
      <Footer />
    </>
  );
}

export default ToolsPage;
