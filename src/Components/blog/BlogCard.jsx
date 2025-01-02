import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

function BlogCard({ icon, date, title, disc, link }) {
  return (
    <div className=" w-auto md:w-[600px] bg-white shadow-md rounded-lg p-6 mb-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center mb-4">
        <FontAwesomeIcon icon={icon} className="text-gray-600 mr-2 text-xl" />
        <p className="text-gray-600 text-sm">{date}</p>
      </div>
      <h2 className="text-gray-800 text-xl font-semibold mb-3">{title}</h2>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{disc}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 font-medium flex items-center hover:underline"
      >
        Read Blog <FontAwesomeIcon icon={faAngleRight} className="ml-1" />
      </a>
    </div>
  );
}

export default BlogCard;
