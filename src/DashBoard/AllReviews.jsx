import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link, useLoaderData } from "react-router-dom";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const {count} = useLoaderData()
  const {user, googleUser, loading} = useAuth()
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const [data, setData] = useState([])
  const numberOfPages = Math.ceil(count/itemsPerPage)

  const pages = Array.from({length: numberOfPages}, (_, index) => index)

  const handlePreviousPage = () => {
    if(currentPage > 0){
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if(currentPage < pages.length - 1){
      setCurrentPage(currentPage - 1)
    }
  }


  useEffect( () => {
    fetch(`http://localhost:5000/api/v1/allreview?page=${currentPage}&size=${itemsPerPage}`)
    .then(res => res.json())
    .then(data => setData(data))
  },[currentPage, itemsPerPage])


  // const {data, isLoading, refetch} = useQuery({
  //   queryKey:['allReview'],
  //   queryFn: async () => {
  //     const result = await axiosSecure.get('/api/v1/allreview')
  //     return result.data
  //   }
  // })
  if(loading){
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
              // refetch();
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
  <div className="flex py-4 justify-center gap-5">
   <button onClick={handlePreviousPage}>Previous</button>
    {
      pages.map((page, idx) => <button
      className={`${currentPage === page ? 'bg-one text-white py-2 px-4 rounded-full' : ''}`} 
      onClick={() => setCurrentPage(page)}
      key={idx}>{page}</button>)
    }
    <button onClick={handleNextPage}>Next</button>
  </div>
</div>

    </div>
  );
};

export default AllReviews;