import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Card({ icon,isAvailable, title, disc }) {
  return (
    <div className="bg-white shadow-md w-full sm:w-[350px] px-6 py-6 rounded-[10px] flex flex-col items-center relative -z-10">
      <FontAwesomeIcon icon={icon} size="3x" color="#10B981" className="mb-4" />
       {
        isAvailable ? <p className="none"></p> : 
                      <p className="absolute right-0 top-0 text-[8px] p-1 m-2 rounded-[10px] bg-red-200 text-gray-700">Comming soon...</p>
       }
      <h3 className="my-4 text-2xl font-semibold text-[#4b5563] text-center">{title}</h3>
      <p className="text-gray-600 text-center">{disc}</p>
    </div>
  );
}

export default Card;
