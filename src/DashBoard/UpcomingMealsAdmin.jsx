import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useLoaderData } from "react-router-dom";

const UpcomingMealsAdmin = () => {
  // const {count} = useLoaderData()
  const axiosSecure = useAxiosSecure()

  const {data: count, isLoading} = useQuery({
    queryKey:['upcomingMealCount'],
    queryFn: async () => {
      const response = await axiosSecure.get(`/api/v1/upcomingMealCount`)
      return response.data
    }
  })
  const {user, googleUser, loading} = useAuth()
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [currentPage, setCurrentPage] = useState(0)
  // const [data, setData] = useState([])
  const numberOfPages = Math.ceil(count?.count/itemsPerPage)

  const pages = Array.from({length: numberOfPages}, (_, index) => index)

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

  // useEffect( () => {
  //   fetch(`https://dorm-dine-server.vercel.app/api/v1/upcomingmeal?page=${currentPage}&size=${itemsPerPage}`)
  //   .then(res => res.json())
  //   .then(data => setData(data))
  // },[currentPage, itemsPerPage])
  
  
  

  const {data,  refetch} = useQuery({
    queryKey: [currentPage, itemsPerPage],
    queryFn: async () => {
      const result = await axiosSecure.get(`/api/v1/upcomingmeal?page=${currentPage}&size=${itemsPerPage}`)
      return result.data
    }
  })

  if(isLoading){
    return <p>Loading</p>
  }

  const handlePublish = async (id) => {
    console.log(id)
    const result = await axiosSecure.post(`/api/v1/mealpublish/${id}`)
    if(result.data.deletedCount > 0){
      swal('Congratulation', "Your meal published successfully", 'success')
    } else{
      swal("Sorry", "Your meal couldn't be published this time, Please try again", "error")
    }
    refetch()
  }

  const sortedData = data? [...data].sort((a,b) => b.likes - a.likes) : []

  console.log(sortedData)
  return (
    <div className="w-[90%] mx-auto">
      <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal Title</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Likes</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Reviews</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Publish Button</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {/* Row 1: Fake Data */}
      {
        sortedData?.length > 0 ? (
          sortedData?.map((upcomingmeal,index) => (
            <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap">{upcomingmeal.mealTitle}</td>
        <td className="px-6 py-4 whitespace-nowrap">{upcomingmeal.likes}</td>
        <td className="px-6 py-4 whitespace-nowrap">{upcomingmeal.reviews}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {
          upcomingmeal?.likes >=10 ? (
          <button 
          onClick={()=> handlePublish(upcomingmeal?._id)}
          className="bg-four hover:bg-two text-white font-bold py-2 px-4 rounded">Publish</button>
          ) : (
          <button 
          disabled
          className="bg-three text-white font-bold py-2 px-4 rounded">Publish</button>
          ) 
          }
        </td>
      </tr>
          ))
        ) : (<p>No upcoming meal to show</p>)
      }
    </tbody>
  </table>

  <div className="flex py-4 justify-center gap-5">
   <button onClick={handlePreviousPage}>Previous</button>
    {
      pages?.map((page, idx) => <button
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

export default UpcomingMealsAdmin;