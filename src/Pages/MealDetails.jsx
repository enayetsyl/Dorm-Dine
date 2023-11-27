import { useLoaderData, useNavigate } from "react-router";
import Container from "../Components/Container";
import { AiFillLike } from "react-icons/ai";
import { AwesomeButton } from "react-awesome-button";
import '../Components/button.css'
import { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import swal from "sweetalert";

const MealDetails = () => {
  const meal = useLoaderData()
  const {_id, mealImage, mealTitle, price, rating, postTime, distributorName, ingredients, description } = meal;
  const [likes, setLikes] = useState(parseInt(meal.likes, 10))
  const [reviewCount, setReviewCount] = useState(parseInt(meal.reviews, 10))
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const {user, googleUser} = useAuth()

  console.log(googleUser)
  const handleLikeClick = async () => {
  if(!user){
      swal('You are not login', 'Please Login and then like', 'error')
      navigate('/login')
      return;
    }
    setLikes(likes + 1)

    const updateLikesCount = {
          likesData: likes + 1,
        }
   
    try{
      const updatedData = await axiosSecure.patch(`/api/v1/likes/${_id}`, updateLikesCount)
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

  const handleRequestMeal = async () => {
    if(!user){
      swal('You are not login', 'Please Login and then like', 'error')
      navigate('/login')
      return;
    }
    if(googleUser.package !== 'silver' && googleUser.package !== 'gold' && googleUser.package !== 'platinum'){
      swal('You do not have any membership package.', 'Please buy a package and then request a meal.', 'error')
      navigate('/')
      return;
    }
    const requestMealData = {
      ...meal,
      userId: googleUser._id,
      status: 'pending'
    }
console.log(requestMealData)
    const response = await axiosSecure.post('/api/v1/mealrequest', requestMealData)
    if(response.data.insertedId){
      swal('Congratulation', 'Your request is successful', 'Success')
    }else if (response.data.code === 11000){
      swal('Duplicate Error', 'You cannot request same meal twice. Order a new meal', 'Error')
      navigate('/meals')
    } else{
      swal('Something Wrong', 'Try again later', 'Error')
      console.log(response.data)
    }
  }

  const handleReview = async (e) => {
    e.preventDefault()
    if(!user){
      swal('You are not login', 'Please Login and then review', 'error')
      navigate('/login')
      return;
    }
    const reviewText = e.target.review.value;
    setReviewCount(reviewCount + 1)
    const review = {
      reviews: reviewCount + 1,
      reviewText,
      reviewerId: googleUser._id,
      mealId: _id,
      meal: meal,
    }
    const response = await axiosSecure.post('/api/v1/review', review)
    if(response.data.insertedId){
      swal('Congratulation', 'Your request is successful', 'Success')
      console.log(response.data)
    }
    console.log(review)
  }

  return (
    <div>
      <Container>
      {/* image, rating, distributor name, post time */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-5  pt-5">
        <div className=" w-full lg:w-4/5 h-[500px]">
          <img src={mealImage} alt="" className="w-full h-full  rounded-lg" />
        </div>
        <div className="w-full lg:w-1/5 font-primary text-black font-semibold space-y-5 pt-10 text-center lg:text-start">
          <div className="flex flex-col md:flex-row lg:flex-col md:justify-center md:items-center md:gap-10 gap-5 drop-shadow-2xl text-four">
          <h1 className="text-6xl">Rating: <span>{rating}</span></h1>
          <h2 className="text-5xl">Post Time: <span>{postTime}</span></h2>
          </div>
          <h2 className="text-4xl text-four drop-shadow-2xl">Distributor Name- <span>{distributorName}</span></h2>
        </div>
      </div>
    {/* like button, review count, meal request button  */}
    <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
    <div className="flex justify-center items-center gap-5 md:gap-10 flex-col md:flex-row">
    <div className="flex justify-center items-center gap-2">
    <AiFillLike className="text-3xl"
    onClick={handleLikeClick}
    /> <span>{likes}</span>
    </div>
    <p className="border border-solid border-four py-3 px-5">Review Count: <span className="font-bold">{reviewCount}</span></p>
    </div>
    <div onClick={handleRequestMeal}>
    <AwesomeButton type="primary" className='aws-btn font-bold px-20'
    
    >Request Meal</AwesomeButton>
    </div>
    </div>
    <div className="space-y-5 text-black">
      <h2 className="text-2xl"><span className="font-bold ">Ingredients:</span>{ingredients}</h2>
      <p className="text-lg">
        <span className="font-bold">Meal Description:</span>{description}</p>    
    </div>
    <div className="space-y-2">
      <h1 className="uppercase text-center py-5 text-5xl font-bold drop-shadow-xl">reviews</h1>
      {/* {
        reviews.map((review,index) => <MealReview
        key={index}
        review={review}
        />)
      } */}
    </div>
    <div> 
      <form onSubmit={handleReview}>
        <div className="flex flex-col justify-center items-center gap-5">
        <label htmlFor="review" className="font-bold text-2xl">Give a review:</label>
        <textarea name="review" id="review" cols="80" rows="4" className="border border-solid border-four w-full p-5" placeholder="Write your review here" required></textarea>
        </div>
        <input type="submit" value="Submit" className="bg-four text-white py-3 px-5 rounded-lg text-xl font-semibold my-5 w-full" />
      </form>

    </div>
      </Container>
    </div>
  );
};

export default MealDetails;