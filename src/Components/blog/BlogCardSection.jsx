import BlogCard from "./BlogCard";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import BlogData from './BlogData.json'; 
function BlogCardSection() {
  return (
    <section className="flex w-full h-auto justify-center md:my-[150px]">
      <div className="flex flex-col gap-[30px]  px-3 md:px-0">
        {BlogData.map((card, index) => (
          <BlogCard
            key={index}
            icon={faCalendar} 
            date={card.date}
            title={card.title}
            disc={card.disc}
            link={card.link}
          />
        ))}
      </div>
    </section>
  );
}

export default BlogCardSection;
