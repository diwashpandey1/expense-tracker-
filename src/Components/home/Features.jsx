import { faChartColumn } from "@fortawesome/free-solid-svg-icons/faChartColumn";
import Card from "./Card";
import { faClock, faBookmark, faLightbulb, faDownload, faCoins, faChartLine,  } from "@fortawesome/free-solid-svg-icons";

function Features() {
  const cardsData = [
    { icon: faChartLine,isAvailable: true, title: "Expense Tracking", disc: "Switch to a comfortable night mode for low-light conditions." },
    { icon: faClock,isAvailable: true, title: "Real-time Overview", disc: "Enjoy a bright interface during daytime." },
    { icon: faBookmark,isAvailable: true, title: "Category Management", disc: "Save your favorite expenses for quick access." },
    { icon: faLightbulb,isAvailable:false, title: "AI Smart Insights", disc: "Monitor your health-related expenses effortlessly." },
    { icon: faDownload,isAvailable:false, title: "Cloud Backup", disc: "Get reminders for upcoming expenses." },
    { icon: faCoins,isAvailabe:false, title: "Money Challenges", disc: "Analyze your spending patterns over time." },
  ];

  return (
    <section className="w-full h-auto lg:h-[100vh] flex justify-center items-center py-10 px-6 sm:px-10 lg:px-16">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-[70px]">Features</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
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
