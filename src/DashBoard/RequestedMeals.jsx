import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import swal from "sweetalert";

const RequestedMeals = () => {
  const {googleUser} = useAuth()
  const axiosSecure = useAxiosSecure()
  console.log(googleUser._id)
 const {data: mealData, isLoading, isError, refetch} = useQuery({
  queryKey: ['requestMeal'],
  queryFn: async () => {
    const response = await axiosSecure.get(`/api/v1/requestmeal?userEmail=${googleUser.email}`)
    return response.data
  }
 })

 if (isLoading) {
  return <p>Loading...</p>;
}

if (isError) {
  return <p>Error loading data</p>;
}

const handleCancelMeal = (id) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to get the meal",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then(async (willDelete) => {
    if (willDelete) {
        const res = await axiosSecure.delete(`/api/v1/requestmeal/${id}`);
        console.log('del res', res.data);
        if (res.data.deletedCount > 0) {
            // refetch to update the ui
            refetch();
            swal("Your request meal has been deleted!", {
              icon: "success",
            });
        }
    }
    else {
      swal("Sorry we can not delete your meal this time. Try again later.");
    }
});
}


console.log(mealData)
  return (
    <div className="w-[90%] mx-auto">
      <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-five">
      <tr>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal Title</th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Likes</th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Reviews</th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cancel Button</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-five">
      {/* <!-- Row 1: Fake Data --> */}
      {
        mealData.map(meal =>  (
          <tr key={meal._id}>
        <td className="px-6 py-4 whitespace-nowrap" >{meal.orderedMeal.mealTitle}</td>
        <td className="px-6 py-4 whitespace-nowrap">{meal.orderedMeal.likes}</td>
        <td className="px-6 py-4 whitespace-nowrap">{meal.orderedMeal.reviews}</td>
        <td className="px-6 py-4 whitespace-nowrap capitalize">{meal.status}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="bg-four py-2 px-5 text-white rounded-lg"
          onClick={() => handleCancelMeal(meal._id)}
          >Cancel</button>
        </td>
      </tr>
        ))
      }
    </tbody>
  </table>
</div>

    </div>
  );
};

export default RequestedMeals;