import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

const UpcomingMealCard = ({upcomingMeal}) => {
  const {_id, mealTitle, mealImage, price} = upcomingMeal;
  const {user} = useAuth()
  const [likes, setLikes] = useState(parseInt(upcomingMeal.likes, 10))
  const [isLiked, setIsLiked] = useState(false)
  const axiosSecure = useAxiosSecure()

  const handleLikeClick = async () => {
    if(!isLiked){
      setLikes(likes + 1)
      setIsLiked(true)
      
    }

  
      const updateLikesCount = {
            likesData: likes + 1,
          }
     
      try{
        const updatedData = await axiosSecure.patch(`/api/v1/updateMealLikes/${_id}`, updateLikesCount)
        {
          if(updatedData.data.modifiedCount > 0){
            swal("Congratulation!", "Your like  updated in database successfully!", "success");
            
          }
          else{
            swal("Something wrong", "Please try again", "error")
          }
        }
      }
      catch(error){
        console.log(error)
      }
    }


  return (
    <div className="rounded-xl bg-four shadow-2xl pt-10">
    <div className="rounded-t-[80px] bg-white ">
      <div className="text-center p-5 space-y-3">
      <h1 className="uppercase text-2xl  font-semibold text-blue-800 line-clamp-1 text-ellipsis">{mealTitle}</h1>
     
      </div>
      <div className="w-full h-[300px] px-5 rounded-xl">
        <img src={mealImage} alt="" className='w-full h-full object-cover rounded-xl' />
      </div>
      <div className='flex justify-between items-center px-5 py-5'>
        <h1 className='text-2xl font-black text-black'>${price}</h1>
        <div className='flex justify-center text-four font-black'>
          {/* {renderStars()} */}
        {/* <BsStar /><BsStar /><BsStar /> if necessary add rating icon here */}
        </div>
      <div className="flex justify-center items-center gap-2">
   <button
   disabled={isLiked}
   >
   <AiFillLike className="text-3xl cursor-pointer"
    onClick={handleLikeClick}
    />
    </button> <span>{likes}</span>
    </div>
      </div>
    </div>
          </div>
  );
};

export default UpcomingMealCard;