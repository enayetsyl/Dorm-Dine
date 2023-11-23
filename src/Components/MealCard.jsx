import { BsStar } from "react-icons/bs";
import cardImage from '../assets/5.jpg'

const MealCard = () => {
  return (
    <div className="rounded-xl bg-four shadow-2xl pt-10">
      <div className="rounded-t-[80px] bg-white ">
        <div className="text-center p-5 space-y-3">
        <h1 className="uppercase text-2xl  font-semibold text-blue-800">Deshi Food</h1>
        <p className="text-base text-gray-500">Very delicious made with care. Ingradients are flour, vegetable, honey, cheese.</p>
        </div>
        <div className="w-full h-2/3 px-5 rounded-xl">
          <img src={cardImage} alt="" className='w-full h-fulll object-cover rounded-xl' />
        </div>
        <div className='flex justify-between items-center px-5 pt-5'>
          <h1 className='text-2xl font-black text-black'>$125</h1>
          <div className='flex justify-center text-four font-black'>
          <BsStar /><BsStar /><BsStar /> {/* if necessary add rating icon here*/}
          </div>
        </div>
      </div>
          <div>
            <button className='w-full text-white bg-four rounded-b-xl py-4 uppercase text-xl font-bold'>Details</button>
          </div>
    </div>
  );
};

export default MealCard;