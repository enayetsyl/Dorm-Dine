import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import swal from "sweetalert";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData, useParams } from "react-router-dom";
import axios from "axios";



const VITE_IMAGE_HOSTING_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${VITE_IMAGE_HOSTING_KEY}`;

const UpdateMeal = () => {
  const mealDetail = useLoaderData();
  console.log(mealDetail)
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure()
  const {googleUser} = useAuth()


  const onSubmit = async (data) => {
    try{
      const formData = new FormData();
      formData.append('image', data.mealImage[0])
      const imageResponse = await axios.post(image_hosting_api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      if(imageResponse.data.status === 200){
        data.mealImage = imageResponse.data.data.url;
        data.price = parseInt(data.price)
        data.rating = parseInt(data.rating)
        data.likes = parseInt(data.likes)
        data.reviews = parseInt(data.reviews)
        data.adminId = googleUser._id;
        const response = await axiosSecure.patch(`/api/v1/editMeal/${mealDetail._id}`, data)
        if(response.data.modifiedCount > 0){
          console.log(data)
          swal('Congratulations', 'Your meal data updated', 'success');
        }else{
          swal('Something Wrong', 'Try again', 'error');
        }
      }else{
        swal('Image Upload Failed', 'Please try again', 'error')
      }
    }catch (error){
      console.log(error)
    }
  } 

  return (
    <div>
      <h1 className="text-center text-6xl font-bold font-primary ">Update Meal</h1>

      {/* FORM STARTS */}
      <div className="p-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 font-secondary"
        >
          {/* TITLE */}
          <div className="flex gap-5 items-center">
            <label className="w-32">Meal Title: </label>
            <input
              {...register("mealTitle", { required: true })}
              type="text"
              defaultValue={mealDetail.mealTitle}
              placeholder="Enter meal title"
              className="border border-solid border-four rounded-lg p-2 w-3/4"
            />
          </div>
          {/* CATEGORY */}
          <div className="flex gap-5 items-center">
            <label className="w-32">Meal Category:</label>
            <select
              {...register("mealCategory", { required: true })}
              defaultValue={mealDetail.mealCategory}
              className="border border-solid border-four rounded-lg p-2 w-3/4"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>
          {/* IMAGE */}
          <div className="flex gap-5 items-center">
            <label className="w-32">Meal Image: </label>
            <input
              {...register("mealImage", { required: true })}
              type="file"
              placeholder="Upload meal image"
              accept="image/*"
              className="border border-solid border-four rounded-lg p-2 w-3/4"
            />
          </div>
          {/* INGREDIENTS */}
          <div className="flex gap-5 items-center">
            <label className="w-32">Ingredients: </label>
            <input
              {...register("ingredients", { required: true })}
              type="text"
              defaultValue={mealDetail.ingredients}
              placeholder="Enter meal ingredients"
              className="border border-solid border-four rounded-lg p-2 w-3/4"
            />
          </div>
          {/* DESCRIPTION */}
          <div className="flex gap-5 items-center">
            <label className="w-32">Description: </label>
            <input
              {...register("description", { required: true })}
              type="text"
              placeholder="Enter meal description"
              defaultValue={mealDetail.description}
              className="border border-solid border-four rounded-lg p-2 w-3/4"
            />
          </div>
          {/* PRICE */}
          <div className="flex gap-5 items-center">
            <label className="w-32">Price:</label>
            <input
              {...register("price", { required: true })}
              type="number"
              placeholder="Enter meal price"
              defaultValue={mealDetail.price}
              className="border border-solid border-four rounded-lg p-2 w-3/4"
            />
          </div>
          {/* RATING */}
          <div className="flex gap-5 items-center">
            <label className="w-32">Rating:</label>
            <input
              {...register("rating", { required: true })}
              type="number"
              defaultValue={mealDetail.rating}
              placeholder="Enter meal rating"
              className="border border-solid border-four rounded-lg p-2 w-3/4"
            />
          </div>
          {/* TIME */}
          <div className="flex gap-5 items-center">
            <label className="w-32">Post Time: </label>
            <input
              {...register("postTime", { required: true })}
              type="datetime-local"
              defaultValue={mealDetail.postTime}
              className="border border-solid border-four rounded-lg p-2 w-3/4"
            />
          </div>
          {/* LIKES */}
          <div className="flex gap-5 items-center">
            <label className="w-32">Likes:</label>
            <input
              {...register("likes", { required: true })}
              type="number"
              defaultValue={mealDetail.likes}
              placeholder="Enter meal price"
              className="border border-solid border-four rounded-lg p-2 w-3/4"
            />
          </div>
          {/* REVIEWS */}
          <div className="flex gap-5 items-center">
            <label className="w-32">Reviews:</label>
            <input
              {...register("reviews", { required: true })}
              type="number"
              defaultValue={mealDetail.reviews}
              placeholder="Enter meal price"
              className="border border-solid border-four rounded-lg p-2 w-3/4"
            />
          </div>
          {/* ADMIN/DISTRIBUTOR NAME */}
          <div className="flex gap-5 items-center">
            <label className="w-32">Distributor Name: </label>
            <input
              {...register("distributorName", { required: true })}
              type="text"
              defaultValue={mealDetail.distributorName}
              placeholder="Enter distributor name"
              className="border border-solid border-four rounded-lg p-2 w-3/4"
            />
          </div>
          {/* ADMIN DISTRIBUTOR EMAIL */}
          <div className="flex gap-5 items-center">
            <label className="w-32">Distributor Email: </label>
            <input
              {...register("distributorEmail", { required: true })}
              type="email"
              defaultValue={mealDetail.distributorEmail}
              placeholder="Enter distributor email"
              className="border border-solid border-four rounded-lg p-2 w-3/4"
            />
          </div>

          <div className="flex justify-center items-center gap-10">
          {/* Add meal Button  */}
          <button 
         className="bg-four py-3 px-6 text-white"
          type="submit"
          name="addMeal"
          >
           Update Meal
          </button>

          
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMeal;