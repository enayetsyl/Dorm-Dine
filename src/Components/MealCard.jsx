import { BsStar, BsStarFill } from "react-icons/bs";
import cardImage from '../assets/5.jpg'
import { Link } from "react-router-dom";

const MealCard = ({meal}) => {
  const {_id, mealImage, mealTitle, price, rating } = meal;

  const renderStars = () => {
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      // Check if the current star should be filled or not based on the rating
      starArray.push(
        i < rating ? (
          <BsStarFill key={i} />
        ) : (
          <BsStar key={i} />
        )
      );
    }
    return starArray;
  };

  return (
    <div className="rounded-xl bg-four shadow-2xl pt-10">
      <div className="rounded-t-[80px] bg-white ">
        <div className="text-center p-5 space-y-3">
        <h1 className="uppercase text-2xl  font-semibold text-blue-800">{mealTitle}</h1>
       
        </div>
        <div className="w-full h-[300px] px-5 rounded-xl">
          <img src={mealImage} alt="" className='w-full h-full object-cover rounded-xl' />
        </div>
        <div className='flex justify-between items-center px-5 py-5'>
          <h1 className='text-2xl font-black text-black'>${price}</h1>
          <div className='flex justify-center text-four font-black'>
            {renderStars()}
          {/* <BsStar /><BsStar /><BsStar /> if necessary add rating icon here */}
          </div>
        </div>
      </div>
          <div>
          <Link to={`/mealdetails/${_id}`}>
          <button className='w-full text-white bg-four rounded-b-xl py-4 uppercase text-xl font-bold'>Details</button>
          </Link>
          </div>
    </div>
  );
};

export default MealCard;