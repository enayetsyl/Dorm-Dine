import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import swal from "sweetalert";
import axios from "axios";


const VITE_IMAGE_HOSTING_KEY = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${VITE_IMAGE_HOSTING_KEY}`;

const AddMeal = () => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure()

  const onSubmit = async (data, event) => {
    const clickedButton = event.nativeEvent.submitter;
  if (clickedButton.name === "addMeal") {
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
        data.reviewText = [];
        const response = await axiosSecure.post('/api/v1/addMeal', data)
        if(response.data.insertedId){
          console.log(data)
          swal('Congratulations', 'Your meal Added', 'success');
        }else{
          swal('Something Wrong', 'Try again', 'error');
        }
      }else{
        swal('Image Upload Failed', 'Please try again', 'error')
      }
    }catch (error){
      console.log(error)
    }
  } else if (clickedButton.name === "upcomingMeal") {
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
        data.reviewText = [];
        const response = await axiosSecure.post('/api/v1/upcomingMeal', data)
        if(response.data.insertedId){
          swal('Congratulations', 'Your upcoming meal added', 'success');
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
  };

 

  return (
    <div>
      <h1 className="text-center text-6xl font-bold font-primary ">Add Meal</h1>

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
              placeholder="Enter meal title"
              className="border border-solid border-four rounded-lg p-2 w-3/4"
            />
          </div>
          {/* CATEGORY */}
          <div className="flex gap-5 items-center">
            <label className="w-32">Meal Category:</label>
            <select
              {...register("mealCategory", { required: true })}
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
              className="border border-solid border-four rounded-lg p-2 w-3/4"
            />
          </div>
          {/* RATING */}
          <div className="flex gap-5 items-center">
            <label className="w-32">Rating:</label>
            <input
              {...register("rating", { required: true })}
              type="number"
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
              className="border border-solid border-four rounded-lg p-2 w-3/4"
            />
          </div>
          {/* LIKES */}
          <div className="flex gap-5 items-center">
            <label className="w-32">Likes:</label>
            <input
              {...register("likes", { required: true })}
              type="number"
              defaultValue={0}
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
              defaultValue={0}
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
              placeholder="Enter distributor email"
              className="border border-solid border-four rounded-lg p-2 w-3/4"
            />
          </div>

          <div>
          {/* Add meal Button  */}
          <button type="submit"
          name="addMeal"
          >
           Add Meal
          </button>

          {/* Add to upcoming Button  */}
          <button type="submit"
          name="upcomingMeal"
          >
            Upcoming Meal
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMeal;
