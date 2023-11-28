import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import swal from "sweetalert";

const ServeMeals = () => {
  const axiosSecure = useAxiosSecure()
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['servemeal'],
    queryFn: async () => {
      const result = await axiosSecure.get('/api/v1/serveMeal');
      return result.data;
    }
  })
  if(isLoading){
    return<p>Loading</p>
  }

  const handleServeStatus = async (id) =>{
    console.log(id)
    const result = await axiosSecure.patch(`/api/v1/servestatus/${id}`)
    console.log(result)
    if(result.data.modifiedCount > 0){
      swal("Congratulation", "The meal served", "Success")
    }
    refetch();
  }

  console.log(data)


  return (
    <div>
      <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal Title</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serve Button</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {/* Row 1: Fake Data */}
      {
        data.length > 0 ? (
          data.map((request, index) => (
            <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap">{request.mealTitle}</td>
        <td className="px-6 py-4 whitespace-nowrap">j{request.userEmail}</td>
        <td className="px-6 py-4 whitespace-nowrap">{request.userName}</td>
        <td className="px-6 py-4 whitespace-nowrap capitalize">{request.status}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          {
            request.status === 'pending' ? (
              <button 
          onClick={() => handleServeStatus(request._id)}
          className="bg-four hover:bg-one text-white font-bold py-2 px-4 rounded">Serve</button>
            ) : (
              <button 
          disabled
          className="bg-three text-white font-bold py-2 px-4 rounded">Delivered</button>
            )
          }
        </td>
      </tr>
          ))

        ) : (<p>You have noe requested meal.</p>)
      }
    </tbody>
  </table>
</div>

    </div>
  );
};

export default ServeMeals;