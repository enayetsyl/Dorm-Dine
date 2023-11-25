import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import swal from "sweetalert";
const AddMeal = () => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure()

  const onSubmit = (data, event) => {
    // Handle your form data here
    console.log(data);
    const clickedButton = event.nativeEvent.submitter;
  if (clickedButton.name === "addMeal") {
    console.log("Add Meal button clicked", data);
    axiosSecure.post('/api/v1/addMeal', data)
    .then(response => {
      if(response.data.insertedId){
        swal('Congratulations', 'Your registration is complete', 'success');
      }else{
        swal('Something Wrong', 'Try again', 'error');
      }
    })
    
    // Handle Add Meal logic
  } else if (clickedButton.name === "upcomingMeal") {
    console.log("Upcoming Meal button clicked",data);
    // Handle Upcoming Meal logic
  }
  };

  // const handleAddMeal = () => {
  //   const data = getValues();
  //   console.log("b1", data);
  // };
  // const handleUpcomingMeal = () => {
  //   const data = getValues();
  //   console.log("b2", data);
  // };

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
