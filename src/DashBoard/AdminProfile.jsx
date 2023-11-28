import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import noPhoto from '../assets/no-photo.png'

const AdminProfile = () => {
  const {user, googleUser} = useAuth()
  const axiosSecure = useAxiosSecure();
  console.log(googleUser)
  console.log(user)

  const {data, isLoading, refetch} = useQuery({
    queryKey: ['adminprof'],
    queryFn: async () => {
      const result = await axiosSecure.get(`/api/v1/adminprofile/${googleUser._id}`)
      return result.data
    }
  })

  if(isLoading){
    return <p>Loading</p>
  }

console.log(data)

  return (
    <div>
      <div className="rounded-lg border border-solid border-four drop-shadow-xl bg-white flex justify-center items-center gap-5 flex-col w-[90%] md:w-1/2 p-5 lg:p-10 h-[90%] mx-auto
        ">
          {
            user?.photoURL ? (<img src={user?.photoURL} alt="" className="rounded-full w-40 h-40"/>) : (
              <img src={noPhoto} className="rounded-full w-40 h-40"/>
            )
          }
          <h1 className="font-primary font-bold text-3xl">Name: {googleUser?.name}</h1>
          <h2 className="font-semibold">Email: {googleUser?.email}</h2>
          <h2>Meal Added: {data.length}</h2>
          <div>
           
          </div>
  
        </div>
    </div>
  );
};

export default AdminProfile;