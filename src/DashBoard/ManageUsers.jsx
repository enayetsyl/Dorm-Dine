import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import swal from "sweetalert";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

const ManageUsers = () => {
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
    fetch(`http://localhost:5000/api/v1/allUser?page=${currentPage}&size=${itemsPerPage}`)
    .then(res => res.json())
    .then(data => setData(data))
  },[currentPage, itemsPerPage])


  const axiosSecure = useAxiosSecure()

  // const {data, isLoading, refetch} = useQuery({
  //   queryKey:['allUser'],
  //   queryFn: async () => {
  //     const response = await axiosSecure.get('/api/v1/allUser')
  //     return response.data;
  //   }
  // })

  const handleStatusChange = async(id) => {
    const updateStatusId = await axiosSecure.patch(`/api/v1/makeadmin/${id}`)
    if(updateStatusId.data.modifiedCount > 0){
      swal('Congratulations', 'Your make a new admin', 'success');
      console.log(updateStatusId)
      // refetch()
    }
  }

  if(loading){
    return <p>Loading</p>
  }
  
  return (
    <div className="w-[90%] mx-auto">
      <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Make Admin</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription Status</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {/* Row 1: Fake Data */}
     {
      data?.length > 0 ? (
        
          data?.map((user, index) => (
            <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {
            user.role !== 'admin' ? (
              <button 
          onClick={() => handleStatusChange(user._id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Make Admin</button>
            ) :(
              <button 
          disabled
          className="bg-three text-white font-bold py-2 px-4 rounded">Make Admin</button>
            )
          }
        </td>
        <td className="px-6 py-4 whitespace-nowrap capitalize">{user.package}</td>
      </tr>
          ))
        
      ) : (<p>No user to show try again later.</p>)
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

export default ManageUsers;