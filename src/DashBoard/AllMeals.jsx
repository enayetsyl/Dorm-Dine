import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link, useLoaderData } from "react-router-dom";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { allMeal, allMealCount } from "../api/update";

const AllMeals = () => {
  const {data: count, isLoading} = useQuery({
    queryKey:['allMealCount'],
    queryFn: () => allMealCount()
  })
  const {loading} = useAuth()
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  const numberOfPages = Math.ceil(count/itemsPerPage)
  const pages = Array.from({length: numberOfPages}, (_, index) => index)
  const axiosSecure = useAxiosSecure();

  const handlePreviousPage = () => {
    if(currentPage > 0){
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if(currentPage < pages.length - 1){
      setCurrentPage(currentPage + 1)
    }
  }

  const {data, refetch} = useQuery({
    queryKey: [currentPage, itemsPerPage],
    queryFn: () => allMeal(currentPage, itemsPerPage)
  })


  if(isLoading){
    return <p>Loading</p>
  }

  const handleProductDelete = async (id) => {
    console.log(id)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to see this product",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
          const res = await axiosSecure.delete(`/api/v1/meal/${id}`);
          if (res.data.deletedCount > 0) {
              // refetch to update the ui
              refetch();
              swal("Your meal has been deleted!", {
                icon: "success",
              });
          }
      }
      else {
        swal("Sorry we can not delete your meal this time. Try again later.");
      }
  })
  }

  return (
    <div className="w-[90%] mx-auto">
    <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal Title</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Likes</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Reviews</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distributor Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distributor Email</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View Meal</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
     {
      data?.length > 0 ? (
        data.map((meal, index) => (
          <tr key={index}>
          <td className="px-6 py-4 whitespace-nowrap">{meal.mealTitle}</td>
          <td className="px-6 py-4 whitespace-nowrap">{meal.likes}</td>
          <td className="px-6 py-4 whitespace-nowrap">{meal.reviews}</td>
          <td className="px-6 py-4 whitespace-nowrap">{meal.distributorName}</td>
          <td className="px-6 py-4 whitespace-nowrap">{meal.distributorEmail}</td>
          <td className="px-6 py-4 whitespace-nowrap">
            <Link to={`/dashboard/updateMeal/${meal._id}`}>
            <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded cursor-pointer">Update</button>
            </Link>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <button 
            onClick={() => handleProductDelete(meal._id)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer">Delete</button>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
           <Link to={`/mealdetails/${meal._id}`}>
           <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">View Meal</button>
           </Link>
          </td>
        </tr>
        ))
      ) : (
        <p>No meal to show</p>
      )
     }
    </tbody>
  </table>
  <div className="flex py-4 justify-center gap-5">
   <button onClick={handlePreviousPage}>Previous</button>
    {
      pages.map((page, idx) => <button
      className={`${currentPage === page ? 'bg-one text-white py-2 px-4 rounded-full' : ''}`} 
      onClick={() => setCurrentPage(page)}
      key={idx}>{page + 1}</button>)
    }
    <button onClick={handleNextPage}>Next</button>
  </div>
</div>
    </div>
  );
};

export default AllMeals;