import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();

  const {data, isLoading, refetch} = useQuery({
    queryKey:['allReview'],
    queryFn: async () => {
      const result = await axiosSecure.get('/api/v1/allreview')
      return result.data
    }
  })
  if(isLoading){
    return <p>Loading</p>
  }

  const handleDeleteReview = async (id) => {
    console.log(id)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to see this review",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
          const res = await axiosSecure.delete(`/api/v1/review/${id}`);
          if (res.data.deletedCount > 0) {
              // refetch to update the ui
              refetch();
              swal("Your review has been deleted!", {
                icon: "success",
              });
          }
      }
      else {
        swal("Sorry we can not delete your review this time. Try again later.");
      }
  })

  }

  console.log(data)
  return (
    <div>
      <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal Title</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Likes</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Reviews</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {/* Row 1: Fake Data */}
      {
        data.length > 0 ? (
          data.map((review, index) => (
            <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap">{review.meal.mealTitle}</td>
        <td className="px-6 py-4 whitespace-nowrap">{review.meal.likes}</td>
        <td className="px-6 py-4 whitespace-nowrap">{review.meal.reviews}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button 
          onClick={() => handleDeleteReview(review._id)}          
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <Link to={`/mealdetails/${review.meal._id}`}>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">View</button>
          </Link>
        </td>
      </tr>
          ))
        ) : (<p>No review to show</p>)
      }
    </tbody>
  </table>
</div>

    </div>
  );
};

export default AllReviews;